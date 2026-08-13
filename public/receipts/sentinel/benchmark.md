# Sentinel — Benchmark Methodology

Claims: **NL queries ~300ms after pre-aggregation** · **3-agent orchestration**

## Environment
- Backend: FastAPI + async worker pool (8 workers)
- Data: 50k anonymized interaction events (synthetic corpus matching production shape)
- Graph: per-team collaboration graph, features pre-aggregated nightly

## Procedure
1. Natural-language query set: 20 representative questions (burnout, talent, health)
2. Each query timed from request arrival to answer generation (`performance.now()`)
3. Pre-aggregation: graph features computed nightly into per-team summaries
4. Cold vs warm: cold (first query after restart) excluded from the ~300ms claim

## Results
- P50: 240ms · P95: ~300ms · P99: 480ms (with pre-aggregation)
- Before pre-aggregation: seconds-scale (2–6s per query) — the rewrite is the measured win

## Privacy invariant
- Anonymized interaction patterns only; no PII in the pipeline by design (verified via
  schema review, not just policy)

## Notes
- The query corpus + timings are reproducible via the repo's eval script (see RECEIPTS)
