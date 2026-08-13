# MindPulse Pro — Benchmark Methodology

Measured: **P95 browser inference 18.7ms** · claim: "under 20ms inference"

## Environment
- Browser: Chrome 140 (headless-free desktop profile)
- Hardware: M-series Mac (8-core), 16GB
- Runtime: onnxruntime-web (WASM backend), single session
- Model: XGBoost exported to ONNX, ~1.5MB

## Procedure
1. Warm session: 10 predictions discarded (session init + wasm warmup)
2. 100 predictions, single-session, no batching
3. Per-prediction wall time measured via `performance.now()` around `session.run()`
4. Feature input: a live 60s typing session feature vector (50+ features)

## Results
- P50: 14.2ms · P95: 18.7ms · P99: 21.4ms · max: 26ms
- Zero server round-trips (browser-only inference)

## Notes
- WASM vs WebGL backends: WASM chosen for determinism (SHAP + reproducibility)
- TreeSHAP attribution adds ~2ms per prediction (explainable mode)
- Numbers from the documented run of 2026-08-12; rerun via the repo's benchmark script
