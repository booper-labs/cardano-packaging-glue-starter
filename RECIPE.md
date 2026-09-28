# RECIPE — packaging map (oracle + Aiken + Mesh on Preview)

**Type:** community scaffolding recipe (learning docs), **not** a copy-paste
live oracle integration.  
**Verified practice base:** Mesh send + Aiken hello lock/unlock on **Preview**
(pins in `VERSIONS.md`).  
**Not claimed:** unpaid live oracle E2E, CIP-30 in this spike, mainnet, or a
finished starter kit.

## Goal

After reading this, you can point to which folder / doc owns each step of:

```
user action
  → Mesh MeshTxBuilder (+ MeshWallet now; CIP-30 later)
  → (optional) resolve oracle statement / feed / pull update   [NOT RUN LIVE HERE]
  → spend / lock at Aiken validator (hello DONE; price rules NOT DONE)
  → Blockfrost Preview submit
  → explorer confirm
```

## 0. Preconditions (Preview practice)

- Cardano **Preview** access (Blockfrost Preview project id — never commit it)
- Node.js (practice used **20.x** for Mesh; Mesh docs say 18+)
- Aiken CLI (practice: **v1.1.23**) with stdlib **v3**
- `@meshsdk/core` (practice: **1.9.1**)
- No oracle vendor API keys / Lazer tokens required to **read** this recipe

## 1. Baseline you should already have (Solid)

| Step | What | Practice evidence |
|------|------|-------------------|
| A | Mesh tip / UTxO / send ADA | Preview spike `mesh-hello/` |
| B | Aiken `hello_world` build → `plutus.json` | `aiken check && aiken build` |
| C | Mesh lock 5 ADA + inline datum + collateral out | Lock tx `ebdc1565…569c` |
| D | Mesh unlock with redeemer + owner signature | Unlock tx `b7e23631…d975` (`valid_contract`) |

Explorer (Preview Cardanoscan):

- Lock: `https://preview.cardanoscan.io/transaction/ebdc1565c39b6d295736317634bcb019a65860ce787669058010b005f6dd569c`
- Unlock: `https://preview.cardanoscan.io/transaction/b7e23631f73db4a5a7913001dbbfd7cb57ad48d63ef043c4bd9d71f7f524d975`

If A–D are unfamiliar, do **not** jump to oracles. Use Mesh Aiken docs first:
https://meshjs.dev/aiken

## 2. Pick **one** oracle mental model (docs only)

Do not combine all three on day one.

### A) Orcfax-shaped (eUTxO statement / reference input)

1. Read consume steps: https://docs.orcfax.io/consume  
   (FSP → FS token → statement datum: `feed_id`, `created_at`, body)
2. Note Preview FSP hash from that page’s Deployments table
3. Off-chain: locate the statement UTxO for your feed; attach as
   **reference input** (`readOnlyTxInReference` in Mesh terms)
4. On-chain: validator verifies statement + freshness rules (helpers:
   `orcfax-aiken` / examples — see GOTCHA sources)
5. Closest “wallet + oracle” packaging elsewhere: `orcfax/on-demand` uses
   **Mesh CIP-30** on the **oracle portal** — that is **not** an Aiken dApp
   starter kit

### B) Charli3-shaped (Push or Pull)

1. On-chain guide: https://docs.charli3.io/oracles/products/integration/onchain
2. Aiken helpers: https://github.com/Charli3-Official/oracle-integration-aiken  
   (**Note:** that repo’s README still cites an older Aiken alpha — re-check
   compatibility before copying into a v1.1.x project)
3. Push: read operator-published oracle datum UTxO (often ref input)  
   Pull: request on-demand update, then include what the on-chain guide expects
4. Integration guides skew Python/CLI; **Mesh CIP-30 glue is DIY**

### C) Pyth Pro-shaped (pull / Lazer)

1. Dev Portal curriculum:  
   https://developers.cardano.org/docs/developers/curriculum/dapps/oracles/pyth/
2. Pyth Hub consumer guide:  
   https://docs.pyth.network/price-feeds/pro/integrate-as-consumer/cardano
3. Pattern: fetch signed update off-chain → include **Pyth state reference
   input** + **zero-withdrawal** with update as redeemer → your validator calls
   `pyth.get_updates` and **must enforce freshness** (`timestamp_us`) itself
4. Official off-chain examples use **Evolution SDK** (preprod-oriented), **not**
   Mesh — Mesh wiring for this shape is still a packaging gap
5. Lazer access token is **gated** (Intersect process per Dev Portal) — out of
   scope for unpaid Preview drills

## 3. Where the stub plugs in

See `stub/oracle-read.sketch.ts`. It shows **where** a Mesh unlock would attach
a reference input (Orcfax / Charli3-push-ish) or pull-update plumbing
(Pyth / Charli3-pull), relative to an existing hello unlock:

- Keep: `spendingPlutusScriptV3`, blueprint script, `txInInlineDatumPresent`,
  matching redeemer, `requiredSignerHash` if owner-gated, collateral, Mesh
  wallet UTxO fetch
- Add later: `resolveOracleRef(...)` then `readOnlyTxInReference(...)` **or**
  vendor-specific pull helpers
- **Do not** also call `txInDatumValue` when an inline datum is already present

The stub does **not** import vendor SDKs and does **not** call the network.

## 4. Suggested DIY order (when you expand beyond this package)

1. Re-run hello lock/unlock on Preview until it is boring
2. Choose **one** vendor; read only that vendor’s consume path
3. Write a tiny Aiken check that only validates oracle-shaped data (no product
   logic)
4. Extend Mesh unlock to attach the reference input / pull bits the docs require
5. Only then add CIP-30 browser signing (Mesh browser wallet APIs)
6. Keep secrets out of git; prefer Preview until unpaid public feeds are proven

## 5. Explicit non-goals for this recipe

- No live feed id selection
- No paid API / Lazer token setup
- No mainnet addresses or TVL claims
- No assertion that Midnight Compact fills this kit (adjacent privacy island only)
