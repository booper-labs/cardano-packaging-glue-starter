# GOTCHA — packaging glue (Preview hello + oracle islands)

**Type:** community packaging notes / learning scaffold  
**Scope verified (practice):** Aiken **v1.1.23**, `@meshsdk/core@1.9.1`,
Node **20**, Blockfrost **Preview**, hello lock/unlock  
**Scope verified (docs, 2026-09-27 PT):** Mesh Aiken docs; Orcfax consume;
Charli3 on-chain + Aiken helpers; Pyth Pro Cardano consumer + Dev Portal;
Orcfax on-demand README (Mesh CIP-30 on portal)  
**Not claimed:** live oracle E2E, CIP-30 in this spike, mainnet, production audit

## Contents

1. [Hello-path gotchas (Solid — we hit them)](#1-hello-path-gotchas-solid--we-hit-them)
2. [Kit gap (Solid as research absence)](#2-kit-gap-solid-as-research-absence)
3. [Vendor islands (docs existence)](#3-vendor-islands-docs-existence)
4. [Honest limits](#4-honest-limits)

## 1. Hello-path gotchas (Solid — we hit them)

These bit the Preview Aiken hello unlock and will transfer when you attach
oracle datums / reference inputs.

### 1.1 Enterprise address vs Mesh base change address

CLI `payment.addr` is often an **enterprise** address. After Mesh sends, change
lands at a **base** address with the **same payment key hash**. Querying only
the enterprise address looks empty even when funds exist.

**Mitigation:** prefer `MeshWallet` / provider UTxO fetch for the change
address Mesh actually uses. Same CLI payment skey can still sign.

### 1.2 Inline datum vs supplemental datum

When the script UTxO already carries an **inline datum**, do **not** also
attach a separate datum value on the spend (`txInDatumValue`). Mesh + ledger
returned `NotAllowedSupplementalDatums`.

**Mitigation:** use `txInInlineDatumPresent` only for that spend path.

### 1.3 Collateral

Script spends need a distinct collateral UTxO (practice used ~5 ADA), separate
from fee / change inputs. Create it on lock (or earlier) so unlock is not
blocked.

### 1.4 Redeemer encoding must match Aiken types

For hello, redeemer Constr 0 with message field looked like:

```ts
{ alternative: 0, fields: ["Hello, World!"] }
```

Wrong alternative / field shape fails on-chain even when the English message
“looks right.”

### 1.5 Toolchain pins

| Issue | What we did |
|-------|-------------|
| `aiken new` pulled old stdlib `1.5.0` | Pin `aiken-lang/stdlib` **`v3`** in `aiken.toml` |
| `aikup` hit unauthenticated GitHub API rate limit | Install Aiken from release tarball `v1.1.23` |
| `ts-node` + newer TypeScript | Pin TypeScript **5.8.x** |

### 1.6 Do not mix Midnight Compact into this kit

Midnight Compact practice lives in a separate tree. It is a **privacy stack
adjacent** path (different language / ledger story). It does **not** close the
L1 oracle + Aiken + Mesh packaging gap.

## 2. Kit gap (Solid as research absence)

**Claim (dated):** In our research through **2026-09-27 PT**, no single official
“10-minute oracle + Aiken + Mesh + CIP-30” starter was found that walks
install → Aiken validator consuming an oracle statement/feed → MeshTxBuilder →
CIP-30 sign end-to-end.

**Evidence (research absence — not global nonexistence):**

- Phase-3 packaging Q3 (2026-09-24 PT): partial examples only; Still Unknown
  for undiscovered Catalyst / unofficial one-kits
- Thin-spot packaging UX notes §4: same packaging tax
- Web search 2026-09-27 PT: Mesh Aiken starters (marketplace, escrow, hello)
  and vendor oracle helpers exist separately; no unified one-kit hit in that pass

**Residual Unknown:** Undiscovered Catalyst proposals, unofficial repos, or
vendor kits we did not surface. Do **not** read this section as proof that no
such kit exists anywhere.

**Closest-but-not-it (among sources we checked):**

| Surface | Why it is not the kit |
|---------|------------------------|
| Mesh Aiken docs / hello guides | Mesh ↔ Aiken only; not oracle-specific |
| Orcfax on-demand | Mesh CIP-30 on **oracle portal**; not Aiken dApp starter |
| Charli3 `oracle-integration-aiken` | Aiken helpers; Mesh CIP-30 not the path |
| Pyth Pro curriculum | Aiken + Lazer JS; official tx examples use Evolution SDK |

## 3. Vendor islands (docs existence)

Link checks performed **2026-09-27 PT** via WebFetch unless noted.

| Source | URL | Relevance | Link check |
|--------|-----|-----------|------------|
| Mesh — Aiken overview | https://meshjs.dev/aiken | Blueprint → `applyParamsToScript` / MeshTxBuilder | **Live** |
| Mesh — Aiken getting started | https://meshjs.dev/aiken/getting-started | Install / `aiken build` / `plutus.json` | **Live** |
| Aiken install | https://aiken-lang.org/installation-instructions | `aikup` / install paths | **Live** |
| Orcfax consume | https://docs.orcfax.io/consume | Statement via reference inputs; Preview FSP listed | **Live** |
| Orcfax on-demand | https://github.com/orcfax/on-demand | README: Mesh SDK CIP-30 wallet on portal | **Live** |
| Charli3 on-chain guide | https://docs.charli3.io/oracles/products/integration/onchain | Aiken oracle_datum module usage | **Live** |
| Charli3 Aiken helpers | https://github.com/Charli3-Official/oracle-integration-aiken | Datum helpers repo (README cites older Aiken alpha) | **Live** |
| Dev Portal — Pyth | https://developers.cardano.org/docs/developers/curriculum/dapps/oracles/pyth/ | Recommended pull curriculum; token gate noted | **Live** |
| Pyth Hub — Cardano consumer | https://docs.pyth.network/price-feeds/pro/integrate-as-consumer/cardano | Aiken lib + zero-withdrawal; Evolution SDK examples | **Live** |

Prior notes (reused by title, not re-audited as primary claims here):

- Thin-spot packaging UX notes §4 (cardano OSS landscape notes)
- Phase-3 packaging answers Q3 (Still Unknown: Catalyst / unofficial one-kits)
- Oracle notes: Orcfax, Charli3, Pyth Pro (existence / consume framing)

## 4. Honest limits

- Practice spike signed with **MeshWallet + CLI payment skey**, not CIP-30 UI
- **No** live oracle statement / pull update was included in a spend
- Pyth official examples target **Evolution SDK** / preprod-shaped flows — do
  not claim Mesh parity without a separate verify pass
- Charli3 helper README compatibility note may lag current Aiken — treat as
  **Shaky** until you rebuild against your Aiken pin
- Identity/compliance attribute oracles: **Unknown**
- TVL, MAU, uptime %, consumer counts: **Unknown** — do not invent
