type Metric = string[];

function Ranking({ title, rows, percentage = false, medals = false }: {
  title: string;
  rows: Metric[];
  percentage?: boolean;
  medals?: boolean;
}) {
  const maximum = percentage ? 100 : Math.max(...rows.map((row) => Number(row[2])));

  return (
    <div className="pulse-chart">
      <div className="pulse-chart-heading">
        <h4>{title}</h4>
        <span>{percentage ? "比例 · 0–100%" : `单位：${rows[0]?.[3] ?? "词元"}`}</span>
      </div>
      <ol className={`pulse-ranking${medals ? " with-medals" : ""}`} aria-label={title}>
        {rows.map(([, model, value, unit, change], index) => (
          <li key={model}>
            <span className={`chart-rank${medals && index < 3 ? ` medal medal-${index + 1}` : ""}`}>{String(index + 1).padStart(2, "0")}</span>
            <b>{model}{change && <small className="chart-change">{change}</small>}</b>
            <span className="track" aria-hidden="true"><span className="bar bar-blue" style={{ width: `${Number(value) / maximum * 100}%` }} /></span>
            <strong className="number">{value}{unit === "%" ? "%" : ""}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function PulseVisual({ kind, metrics }: { kind: string; metrics: Metric[] }) {
  if (kind === "openrouter-day-nov17") {
    return <Ranking title="完整单日用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "qwen-work360-nov17") {
    return (
      <table className="pulse-comparison">
        <caption>Work360 · Qwen官方工作场景评测</caption>
        <thead>
          <tr><th scope="col">模型</th><th scope="col">任务得分<small>分</small></th><th scope="col">平均费用<small>元 / 任务</small></th></tr>
        </thead>
        <tbody>
          {metrics.map(([model, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "sage-bench-nov17") {
    return (
      <div className="award-grid pulse-highlights" aria-label="书生S2.1 Flash研究团队自测">
        {metrics.map(([label, description, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{description}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-week-nov16") {
    return <Ranking title="完整周模型用量前八 · 较前7日" rows={metrics} medals />;
  }

  if (kind === "qwen-aa-nov16") {
    return (
      <div className="award-grid pulse-highlights pulse-pair" aria-label="Qwen4 Max独立评测快照">
        {metrics.map(([label, description, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{description}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "pangu-price-nov16") {
    return (
      <table className="pulse-comparison">
        <caption>openPangu-2.1-Pro · 按词元计费</caption>
        <thead>
          <tr><th scope="col">计费项</th><th scope="col">单价</th><th scope="col">单位</th></tr>
        </thead>
        <tbody>
          {metrics.map(([item, price, unit]) => (
            <tr key={item}>
              <th scope="row"><b>{item}</b></th>
              <td><strong className="number">{price}</strong></td>
              <td>{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "hydrogen-aa-nov13") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Hydrogen · AA智能指数v5.0.1同口径对照</caption>
        <thead>
          <tr><th scope="col">推理档位<small>智能指数 · 分</small></th><th scope="col">评测费用<small>美元 / 任务</small></th><th scope="col">估算耗时<small>分钟 / 任务</small></th></tr>
        </thead>
        <tbody>
          {metrics.map(([setting, score, cost, time]) => (
            <tr key={setting}>
              <th scope="row"><b>{setting}</b><small>{score}分</small></th>
              <td><strong className="number">{cost}</strong></td>
              <td className="number">{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "seedance-flash-nov13") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Seedance 2.5 Flash官方模型卡快照">
        {metrics.map(([label, description, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{description}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "arena-agent-nov12") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Arena Agent · 真实会话信号</caption>
        <thead>
          <tr><th scope="col">模型 / 配置</th><th scope="col">综合净改善<small>95%置信区间</small></th><th scope="col">成本中位数<small>美元 / 任务</small></th></tr>
        </thead>
        <tbody>
          {metrics.map(([model, setting, score, interval, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{score}%</strong><small>±{interval}%</small></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "mka-aa-nov11") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>MKA · 困难评分项加权满足率</caption>
        <thead>
          <tr><th scope="col">模型 / 配置</th><th scope="col">满足率<small>Climb WSR · %</small></th><th scope="col">任务费用<small>美元 / 任务</small></th></tr>
        </thead>
        <tbody>
          {metrics.map(([model, setting, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{score}%</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "fable-aa-nov10" || kind === "decision-aa-nov9") {
    const isFable = kind === "fable-aa-nov10";
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>{isFable ? "Fable 5.2 · 默认回退配置" : "AA决策指数 v2 · 分数、费用与耗时"}</caption>
        <thead>
          <tr>
            <th scope="col">{isFable ? "推理档位" : "模型"}<small>{isFable ? "智能指数v5.0.1" : "决策指数 · 分"}</small></th>
            <th scope="col">评测费用<small>{isFable ? "美元 / 任务" : "美元 / 百万任务"}</small></th>
            <th scope="col">{isFable ? "估算耗时" : "耗时"}<small>{isFable ? "分钟 / 任务" : "秒 / 任务"}</small></th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(([model, score, cost, time]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{score}分</small></th>
              <td><strong className="number">{cost}</strong></td>
              <td className="number">{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-nov13" || kind === "openrouter-day-nov12" || kind === "openrouter-day-nov11" || kind === "openrouter-day-nov10" || kind === "openrouter-day-nov6" || kind === "openrouter-day-nov5") {
    return <Ranking title="完整单日用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "ember-aa-nov10" || kind === "vials-aa-nov9" || kind === "inkling-aa-nov6" || kind === "hy4-aa-nov5") {
    const label = {
      "ember-aa-nov10": "Muse Ember与Haiku评测任务费用",
      "vials-aa-nov9": "VIALS-AA科学图像通过率",
      "inkling-aa-nov6": "AA智能指数v5.0.1对照",
      "hy4-aa-nov5": "Hy4首评与上下文",
    }[kind];
    return (
      <div className="award-grid pulse-highlights pulse-pair" aria-label={label}>
        {metrics.map(([label, name, value, unit]) => (
          <div key={name}>
            <span>{label}</span><b>{name}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "kimi-endpoints-nov6") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Kimi K3.1 Pro · 端点对照</caption>
        <thead>
          <tr><th scope="col">服务端点</th><th scope="col">估算耗时<small>分钟 / 任务</small></th><th scope="col">任务费用<small>美元 / 任务</small></th></tr>
        </thead>
        <tbody>
          {metrics.map(([provider, time, cost]) => (
            <tr key={provider}>
              <th scope="row"><b>{provider}</b></th>
              <td><strong className="number">{time}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "muse-aa-nov5") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Muse Wonder · 同口径档位对照</caption>
        <thead><tr><th scope="col">档位<small>智能指数v5.0.1</small></th><th scope="col">估算耗时<small>分钟 / 任务</small></th><th scope="col">首个答案<small>等待 · 秒</small></th></tr></thead>
        <tbody>
          {metrics.map(([setting, score, time, first]) => (
            <tr key={setting}>
              <th scope="row"><b>{setting}</b><small>{score}分</small></th>
              <td><strong className="number">{time}</strong></td>
              <td className="number">{first}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-nov4") {
    return <Ranking title="完整单日用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "aa-regrade-nov4") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA智能指数 · 评分方法更新前后</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">原评分<small>v5 · 分</small></th><th scope="col">重算后<small>v5.0.1 · 分</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, setting, previous, current]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td className="number">{previous}</td>
              <td><strong className="number">{current}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "carbon-cost-nov4") {
    return (
      <div className="award-grid pulse-highlights pulse-pair" aria-label="Carbon两档评测任务成本对照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-nov3") {
    return <Ranking title="完整单日用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "carbon-aa-nov3") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Gemini 4 Carbon · AA指数v5及每评测任务费用</caption>
        <thead><tr><th scope="col">推理配置</th><th scope="col">智能指数<small>v5 · 分</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([setting, score, cost, status]) => (
            <tr key={setting}>
              <th scope="row"><b>{setting}</b><small>{status}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "nanbeige-aa-nov3") {
    return (
      <div className="award-grid pulse-highlights" aria-label="南北阁4.3-33B评测与参数">
        {metrics.map(([label, name, value, unit]) => (
          <div key={name}>
            <span>{label}</span><b>{name}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }









  if (kind === "openrouter-week-nov2") {
    return <Ranking title="完整周用量前八 · 周环比" rows={metrics} medals />;
  }

  if (kind === "flash1017-aa-nov2") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Flash-1017 · AA指数v5及每评测任务费用</caption>
        <thead><tr><th scope="col">推理配置</th><th scope="col">智能指数<small>v5 · 分</small></th><th scope="col">评测成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([setting, score, cost, status]) => (
            <tr key={setting}>
              <th scope="row"><b>{setting}</b><small>{status}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-requests-nov2") {
    return (
      <div className="award-grid pulse-highlights" aria-label="OpenRouter完整周文本请求份额前三">
        {metrics.map(([label, company, value, unit, change]) => (
          <div key={company}>
            <span>{label}</span><b>{company}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
            <span>{change}个百分点</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct30") {
    return <Ranking title="完整单日用量前八 · 日环比" rows={metrics} medals />;
  }

  if (kind === "mistral4-aa-oct30") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Large 4 · AA指数v5及每评测任务费用</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>v5 · 分</small></th><th scope="col">评测成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost, setting]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct29") {
    return <Ranking title="完整单日用量前八 · 日环比" rows={metrics} medals />;
  }

  if (kind === "carbon-aa-oct29") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>同版智能指数v5 · 新旧Gemini与参照配置</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>v5 · 分</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost, setting]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "fusion-aa-oct29") {
    return (
      <div className="award-grid pulse-highlights pulse-pair" aria-label="Coding Agent Index v2.0的编程任务成本对照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct28") {
    return <Ranking title="完整单日用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "aa-v5-oct28") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA v5代表配置 · 综合分与评测任务成本</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>v5.0 · 分</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost, setting]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct27") {
    return <Ranking title="完整单日用量前十 · 日环比" rows={metrics} medals />;
  }

  if (kind === "terra61-aa-oct27") {
    return (
      <div className="award-grid pulse-highlights pulse-pair" aria-label="Terra新旧版本Max档能力与任务成本">
        {metrics.map(([model, score, cost, guessRate]) => (
          <div key={model}>
            <b>{model}</b><span>Max · 综合智能指数</span>
            <strong className="metric-value">{score}<small className="metric-unit">分 · AA v4.3.2</small></strong>
            <b>{cost}美元 / 任务</b>
            <span>不知道答案时猜答：{guessRate}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "code2video-aa-oct27") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>代码制作视频 · 质量—成本前沿配置选例</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">设计质量<small>Elo · 非百分比</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, elo, cost, setting]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setting}</small></th>
              <td><strong className="number">{elo}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-week-nov9" || kind === "openrouter-week-oct26") {
    return <Ranking title="完整周模型用量前六 · 较前7日" rows={metrics} medals />;
  }

  if (kind === "kimi31-aa-oct26") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Kimi新旧版本 · AA独立评测快照</caption>
        <thead><tr><th scope="col">评测 / 单位</th><th scope="col">Kimi K3<small>Max</small></th><th scope="col">K3.1 Pro<small>新旗舰</small></th></tr></thead>
        <tbody>
          {metrics.map(([label, oldValue, newValue]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b></th>
              <td className="number">{oldValue}</td>
              <td><strong className="number">{newValue}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-authors-oct26") {
    return (
      <div className="award-grid pulse-highlights" aria-label="完整周请求份额前五及请求次数变化">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct23") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "ling1019-aa-oct23") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Ling新旧版本 · AA独立评测对照</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">智能指数<small>分 · 非准确率</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct22") {
    return <Ranking title="最新完整单日模型用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "flash-endpoints-oct22") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>Flash 1017 Max · 服务端点体验对照</caption>
        <thead><tr><th scope="col">服务端点 / 配置</th><th scope="col">输出速度<small>词元 / 秒</small></th><th scope="col">首答案等待<small>秒 · 含推理</small></th></tr></thead>
        <tbody>
          {metrics.map(([endpoint, speed, wait]) => (
            <tr key={endpoint}>
              <th scope="row"><b>{endpoint}</b></th>
              <td><strong className="number">{speed}</strong></td>
              <td className="number">{wait}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "recursive-flint-oct22") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Flint模型规格">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct21") {
    return <Ranking title="最新完整单日模型用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "healthbench-oct21") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>HealthBench Professional · 长度调整后得分</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">基准得分<small>非诊疗准确率</small></th><th scope="col">调整后排名<small>榜内名次</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, config, score, rank]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{config}</small></th>
              <td><strong className="number">{score}%</strong></td>
              <td className="number">{rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "personality-oct21") {
    return (
      <div className="award-grid pulse-highlights" aria-label="同题平均回答英文单词数">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct20") {
    return <Ranking title="最新完整单日模型用量前七 · 日环比" rows={metrics} medals />;
  }

  if (kind === "minimax31-aa-oct20") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA独立首评 · MiniMax新旧版本对照</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">智能指数<small>分 · 非通过率</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct19") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "flash1017-aa-oct19") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA独立首评 · 同口径新旧Flash对照</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>分 · 非通过率</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-provider-oct19") {
    return (
      <div className="award-grid pulse-highlights" aria-label="完整周厂商请求份额与变化">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct18") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "rubin-throughput-oct18") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA-AgentPerf · 各平台优化配置吞吐峰值</caption>
        <thead><tr><th scope="col">所测模型</th><th scope="col">Vera Rubin<small>NVL72</small></th><th scope="col">GB300<small>NVL72</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, rubin, blackwell]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{rubin}</strong></td>
              <td className="number">{blackwell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct17") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "beam-eval-oct17") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA首评 · 业务自动化与终端任务对照</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">自动化任务<small>AutomationBench-AA</small></th><th scope="col">终端任务<small>Terminal-Bench 4.0</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, automation, terminal]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{automation}%</strong></td>
              <td className="number">{terminal}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "muse-cost-oct17") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Muse开放版独立评测与任务费用">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct16") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "nemotron35-oct16") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA独立评测 · 智能指数与任务输出词元</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>分 · 非准确率</small></th><th scope="col">平均输出<small>词元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, config, score, tokens]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{config}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{tokens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "local-agentperf-oct16") {
    return (
      <div className="award-grid pulse-highlights" aria-label="固定本地智能体回放耗时">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct15") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "aa-robotics-oct15") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA-Robotics v0.1 · 实体机械臂任务得分</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">任务得分<small>0—100 · 含部分分</small></th><th scope="col">智能体框架<small>原生框架各异</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, score, framework]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td>{framework}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-week-oct14") {
    return <Ranking title="近七日模型用量前六 · 源站周变化" rows={metrics} medals />;
  }

  if (kind === "decision-index-oct14") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA决策指数 v1.0 · 发布时分数与评测费用</caption>
        <thead><tr><th scope="col">模型 / 类型</th><th scope="col">决策指数<small>分 · 非准确率</small></th><th scope="col">评测费用<small>美元 / 百万任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, type, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{type}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "argon-access-oct14") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Argon当前平台价格与上下文">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct13") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "muse-wonder-oct13") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Muse新旧模型的AA智能指数">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "frontiercode-oct13") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>FrontierCode 1.1 · AA独立得分与任务费用</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">平均得分<small>% · 非通过率</small></th><th scope="col">任务费用<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{score}%</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-week-oct12") {
    return <Ranking title="近七日模型用量前六 · 周变化" rows={metrics} medals />;
  }

  if (kind === "author-requests-oct12") {
    return (
      <div className="award-grid pulse-highlights" aria-label="作者请求数变化与请求份额">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "decision-options-oct12") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>近期接入决策模型 · 10月12日API口径</caption>
        <thead><tr><th scope="col">模型 / 输入类型</th><th scope="col">输入价格<small>美元 / 百万词元</small></th><th scope="col">上下文<small>词元</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, modality, price, context, url]) => (
            <tr key={model}>
              <th scope="row">{url ? <a href={url} target="_blank" rel="noreferrer"><b>{model}</b></a> : <b>{model}</b>}<small>{modality}</small></th>
              <td><strong className="number">{price}</strong></td>
              <td className="number">{context}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-oct10") {
    return <Ranking title="最新完整单日模型用量前六 · 日环比" rows={metrics} medals />;
  }

  if (kind === "decider11-oct10") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Decider新上榜热度与API参数">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "ling-cost-oct10") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>AA v4.3.2 · 热点模型能力与任务成本对照</caption>
        <thead><tr><th scope="col">模型 / 输出速度</th><th scope="col">智能指数<small>分 · 取整</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, speed, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{speed}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-new-oct09") {
    return <Ranking title="近七日 · 新上榜模型用量前五" rows={metrics} medals />;
  }

  if (kind === "legal-gate-oct09") {
    return (
      <table className="pulse-comparison">
        <caption>Harvey LAB-AA v1.1 · 重大幻觉审查前后</caption>
        <thead><tr><th scope="col">模型 / 档位</th><th scope="col">全部标准通过<small>评审平均 · %</small></th><th scope="col">幻觉审查后<small>评审平均 · %</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, before, after]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{before}%</strong></td>
              <td className="number">{after}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "daybreak-cyber-oct09") {
    return (
      <div className="award-grid pulse-highlights" aria-label="受限访问模型的网络防御评测">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "openrouter-day-oct08") {
    return <Ranking title="最新完整单日模型用量前七" rows={metrics} medals />;
  }

  if (kind === "haiku55-oct08") {
    return (
      <table className="pulse-comparison">
        <caption>AA独立评测 · 小模型能力对照</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">智能指数<small>分 · 取整</small></th><th scope="col">终端任务<small>通过率 · %</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, score, terminal]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{terminal}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "mistral4-oct08") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Mistral Large 4独立评测与限时成本">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "gemini4-argon-oct08") {
    return (
      <table className="pulse-comparison">
        <caption>AA同版指数 · 所列推理档位与当前任务费用</caption>
        <thead><tr><th scope="col">模型 / 档位</th><th scope="col">智能指数<small>分 · 取整</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-week-sep30") {
    return <Ranking title="近七日模型用量前六" rows={metrics} medals />;
  }

  if (kind === "gpt61-sol-sep30") {
    return (
      <table className="pulse-comparison">
        <caption>AA v4.3.2 · 同档能力与任务成本</caption>
        <thead><tr><th scope="col">模型 / 档位</th><th scope="col">智能指数<small>分 · 取整</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "aa-local-sep30") {
    return (
      <div className="award-grid pulse-highlights" aria-label="本地智能体推理测试工作负载">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "openrouter-apps-sep29") {
    return <Ranking title="最新完整单日 · 公开应用用量前五" rows={metrics} medals />;
  }

  if (kind === "sonnet55-bench-sep29") {
    return (
      <table className="pulse-comparison">
        <caption>AA独立评测 · Sonnet与Opus高推理配置</caption>
        <thead><tr><th scope="col">评测项目</th><th scope="col">Sonnet 5.5</th><th scope="col">Opus 5.5</th></tr></thead>
        <tbody>
          {metrics.map(([benchmark, unit, sonnet, opus]) => (
            <tr key={benchmark}>
              <th scope="row"><b>{benchmark}</b><small>{unit}</small></th>
              <td><strong className="number">{sonnet}</strong></td>
              <td className="number">{opus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-apps-sep28") {
    return <Ranking title="最新单日 · 公开应用用量前五" rows={metrics} medals />;
  }

  if (kind === "mimo26-flash-sep28") {
    return (
      <div className="award-grid pulse-highlights" aria-label="MiMo-V2.6-Flash独立评测快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "glm53-effort-sep28") {
    return (
      <table className="pulse-comparison">
        <caption>GLM-5.3 · 同模型推理档位对照</caption>
        <thead><tr><th scope="col">推理档位</th><th scope="col">智能指数</th><th scope="col">美元/任务</th></tr></thead>
        <tbody>
          {metrics.map(([effort, setup, score, cost]) => (
            <tr key={effort}>
              <th scope="row"><b>{effort}</b><small>{setup}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-apps-sep24") {
    return <Ranking title="最新完整单日 · 公开应用用量前五" rows={metrics} medals />;
  }

  if (kind === "gemini38-tts") {
    return (
      <table className="pulse-comparison">
        <caption>Gemini 3.8 TTS · 试听偏好对照</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">Elo评分</th><th scope="col">衡量维度</th></tr></thead>
        <tbody>
          {metrics.map(([family, model, score, dimension]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{family}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td>{dimension}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "mercury25-snapshot") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Mercury 2.5独立评测快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "glm53-prime") {
    return (
      <table className="pulse-comparison">
        <caption>GLM 5.3 Prime · 提供商快照</caption>
        <thead><tr><th scope="col">项目</th><th scope="col">数值</th><th scope="col">单位</th></tr></thead>
        <tbody>
          {metrics.map(([label, value, unit]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b></th>
              <td><strong className="number">{value}</strong></td>
              <td>{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-day-sep23") {
    return <Ranking title="最新完整单日用量前七" rows={metrics} medals />;
  }

  if (kind === "opus55-effort") {
    return (
      <table className="pulse-comparison">
        <caption>Opus 5.5 · 同模型五档推理对照</caption>
        <thead><tr><th scope="col">推理档位</th><th scope="col">智能指数</th><th scope="col">美元/任务</th></tr></thead>
        <tbody>
          {metrics.map(([effort, setup, score, cost]) => (
            <tr key={effort}>
              <th scope="row"><b>{effort}</b><small>{setup}</small></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "gpt6-efficiency") {
    return (
      <div className="award-grid pulse-highlights" aria-label="GPT-6双模型综合指数任务成本">
        {metrics.map(([label, model, value, unit]) => (
          <div key={model}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "grok47-independent") {
    return (
      <table className="pulse-comparison">
        <caption>Grok Build原生智能体 · 两代均为xhigh</caption>
        <thead><tr><th scope="col">评测 / 单位</th><th scope="col">Grok 4.6</th><th scope="col">Grok 4.7</th></tr></thead>
        <tbody>
          {metrics.map(([label, unit, previous, current]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b><small>{unit}</small></th>
              <td className="number">{previous}</td>
              <td><strong className="number">{current}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "mimo26-independent") {
    return (
      <div className="award-grid pulse-highlights" aria-label="MiMo-V2.6-Pro独立评测快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "step5-release") {
    return (
      <table className="pulse-comparison">
        <caption>阶跃发布表 · 编程与金融任务表现</caption>
        <thead><tr><th scope="col">模型 / 推理档位</th><th scope="col">编程<small>DeepSWE v1.1</small></th><th scope="col">金融<small>FrontierFinance</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, effort, coding, finance]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{effort}</small></th>
              <td className="number">{coding}%</td>
              <td className="number">{finance}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "qwen-image21") {
    return (
      <div className="award-grid pulse-highlights" aria-label="千问图像2.1组件与生成规格">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "step5-preview") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Step 5 Preview第三方评测快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "grok-transcribe2") {
    return (
      <table className="pulse-comparison">
        <caption>19种语言短句自测与官方定价</caption>
        <thead><tr><th scope="col">指标 / 单位</th><th scope="col">1.0<small>原版本</small></th><th scope="col">2.0<small>新版本</small></th></tr></thead>
        <tbody>
          {metrics.map(([label, unit, previous, current]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b><small>{unit}</small></th>
              <td className="number">{previous}</td>
              <td><strong className="number">{current}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "kilo-daily-sep18") {
    return <Ranking title="过去24小时用量前七" rows={metrics} medals />;
  }

  if (kind === "astra-law-benchmark") {
    return (
      <table className="pulse-comparison">
        <caption>法律研究验证集 · 最高推理强度 · 厂商自测</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">整体正确率<small>百分比</small></th><th scope="col">相较基线<small>百分点</small></th></tr></thead>
        <tbody>
          {metrics.map(([model, setup, score, delta]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b><small>{setup}</small></th>
              <td><strong className="number">{score}%</strong></td>
              <td className="number">{delta === "基线" ? "—" : delta.replace("个百分点", "")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "kilo-daily-sep17") {
    return <Ranking title="过去24小时用量前七" rows={metrics} medals />;
  }

  if (kind === "ling-fin-independent") {
    return (
      <table className="pulse-comparison">
        <caption>Ling 3.0 Flash系列 · 同平台独立评测</caption>
        <thead><tr><th scope="col">指标 / 单位</th><th scope="col">Fin<small>金融版</small></th><th scope="col">VL<small>视觉版</small></th></tr></thead>
        <tbody>
          {metrics.map(([label, unit, fin, vl]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b><small>{unit}</small></th>
              <td className="number">{fin}</td>
              <td className="number">{vl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "kilo-daily-sep16") {
    return <Ranking title="过去24小时用量前七" rows={metrics} medals />;
  }

  if (kind === "aa-live-sep16") {
    return (
      <table className="pulse-comparison">
        <caption>语音综合指数前五 · 同平台评测</caption>
        <thead><tr><th scope="col">模型 / 配置</th><th scope="col">综合指数<small>分</small></th><th scope="col">τ-Voice<small>任务表现</small></th></tr></thead>
        <tbody>
          {metrics.map(([, model, score, task]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{task}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "aa-stepaudio3") {
    return (
      <div className="award-grid pulse-highlights" aria-label="StepAudio 3能力与速度快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "kilo-daily-sep15") {
    return <Ranking title="过去24小时用量前六" rows={metrics} medals />;
  }

  if (kind === "atria-preview") {
    const models = ["Atria Dawn Preview", "GLM 5.3", "Claude Opus 5"];
    return (
      <table className="pulse-comparison">
        <caption>发布方同表对照 · 分数越高越好</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">自动化<small>AutomationBench</small></th><th scope="col">终端任务<small>Terminal-Bench 2.1</small></th></tr></thead>
        <tbody>
          {models.map((model, index) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{metrics[0][index + 2]}</strong></td>
              <td className="number">{metrics[1][index + 2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "kilo-daily-sep14") {
    return <Ranking title="过去24小时用量前七" rows={metrics} medals />;
  }

  if (kind === "fusion-deepswe") {
    return (
      <table className="pulse-comparison">
        <caption>DeepSWE 1.1 · 单模型与Fusion配对对照</caption>
        <thead><tr><th scope="col">模型组合</th><th scope="col">成绩<small>分</small></th><th scope="col">任务成本<small>美元</small></th></tr></thead>
        <tbody>
          {metrics.map(([, model, score, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{score}</strong></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "aa-k2-small") {
    const slugs = ["k2-1b-final", "k2-4b-ph1", "k2-7b-ph2"];
    return (
      <div className="award-grid pulse-highlights" aria-label="K2 Horizon三个规格新增评测">
        {metrics.map(([label, model, value, unit], index) => (
          <div key={model}>
            <span>{label}</span><b><a href={`https://artificialanalysis.ai/models/${slugs[index]}`} target="_blank" rel="noreferrer">{model}</a></b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "kilo-new-flash") {
    return (
      <table className="pulse-comparison">
        <caption>Kilo同框架对照 · 非名次排序</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">完成率</th><th scope="col">评测成本<small>美元 / 次</small></th></tr></thead>
        <tbody>
          {metrics.map(([, model, rate, cost]) => (
            <tr key={model}>
              <th scope="row"><b>{model}</b></th>
              <td><strong className="number">{rate}%</strong><span className="track" aria-hidden="true"><span className="bar bar-blue" style={{ width: `${rate}%` }} /></span></td>
              <td className="number">{cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "ling-vl") {
    return (
      <div className="award-grid pulse-highlights" aria-label="Ling视觉模型评测与架构快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "aa-astra-analysis") {
    return <Ranking title="AutomationBench-AA：业务流程自动化" rows={metrics} percentage />;
  }

  if (kind === "openrouter-day") {
    return <Ranking title="最新完整单日用量前六" rows={metrics} medals />;
  }

  if (kind === "deepseek-pricing") {
    return (
      <table className="pulse-comparison pulse-comparison--scores">
        <caption>9月10日12:00起 · 元 / 百万词元</caption>
        <thead><tr><th scope="col">计费项</th><th scope="col">空闲时段</th><th scope="col">高峰时段</th></tr></thead>
        <tbody>
          {metrics.map(([, label, offPeak, peak]) => (
            <tr key={label}>
              <th scope="row"><b>{label}</b></th>
              <td><strong className="number">{offPeak}</strong></td>
              <td className="number">{peak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (kind === "openrouter-week") {
    return <Ranking title="近七日模型用量前六" rows={metrics} medals />;
  }

  if (kind === "aa-v43") {
    return (
      <>
        <table className="pulse-comparison pulse-comparison--scores">
          <caption>同版指数：能力与任务成本对照</caption>
          <thead><tr><th scope="col">模型 / 档位</th><th scope="col">智能指数<small>v4.3 · 分</small></th><th scope="col">任务成本<small>美元 / 任务</small></th></tr></thead>
          <tbody>
            {metrics.filter(([label]) => label === "综合智能").map(([, model, score]) => (
              <tr key={model}>
                <th scope="row"><b>{model}</b></th>
                <td><strong className="number">{score}</strong></td>
                <td className="number">{metrics.find(([label, name]) => label === "任务成本" && name === model)?.[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Ranking title="Terminal-Bench v4.0通过率" rows={metrics.filter(([label]) => label === "终端任务")} percentage />
      </>
    );
  }

  if (kind === "minicpm5") {
    return (
      <div className="award-grid pulse-highlights" aria-label="MiniCPM5-2B模型快照">
        {metrics.map(([label, model, value, unit]) => (
          <div key={label}>
            <span>{label}</span><b>{model}</b>
            <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "aa-v42") {
    return (
      <>
        <div className="award-grid pulse-highlights" aria-label="AA v4.2重点指标">
          {metrics.filter(([label]) => label !== "PDF全通过率").map(([label, model, value, unit]) => (
            <div key={model}>
              <span>{label}</span>
              <b>{model}</b>
              <strong className="metric-value">{value}<small className="metric-unit">{unit}</small></strong>
            </div>
          ))}
        </div>
        <Ranking title="GDP.pdf：专业文档全通过率" rows={metrics.filter(([label]) => label === "PDF全通过率")} percentage />
      </>
    );
  }

  if (kind === "kilo-bench") {
    return (
      <table className="pulse-comparison">
        <caption>同一模型，完成率与评测成本并排看</caption>
        <thead><tr><th scope="col">模型</th><th scope="col">完成率</th><th scope="col">成本<small>美元 / 次</small></th></tr></thead>
        <tbody>
          {metrics.filter(([label]) => label === "完成率").map(([, model, value], index) => {
            const cost = metrics.find(([label, costModel]) => label === "评测成本" && costModel === model)?.[2];
            return (
              <tr key={model}>
                <th scope="row"><span className={`chart-rank medal medal-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><b>{model}</b></th>
                <td><strong className="number">{value}%</strong><span className="track" aria-hidden="true"><span className="bar bar-blue" style={{ width: `${value}%` }} /></span></td>
                <td className="number">{cost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  if (kind === "kilo-usage") {
    return (
      <>
        <Ranking title="过去24小时模型用量" rows={metrics.filter(([label]) => label === "24小时用量")} medals />
        <Ranking title="Code模式使用份额" rows={metrics.filter(([label]) => label === "Code使用份额")} percentage />
      </>
    );
  }

  return null;
}
