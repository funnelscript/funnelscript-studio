# FunnelScript Studio (Visual Web Canvas)

> **Status:** ⏸️ **Future Project / Isolated & On Hold**  
> This visual web interface has been intentionally and completely decoupled from the core [FunnelScript](https://github.com/funnelscript/funnelscript) language repository into this standalone repository. Active feature development is on hold until the core FunnelScript DSL, compiler, and empirical calibration engine achieve production-grade maturity (v1.0).

---

## 📌 Architecture & Strategic Isolation Rationale

FunnelScript is a declarative Domain-Specific Language (DSL) and deterministic simulation runtime for Marketing Systems Engineering. 

During early prototyping, maintaining a visual web application in the same repository as the compiler introduced severe architectural risks:
1. **Dual-Engine Split Brain:** The language runtime, RNG seeding, and double-entry financial ledger live in Python (`funnelscript`). Re-implementing stochastic simulation math in TypeScript caused semantic drift.
2. **Premature UI Polish:** Building React canvas components before finalizing language grammar, dimensional units, and empirical calibration created unnecessary maintenance overhead.
3. **Decoupled Lifecycle:** A compiler toolchain belongs in a clean, hermetic environment (CLI, PyPI/uv package, LSP). The visual canvas belongs in an independent presentation layer.

### Future Roadmap (Post v1.0 Language Maturity)
Once the FunnelScript core achieves stability and proven empirical forecasting accuracy:
* **Visual Graph ⟷ `.fnls` Bi-Directional Compilation:** Marketers will drag-and-drop marketing channels, conditional audience filters, and touchpoint nodes, automatically generating clean `.fnls` code.
* **Single Source of Truth Execution:** The studio will **never** execute stochastic math in JavaScript. Instead, it will run the canonical Python core directly in the browser via **WebAssembly (Pyodide)** or connect to a local CLI server (`funnelscript serve`).
* **Cash Runway & Liquidity Telemetry:** Real-time visual stress-testing of cash exhaustion dates, CAC non-linear escalation, and payment processor settlement lags.

---

## 🛠️ Tech Stack

* **Runtime & Package Manager:** [Bun](https://bun.sh/)
* **Framework:** React 19 + TypeScript
* **Canvas Engine:** `@xyflow/react` (React Flow)
* **Styling:** Tailwind CSS + PostCSS
* **Bundler:** Vite 6

---

## 🚀 Local Development (Preview Only)

To explore the isolated canvas prototype locally:

```bash
# 1. Install dependencies using Bun
bun install

# 2. Start Vite development server
bun run dev

# 3. Build production bundle
bun run build

# 4. Run frontend tests
bun test
```

---

## 🔗 Related Repositories

* **[funnelscript/funnelscript](https://github.com/funnelscript/funnelscript):** The canonical DSL compiler, discrete-event simulation engine, and marketing stdlib (Python).
* **[funnelscript/funnelscript-research](https://github.com/funnelscript/funnelscript-research):** Architectural decision records (ADRs), formal specifications, and research documentation.
