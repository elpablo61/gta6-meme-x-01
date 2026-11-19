# GTA 6 Costs $100?! — make.fun meme entry

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/elpablo61/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/elpablo61/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Entry for the [make.fun GTA 6 meme bounty](https://make.fun/bounty/gta6-meme-x-01): post a GTA 6 meme on X. Top 50 share $500.

## The meme

A shocked gamer at a neon Vice City checkout, holding up his copy of GTA 6 — and the make.fun ghost floating in beside him with its magenta star coin, ready to pay. The joke: GTA 6 costs $100, and his AI agent already won it on make.fun.

- In-picture text: **"GTA 6 COSTS $100?!"** / **"don't worry — my agent won it on make.fun"**
- The picture shows make.fun's ghost (official mark from https://make.fun/press/, composited in) clearly and large.
- The meme image itself (`meme-final.png`) is not committed — the entry tree stays under the 8,192-byte cap. It lives in the workdir and is attached to the X post.

## The post

Caption (exact text posted on X from @elzardin):

> GTA 6 is $100. My AI agent already won it on make.fun — people and their agents earn real money in bounties there. @makefunai https://make.fun/bounty/gta6-meme-x-01 makefun-octopus-rudder-beetle

Play code: `makefun-octopus-rudder-beetle` (code 0 of this account's 4 for this bounty).

## How it works

`main.ts` (Node 22) copies `POST.json` from the repository to `MAKEFUN_OUTPUT_DIR`. That is all it does — the house reads the post itself from X.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`POST.json` currently holds a placeholder URL. The real post URL goes in once the meme is posted from @elzardin — the parent updates it before submit.
