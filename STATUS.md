# STATUS — verification log (publish package)

**As-of:** 2026-09-27 ~06:45 PT (doc link re-fetch + package assemble); RAISE soft scrub evening 2026-09-27 PT  
**Practice runs:** 2026-09-25 PT (Mesh + Aiken hello)  
**Label:** community learning / scaffolding docs — Preview framing  
**Not claimed:** battle-tested, production-ready, audited, mainnet, official,
live oracle integration

## Matrix

| Check | Result | Notes |
|-------|--------|-------|
| Mesh tip / UTxO / ADA send on Preview | **PASS** (practice) | See sibling `cardano-preview-mesh-aiken-hello` |
| Aiken hello build (Plutus V3, stdlib v3) | **PASS** (practice) | Aiken `v1.1.23` |
| Lock 5 ADA + inline datum + collateral | **PASS** | Tx `ebdc1565…569c` block 4697224 |
| Unlock / `valid_contract: true` | **PASS** | Tx `b7e23631…d975` block 4697227 |
| Packaging teach-back + scaffolding notes | **PASS** | Sourced from packaging-glue practice notes |
| Stub sketch present (no network) | **PASS** | `stub/oracle-read.sketch.ts` |
| Live oracle read in unlock | **NOT RUN** | By design — no paid/gated keys |
| CIP-30 browser wallet path | **NOT RUN** | MeshWallet + CLI skey only |
| Price-checking Aiken validator | **NOT RUN** | Described only |
| Unified 10-min oracle+Aiken+Mesh+CIP-30 kit exists | **ABSENT** (Solid gap) | thin-spot + phase3 Q3 + search 2026-09-27 |
| Mainnet | **NOT RUN** | |
| TVL / users / consumer counts | **NOT CLAIMED** | Unknown |

## External URL re-fetch (2026-09-27 PT)

| URL | Result |
|-----|--------|
| https://meshjs.dev/aiken | **Live** |
| https://meshjs.dev/aiken/getting-started | **Live** |
| https://aiken-lang.org/installation-instructions | **Live** |
| https://docs.orcfax.io/consume | **Live** (Preview FSP listed) |
| https://github.com/orcfax/on-demand (raw README) | **Live** (Mesh CIP-30 on portal) |
| https://docs.charli3.io/oracles/products/integration/onchain | **Live** |
| https://github.com/Charli3-Official/oracle-integration-aiken | **Live** |
| https://developers.cardano.org/docs/developers/curriculum/dapps/oracles/pyth/ | **Live** |
| https://docs.pyth.network/price-feeds/pro/integrate-as-consumer/cardano | **Live** (Evolution SDK examples) |

## Artifacts in this folder

| Path | Role |
|------|------|
| `README.md` | Front door / scope |
| `PLAIN-LANGUAGE.md` | Non-expert explanation |
| `RECIPE.md` | Scaffolding map |
| `GOTCHA.md` | Gotchas + citations |
| `VERSIONS.md` | Exact practice pins |
| `stub/oracle-read.sketch.ts` | Comments-only wiring sketch |
| `package-snippet.json` | Docs-scaffold metadata |
| `SECURITY.md` | How to report problems |
| `audits/peer-review-pass.md` | Peer review pass (correctness / presentation) |
| `LICENSE` | MIT |

## Secrets

No wallet seeds, mnemonics, private keys, or Blockfrost project ids in this
folder. Practice addresses / tx hashes below are **public Preview** artifacts
only.

Public Preview addresses from practice (OK to cite):

- Script: `addr_test1wp83hd4eqa05da4tumggd6vj668huhyvsurma72ejrvrg6q8urlm4`
- Lock / unlock txs: see `VERSIONS.md`

## Publishing stance

Community learning package under **MIT**. Docs-only / no CI. No upstream issues
are filed from this package unless the maintainer asks.

**Sibling note:** `cardano-preview-mesh-aiken-hello` (live at
https://github.com/booper-labs/cardano-preview-mesh-aiken-hello) and
`orcfax-preview-consume-sketch` are separate sibling packages (named in prose
only; not required to use this scaffold).
