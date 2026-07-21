# BloxBGM 聚焦式 Ahrefs 技术 SEO 审计

- 审计日期：2026-07-21（America/Los_Angeles）
- 仓库：`/Users/jazfox/Documents/bloxbgm`
- 生产站：`https://bloxbgm.com/`
- 审计范围：图片 alt、meta description、redirect chain、软 404，以及直接相关的静态技术 SEO
- 操作边界：仅本地修改和只读线上请求；未提交、未推送、未部署、未更改 Cloudflare 配置；未播放、下载、复制、替换或修改音乐、歌词、音频和第三方封面

## 1. 开始前安全检查

- `pwd`：`/Users/jazfox/Documents/bloxbgm`
- 分支：`main`
- HEAD：`1d826ce2f1c5955dd5b8476d7ad61ebbbdb6100b`
- `origin/main`（执行 `git fetch --prune origin` 后）：`1d826ce2f1c5955dd5b8476d7ad61ebbbdb6100b`
- ahead/behind：`0/0`
- 开始前 `git status --short --untracked-files=all`：
  - `?? reports/gsc-weekly/2026-07-19-bloxbgm.com-gsc-weekly-review.md`
- 上述 GSC 周报及其目录是任务开始前已有的未跟踪内容。本任务未修改、移动、删除、清理或暂存它。
- 项目：Astro 4 静态站，`output: "static"`、`trailingSlash: "always"`，Tailwind 集成，Cloudflare Pages 部署形态。
- 原有 scripts：`dev`、`build`（`astro check && astro build`）、`preview`；没有 lint、test 或独立 typecheck script。
- Cloudflare/路由位置：
  - `astro.config.mjs`
  - `functions/_middleware.js`
  - `public/_redirects`
  - `src/pages/sitemap.xml.ts`
  - `src/pages/robots.txt.ts`
  - `src/layouts/BaseLayout.astro`
  - `src/data/site.ts`、`src/data/playlists.ts`、`src/data/tracks.ts`

## 2. 完整正式页面清单

“入站来源”只统计其他正式可索引页面，不把 404 或页面自链计入。正式页未显式输出 robots 时按默认 `index, follow` 处理。

| URL | 类型 | 线上状态 | 可索引 | sitemap | canonical | robots | Title（长度） | Description 长度（整改后） | H1 | 图片：总数 / 缺 alt / 空 alt | 入站来源 | 音频/嵌入 |
|---|---|---:|---|---|---|---|---|---:|---|---:|---:|---|
| `/` | 首页 | 200 | 是 | 是 | `https://bloxbgm.com` | 默认 | BloxBGM - Roblox Music IDs & Playlists（38） | 120 | BloxBGM | 3 / 0 / 2 | 9 | 无 |
| `/codes/` | 音乐 ID 聚合/筛选页 | 200 | 是 | 是 | 自指 | 默认 | Roblox Music IDs & Boombox Codes - BloxBGM（42） | 138 | Roblox Music IDs & Boombox Codes | 2 / 0 / 2 | 9 | 无 |
| `/how-to-use/` | 使用指南 | 200 | 是 | 是 | 自指 | 默认 | How to Use Roblox Music IDs - BloxBGM（37） | 135 | How to Use Roblox Music IDs | 2 / 0 / 2 | 9 | 无 |
| `/about/` | 信息页 | 200 | 是 | 是 | 自指 | 默认 | About - BloxBGM（15） | 138 | About BloxBGM | 2 / 0 / 2 | 9 | 无 |
| `/contact/` | 联系/信息页 | 200 | 是 | 是 | 自指 | 默认 | Contact - BloxBGM（17） | 148 | Contact BloxBGM | 2 / 0 / 2 | 9 | 无 |
| `/privacy-policy/` | 法务页 | 200 | 是 | 是 | 自指 | 默认 | Privacy Policy - BloxBGM（24） | 135 | Privacy Policy | 2 / 0 / 2 | 9 | 无 |
| `/terms/` | 法务页 | 200 | 是 | 是 | 自指 | 默认 | Terms - BloxBGM（15） | 140 | Terms of Use | 2 / 0 / 2 | 9 | 无 |
| `/playlists/speedrun-phonk/` | Playlist 详情/ID 列表 | 200 | 是 | 是 | 自指 | 默认 | Speedrun Phonk Roblox Music IDs - BloxBGM（41） | 139 | Speedrun Phonk Roblox Music IDs | 2 / 0 / 2 | 9 | 无 |
| `/playlists/pvp-hype/` | Playlist 详情/ID 列表 | 200 | 是 | 是 | 自指 | 默认 | PvP Hype Roblox Music IDs - BloxBGM（35） | 137 | PvP Hype Roblox Music IDs | 2 / 0 / 2 | 1 | 无 |
| `/playlists/chill-building/` | Playlist 详情/ID 列表 | 200 | 是 | 是 | 自指 | 默认 | Chill Building Roblox Music IDs - BloxBGM（41） | 133 | Chill Building Roblox Music IDs | 2 / 0 / 2 | 1 | 无 |
| `/404.html` / 未知路径 | 404 | 404 | 否 | 否 | 无（整改后） | `noindex, follow`（整改后） | Page Not Found - BloxBGM（24） | 36（不按落地页扩写） | Page not found | 2 / 0 / 2 | 0 | 无 |

补充分组：

- sitemap：1 个 XML 资源，10 个唯一 HTTPS apex URL；无 `www`、query、redirect、404 或 noindex URL。
- 参数 URL：`https://www.bloxbgm.com/codes/?ref=audit` 仅用于只读重定向测试；不在 sitemap，不作为独立页面。
- redirect URL：HTTP、`www`、正式页无 trailing slash 版本；均不在 sitemap 或站内 HTML 内链中。
- 静态资源：`/favicon.svg`、`/brand-wave.svg`、构建 CSS；生产抽查的两张 SVG 均 200。
- 音频资源：仓库与生成 HTML 均未发现音频文件、音频 URL、`audio`、`source`、iframe 或第三方播放器。

## 3. Ahrefs 图片 alt 问题复现与分类

当前源码、最新本地构建产物和生产 HTML 都无法复现“缺少 alt 属性”：所有 `<img>` 均存在 `alt`。邮件里的约 10 项应视为旧抓取或把合理空 alt 当作提示，不能据此编造替代文本。

| 实例组 | 页面 | src | 数量（含 404） | 用途/相邻语义 | 当前 alt | 处理策略 |
|---|---|---|---:|---|---|---|
| Header 品牌图标 | 10 个正式页 + 404 | `/favicon.svg` | 11 | 首页链接已有 `aria-label="BloxBGM home"`，并有相邻可见品牌文字 | `alt=""` | 保留空 alt，避免重复朗读 |
| Footer 品牌图标 | 10 个正式页 + 404 | `/favicon.svg` | 11 | 紧邻可见文字 `BloxBGM`，图片不承担额外信息 | `alt=""` | 保留空 alt |
| 首页信息图 | 首页 | `/brand-wave.svg` | 1 | BloxBGM 抽象波形视觉，无重复完整图注 | `BloxBGM waveform visual` | 保留准确简短 alt |

合计 23 个图片实例（正式页 21，404 2）：缺失 alt 为 0，合理空 alt 为 22，信息性 alt 为 1。未发现图片按钮、播放/暂停/音量图标或把 CSS background 当成信息内容的情况。本轮没有为了匹配 Ahrefs 数量而修改正确的空 alt。

## 4. Description 前后对照

首页原 description 为 120 字符，准确且唯一，未修改。其余 9 个正式页存在明显过短或过长问题，均按正文实际内容改为独特文案；没有加入授权、版权、下载、官方关系或更新频率承诺。

| URL | 原文（长度） | 新文（长度） | 正文依据与理由 |
|---|---|---|---|
| `/codes/` | Search BloxBGM's Roblox music ID table by title, genre, mood, status, or audio ID.（82） | Search Roblox music IDs by title, genre, mood, status, or audio ID, then copy a code to test in an experience that supports boombox audio.（138） | 页面实际支持搜索、筛选、复制，并明确要求在支持 boombox 的体验中测试；补足实际功能而非泛化模板 |
| `/how-to-use/` | A concise guide to using Roblox music IDs in boombox, radio, and music-enabled Roblox experiences.（98） | Learn how to copy and test Roblox music IDs in boombox, radio, and music-enabled experiences, plus common reasons an audio ID may fail.（135） | 对应 Basic Steps 与 Why IDs Fail 两个正文区块 |
| `/about/` | BloxBGM separates source-listed candidates from IDs that have been checked in a Roblox boombox environment.（107） | BloxBGM explains how it organizes Roblox music IDs by play style and distinguishes source-listed candidates from IDs checked in a boombox.（138） | 对应两段 About 正文；没有更改首页可见的 data policy 文案 |
| `/contact/` | Contact BloxBGM about audio ID corrections, sources, privacy, or accessibility.（79） | Contact BloxBGM to report music ID corrections, suggest reliable sources, or send privacy and accessibility requests with the relevant page details.（148） | 对应联系原因与提交 page URL/ID/可靠来源的正文 |
| `/privacy-policy/` | BloxBGM privacy policy.（23） | Read how BloxBGM handles accounts, credentials, analytics, advertising data, cookies, device information, and privacy contact requests.（135） | 仅概括页面现有隐私条款；没有新增政策承诺 |
| `/terms/` | BloxBGM terms of use.（21） | Review BloxBGM terms covering music ID accuracy, changing audio availability, acceptable use, Roblox independence, and unauthorized uploads.（140） | 仅概括现有 Accuracy、Acceptable Use 与独立关系声明 |
| `/playlists/speedrun-phonk/` | Fast, punchy tracks for Roblox runs where rhythm helps the route feel sharper. Copy Roblox audio IDs for use this set for obbies, racing rounds, and progression grinds that need momentum.（187） | Browse source-listed Roblox music ID candidates selected for obbies, racing rounds, speedruns, and progression sessions that need momentum.（139） | 对应该 playlist 的 eyebrow、description、useCase 与 candidate 状态；移除语法错误和冗余模板 |
| `/playlists/pvp-hype/` | High-pressure BGM candidates for fighting games, boss attempts, and arena warmups. Copy Roblox audio IDs for best for roblox pvp, fighting, weapon training, and high-stakes challenge servers.（191） | Browse source-listed Roblox music ID candidates for PvP, fighting games, boss attempts, weapon training, and high-pressure arena warmups.（137） | 对应该 playlist 的场景与 candidate 状态；避免与另两页机械替换句式 |
| `/playlists/chill-building/` | Loopable, lower-pressure BGM candidates for long sessions and social Roblox worlds. Copy Roblox audio IDs for use this set for tycoon grinding, building, farming, roleplay, and hangout servers.（193） | Browse source-listed Roblox music ID candidates for building, tycoon, farming, roleplay, hangouts, and other lower-pressure sessions.（133） | 对应该 playlist 的场景与 candidate 状态；去除过长拼接模板 |

整改后 10 个正式页 description 全部存在、全部唯一、长度为 120–148。Title 全部存在、唯一，长度为 15–42；未发现需要扩大为全站 title 重写的真实问题。

## 5. Redirect chain 逐跳证据

| 请求 | 逐跳结果 | 最终 URL | 跳数 | path/query |
|---|---|---|---:|---|
| `http://bloxbgm.com/` | 301 `Location: https://bloxbgm.com/` → 200 | `https://bloxbgm.com/` | 1 | 保留 |
| `https://bloxbgm.com/` | 200 | 同请求 | 0 | 保留 |
| `http://www.bloxbgm.com/` | 301 `https://www.bloxbgm.com/` → 301 `https://bloxbgm.com/` → 200 | `https://bloxbgm.com/` | 2 | 保留；真实 chain |
| `https://www.bloxbgm.com/` | 301 `https://bloxbgm.com/` → 200 | `https://bloxbgm.com/` | 1 | 保留 |
| `https://www.bloxbgm.com/codes/?ref=audit` | 301 `https://bloxbgm.com/codes/?ref=audit` → 200 | 同 Location | 1 | path 与 query 均保留 |
| `https://bloxbgm.com/codes` | 308 `Location: /codes/` → 200 | `https://bloxbgm.com/codes/` | 1 | 正常 trailing slash 规范化 |
| `https://bloxbgm.com/codes/` | 200 | 同请求 | 0 | 正式一级页 |
| `https://bloxbgm.com/playlists/speedrun-phonk/` | 200 | 同请求 | 0 | 正式嵌套页 |
| `https://bloxbgm.com/about.html` | 404 | 同请求 | 0 | Git 历史未发现需要迁移的 `.html` 路径；不重定向首页 |

sitemap 中 10 个 URL 全部直接 200、0 跳。除首页外，对应的 9 个无斜杠变体均是单次 308 到 sitemap URL。未发现循环、canonical/og:url 指向 redirect URL、内链指向 redirect URL，或 redirect 影响静态资源/音频路径。

仓库同时有 `public/_redirects` 和 `functions/_middleware.js` 的 `www`→apex 规则；生产 HTTPS www 只产生一次 301，没有证明两者形成链。HTTP www 的两跳发生在 Cloudflare 的 HTTP→HTTPS 与后续 www→apex 两个边缘阶段，仓库 middleware 无法消除第一跳，因此本轮未做无效或高风险的本地 redirect 修改。

## 6. 软 404 与自定义 404

生产只读结果（整改前线上版本）：

| 路径 | 状态 | 自定义 404 | 线上旧 robots | 线上旧 canonical / og:url |
|---|---:|---|---|---|
| `/this-page-does-not-exist/` | 404 | 是 | 缺失 | 错误指向 `https://bloxbgm.com/404/` |
| `/missing-page` | 404 | 是 | 缺失 | 错误指向 `https://bloxbgm.com/404/` |
| `/missing/nested/path/` | 404 | 是 | 缺失 | 错误指向 `https://bloxbgm.com/404/` |
| `/old-random-audit-page.html` | 404 | 是 | 缺失 | 错误指向 `https://bloxbgm.com/404/` |

结论：生产没有软 404，也没有把未知路径跳首页；真实状态已经是 404。问题是 404 metadata。已在本地修复：

- 保留顶层 `dist/404.html`。
- 输出 `noindex, follow`。
- 不输出 canonical。
- 不输出 `og:url`。
- 不进 sitemap。
- 不自动跳转。
- 增加普通 HTML `Return home` 链接，并保留 Music IDs 链接。

本地 preview 对带斜杠、嵌套和 `.html` 三类未知路径均返回 404 并使用整改后的自定义页。Astro 4 preview 在 `trailingSlash: "always"` 时会对无斜杠未知路径 `/missing-page` 提前返回自己的 404 诊断 HTML；这是 preview server 行为。Cloudflare Pages 生产实测同一路径使用站点自定义 404，因此不据此改 URL 结构或添加未知路径重定向。

## 7. 音频、音乐与版权边界只读检查

- 仓库与构建产物没有音频文件，也没有本地/外部音频 URL、iframe、`audio`、`source` 或第三方播放器；没有播放、暂停、音量控件可审计。
- 没有 broken audio source；本轮也没有播放、下载或保存任何音频。
- 18 条 track 数据全为 `candidate`，各自标明来自第三方 `Roblox Den music codes`，备注要求在 boombox 环境重新确认；本轮没有修改曲名、artist、ID、来源、状态、顺序或播放数据。
- Footer、Contact 和 Terms 明确说明 BloxBGM 是独立参考/粉丝站，不隶属 Roblox、artist、label 或 game developer；未发现网站自称 Roblox 官方。
- 未发现 `copyright-free`、`royalty-free`、当前可下载音乐的公开承诺或歌词全文/大段歌词。
- Contact 接受 ID 更正、来源建议和一般反馈，并说明不托管/出售音乐文件；但没有专门的版权/DMCA/移除请求流程。这是独立遗留项，不在本轮擅自补写法律流程。
- `docs/monetization-plan.md` 与未渲染数据中有未来 downloadable playlist packs 设想，不是当前公开下载功能。本轮未修改该计划，也没有把它写进 metadata。

## 8. 额外技术 SEO 结果

- sitemap：10 个唯一 URL；与 10 个正式可索引页面集合完全一致。
- canonical：10 个正式页全部自指并匹配最终 URL；首页保持无尾斜杠 canonical `https://bloxbgm.com`，请求根路径仍直接 200。
- robots.txt：200，允许抓取并声明 `https://bloxbgm.com/sitemap.xml`。
- sitemap/noindex 冲突：0。
- H1：每个正式页恰好 1 个；404 也有 1 个。
- 重复 title/description：0。
- broken internal links：0。
- 指向 redirect URL 的内链：0。
- indexable orphan pages：0；两个次级 playlist 各由首页进入，其他页面通过共享 Header/Footer 或首页进入。
- 随机未知路径返回首页 200：未发现。
- Open Graph：正式页含 title、description、url、image；404 整改后故意省略错误的 og:url。
- Twitter：存在 `summary_large_image` card；其余字段可回退到 OG。未发现由本轮引起的缺失。
- 社交图：`/brand-wave.svg` 生产 200；SVG 对不同社交 crawler 的预览兼容性可作为后续增强，但不是 404。
- JSON-LD：当前没有 JSON-LD，因此没有不可解析或重复 schema；本轮不为修 Ahrefs 三项而扩大范围。
- 图片/静态资源：生产抽查 `/favicon.svg`、`/brand-wave.svg` 均 200；本地构建引用存在。
- 播放器 ID：没有播放器或播放器 ID。
- 页面脚本：构建无错误；桌面/移动浏览器控制台无 error/warning；TrackTable 搜索筛选正常。

## 9. 本地修改文件

- `package.json`：增加轻量 `seo:audit` script。
- `scripts/seo-audit.mjs`：无第三方依赖的构建产物 SEO 回归检查。
- `src/layouts/BaseLayout.astro`：允许按页输出 robots，并允许 404 省略 canonical/og:url。
- `src/data/playlists.ts`：为三个 playlist 增加独立 `metaDescription`，不改变可见正文和音乐数据。
- `src/pages/playlists/[slug].astro`：使用集中式 playlist meta description。
- `src/pages/codes.astro`
- `src/pages/how-to-use.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/terms.astro`
- `src/pages/404.astro`
- `reports/ahrefs-technical-seo-audit-2026-07-21.md`（本报告；与开始前既有 GSC 周报分开）

没有直接编辑 `dist/`；构建产物由 `npm run build` 重新生成且受 Git 忽略。

## 10. 测试与验证

- `npm run build`：通过。
  - Astro check：25 个文件，0 error，0 warning，1 hint。
  - hint 是任务前已有的 `document.execCommand("copy")` deprecated 提示，不是本轮回归。
  - Astro build：11 个路由成功生成，包括顶层 `/404.html`。
- `npm run seo:audit`：通过。
  - 10 个正式页；10 个 sitemap URL。
  - description 存在、唯一、110–160：通过。
  - canonical、H1、img alt、404 metadata、JSON-LD（如存在）、静态图片、broken internal links、redirecting internal links、orphan、sitemap 对应：通过。
  - broken internal links：0。
  - redirecting internal links：0。
- lint：项目没有 lint script，未运行不存在的命令。
- test：项目没有 test script，未引入测试框架。
- `git diff --check`：通过。

## 11. 视觉与交互验证

使用本地 Astro preview 与浏览器 DOM/截图检查：

- 1440×900：首页、`/codes/`、`/playlists/speedrun-phonk/`、About、Privacy、404。
- 390×844：首页、`/codes/`、`/playlists/speedrun-phonk/`、About、Privacy、404。
- Header/Footer 正常；移动端主导航按现有断点隐藏，品牌与 Search IDs 仍可见。
- 图片全部完成加载；alt 没有显示到正文。
- 新 description 没有显示到正文。
- 桌面与移动页面均无 document 级横向溢出或 Header/Main/Footer 重叠。
- 移动端宽表格只在既有 `.overflow-x-auto` 容器内滚动，没有撑宽页面。
- 搜索框获得焦点时显示青色边框；输入 `Tokyo Drift` 后仅显示对应行，清空后恢复。
- 站点没有播放/暂停/进度/音量控件，因此无此类回归。
- 浏览器控制台 error/warning：0。
- 404 的 `Return home` 可见且点击后成功返回首页。

## 12. 遗留问题与建议

1. **Cloudflare 两跳链**：只有 `http://www.bloxbgm.com/` 为 2 跳，是本轮唯一可复现的 Ahrefs redirect chain 候选。若要消除，需单独授权 Cloudflare Single Redirect；本轮未改线上配置。
2. **建议的 Single Redirect 精确规则**：
   - Match：`http.host eq "www.bloxbgm.com"`（同时覆盖 HTTP 和 HTTPS www）。
   - Dynamic target：`concat("https://bloxbgm.com", http.request.uri.path)`。
   - Status：301。
   - Preserve query string：开启。
   - Priority：放在其他 hostname/scheme redirect 之前，使 HTTP www 直接到 HTTPS apex；保留 Always Use HTTPS，不修改 DNS、SSL 或 HTTPS 强制策略。
   - 发布后必须重新逐跳验证首页、嵌套 path、query、静态资源和循环，再决定是否清理仓库内冗余规则；本轮不做。
3. **版权/来源流程**：没有专门的版权移除/DMCA 页面；track title/artist/ID 当前依赖第三方候选来源。需要站点所有者与法律/内容负责人决定验证和移除流程，不在技术 alt/description 修复中自行推断。
4. **社交预览图格式**：OG SVG 存在且 200；是否另备 raster 分享图是兼容性增强，不是本轮阻断项。
5. **人工决定**：是否授权后续 Cloudflare Single Redirect；是否建立版权移除/来源验证流程。除此之外，本轮本地技术整改不需要人工选择。

## 13. 结论

- 图片 alt：当前版本缺失 0；约 10 项无法按缺失 alt 复现，合理空 alt 不应被关键词文本替换。
- Description：精确复现 9 个问题并全部在本地整改；10 个正式页最终为 120–148 字符且唯一。
- Redirect chain：精确复现 HTTP www 的 2 跳；需要 Cloudflare Single Redirect 才能真正消除，本地 middleware 修改不能解决边缘第一跳。
- 软 404：未发现；生产未知路径已是真 404。本地修复了 404 的 noindex、canonical、og:url 与首页返回链接。
- 本轮已在要求边界内完成，等待确认；未 commit、push、deploy 或操作 GSC/Ahrefs。
