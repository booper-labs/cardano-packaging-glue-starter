/**
 * SKETCH ONLY — not executable wiring.
 *
 * Package: cardano-packaging-glue-starter (community learning draft)
 * Purpose: show WHERE an oracle read would plug into an Aiken hello + Mesh
 * unlock path (see RECIPE.md / GOTCHA.md).
 *
 * No vendor SDK imports. No network calls. No API keys. No seeds.
 *
 * Mental models (verify against vendor docs before coding; links stamped in GOTCHA.md):
 *
 *  A) Orcfax-shaped (eUTxO statement)
 *     - Locate the statement UTxO / feed for your feed_id (provider query).
 *     - Attach it as a REFERENCE INPUT (read, do not spend).
 *     - Validator checks statement datum body + freshness / FSP rules
 *       (see orcfax-aiken helpers + docs.orcfax.io/consume).
 *     - Closest wallet packaging elsewhere: orcfax/on-demand uses Mesh CIP-30
 *       on the oracle portal — that is NOT this Aiken dApp starter.
 *
 *  B) Charli3-shaped (Push or Pull)
 *     - Push: read operator-published oracle datum UTxO (often ref input).
 *     - Pull: request on-demand update, then include what the on-chain guide expects.
 *     - Aiken helpers: Charli3-Official/oracle-integration-aiken
 *       (README may cite an older Aiken alpha — re-check against your pin).
 *     - Integration guides skew Python/CLI; Mesh CIP-30 glue is DIY.
 *
 *  C) Pyth Pro-shaped (pull / Lazer)
 *     - Fetch signed price update via Lazer JS helpers (access token gated).
 *     - Tx typically includes Pyth state reference input + zero-withdrawal plumbing
 *       per Cardano consumer docs — official examples use Evolution SDK, not Mesh.
 *     - Enforce freshness (timestamp_us) in YOUR Aiken validator.
 *
 * Existing hello unlock pieces you would keep:
 *  - spendingPlutusScriptV3 + script from plutus.json blueprint
 *  - txInInlineDatumPresent (do NOT also txInDatumValue → NotAllowedSupplementalDatums)
 *  - redeemer matching Aiken type
 *  - requiredSignerHash(owner) if still owner-gated
 *  - collateral UTxO (~5 ADA), distinct from fee inputs
 *  - MeshWallet UTxO fetch (base change addr), not enterprise payment.addr alone
 *
 * Pseudocode placement:
 *
 *   const oracleRef = await resolveOracleRef(/* feed id / config */);
 *   // txBuilder
 *   //   .spendingPlutusScriptV3()
 *   //   .txIn(scriptTxHash, scriptOutIndex)
 *   //   .txInInlineDatumPresent()
 *   //   .txInRedeemerValue(redeemer)
 *   //   .readOnlyTxInReference(oracleRef.txHash, oracleRef.index)  // Orcfax/Charli3-push-ish
 *   //   // …or attach pull-update bytes / helper outputs per Pyth/Charli3-pull docs
 *   //   .txInCollateral(collTxHash, collIndex)
 *   //   .requiredSignerHash(ownerPkh)
 *   //   .changeAddress(changeAddr)
 *   //   .complete() → sign → submit Blockfrost Preview
 *
 * Stop here until a real feed id + unpaid Preview path is chosen.
 * Follow-on live unpaid oracle recipes belong in a separate package.
 */

export const PACKAGING_GLUE_STUB = {
  status: "sketch-only",
  liveOracle: false,
  networkHint: "cardano-preview",
  package: "cardano-packaging-glue-starter",
  teachBack: "../PLAIN-LANGUAGE.md",
  recipe: "../RECIPE.md",
  gotcha: "../GOTCHA.md",
} as const;
