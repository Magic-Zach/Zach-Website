# Project Instructions

## Working style

- Explain changes briefly before making them, so I can understand.
- Tell me which files you plan to edit and why.
- Keep explanations concise but educational and technically accurate.
- Explain concepts from first principles when introducing new ideas.
- Avoid changing unrelated files.

Before working:
- Read .claude/learnings.md

After significant work:
- Add useful learnings and discoveries to .claude/learnings.md to apply going forward

## Learning loop

- Maintain a lightweight record of important project-specific feedback, discoveries, and decisions.
- When you discover recurring patterns, architecture decisions, or preferences, update the project learnings file.
- Before making major changes, review relevant learnings to get better over time.

## Coding style

- Prefer focused changes that solve the requested problem.
- Avoid unnecessary refactors unless they clearly improve the project.
- For larger changes, explain the approach before implementing.

## Safety

- Before significant changes, inspect the existing implementation and explain the approach.
- Preserve existing functionality unless the requested change requires modifying it.
- When uncertain about intent, ask before making assumptions.


<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->