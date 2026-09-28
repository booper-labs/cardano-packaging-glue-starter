# Plain language — packaging glue (oracle + Aiken + Mesh)

**Scope:** community learning explanation for Cardano **Preview**.  
**Not claimed:** production-ready, battle-tested, official, or a finished
oracle dApp. We verified Mesh + Aiken hello on Preview; oracle wiring is
**described from vendor docs**, not run live here.

For anyone who does not live in Cardano tooling all day.

## Why three tools show up in one app story

A useful Cardano app often needs:

1. **Facts from the outside world** (a price, a rate, “did this event happen”)
2. **Rules that decide if a spend is allowed** (on-chain referee)
3. **Code that builds the transaction** and talks to wallets / explorers

Those jobs usually sit in different kits. “Packaging glue” means making them
work together without inventing the wiring from scratch every time.

## Three roles (define once)

### 1. Oracle — “bring a fact into the transaction”

An **oracle** publishes real-world information so a smart contract can use it.
On Cardano that fact usually lives in a special on-chain box (a **UTxO** —
think of a locked coin purse with a note). Your transaction often **reads**
that note as a **reference input** (look, don’t spend) while spending your own
locked funds.

Cardano-adjacent options shortlisted in prior OSS research (pick **one** for a
first app; do not invent adoption numbers):

| Name | Plain job | Confidence |
|------|-----------|------------|
| **Orcfax** | Publishes **statements** (signed fact packages) that fit eUTxO; consume docs + Aiken helpers | **Solid** for pieces; unified Mesh+Aiken starter still DIY |
| **Charli3** | Push feeds (operators publish) and Pull feeds (on demand); Aiken datum helpers | **Solid** for docs/helpers; Mesh CIP-30 kit not evidenced as official starter |
| **Pyth Pro** | **Pull** signed price updates; Dev Portal curriculum calls this a recommended pull path; live stream needs an access token | **Solid** for curriculum/docs; consumer count **Unknown** |

### 2. Aiken — “the on-chain referee”

**Aiken** is a language for writing **validators**: small programs that answer
“Is this spend allowed?” when someone tries to spend money locked at a script
address.

We already ran a tiny one called **hello_world** (Plutus V3) on Preview. It
unlocks only if:

1. The **redeemer** (spender’s message) is exactly `Hello, World!`
2. The **owner** named in the **datum** also signed the transaction

That proved: compile → blueprint → Mesh lock → Mesh unlock → explorer shows a
valid contract spend. For a price-sensitive app the validator grows (“also check
oracle freshness and price range”) — same job, more rules. We did **not** write
that price validator here.

### 3. Mesh — “the off-chain builder and courier”

**Mesh** is a TypeScript library. It runs on your computer or in a web app, not
inside the Cardano ledger. Mesh helps you talk to **Blockfrost** (we used
Preview), build a transaction, sign, submit, and check an explorer.

We already used Mesh for a simple ADA send and for locking / unlocking the
Aiken hello script. Browser **CIP-30** wallet connect is a Mesh capability we
did **not** exercise in this spike (we signed with a CLI key via `MeshWallet`).

## One walkthrough story (shape only)

Toy app idea: “Lock 5 ADA now. Later, unlock only if ADA’s price is above a
threshold.” **Not implemented live here.**

1. User clicks “lock” → Mesh builds a tx to the Aiken script address + datum
2. Mesh submits via Blockfrost Preview
3. Later unlock → Mesh would also **read an oracle feed / statement / pull
   update** and attach what the validator expects (reference input and/or pull
   plumbing)
4. Aiken validator runs on-chain; fail → whole tx fails
5. Explorer confirms

**What we actually did (Solid):** steps 1–2 and 4–5 for hello **without** an
oracle.  
**What we only describe:** step 3’s oracle read + price rules — pieces exist
per vendor docs; one glue kit does not.

## The main gap in one sentence

Vendor docs and Mesh↔Aiken starters exist as **islands**. A single official
“10-minute oracle + Aiken + Mesh + CIP-30” starter was **not found in our
research** through 2026-09-27 PT. That *research absence* is the packaging tax
this package documents. Residual **Unknown:** undiscovered Catalyst or unofficial
one-kits we did not surface — this is not proof none exist anywhere.

## What we hit ourselves (will bite oracle work too)

1. **Enterprise vs base address** — CLI `payment.addr` can look empty after
   Mesh sends; change lands at a **base** address with the same payment key.
   Prefer Mesh wallet UTxO fetch.
2. **Inline datum vs supplemental datum** — if the script UTxO already has an
   inline datum, do not also attach a separate datum on spend
   (`NotAllowedSupplementalDatums`).
3. **Collateral** — script spends need a separate ~5 ADA collateral UTxO.
4. **Version pins** — Aiken stdlib `v3`; TypeScript 5.8.x for `ts-node`;
   `aikup` can hit GitHub rate limits (we used a release tarball).
5. **Midnight Compact** is a **privacy stack adjacent** path — not the L1
   oracle + Aiken + Mesh kit. Do not mix the islands when teaching packaging.

## Confidence legend

- **Solid** — We saw it, ran it, or it is backed by docs we re-fetched.
- **Shaky** — Reasonable inference; do not treat as measured fact.
- **Unknown** — Not evidenced; do not invent numbers (TVL, users, uptime).

## One sentence for stakeholders

Mesh and Aiken hello work on Preview; oracle vendors publish consume helpers;
nobody we found ships one boxed “oracle + Aiken + Mesh” starter — so glue is
still DIY, and this package only maps the kitchen, it does not bake the cake.
