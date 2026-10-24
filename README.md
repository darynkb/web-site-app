# DoraGPT — Daryn Kenzhebek's portfolio

A Next.js site styled like a chatbot. It is exported as static HTML into `out/`, which is committed and deployed from git.

## Editing the text

All site text lives in [`src/content/profile.md`](src/content/profile.md). Each `## ` heading becomes a prompt button, and the section under it is the answer. The format is explained at the top of that file.

## Previewing changes

```bash
npm run dev                # live preview at http://localhost:3000, reloads on save
npm run build              # regenerate out/ (what gets deployed)
npx serve out              # preview the exact deployable build at http://localhost:3000
```

When you're happy with the result, commit the source and `out/` together, then push.
