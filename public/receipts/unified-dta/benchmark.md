# Unified-DTA — Benchmark Methodology

Claims: **CI 0.841 / MSE competitive on BindingDB** · **LRU-cached API, warm < 5ms**

## Environment
- Training: single GPU (NVIDIA, 24GB) · PyTorch 2.x · pinned deps in Dockerfile
- ESM-2 embeddings: frozen (no fine-tune of the language model)
- GIN: 60 epochs, seed-pinned, mixed-dtype normalization applied

## Procedure
1. **Split protocol**: identical to the benchmark leaders' splits on BindingDB
   (train/val/test by protein, no leakage) — CI/MSE therefore comparable, not decorative
2. Metrics: Concordance Index (CI) and Mean Squared Error (MSE)
3. Reproducibility: `docker run` with the pinned image reproduces the reported numbers

## Serving (LRU-cached FastAPI)
- Warm cache hit: < 5ms · cold pass: ~40ms (single CPU container)
- Cache: functools LRU, keyed by (protein, molecule) canonical forms

## Results
- BindingDB: CI 0.841 / MSE competitive with leaderboard entries under the same split
- DAVIS / KIBA: trained with the same protocol; numbers reported in the repo's run log

## Notes
- The full training run log + split identifiers live in the repo (see RECEIPTS link)
