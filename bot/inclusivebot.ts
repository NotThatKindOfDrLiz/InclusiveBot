console.log("🗂 Current working directory:", process.cwd());
import { SimplePool, getEventHash, type Event } from 'nostr-tools';
import { getPublicKey, sign } from '@noble/secp256k1';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
console.log("🔍 Loaded secret:", process.env.NOSTR_SECRET?.slice(0, 10), "...");

// Load prompt data
const prompts = JSON.parse(fs.readFileSync('./prompts.json', 'utf8'));

// Load and verify secret key
const sk = process.env.NOSTR_SECRET;
if (!sk) {
  console.error("❌ Missing NOSTR_SECRET in .env");
  process.exit(1);
}

const skBytes = Buffer.from(sk, 'hex');
const pubkey = Buffer.from(getPublicKey(skBytes, true)).toString('hex');
const pool = new SimplePool();
const relays = [
  'wss://relay.nostr.band',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'wss://nostr.wine',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.mom',
  'wss://offchain.pub',
];

console.log(`🤖 InclusiveBot is listening for mentions to pubkey: ${pubkey}`);

// Subscribe to mentions
const sub = pool.subscribeMany(relays, [{
  kinds: [1],
  '#p': [pubkey],
}], {
  onevent(event) {
    console.log("📨 Mention detected:", event.content);

    const match = prompts[Math.floor(Math.random() * prompts.length)];

    // Draft reply without id/sig
    const draft: Omit<Event, 'id' | 'sig'> = {
      kind: 1,
      pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
        ['e', event.id],
        ['p', event.pubkey]
      ],
      content: match.text
    };

    // Sign and create full event
    const id = getEventHash(draft);
    const sigObj = sign(Buffer.from(id, 'hex'), skBytes);
    const sig = Buffer.from(sigObj.toCompactRawBytes()).toString('hex');
    const reply: Event = { ...draft, id, sig };

    // Publish reply
    const results = pool.publish(relays, reply);
    results.forEach(p => {
      p.then(() => console.log("✅ Replied with prompt:", match.text))
       .catch(e => console.error("❌ Publish error:", e));
    });
  }
});
