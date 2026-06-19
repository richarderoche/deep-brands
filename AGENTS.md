<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Generated files

Never manually edit files marked as generated in their header comments. See `.cursor/rules/no-edit-generated-files.mdc`. Fix types via schema, GROQ queries, and `Extract<>` types in `frontend/types/`.
