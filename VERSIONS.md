# VERSIONS — what we actually tested / pinned

**Scope:** honest pin list for the Preview practice path that backs this
learning package.  
**Do not assume** these pins match every Mesh / Aiken / oracle release.
Re-check on the day you publish or expand to a live oracle.

| Component | Version / value | Notes |
|-----------|-----------------|-------|
| Network | **Cardano Preview** | Practice on-chain claims only |
| Provider | **Blockfrost Preview** | Project id never committed |
| Node.js | **v20.19.2** | Mesh docs say 18+; practice used 20 |
| TypeScript | **5.8.x** (`^5.8.3`) | Pinned for `ts-node` |
| `@meshsdk/core` | **1.9.1** (`^1.9.1` in package.json) | mesh-hello / aiken-hello offchain |
| Aiken CLI | **v1.1.23+8949565** | musl release binary (aikup rate-limited) |
| Aiken stdlib | **v3** (`aiken-lang/stdlib`) | Do not keep default old `1.5.0` |
| Plutus | **V3** | hello_world spend |
| cardano-cli | **11.2.3.0** | Present; not required for Mesh path |
| Wallet signing (practice) | MeshWallet + CLI payment **skey** | CIP-30 **not** exercised |
| Oracle live call | **none** | By design |

## Practice transaction artifacts (Preview)

| Step | Tx hash (full) | Block |
|------|----------------|-------|
| Lock | `ebdc1565c39b6d295736317634bcb019a65860ce787669058010b005f6dd569c` | 4697224 |
| Unlock | `b7e23631f73db4a5a7913001dbbfd7cb57ad48d63ef043c4bd9d71f7f524d975` | 4697227 |

Validator hash: `4f1bb6b9075f46f6abe6d086e992d68f7e5c8c8707bef95990d83468`  
Script address (Preview): `addr_test1wp83hd4eqa05da4tumggd6vj668huhyvsurma72ejrvrg6q8urlm4`

## Doc verification date

External URLs in `GOTCHA.md` / `STATUS.md` re-fetched **2026-09-27**
(America/Los_Angeles). Practice runs dated **2026-09-25** PT.
