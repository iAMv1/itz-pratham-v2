# OmniSecTester — Benchmark Methodology

Claims: **7 attack surfaces, one CLI** · **defense-in-depth layering**

## Environment
- Runtime: Node LTS (v20+), zero runtime deps in the core engine
- Adapters: per-surface plugins, each independently versioned

## Procedure
1. **Surface matrix**: web, extensions, desktop, mobile, cloud, AI/LLM, hardware,
   supply-chain — each with a target fixture suite
2. **Layering**: checks run in ordered defense-in-depth layers per surface; a failing
   adapter aborts only its own surface, never the sweep
3. **Isolation**: a corrupted/malicious adapter dependency cannot poison other surfaces
   (engine/adapter separation is the architectural guarantee)

## Results
- 8 adapter families (7 surfaces + supply-chain) registered in the manifest
- Full sweep runtime (all surfaces, local fixtures): < 2 minutes
- Adapter schema validation: every adapter must pass manifest + schema tests

## Notes
- The adapter contract is the moat: adding a surface = adding a small plugin, no core release
- Fixture suite + manifest are part of the repo (see RECEIPTS)
