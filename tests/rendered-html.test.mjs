import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the current Chinese AI daily report", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.ok(html.includes("<title>AI前沿日报 | 2026.11.17</title>"));
  assert.ok(html.includes("2026年11月17日(星期二)"));
  assert.ok(html.includes("千问4旗舰上线，OpenAI遭加州安全诉讼"));
  for (const section of ["今日概览", "模型脉搏", "脉搏小结", "前沿快讯"]) assert.ok(html.includes(section));
  const visibleHtml = html.slice(0, html.indexOf("</main>"));
  const overview = visibleHtml.slice(visibleHtml.indexOf('aria-labelledby="overview-title"'), visibleHtml.indexOf('aria-label="模型脉搏"'));
  const pulse = visibleHtml.slice(visibleHtml.indexOf('aria-label="模型脉搏"'), visibleHtml.indexOf('aria-labelledby="news-title"'));
  const headlines = ["Qwen4-Max正式发布，百万上下文旗舰开放API", "加州起诉OpenAI，指控智能体测试缺乏充分安全保障", "Hy4 Flash上线，API每百万输入词元0.5元", "百度AI云基础设施季度收入82亿元，同比增长94%", "OpenAI引入四家独立机构，开展内部模型驻场评估", "书生S2.1 Flash开放权重，统一处理十余类科学输入", "DeepSeek开放应用能力API，整合搜索、文件与语音", "Bedrock知识库新增表格搜索，可跨工作表计算后回答", "苹果联合OpenEvidence启动健康AI研究，最多招募20万人", "巴尔：AI投资回报若偏离预期，可能引发显著重估"];
  for (const title of headlines) {
    assert.ok(visibleHtml.includes(title), title);
    assert.ok(!overview.includes(title), "Overview must synthesize instead of repeating headlines");
  }
  for (const title of ["ChatGPT Wallet开始开放，智能体可在用户授权后付款", "openPangu-2.1-Pro上线MaaS，支持512K上下文与工具调用", "Anthropic IPO认购订单据报约为发行量6倍", "GPT-6 Astra参与标准模型候选构造，OpenAI披露物理研究进展", "华为云今日举行CloudRobo-WM1.2世界模型发布活动", "安纳智芯披露AX100流片进展，探索模拟矩阵计算", "llama.cpp与ggml发布1.0版，明确接口兼容规则", "Epoch披露智能体评测越界事件，要求加强隔离与授权", "美政府据报拟指定二十余家AI重点企业，支持海外拓展"]) assert.ok(!visibleHtml.includes(title), "Previously published headlines must not refill today's timeline");
  assert.equal((overview.match(/class="overview-item"/g) ?? []).length, 3);
  for (const phrase of ["旗舰上限与日常成本，国产模型沿两条路线推进", "智能体安全从内部承诺走向外部审视", "AI投入开始同时接受收入与真实任务检验"]) assert.ok(overview.includes(phrase));
  for (const value of ["9.13","2.24","1.88","1.41","1.33","1.24","1.10","+93%","−43%","新上榜","47.74","52.69","26.58","11.16","90.3","72.2","37.1"]) assert.ok(pulse.includes(value), value);
  assert.match(pulse, /完整单日用量前七 · 日环比/);
  assert.match(pulse, /11.16 UTC/);
  assert.match(pulse, /Work360 · Qwen官方工作场景评测/);
  assert.match(pulse, /元 \/ 任务/);
  assert.match(pulse, /HumanRank/);
  assert.match(pulse, /研究团队公布了科学多模态模型的自测结果/);
  assert.match(pulse, /https:\/\/creativecommons.org\/licenses\/by\/4.0\//);
  assert.equal((pulse.match(/<table class="pulse-comparison/g) ?? []).length, 1);
  assert.equal((pulse.match(/class="chart-change"/g) ?? []).length, 7);
  assert.equal((pulse.match(/class="metric-value"/g) ?? []).length, 3);
  assert.equal((pulse.match(/<footer class="source-note">/g) ?? []).length, 3);
  for (const footer of pulse.match(/<footer class="source-note">[\s\S]*?<\/footer>/g) ?? []) assert.doesNotMatch(footer, /<p>/);
  assert.doesNotMatch(pulse, /日变化相对|保密请求排除|流量不能直接推断/);
  assert.match(html, /共 (?:<!-- -->)?10(?:<!-- -->)? 条/);
  const timeline = visibleHtml.slice(visibleHtml.indexOf('class="timeline"'));
  for (let i = 1; i < headlines.length; i++) assert.ok(timeline.indexOf(headlines[i - 1]) < timeline.indexOf(headlines[i]));
  assert.match(visibleHtml, /更新于 13:42/);
  for (const phrase of ["2.4万亿主干参数","每百万输入0.5元","另有五折活动","权重开源仍属后续计划","82亿元","308亿元","相关指控尚待审理","MIT许可","11.13更新","研究数据不用于训练AI模型"]) assert.ok(visibleHtml.includes(phrase), phrase);
  for (const tag of visibleHtml.match(/class="news-tag[^"]*">[^<]*</g) ?? []) assert.match(tag, />[\u4e00-\u9fff]{2}</);
  assert.doesNotMatch(visibleHtml, /中美|贝森特|何立峰|事故通报机制|领导人/);
  assert.doesNotMatch(html, /财联社|科创板日报/);
  assert.doesNotMatch(visibleHtml, /不能直接套用于中国就业市场|美国拟封堵中国企业远程租用先进AI芯片路径|GPT-6.2 Astra/);
  assert.match(html, /导出约1M JPG/);
  assert.match(html, /\/images\/category-label\.svg/);
  assert.match(html, /data-watermark/);
  assert.doesNotMatch(html, /\/images\/images\/|\/api\/design-asset/);
  assert.doesNotMatch(html, /↙|👑|codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("captions flow below titles and source notes stack without overlapping", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.overview-card,\s*\.section-block,\s*\.news-section \{[^}]*padding: 44px 20px 22px;/s);
  assert.match(css, /\.model-pulse-section \{ padding-top: 40px; \}/);
  assert.match(css, /\.overview-card > :not\(\.poster-tab\),/);
  assert.doesNotMatch(css, /\.overview-card > \*\s*,/);
  assert.match(css, /\.section-note \{[^}]*position: relative;[^}]*margin: 0 0 16px;[^}]*text-align: left;/s);
  assert.doesNotMatch(css, /\.section-note \{[^}]*(?:top|right|left):\s*\d/s);
  assert.match(css, /\.source-note \{[^}]*display: block;[^}]*text-align: left;/s);
  assert.match(css, /\.source-note > \* \{[^}]*display: block;[^}]*width: 100%;[^}]*margin: 0;/s);
  assert.match(css, /\.source-note > \* \+ \* \{ margin-top: 4px; \}/);
  assert.match(css, /\.data-card \{[^}]*display: flow-root;[^}]*padding: 20px 0 12px;/s);
  assert.match(css, /\.chart-rank \{[^}]*display: inline-grid;[^}]*place-items: center;[^}]*line-height: 1;[^}]*text-align: center;/s);
  assert.match(css, /\.news-tag \{[^}]*display: inline-flex;[^}]*height: 24px;[^}]*line-height: 1;/s);
  assert.match(css, /\.pulse-summary-head > span \{[^}]*display: inline-flex;[^}]*justify-content: center;[^}]*width: 58px;[^}]*height: 24px;[^}]*line-height: 1;/s);
  assert.match(css, /\.chart-rank\.medal \{[^}]*border-radius: 50%;[^}]*box-shadow:/s);
  assert.match(css, /\.app-shell\.is-exporting \.chart-rank\.medal \{[^}]*color: #fff;[^}]*border-radius: 50%;/s);
  assert.match(css, /\.app-shell\.is-exporting \.chart-rank\.medal-1 \{ background: #f0a51d; \}/);
  assert.match(css, /\.metric-value \{[^}]*display: grid;[^}]*grid-template-columns: minmax\(0, 1fr\);[^}]*overflow: hidden;/s);
  assert.match(css, /\.award-grid strong \{[^}]*font-size: clamp\(22px, 5\.75vw, 26px\);/s);
  assert.match(css, /\.metric-unit \{[^}]*font-size: 10px;[^}]*overflow-wrap: anywhere;/s);
  assert.match(css, /\.news-link:focus-visible \{[^}]*outline-offset: 5px;/s);
  assert.match(css, /\.app-shell\.is-exporting \.news-link \{[^}]*outline: none !important;/s);
  assert.match(css, /\.download-panel \{[^}]*margin: 24px 0 0;[^}]*border-radius: 14px;/s);
  assert.doesNotMatch(css, /\.download-panel \{[^}]*margin:\s*24px\s+-/s);
});

test("JPG export avoids a second table-height calculation and preserves column widths", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  // html-to-image copies used heights. Native table cells may grow a second
  // time in the SVG, pushing the footer across the next article's fixed border.
  assert.match(css, /\.is-exporting \.pulse-comparison tbody \{ display: block; \}/);
  assert.match(css, /\.is-exporting \.pulse-comparison tr \{\s*display: grid;\s*grid-template-columns: 45% 29% 26%;/);
  // Override the more-specific nth-child widths: a percentage on a grid cell
  // would apply a second time and make the header wrap one character per line.
  assert.match(css, /\.is-exporting \.pulse-comparison thead th \{ width: auto; min-width: 0; \}/);
});
