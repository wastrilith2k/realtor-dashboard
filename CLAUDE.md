# CLAUDE.md — Agent Portfolio Projects

This file defines conventions for all agent portfolio projects. Follow these rules in every session unless explicitly told otherwise.

---

## Who I Am

Senior Frontend Engineer pivoting to AI engineering. Strong in React/TypeScript/Python. Solid conceptual understanding of RAG, vector search, and agent architecture. Building these projects to demonstrate hands-on implementation, not just architecture knowledge.

**What this means for how you help me:**
- Scaffold the parts I already know (React components, API wiring, data fetching, deployment config)
- Slow down and explain on the parts that are new to me (see below)
- Never just generate and move on — leave comments that explain *why*, not just *what*
- When there's a meaningful architectural decision, surface it and let me decide

---

## New Learning — Go Slow Here

These are concepts I understand but have never implemented by hand. On these topics: explain before implementing, show me the shape of the thing before writing the code, and flag tradeoffs.

### RAG Pipeline
- **Chunking**: Explain the strategy choice before implementing. Why fixed vs semantic? What overlap setting and why?
- **Embedding**: Explain which model, why, and what the output actually is (dimensions, what similarity means in practice)
- **Vector search**: I've used pgvector conceptually. Show me the actual query and explain what's happening
- **Retrieval**: How many chunks, why, and how they get passed to the model as context

### LangChain (used in: Customer Service Agent)
- Explain the core abstractions before using them: chains, tools, agents, memory
- Show me the tool definition shape and explain each field
- Don't abstract into helper functions until I've seen the raw pattern at least once

### LlamaIndex (used in: Knowledge Base Agent)
- Explain document loaders, node parsers, and index types before using them
- Show me what a query engine actually does under the hood
- Explain the difference between a VectorStoreIndex and a SummaryIndex and when to use each

### Embedding Models
- Explain the choice of model (OpenAI text-embedding-ada-002, or sentence-transformers, etc.)
- Show me what a raw embedding looks like and what cosine similarity means in context
- Flag when the embedding model choice matters vs. when it doesn't

### smolagents (used in: GitHub Monitoring Agent)
- Explain how smolagents differs from LangChain before using it — fewer abstractions, closer to the metal
- Show me the tool decorator pattern and explain each part
- Explain CodeAgent vs ToolCallingAgent and when to use each
- Don't abstract until I've seen the raw pattern once

### Monitoring Agent Scheduling
- Explain how scheduled tool calls work in an agent loop
- Show me the difference between a polling pattern and an event-driven pattern

---

## Deepen Understanding — Explain While Building

I've used these before but want to understand them more deeply. Don't just scaffold — explain what's happening and why. Flag decisions. Let me ask questions before moving on.

### Agent Architecture
- Explain the reasoning behind each layer in a hierarchy (orchestrator → sub-agent → tool)
- When should something be a tool vs a sub-agent? Explain the decision.
- How does the agent decide which tool to call? Show me the reasoning trace.
- Memory patterns: when to use short-term (context window) vs long-term (database)?

### PostgreSQL + pgvector
- Show me the actual SQL for vector similarity search — don't hide it behind an ORM
- Explain index types (ivfflat vs hnsw) and when each matters
- Explain why the embedding dimension has to match at insert and query time
- Show me how to inspect what's actually stored in the vector column

### Claude API Direct Calls
- Show me the raw API call shape before abstracting it
- Explain tool use: how tools are defined, how the model decides to call them, how results get passed back
- Explain streaming: when to use it, what the chunks look like, how to handle them in the UI
- Explain context management: what counts toward the context window, how to stay within limits

### AWS EC2 + nginx
- Walk me through what each nginx directive does — don't just give me a config to copy
- Explain the difference between a reverse proxy and serving static files
- Explain systemd service files: what each line does, how to start/stop/restart
- Show me how to read logs when something breaks

### Python Backend (FastAPI)
- Explain async/await in Python — how it differs from JS, when it matters
- Show me dependency injection in FastAPI before using it
- Explain Pydantic models: why they're useful, not just how to use them
- Show me how Python project structure differs from Node — __init__.py, modules, imports

---

## Python Rule — Read This Before Every Backend Session

**Do not write backend Python for me unless I explicitly ask.**

I am building production Python skills by hand. My default mode is:
1. I write the Python first
2. You review what I wrote — catch bugs, explain why something is wrong, suggest improvements
3. We discuss before you rewrite anything

If I ask you to "just write it," push back once and remind me of this rule. If I ask twice, go ahead — but flag what I should study afterward.

**What "review" looks like:**
- Point out specific lines that are wrong or fragile, and explain why
- Flag non-Pythonic patterns (there's usually a cleaner way)
- Call out missing error handling explicitly
- Note where I'd get bitten in production that I wouldn't catch locally

**The exception:** Boilerplate I genuinely can't learn from (requirements.txt, Dockerfile, systemd service files) — scaffold those freely.

---

## What Claude Code Can Scaffold Without Explanation

Genuinely known territory. Generate these confidently:

- React component structure and TypeScript types
- Vite config, Tailwind setup, folder structure
- Recharts chart implementations
- REST API calls and error handling in the frontend
- Environment variable patterns (.env files)
- htpasswd basic auth setup
- Basic git config and .gitignore

---

## Project Conventions

### Folder Structure
All projects follow this shape:
```
/project-name
  /frontend          # React + TypeScript + Vite
    /src
      /components    # UI components
      /hooks         # Custom hooks
      /lib           # API clients, utilities
      /types         # TypeScript interfaces
  /backend           # Python (FastAPI) or Node
    /agents          # Agent logic lives here
    /tools           # Tool definitions, one file per tool
    /data            # Static data, seed files, CSVs
  .env.example       # Always include this, never commit .env
  CLAUDE.md          # This file, copied to each project root
  README.md          # Architecture overview, how to run locally
```

### Agent Architecture Rules
- One file per tool. Tool definitions are explicit, not auto-generated.
- Agent system prompts live in `/agents/prompts/`. Plain text or markdown, not buried in code.
- Never put business logic inside a prompt. Prompts describe behavior; tools implement logic.
- All tool calls are logged to console in development. No silent failures.

### Code Style
- TypeScript strict mode on
- No `any` types without a comment explaining why
- Async/await over promise chains
- Errors are handled explicitly, never swallowed
- Comments explain *why* not *what* — if the code is clear, skip the comment

### Frontend Rules
- Tailwind for styling, no CSS modules unless layout is genuinely complex
- Recharts for all charts — consistent across projects
- Loading states and error states are required on every data fetch
- No UI component libraries (shadcn etc.) — these projects should look handbuilt
- Mobile-tolerant but not mobile-first — these are dashboard tools

### API / Backend Rules
- FastAPI for Python backends — clean, typed, fast
- All endpoints return consistent shape: `{ data, error, meta }`
- Claude API called directly in the realtor dashboard; via LangChain/LlamaIndex in agent projects
- API keys in .env only, validated on startup, fail loudly if missing

### Git Rules
- Commit after each working feature, not at end of day
- Commit messages: `feat:`, `fix:`, `refactor:`, `docs:` prefixes
- Never commit .env, node_modules, __pycache__, .venv

---

## Scope Rules (Read Before Every Session)

- Ship the demo before adding anything not in the plan
- If a feature takes more than 2 hours, it's either too big or needs to be broken down
- No gold-plating — if it works and looks reasonable, move on
- The agent logic and prompt design are mine to write. Scaffold the wiring, not the brain.

---

## The Five Projects

| Project | Stack | Framework | Status |
|---|---|---|---|
| Portland Realtor Dashboard | React/TS + Python/FastAPI | Scratch (Claude API direct) | Planning |
| Chewy Customer Service Agent | React/TS + Python/FastAPI | LangChain | Planning |
| Wikipedia Knowledge Base Agent | React/TS + Python/FastAPI | LlamaIndex | Planning |
| GitHub Monitoring Agent | React/TS + Python/FastAPI | smolagents | Planning |
| AI Dungeon Master UI | React/TS (frontend only) | Scratch (existing backend) | Existing — add UI |

---

## What a Good Session Looks Like

1. I paste current status or the relevant plan section
2. We agree on what we're building this session — one focused task
3. Claude Code scaffolds the known parts
4. We slow down on the new learning parts — explain first, then implement
5. I tinker, break things, ask questions
6. We commit when the feature works

If I'm going too fast or skipping the learning parts, tell me.
