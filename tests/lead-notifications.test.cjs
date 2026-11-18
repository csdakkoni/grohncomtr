const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { NextResponse } = require('next/server');

// Load the real TypeScript modules with isolated environment and mocked I/O.
function load(path, { env = {}, fetch, imports = {}, after = () => {} } = {}) {
    const exports = {};
    const source = ts.transpileModule(readFileSync(path, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(source, {
        exports, process: { env }, fetch, URL, AbortSignal,
        console: { warn() {}, error() {} },
        require(name) {
            if (name in imports) return imports[name];
            if (name === 'next/server') return { NextResponse, after };
            if (name === 'node:timers/promises') return { setTimeout: async () => {} };
            return require(name);
        },
    }, { filename: path });
    return exports;
}

const env = {
    RESEND_API_KEY: 'test-only',
    LEAD_NOTIFICATION_FROM: 'Grohn <alerts@example.com>',
    LEAD_NOTIFICATION_TO: 'owner@example.com, team@example.com',
};
const contact = { kind: 'contact', name: 'Test Customer', email: 'customer@example.com', company: 'Example', subject: 'Sample request', message: 'Please contact me.', savedTo: 'messages' };
const quote = { ...contact, kind: 'quote', product: 'Sodium hydrosulfite', quantity: 10, unit: 'ton', country: 'Georgia', incoterm: 'CIF', savedTo: 'quotes' };
const modulePath = 'src/lib/lead-notifications.ts';

test('sends a contact notification only to configured recipients, with customer reply address', async () => {
    const calls = [];
    const { sendLeadNotification } = load(modulePath, { env, fetch: async (...args) => { calls.push(args); return new Response('{}'); } });
    assert.equal(await sendLeadNotification(contact), 'sent');
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], 'https://api.resend.com/emails');
    const body = JSON.parse(calls[0][1].body);
    assert.deepEqual(body.to, ['owner@example.com', 'team@example.com']);
    assert.equal(body.reply_to, contact.email);
    assert.match(body.subject, /Yeni iletişim mesajı/);
    assert.match(body.text, /https:\/\/grohn.com.tr\/admin\/messages/);
});

test('includes quote details and the correct panel link for both storage destinations', () => {
    const { buildLeadEmail } = load(modulePath);
    const normal = buildLeadEmail(quote);
    assert.match(normal.text, /Miktar: 10 ton/);
    assert.match(normal.text, /Ülke: Georgia/);
    assert.match(normal.text, /Teslim şekli: CIF/);
    assert.match(normal.text, /\/admin\/quotes/);
    const fallback = buildLeadEmail({ ...quote, savedTo: 'messages' });
    assert.match(fallback.text, /Kayıt yeri: Mesajlar/);
    assert.match(fallback.text, /\/admin\/messages/);
});

test('defaults to the owner-approved Grohn inbox when no recipient override is set', async () => {
    const settings = { ...env };
    delete settings.LEAD_NOTIFICATION_TO;
    let recipient;
    const { sendLeadNotification } = load(modulePath, { env: settings, fetch: async (_, options) => {
        recipient = JSON.parse(options.body).to;
        return new Response('{}');
    } });
    assert.equal(await sendLeadNotification(contact), 'sent');
    assert.deepEqual(recipient, ['grohn@grohn.com.tr']);
});

test('escapes user HTML and excludes malformed reply addresses', () => {
    const { buildLeadEmail } = load(modulePath);
    const email = buildLeadEmail({ ...contact, name: '<img src=x onerror=alert(1)>', email: 'customer@example.com\r\nBcc: other@example.com', subject: 'Hello\r\nNew header' });
    assert.ok(!email.html.includes('<img'));
    assert.match(email.html, /&lt;img/);
    assert.equal(email.reply_to, undefined);
    assert.ok(!/[\r\n]/.test(email.subject));
});

test('missing or invalid configuration does not call the provider', async () => {
    for (const settings of [{}, { ...env, LEAD_NOTIFICATION_TO: '' }, { ...env, LEAD_NOTIFICATION_TO: 'invalid' }]) {
        const { sendLeadNotification } = load(modulePath, { env: settings, fetch: () => assert.fail('Provider must not be called') });
        assert.equal(await sendLeadNotification(contact), 'disabled');
    }
});

test('retries a temporary failure with the same body and idempotency key', async () => {
    const calls = [];
    const { sendLeadNotification } = load(modulePath, { env, fetch: async (_, options) => {
        calls.push(options);
        return new Response('{}', { status: calls.length === 1 ? 503 : 200 });
    } });
    assert.equal(await sendLeadNotification(contact), 'sent');
    assert.equal(calls.length, 2);
    assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']);
    assert.equal(calls[0].body, calls[1].body);
});

test('handles rate limits, network failures and permanent provider errors without throwing', async () => {
    for (const status of [429, 503, 422, 'offline']) {
        let calls = 0;
        const { sendLeadNotification } = load(modulePath, { env, fetch: async () => {
            calls++;
            if (status === 'offline') throw new Error('Network offline');
            return new Response('{}', { status });
        } });
        assert.equal(await sendLeadNotification(contact), 'failed');
        assert.equal(calls, status === 422 ? 1 : 2);
    }
});

test('schedules delivery after the response rather than starting an untracked promise', async () => {
    const jobs = [];
    let sent = 0;
    const { scheduleLeadNotification } = load(modulePath, { env, after: job => jobs.push(job), fetch: async () => { sent++; return new Response('{}'); } });
    scheduleLeadNotification(contact);
    assert.equal(sent, 0);
    assert.equal(jobs.length, 1);
    await jobs[0]();
    assert.equal(sent, 1);
});

function route(kind, errors) {
    const notifications = [];
    const inserts = [];
    const api = load(`src/app/api/${kind}/route.ts`, { imports: {
        '@/lib/supabase': { supabase: { from: table => ({ insert: async row => {
            inserts.push({ table, row });
            return { error: errors[inserts.length - 1] || null };
        } }) } },
        '@/lib/lead-notifications': { scheduleLeadNotification: lead => notifications.push(lead) },
    } });
    return { ...api, notifications, inserts };
}
const request = body => ({ json: async () => body });
const quoteBody = { product: quote.product, quantity: quote.quantity, unit: quote.unit, country: quote.country, name: contact.name, email: contact.email };

test('contact route notifies once after a successful insert, and never on invalid or failed saves', async () => {
    const ok = route('contact', []);
    assert.equal((await ok.POST(request(contact))).status, 200);
    assert.equal(ok.notifications.length, 1);
    assert.equal(ok.inserts[0].row.full_name, contact.name);
    const failed = route('contact', [{ code: 'offline' }]);
    assert.equal((await failed.POST(request(contact))).status, 500);
    assert.equal(failed.notifications.length, 0);
    const invalid = route('contact', []);
    assert.equal((await invalid.POST(request({ ...contact, name: ' ' }))).status, 400);
    assert.equal(invalid.inserts.length, 0);
    assert.equal(invalid.notifications.length, 0);
});

test('quote route notifies once for normal saves and once for successful fallback saves', async () => {
    for (const [errors, destination, insertCount] of [[[], 'quotes', 1], [[{ code: 'missing_table' }], 'messages', 2]]) {
        const api = route('quote', errors);
        assert.equal((await api.POST(request(quoteBody))).status, 200);
        assert.equal(api.inserts.length, insertCount);
        assert.equal(api.notifications.length, 1);
        assert.equal(api.notifications[0].savedTo, destination);
    }
});

test('quote route does not notify for honeypots, invalid forms or failed fallback saves', async () => {
    for (const [body, errors, status] of [[{ website: 'bot' }, [], 200], [{}, [], 400], [quoteBody, [{ code: 'offline' }, { code: 'offline' }], 500]]) {
        const api = route('quote', errors);
        assert.equal((await api.POST(request(body))).status, status);
        assert.equal(api.notifications.length, 0);
    }
});
