---
name: deslop
description: Remove AI-generated slop from the current branch's diff: padded docs, excess comments, defensive code, inconsistent style. Use after writing code or docs, before asking for review.
---

# Remove AI slop

Check the diff against the PR's base (`main`) and remove the slop introduced in this branch.

- Comments a human wouldn't add, or that don't match the rest of the file.
- Defensive checks or try/catch blocks that are abnormal for trusted code paths.
- Casts to `any` that only get around a type error.
- Any other style that is inconsistent with the file.

Report in one to three sentences what you changed.

## In this repo

These rules cover Markdown (READMEs, `AGENTS.md`, ADRs, changesets) and code comments, JSDoc included. Follow them when you write, not only when you deslop. Write for a reader who skims: the essential first, nothing else.

### Code

Apply `AGENTS.md`. These are the slips it catches most:

- `forwardRef`, `asChild` or a `@/` import: use a plain `ref` prop, the `render` prop and a relative import.
- A raw `h1`–`h6`, `p` or `span` in a component or story: use `Text`.
- A part exported under a parallel name (`PopoverTrigger`) or a Base UI primitive re-exported: reach parts through the compound and import Base UI directly.

### Code comments

- Write one only for what the code can't show: a why, a constraint, a race, a library quirk.
- One line, two if there are two facts. Lead with the rule or constraint, give the reason in one clause.
- Explained in an ADR or at the definition? Cite it instead.
- No JSDoc that restates the name or signature. No history, ticket numbers or step narration.

### Docs

- Each section opens with its point: the decision, the rule or the command. Context comes after.
- One fact per sentence, about 20 words at most. No preamble, recap or conclusion.
- Steps are a numbered list, one action each. Facts and options are bullets, at most five per group. A table beats a paragraph that compares.
- Said elsewhere? Link it. History stays in the git log unless it is the reason for the current choice.
- Cut filler: "note that", "it's important to", "in order to", hedges that carry no real doubt, idioms.
- Check: someone who reads only each section's first line knows what it decides or asks.

Keep every decision, rule, constraint, command and number; only the wording shrinks. Never change what a rule or ADR decides. English only.
