# cardano-packaging-glue-starter

**Community learning / scaffolding docs** for how **oracle + Aiken + Mesh**
pieces fit together on Cardano **Preview** (testnet). This package names the
roles, the verified Mesh↔Aiken hello path, the oracle-vendor islands, and what
research did **not find**: a unified “10-minute” starter kit
(see inventory Unknown residual) — without shipping a live oracle integration.

**Who this is for:** builders learning packaging glue after a Mesh send and an
Aiken hello lock/unlock; maintainers packaging a clear community scaffold for
peer review.

> **Not official Cardano, Mesh, Aiken, or oracle-vendor docs.**  
> **Not** a runnable end-to-end oracle dApp. **Not** production-audited.  
> **Docs-only / no CI** in this package (learning scaffold).  
> Reviewed for community publish readiness before any public release.

## Verified scope (2026-09-27 PT)

| | |
|---|---|
| **Solid (practice, 2026-09-25 PT)** | Mesh tip / UTxO / ADA send on **Preview**; Aiken **hello_world** (Plutus V3) lock + unlock with `valid_contract: true`; conceptual packaging map + comments-only stub |
| **Solid (docs existence, re-fetched 2026-09-27 PT)** | Mesh Aiken path docs; Orcfax consume docs + Preview FSP; Charli3 Aiken helpers repo + on-chain guide; Pyth Pro Cardano consumer + Dev Portal curriculum; Orcfax on-demand uses Mesh CIP-30 on the **oracle portal** (not an Aiken dApp starter) |
| **Not verified** | Live oracle read in a Mesh unlock; CIP-30 browser wallet in this spike; price-checking validator; mainnet; any TVL / user / consumer counts |
| **Not claimed** | production-ready, battle-tested, audited, official, “ships a 10-minute kit” |

Exact pins from the practice spike: [`VERSIONS.md`](VERSIONS.md).  
Evidence matrix: [`STATUS.md`](STATUS.md).

## Quick start (reading order)

1. Scope + honesty: this README
2. Everyday explanation: [`PLAIN-LANGUAGE.md`](PLAIN-LANGUAGE.md)
3. Scaffolding map (what to wire later): [`RECIPE.md`](RECIPE.md)
4. Hello-path gotchas that bite oracle work: [`GOTCHA.md`](GOTCHA.md)
5. Pins + evidence: [`VERSIONS.md`](VERSIONS.md) · [`STATUS.md`](STATUS.md)
6. Peer review note: [`audits/peer-review-pass.md`](audits/peer-review-pass.md)

## Package contents

| Path | Role |
|------|------|
| `README.md` | This front door |
| `PLAIN-LANGUAGE.md` | Non-expert explanation of the three roles |
| `RECIPE.md` | Scaffolding map: oracle → Aiken → Mesh → Blockfrost → explorer |
| `GOTCHA.md` | Preview hello gotchas + vendor-island citations |
| `VERSIONS.md` | Exact practice pins (Preview) |
| `STATUS.md` | What was run vs described; source link checks |
| `stub/oracle-read.sketch.ts` | Comments-only placement sketch (no network, no keys) |
| `package-snippet.json` | Docs-scaffold metadata (no secrets / no install) |
| `SECURITY.md` | How to report problems |
| `audits/peer-review-pass.md` | Peer review pass (correctness / presentation) |
| `LICENSE` | MIT |

## Inventory: what practice already has vs gaps

| Piece | Status | Grade |
|-------|--------|-------|
| Aiken language + `aiken build` + CIP-57 `plutus.json` | Done in practice (see sibling hello) | **Solid** |
| Mesh ↔ Aiken lock / unlock on Preview | Done (`valid_contract`) | **Solid** |
| Blockfrost Preview provider | Done | **Solid** |
| Oracle vendor docs / helpers (Orcfax, Charli3, Pyth) | Exist as islands; re-fetched 2026-09-27 PT | **Solid** (existence) |
| **One official “10-minute oracle + Aiken + Mesh + CIP-30” starter** | **Not found in our research** (thin-spot packaging notes + phase3 Q3 + search 2026-09-24–27 PT) | **Solid** as *research absence* — residual **Unknown**: undiscovered Catalyst / unofficial one-kits (not proof of global nonexistence) |
| Live oracle call in this package | Skipped on purpose (no paid / gated keys) | **N/A** |
| Identity / compliance attribute oracles | Not evidenced | **Unknown** |
| TVL / MAU / consumer counts per oracle | Not measured | **Unknown** — do not invent |

## How this differs from the hello recipe

Sibling package `cardano-preview-mesh-aiken-hello` (live:
https://github.com/booper-labs/cardano-preview-mesh-aiken-hello) is the
**concrete Preview hello recipe** (Mesh send + Aiken lock/unlock). **This
package** maps **oracle + Aiken + Mesh** roles and documents the packaging gap;
it cites hello as baseline evidence and does not repeat the full walkthrough.

## Honesty about limits

This documents a **learning scaffold** grounded in one Preview practice path
(Mesh send + Aiken hello) plus cited vendor docs. It does **not** replace a
future community or official starter that wires one chosen oracle into Mesh
unlock end-to-end. Prefer Preview / testnet framing until someone expands scope
with unpaid public feeds and re-verification.

## License

**MIT** — see [`LICENSE`](LICENSE). Copyright (c) 2026 Brady Sheldon.

## How to cite

- Package folder: `cardano-packaging-glue-starter`
- Doc verification date: **2026-09-27** (America/Los_Angeles)
- Practice run date: **2026-09-25** PT (Aiken hello txs)
- Network: **Cardano Preview** only for on-chain practice claims
- Do not cite as “production oracle integration” or “official Mesh/Aiken kit”
