# Images for `/blog/mcp-goes-stateless`

All visuals share one palette (matching the hero): dark navy card
(`#21202C`), blue-purple panels (`#36476F`) with cyan borders/lines
(`#65A4D2` / `#9BDAEF`), orange (`#E5966D`) reserved for legacy/removed
bits, light text. These PNGs are self-contained dark cards — reuse them
as-is on Medium.

| File | What it is |
|---|---|
| `MCP_2.0__The_Stateless_Evolution.png` | Original hero (2752×1536, 7.3 MB). Source of truth; not used directly on the site. |
| `hero.webp` | Web-optimized hero (1600w, ~326 KB). Used as the post lead image + social card. |
| `overview.webp` | The six-thread release overview. |
| `topology-before.webp` | Stateful topology (sticky LB + shared session store). |
| `topology-after.webp` | Stateless topology (round-robin, no shared store). |
| `mrtr.webp` | Multi Round-Trip Requests sequence (retry lands on a different box). |
| `tasks.webp` | Tasks extension lifecycle state machine. |

Diagram sources (Mermaid `.mmd` + the shared `theme.json`) live in
`_sources/` next to these images; re-render with `@mermaid-js/mermaid-cli`
(`mmdc -i x.mmd -o x.png -c theme.json -b '#21202C' -s 3`) if you edit them.
