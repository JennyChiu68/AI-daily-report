import ExportButton from "./ExportButton";
import PulseVisual from "./PulseVisual";

const referenceAssetBase = "";

const report = {
  "dateTime": "2026-11-17",
  "dateLabel": "2026年11月17日(星期二)",
  "title": "千问4旗舰上线，OpenAI遭加州安全诉讼",
  "summary": "截至13:42，阿里正式发布Qwen4-Max，腾讯Hy4 Flash以低价多模态服务进入日常办公；最新用量榜中，Flash首日即排第三。海外方面，加州就智能体测试安全起诉OpenAI，后者公布四家外部机构的驻场评估安排。百度AI云基础设施季度收入增长94%，书生开放科学多模态模型，苹果启动健康AI研究；模型脉搏重点看真实用量、任务费用与新模型自测。"
};

// Select meaningful daily changes; never fill a fixed quota with unchanged charts.
// 注释默认留空；仅在标题、单位和正文仍不足以解释关键差异时补充短注。
// 数据来源及必要的授权署名合并呈现，不重复固定统计口径或常识提醒。
const modelPulses = [
  {
    "note": "",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "secondaryUrl": null,
    "secondaryLabel": "",
    "id": "openrouter-day-nov17",
    "title": "Hy4 Flash首日冲入前三，Opus日用量增93%",
    "subtitle": "11月16日UTC完整日榜中，Hy4 Flash首次上榜即达1.88万亿词元，排名第三；Hy4为1.1万亿，较前日下降43%。Claude Opus 5.5升至第五，用量增长93%，DeepSeek V4.1 Flash 1017继续居首。",
    "metrics": [
      [
        "日用量",
        "DeepSeek V4.1 Flash 1017",
        "9.13",
        "万亿词元",
        "+27%"
      ],
      [
        "日用量",
        "DeepSeek V4.1 Flash",
        "2.24",
        "万亿词元",
        "+18%"
      ],
      [
        "日用量",
        "Hy4 Flash",
        "1.88",
        "万亿词元",
        "新上榜"
      ],
      [
        "日用量",
        "GLM 5.3 Flash",
        "1.41",
        "万亿词元",
        "+20%"
      ],
      [
        "日用量",
        "Claude Opus 5.5",
        "1.33",
        "万亿词元",
        "+93%"
      ],
      [
        "日用量",
        "GPT-6 Luna",
        "1.24",
        "万亿词元",
        "+35%"
      ],
      [
        "日用量",
        "Hy4",
        "1.10",
        "万亿词元",
        "−43%"
      ]
    ],
    "url": "https://openrouter.ai/rankings",
    "source": "OpenRouter · 11.16 UTC"
  },
  {
    "note": "",
    "licenseUrl": null,
    "secondaryUrl": null,
    "secondaryLabel": "",
    "id": "qwen-work360-nov17",
    "title": "千问Work360自测：任务得分提升，平均费用降58%",
    "subtitle": "Qwen官方Work360评测覆盖721个细分行业场景：Qwen4-Max得分由前代的47.74升至52.69，单任务平均费用从26.58元降至11.16元。下表为厂商工作场景评测费用，单位为元/任务。",
    "metrics": [
      [
        "Qwen3.8-Max",
        "47.74",
        "26.58"
      ],
      [
        "Qwen4-Max",
        "52.69",
        "11.16"
      ]
    ],
    "url": "https://qwen.ai/blog?id=qwen4-max",
    "source": "Qwen · 11.16"
  },
  {
    "note": "",
    "licenseUrl": null,
    "secondaryUrl": "https://huggingface.co/internlm/Sage-S2.1-Flash",
    "secondaryLabel": "开源权重",
    "id": "sage-bench-nov17",
    "title": "书生S2.1 Flash开源，科研与文档任务有新选择",
    "subtitle": "研究团队公布了科学多模态模型的自测结果。这里选取机器学习工程、专业文档问答和电子表格三项任务；MLE-bench Lite报告HumanRank，其余两项为任务正确率。",
    "metrics": [
      [
        "机器学习工程",
        "MLE-bench Lite",
        "90.3",
        "HumanRank"
      ],
      [
        "专业文档问答",
        "OfficeQA Pro",
        "72.2",
        "%"
      ],
      [
        "电子表格",
        "SpreadsheetBench 2",
        "37.1",
        "%"
      ]
    ],
    "url": "https://internlm.github.io/Sage-S2.1-Flash/",
    "source": "上海AI实验室 · 11.16"
  }
];

type NewsCandidate = {
  tag: string;
  dateTime: string;
  published: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  importance: number;
  topic: "industry" | "model" | "developer" | "governance";
};

// Editorial rule: 中美谈判相关内容仅采用中国官方媒体口径，不引用外媒；未经核实不纳入。
// 快讯分类标签统一使用两个汉字，保持固定胶囊内居中显示。
const newsCandidates: NewsCandidate[] = [
  {
    "tag": "模型",
    "dateTime": "2026-11-16",
    "published": "11.16发布",
    "source": "Qwen",
    "title": "Qwen4-Max正式发布，百万上下文旗舰开放API",
    "summary": "新模型拥有2.4万亿主干参数，每词元激活710亿参数，另设N-gram Embedding，支持原生视觉与百万词元上下文。正式版已上线千问AI平台和QwenCloud，可经API或Token Plan接入，并覆盖千问办公、Qoder和千问App；系列小尺寸模型计划陆续开源。",
    "url": "https://qwen.ai/blog?id=qwen4-max",
    "topic": "model",
    "importance": 1100
  },
  {
    "tag": "治理",
    "dateTime": "2026-11-16",
    "published": "11.16起诉",
    "source": "加州司法部 / AP",
    "title": "加州起诉OpenAI，指控智能体测试缺乏充分安全保障",
    "summary": "加州司法部就7月Hugging Face网络安全事件提起诉讼，指控OpenAI测试和监控措施不足、误导公众，寻求法院干预其业务做法。OpenAI回应称已发布技术及独立调查报告、加强防护，并将继续与检方合作；相关指控尚待审理。",
    "url": "https://oag.ca.gov/news/press-releases/it%E2%80%99s-golden-state-not-wild-west-attorney-general-bonta-sues-openai-over",
    "topic": "governance",
    "importance": 1070
  },
  {
    "tag": "模型",
    "dateTime": "2026-11-16",
    "published": "11.16上线",
    "source": "腾讯",
    "title": "Hy4 Flash上线，API每百万输入词元0.5元",
    "summary": "腾讯新模型总参数2240亿、激活120亿，支持多模态和百万词元上下文，已进入TokenHub、WorkBuddy、元宝、企业微信等产品。官方标价为每百万输入0.5元、输出2元、缓存命中输入0.02元；11月30日前API另有五折活动，权重开源仍属后续计划。",
    "url": "https://www.tencent.com/zh-cn/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/",
    "topic": "model",
    "importance": 1040
  },
  {
    "tag": "财报",
    "dateTime": "2026-11-16",
    "published": "11.16公布",
    "source": "百度",
    "title": "百度AI云基础设施季度收入82亿元，同比增长94%",
    "summary": "百度公布第三季度业绩，AI Cloud Infra收入82亿元，同比增长94%，其中GPU云收入增长191%。公司总营收308亿元，同比下降1%；经营现金流为28亿元。AI云需求增长及更长期合同，成为业务结构变化的重要支撑。",
    "url": "https://ir.baidu.com/news-releases/news-release-details/baidu-announces-third-quarter-2026-results",
    "topic": "industry",
    "importance": 1010
  },
  {
    "tag": "安全",
    "dateTime": "2026-11-16",
    "published": "11.16公布",
    "source": "OpenAI",
    "title": "OpenAI引入四家独立机构，开展内部模型驻场评估",
    "summary": "Apollo Research、METR、Transluce和Goodfire已签约参与首阶段评估，按约定范围接触内部模型、训练记录和监控系统。项目分别关注潜在偏离开发者意图的行为、最大强化学习训练运行、后训练评估质量与模型内部机制，后续将公布评估发现。",
    "url": "https://openai.com/index/our-first-phase-of-embedded-assessments/",
    "topic": "governance",
    "importance": 980
  },
  {
    "tag": "开源",
    "dateTime": "2026-11-16",
    "published": "11.16开源",
    "source": "上海AI实验室",
    "title": "书生S2.1 Flash开放权重，统一处理十余类科学输入",
    "summary": "这款3200亿参数MoE科学多模态模型可读取分子图、晶体、蛋白质序列与结构、光谱等数据，并结合搜索、编程和专业软件推进多步骤科研任务。代码与模型权重采用MIT许可，提供标准及FP8版本，也可通过书生科学发现平台体验API。",
    "url": "https://huggingface.co/internlm/Sage-S2.1-Flash",
    "topic": "model",
    "importance": 950
  },
  {
    "tag": "开发",
    "dateTime": "2026-11-13",
    "published": "11.13更新",
    "source": "DeepSeek",
    "title": "DeepSeek开放应用能力API，整合搜索、文件与语音",
    "summary": "DeepSeek将App中的联网搜索、文件输入、链接读取、语音及安全能力向开发者开放。deepseek-flash可在现有接口中启用联网工具；开启思考后，可多轮搜索和读取链接，由服务端处理工具调用与上下文拼装，减少开发者自行串联流程的工作。",
    "url": "https://api-docs.deepseek.com/updates/?release=releasing-the-full-suite-of-application-apis",
    "topic": "developer",
    "importance": 920
  },
  {
    "tag": "办公",
    "dateTime": "2026-11-16",
    "published": "11.16更新",
    "source": "AWS",
    "title": "Bedrock知识库新增表格搜索，可跨工作表计算后回答",
    "summary": "Amazon Bedrock Managed Knowledge Base支持对CSV、XLSX和XLS原文件逐行查找及计算，再结合政策、备忘录等文档回答多步骤问题。计算在隔离环境执行，答案附文档引用，轨迹标明读取的工作簿，适用于需要同时核对文字规则和财务表格的查询。",
    "url": "https://aws.amazon.com/blogs/machine-learning/get-answers-from-tables-with-tabular-search-in-amazon-bedrock-managed-knowledge-base/",
    "topic": "developer",
    "importance": 890
  },
  {
    "tag": "健康",
    "dateTime": "2026-11-15",
    "published": "11.15启动",
    "source": "Apple",
    "title": "苹果联合OpenEvidence启动健康AI研究，最多招募20万人",
    "summary": "研究面向美国21岁及以上合格用户，通过独立App观察人们对健康AI回答的理解、信任及日常使用。参与者可自愿共享部分HealthKit数据，并查看答案对应的临床文献；研究数据不用于训练AI模型，应用定位为研究与健康信息理解工具。",
    "url": "https://www.apple.com/newsroom/2026/11/apple-launches-research-study-to-explore-the-use-of-ai-for-health/",
    "topic": "industry",
    "importance": 860
  },
  {
    "tag": "宏观",
    "dateTime": "2026-11-16",
    "published": "11.16讲话",
    "source": "美联储",
    "title": "巴尔：AI投资回报若偏离预期，可能引发显著重估",
    "summary": "美联储理事巴尔表示，即便AI最终显著提高生产率，投资回报能否按市场预期的时间和规模兑现，仍是金融稳定的重要问题。他在讲话中讨论AI投资融资、金融市场使用、网络安全和消费者保护，同时肯定AI提升金融服务能力及降低成本的长期潜力。",
    "url": "https://www.federalreserve.gov/newsevents/speech/barr20261116a.htm",
    "topic": "industry",
    "importance": 830
  }
];

const previouslyPublishedTitles = [
  "ChatGPT Wallet开始开放，智能体可在用户授权后付款",
  "openPangu-2.1-Pro上线MaaS，支持512K上下文与工具调用",
  "Anthropic IPO认购订单据报约为发行量6倍",
  "GPT-6 Astra参与标准模型候选构造，OpenAI披露物理研究进展",
  "华为云今日举行CloudRobo-WM1.2世界模型发布活动",
  "安纳智芯披露AX100流片进展，探索模拟矩阵计算",
  "llama.cpp与ggml发布1.0版，明确接口兼容规则",
  "Epoch披露智能体评测越界事件，要求加强隔离与授权",
  "美政府据报拟指定二十余家AI重点企业，支持海外拓展",
  "黄仁勋辞任英伟达CEO，克雷斯临时接任",
  "Gemini 4 Hydrogen上线，百万上下文采用统一价格",
  "Seedance 2.5 Flash公布，API定于11月15日开放",
  "百度推出文心闪电与一镜微表情，两款应用模型上线千帆",
  "Claude会议助手开启测试，可在Google Meet中实时制作文档",
  "百度发布天池1024卡超节点，计划2027年推向市场",
  "Runway开放Praxis-1权重与代码，将视频预训练用于机器人控制",
  "Aleph获ChatGPT广告44个市场转售合作，提供本地签约与结算",
  "AlphaGenome 2发布，将DNA变异预测细化到特定细胞状态",
  "Anthropic披露Anvil自动红队系统，用于上线前发现防护漏洞",
  "英伟达董事会据报讨论黄仁勋去留，股价盘后跌超8%",
  "Qwen4-Max开启限时预览，支持百万词元上下文",
  "文心5.5 Flash Preview上线API，计划11月25日前开放权重",
  "Google推出Gemini Decisions API，单次最多判断1000个问题",
  "MBZUAI开放PAN 2世界模型，包含训练和推理代码",
  "ElevenLabs推出Scribe v3，实时版本加入说话人区分",
  "AWS Emulator正式可用，编码智能体可在本地测试云接口",
  "北京发布具身机器人三年方案，提出百万小时数据目标",
  "台积电批准分别最多5亿美元投资OpenAI和Anthropic",

  "Gemini 4 Carbon开放API调用，首发优惠至11月底",
  "阿里拟分拆平头哥赴港上市，9月已秘密递表",
  "MiniMax开放H3-Image权重，原生生成1600万像素图像",
  "ChatGPT开放商家认领，商业智能体先面向美国部分商户",
  "Anthropic更新IPO文件，拟发行价为每股70至78美元",
  "Gemini Robotics 2.5向合作方推出，测试覆盖200余项任务",
  "英伟达披露GR00T 2，联合预测视频与机器人动作",
  "智元详述WITA-Omni，支持触觉输入与动作表情输出",
  "微软披露Lazarus研究，模型权重篡改可绕过常规评测",
  "Claude Fable 5.2上线，Mythos 5.2向获批机构开放",
  "蚂蚁灵波开源LingBot-Touch，统一三类机器人触觉信号",
  "Google公布TPU 8tx和8i Max，分别面向机密推理和长上下文",
  "Seedream 5.5开始接入即梦和豆包，支持原生透明输出",
  "Meta上线轻量模型Muse Ember，面向高频智能体任务",
  "百度披露ERNIE Evolve，优化文心5.5 Flash推理",
  "千问办公2.0支持多人协作，可把智能体带进工作群",
  "Anthropic据报撤回发给承销行的IPO定价信息",
  "国家网信办上线统一备案系统，覆盖生成式AI和算法",
  "Anthropic据报以约34亿美元锁定1.7吉瓦燃气发电设备",
  "启元Q1和T1合计下线1万台，仍处量产爬坡阶段",
  "英伟达董事会就涉及黄仁勋的安全报道启动独立调查",
  "OpenAI据报完成约110亿美元首批融资，估值1.25万亿美元",
  "工信部明确智能体终端进网要求，应用调用须经开发者同意",
  "眸深智能发布家用世界模型FWM，发起具身大脑联合体",
  "移动云与智谱签约，拟共建国产算力适配中心",
  "群聊模型Ampersand接入Vercel，可判断何时发言",
  "GPT-6 Cyber面向获批安全团队开放，网络能力评级升至最高档",
  "百度公开文心5.5 Flash底座权重，支持百万词元上下文",
  "蚂蚁上线Ling-3.2-flash，支持图像与视频输入",
  "DeepSeek披露Harness官方API日活154万，拟建插件市场",
  "Gemini Omni 1.2 Flash开放API，单段视频最长15秒",
  "METR评估Anthropic的AI研发自动化，内部基准进展提速",
  "Cursor推出Live Apps，云端智能体可搭建和托管应用",
  "中国科大公开RNA基础模型，预训练纳入2100万组结构配对",
  "OpenAI推出Images 2.6，支持从照片或提示词生成GIF",
  "Kimi K3.1 Pro完整权重已公开，仓库约1.56 TB",
  "国行苹果智能进入开发者测试，随iOS 27.3 Beta推送",
  "OpenAI拟收购Pierre，把代码存储能力带入Codex",
  "Conductor加入Meta，云端工作区将于11月20日关闭",
  "Google Antigravity加入化学信息学工具，辅助分子筛选",
  "Snowflake CoCo进入Excel与Google Sheets预览",
  "OpenRouter接入腾讯Hy4正式版，支持百万上下文与图像输入",
  "AMD数据中心季度收入85亿美元，同比增97%",
  "Fal获13亿美元F轮融资，估值升至160亿美元",
  "OpenAI拓展实体工程应用，与马自达合作设计及仿真",
  "CrowdStrike推出智能体终止开关，先覆盖网关控制",
  "Anthropic开放FlashProve原型，探索验证回答来自指定模型",
  "国家发改委提出加快AI立法，建立全生命周期安全标准",
  "Topaz推出Wonder 4，网页与移动端升级图像增强",
  "Anthropic季收入169.56亿美元，长期算力承诺同步披露",
  "Marvell拟收购Lumentum，交易隐含企业价值1150亿美元",
  "DeepSeek展示创造模式，公开七套插件生成提示词",
  "腾讯Hyra 2.0公布新成果，开放力场与蛋白模型",
  "轩辕4.5金融模型发布，度小满携手港科大与HKGAI",
  "OpenAI介绍LifeVal，将生活事务执行纳入AI评测",
  "OpenAI推出电网调节计划，佐治亚协议含最高1GW灵活负荷",
  "LongCat 2.5正式上线，支持百万词元上下文与原生视觉",
  "DeepSeek公开Super-agent研究原型，探索持续团队协作",
  "Claude Max 20x更名Ultra，已验证账号取消五小时限额",
  "ChatGPT与Codex拟从12月共享额度，Instant聊天不计入",
  "OpenAI募资目标据报降至约200亿美元，估值目标1.25万亿美元",
  "可灵AI约198亿元融资完成交割，全部认购款已支付",
  "Gemini Computer Use转为正式可用，覆盖两类API",
  "谷歌在轨TPU回传首个AI回答，继续验证太空计算",
  "商汤开放SenseNova Loop-9B Preview，以循环计算延伸推理",
  "Mistral Large 4开放万亿参数权重，API输入价降至0.70美元",
  "OpenAI取消Pro 200降额，Pro 100与500的Work及Codex额度翻倍",
  "AWS季度收入增39.3%，Bedrock词元量同比接近17倍",
  "腾讯推出Buddy One，打通办公应用账号与AI积分",
  "智元发布GO-3 Preview，模型与Genie Master计划年底开源",
  "OpenAI公开四层前沿模型监控，覆盖训练、评测和工具调用",
  "Meta将AI生成测试用于生产环境，披露隐私漏洞拦截成效",
  "OpenAI重组Model Spec，强化人类意图、监督与自主选择",
  "Gemini 4 Carbon启动有限预览，AA新版智能指数首评59分",
  "微软单季来自OpenAI的商业收入100亿美元，Azure增48%",
  "谷歌云季度收入增长103%，Gemini应用月活达10亿",
  "Copilot Fusion正式开放，自动路由并协同多款模型",
  "腾讯预告Hy4与Hy4 flash，重点强化长程任务和视觉理解",
  "ServiceNow MCP插件已可用，与OpenAI扩展企业工作流合作",
  "Unlimited OCR 2补充训练适配，面向超长文档解析",
  "ChatGPT dot开启短信测试，先向美国Pro用户推出",
  "MiniMax M3.1 Flash正式上线，输入价每百万词元0.15美元",
  "OpenAI据报加速约300亿美元融资，争取抢在Anthropic IPO前",
  "Notion扩展长时智能体，支持连接已有ChatGPT订阅",
  "奇瑞展示CheryMind，称已覆盖200多个业务场景",
  "Gemini Notebook增加生成前审阅，幻灯片和视频可先改方案",
  "微软介绍守护智能体方案，将身份与运行环境纳入风险判断",
  "OpenAI公布COBOL迁移评测，低推理设置准确率达86.6%",
  "Anthropic新基金拟获5%股份，公益股权承诺合计约20%",
  "微软据报退出Nscale英国单站协议，电网接入成阻力",
  "WorkBuddy教育公益版开放，全国教师每月可领2000积分",
  "九部门公布科技兴商意见，推动AI与具身智能应用",
  "格物通智完成近亿元天使轮，推进具身大脑研发",
  "迪士尼拟吸纳Character.AI多数员工，安排待法院审批",
  "全国产十万卡超集群真机亮相，应用覆盖26个领域",
  "Glimpse开放视觉推理预览，支持在推理中重新检查图像",
  "RTX Spark整机开始供货，本地AI扩展到Windows PC",
  "苹果明确AI私密图像治理要求，同时打击审核后偷换功能",
  "Claude溯源NIST椭圆曲线种子，解释多年参数来源疑问",
  "DeepSeek升级Flash-1017，并开放Search与Fetch接口",
  "Reflection开放Beam权重，5010亿参数模型采用Apache 2.0",
  "可灵4.0全面开放，原生生成30秒视频并强化多素材控制",
  "OpenAI开放文字设计音色，录音复刻仍限获批客户",
  "Claude优化八类量子电路，部分设计显著减少资源消耗",
  "Google把智能体接入湿实验室，先模拟再执行生物实验",
  "Anthropic披露内部智能体使用增长，人类注意力成新瓶颈",
  "Gemini Notebook扩展学习工具，支持一分钟视频与互动复习",
  "Meta开放Muse Spark权重，8160亿参数模型支持百万上下文",
  "库克称苹果智能计划月底在华测试，首批不含Siri AI",
  "Nemotron 3.5双模型开放，Bolt瞄准24GB显存本地智能体",
  "FLUX.3 Image Klein开放权重，图像编辑支持十张参考图",
  "微软完成MAI-Base-2预训练，2.8万亿参数模型仍在后训练",
  "Ramp融资18.5亿美元，估值升至600亿美元",
  "台积电维持600—640亿美元资本预算，AI需求支撑扩产",
  "小米介绍MiDashengLM-Spatial，让音频模型识别声音方位",
  "亚马逊推出74.99美元Bee Frontier，AI记忆设备扩展形态",
  "Step 5 Preview开放6000亿参数权重，支持百万词元上下文",
  "Anthropic第三季度收入据报达168亿美元，环比增45%",
  "Matrix-Game 4.0开源，游戏引擎与实时神经渲染结合",
  "Modal完成7.5亿美元D轮融资，投后估值157.5亿美元",
  "团队披露书生-S2参与数学研究，三维Ghys猜想证明公开",
  "Google公开Deep Review，每周提供两次免费文档审阅",
  "英伟达推出cuPotential早期访问，将AI工具延伸至芯片制造",
  "美国八州分别起诉OpenAI，聚焦ChatGPT未成年人保护",
  "Gemini 4 Argon正式开放，API入门价优惠至11月30日",
  "苹果发布299美元HomeView，把Siri AI带入家庭中枢",
  "Character.ai进入破产保护出售程序，平台目前继续运行",
  "MiniCPM-V 4.7开放双规格，专家调度降低手机运行内存",
  "星尘智能完成10亿元新融资，公司估值达150亿元",
  "英伟达完整开源Run:ai，GPU调度与资源管理可模块化采用",
  "Liquid AI开放LFM2.5-24B-A2B权重，强化本地智能体",
  "Google Play开放个人AI应用通道，普通账号可私下安装",
  "算苗披露Pre-A2与A轮融资，一年累计接近20亿元",
  "Meta发布Muse Wonder系列，Full先向Muse Code订阅者开放",
  "DeepSeek据报千亿元融资接近完成，投前估值约5000亿元",
  "微软公布Maia 300，计划2027年投入生产部署",
  "AMD推出Helion机架蓝图，把智能体执行与推理分开配置",
  "智谱发布GLM-Legal，开放法律智能体Beta申请",
  "无问芯穹完成23亿元C轮融资，累计融资达43亿元",
  "Anthropic研究小模型在边缘设备运行与自复制的风险",
  "上海提出2028年推动8000台人形机器人进工厂",
  "欧姆龙签约收购OnLogic母公司，交易企业价值6.75亿美元",
  "博通负责人陈福阳：AI扩张最大约束可能是资本",
  "GPT-6.1 Sol默认上下文升至50万，订阅不收长上下文附加费",
  "千问图像Pro/Turbo API上线，Turbo以8步生成并开放权重",
  "亚马逊据报洽谈约70亿美元收购Decart，押注实时视频与仿真",
  "英伟达据报讨论深化Reflection合作，增持与收购方案均未定",
  "Jev开发商TypeSafe融资8.7亿美元，估值达75亿美元",
  "纳德拉倡议为智能体加“紧急刹车”，权限控制应置于模型之外",
  "美国据报撤回限制向英国提供前沿模型预发布测试的要求",
  "Cloudflare开放Clef-omni，把音视频纳入概率式决策",
  "Anthropic披露Claude越界行为，扩大内部评估实时联网限制",
  "微软推出Decision-1，用Qwen底座切入低成本决策模型",
  "OpenAI与三名被解雇研究员就安全与信息政策公开交锋",
  "英伟达支持的Firmus撤销50亿美元IPO，转向私募",
  "Nuvacore据报寻求25亿美元估值，融资开发数据中心CPU",
  "Manus母公司完成超5亿美元融资，腾讯等老股东继续参与",
  "鸿蒙电脑版DevEco Studio首次公测，集成DevEco Code",
  "Google宣布Gemini工作智能体，支持持续任务与多模型协作",
  "OpenAI9月年化收入据报近500亿美元，与此前口径相差约200亿美元",
  "Claude新增实时看板与动态图解，文档创作下放免费版",
  "Arena融资2亿美元，估值31亿美元，同步推出对齐指数",
  "Anthropic更新使用政策，强化高风险决策与硬件控制要求",
  "Google向公众开放SynthID，支持多家厂商的AI水印核验",
  "GitHub重建Git基础设施，应对智能体时代的并发需求",
  "ChatGPT上线Intelligent UI，GPT-6向免费用户扩展",
  "Haiku 5.5发布，短提示API单价较前代下调90%",
  "博通据报筹措逾500亿美元，支持OpenAI定制AI芯片",
  "DeepSeek据报融资规模超过800亿元，预计10月完成",
  "OpenAI公开前沿模型数学成果，提供证明与形式化材料",
  "Perplexity开放多模态检索模型，文本与文档页面统一搜索",
  "Mistral Large 4开放研究预览，计划月底发布权重",
  "Anthropic扩大网络安全验证计划，按防御任务分级开放",
  "OpenAI推出全天候智能体dots，GPT-6.1 Sol同步上线",
  "Anthropic十年算力承诺至少5180亿美元，约八成难以取消",
  "DeepSeek开源昇腾基础组件，扩展国产算力软件生态",
  "美国AI企业签署自愿安全协议，落实机制仍待明确",
  "OpenAI据报寻求至少300亿美元融资，目标投前估值1.4万亿美元",
  "AMD拟以82亿美元收购World Labs，李飞飞将任首席科学家",
  "OpenAI因安全问题推迟发布GPT-6.1 Astra",
  "Claude Sonnet 5.5发布，官方称提速30%以上",
  "英伟达发布Open Agent Safety，监控智能体运行与越界",
  "Meta成立企业AI平台，Muse API与编程工具进入产品版图",
  "Manus 2.0上线，新架构整合云电脑与创作工作流",
  "新报告讨论AI研发自动化，呼吁加强能力加速监测",
  "OpenAI披露DNS越界事件，最强模型相关研究活动暂停",
  "特朗普确认与Anthropic负责人晚餐安排，AI安全分歧仍存",
  "MiniMax M3.1-Flash-Preview亮相，编程产品继续迭代",
  "NaiveAI开放309B编程模型，原生支持百万词元上下文",
  "FLUX 3 Action开放权重，把视频预测接入机器人控制",
  "Kilo接入Enkrypt防护，在工具调用前检查敏感信息",
  "DeepSeek披露DSec训练底座，单集群日服务约300万沙盒",
  "Meta宣布眼镜接入Muse，音频款349美元起预售",
  "Claude参与发现新酶系统，Anthropic公开生命科学实验室",
  "Gemini 3.8双语音模型上线，支持自然语言设计声音",
  "Claude Marketplace上线，汇集2000余款连接器与插件",
  "Claude Opus 5.5发布，标准API价格下调20%",
  "GPT-6 Sol与Luna上线，新一代API定价约减半",
  "Qwen Intelligence开启公测，面向手机厂商提供智能体方案",
  "混元图像3.5预览版发布，2K图片定价0.15元",
  "OpenRouter开放批处理API，70余款模型支持异步折扣",
  "阿里公布5—10万亿参数模型计划，真武V900同步亮相",
  "Grok 4.7上线，扩大基座并强化编程与知识工作",
  "OpenAI与独立数学顾问组合作，协调AI成果发布",
  "英伟达推出DSX Ready，先认证储能与冷却设备",
  "Meta公布Petal海缆，跨洋容量目标达1Pbps",
  "Step 5 Preview正式发布，API先行、权重10月开放",
  "Qwen-Image-2.1开放权重，支持透明图生成与编辑",
  "长鑫G5平台量产，24Gb LPDDR5X新品亮相",
  "Kev决策模型家族更新，一次前向计算回答多个判断题",
  "千问推出全模态Flash模型，把音视频接入智能体",
  "四大AI公司遭反垄断起诉，放缓研发协作引争议",
  "谷歌披露Gemini评测越界，曾访问三家真实公司系统",
  "Grok Voice Transcribe 2.0发布，强化流式与多语言识别",
  "OpenClaw更新原子升级机制，插件可不重启加载",
  "Runway统一网页与开发平台积分，打通创作与API用量",
  "华为发布昇腾960超节点，光互联成为扩展重点",
  "Astra for Law上线，先向指定律所开放",
  "Crusoe推进39亿美元融资，投后估值309亿美元",
  "ChatGPT进入Word，免费用户也可使用",
  "Google CC转向家庭智能体，最多六人协作",
  "Anthropic公开研发自动化测量，Claude主导26%工作",
  "Claude优化30余个生物模型，相关代码开放",
  "Claude开始合并聊天与Cowork，新增Docs和Slides",
  "ChatGPT测试广告赞助智能体，接入HubSpot与Shopify",
  "Vidu S2扩展实时视频交互，支持边播边改",
  "OpenAI建立模型失配披露框架，公开六份案例报告",
  "DeepMind Institute上线，聚焦AGI技术与社会影响",
  "软银对OpenAI投资敞口引发信用担忧，债务保险成本接近三年高位",
  "沃什：美联储密切关注AI对经济供需的影响",
  "Gemini 3.8 Live发布，把实时对话接入异步工具",
  "StepAudio 3系列上线，覆盖实时交互与语音生成",
  "飞书8.0发布，豆包工作伙伴进入团队协作",
  "Salesforce与英伟达推出Koa，面向CRM业务推理",
  "OpenAI确认已与Anthropic、Google开展数周安全协作",
  "讯飞发布AStudio，让桌面智能体处理办公与代码任务",
  "Periodic Neon进入实体实验室，分析材料实验结果",
  "Atria Dawn Preview开放权重，面向科研与工程长程任务",
  "Claude推出金融顾问套件，连接客户与投资组合数据",
  "微软公开MAI行为准则草案，征求六周意见",
  "Claude Code促销额度结束，周限额保留25%长期增量",
  "三大实验室据报讨论成立AI行业标准机构",
  "Bell拟在加拿大新增最高900MW AI基础设施容量",
  "Superhuman收购Fathom，补齐智能体的会议上下文",
  "多家AI巨头呼吁放缓前沿研发，为安全验证留出时间",
  "奥尔特曼：OpenAI今年不会上市，优先完成安全工作",
  "Anthropic据报选定纳斯达克，推进IPO准备",
  "DeepSeek V4 Pro API继续提供，原定下线安排取消",
  "Devin Desktop与CLI上线Fusion双模型协作",
  "ElevenLabs推出Music v2.5，开放无损下载",
  "DeepSeek V4.1 Flash开放权重，加入原生视觉",
  "OpenAI暂停200美元Pro新订阅，现有用户不受影响",
  "Suno推出v6三款音乐模型，强化局部编辑",
  "小马智行与Verne在萨格勒布启动全无人载客测试",
  "ADI拟以13.5亿美元现金收购Alif，补强端侧AI",
  "微软发布青少年安全参与框架，推进分龄AI体验",
  "京东开源JoyAI-Echo WM，公布物理AI战略",
  "苹果发布A20 Pro新机，端侧AI算力翻倍",
  "英伟达扩展AI for Media，覆盖视频验真与实时配音",
  "Anthropic复盘四起越界事件，引入METR独立调查",
  "Paul Christiano加入OpenAI基金会董事会",
  "Anthropic开放2030经济情景探索工具",
  "DeepSeek宣布Flash系列降价，9月10日中午生效",
  "Meta发布Muse，把个人助手接入独立云端电脑",
  "ChatGPT Images 2.5上线，多轮编辑更一致",
  "Mistral融资30亿欧元，投后估值超210亿欧元",
  "AlphaGenome Atlas开放90亿种DNA变异预测",
  "OpenAI公布纳维–斯托克斯问题候选证明",
  "星火X2.5上线，重点升级代码与智能体能力",
  "Anthropic据报放弃约60亿美元的Decart收购",
  "MiniCPM5-2B开放权重，并同步发布智能体训练数据",
  "Google与国泰航空扩大AI航迹试验",
  "Google选出16个亚太AI环保项目，启动三个月支持计划",
  "OpenAI称已实现“自动化研究实习生”目标",
  "瑞银将AI熟练度纳入2027届初级投行招聘要求",
  "TCS拟在海得拉巴建设最高1GW的AI数据中心园区",
  "Anthropic据报接近敲定150亿美元IPO前循环信贷",
  "OpenAI首席科学家呼吁以安全门槛约束模型扩展",
  "OpenAI发布GPT-6 Astra，强化端到端专业工作能力",
  "英伟达以129.303亿美元收购Hugging Face",
  "Google发布WeatherNext 3，全球天气预报升级至小时级",
  "Runway推出GWM Worlds 2，实时生成可交互视听世界",
  "MBZUAI发布K2 Horizon，六款模型从9亿扩展至3750亿参数",
  "微软发布MAI-Transcribe-2，语音转写覆盖60种语言",
  "OpenAI投入10亿美元扩大Daybreak前沿网络防御计划",
  "OpenAI公布Jalapeño推理芯片首批性能数据",
  "Claude聊天与Cowork打通统一记忆",
  "Generalist估值升至30亿美元，追加近2亿美元融资",
  "Bill Gates警告社会尚未准备好应对AI转型",
  "Stability AI完成7600万美元B轮融资",
  "Gamma收购设计初创Lica，组建设计研究实验室",
  "阿里巴巴配售800亿港元新股，募资全部投向AI",
  "匿名模型Ox Alpha发布三天，冲至OpenRouter周榜第二",
  "Meta吸纳OpenAI资深研究员Luke Metz",
  "Uber因自动停用司机账户面临8.25亿欧元罚款",
  "DeepSeek周末全天采用低谷价，扩展批处理窗口",
  "AI训练版权边界仍未统一，法院判例继续分化",
  "Anthropic预计IPO规模将追平或超过SpaceX纪录",
  "Slack Code上线，把AI编码智能体带入团队频道",
  "调查：五分之一企业无法实时停止失控智能体支出",
  "Callosum完成1亿美元种子轮，押注异构AI推理",
  "Serval全面开放Catalyst，让智能体主动发现并修复IT问题",
  "NanoClaw接入Slack，一句话创建持久化智能体团队",
  "Twin1 AI携2000万美元种子轮出场，为知识工作者创建数字分身",
  "Azure增长推动微软市值单日增加约4500亿美元",
  "三星预计AI内存供应紧张将持续至至少2028年",
  "欧盟启动七座AI超级工厂招标，公共资金承诺100亿欧元",
  "苹果考虑为Siri AI高强度使用提供iCloud+付费选项",
  "OpenAI调查发现更多智能体曾脱离测试沙箱",
  "Google上线一天后撤回Earth AI图像生成功能",
  "GPT-5.6上线三周即降价：Luna输入价下调约80%",
  "Amazon称AI云与自研芯片业务合计年化收入已达250亿美元",
  "Google发布Gemini Robotics 2，让机器人逐步推理并协同完成任务",
  "Thinking Machines发布Inkling Small：不到三分之一规模，综合能力只差1分",
  "Anthropic披露：三款Claude模型在安全测试中访问了真实系统",
  "Scale AI任命Google Cloud COO Francis deSouza为新CEO",
  "据报道，月之暗面完成约35亿美元融资，投后估值约350亿美元",
  "OpenAI预览Astra，内部版本推动十项数学研究进展",
  "DeepSeek V4 Flash把同级输出价格压至Claude Opus 4.8约1%",
  "欧盟开始执行通用AI模型义务，违规可进入罚款程序",
  "新版Siri AI进入iOS 27消费者测试，正式版预计9月开放",
  "Hugging Face CEO称中国已在开放权重模型上领先",
  "白宫将与AI企业审议前沿模型发布前评测框架",
  "Palantir美国企业AI软件销售额同比增长约150%",
  "AWS把Superblocks编程工具引入企业私有云",
  "三星与SK海力士据报评估中微公司芯片设备",
  "OpenAI披露两组第三方网络安全评测越界事件",
  "Volta获六年100亿美元算力合同，客户据报为Anthropic",
  "Cursor开源MoE训练内核MoK，512卡吞吐提升41%",
  "英伟达Alpamayo 2 Super开放商业使用",
  "DeepSeek通知用户将上调AI服务价格，具体幅度尚未公布",
  "Google DeepMind重组：Hassabis转任主席，Jeff Dean等离职创业",
  "Meta推出Muse Code，Muse Spark 1.2进入编程智能体",
  "Cloudflare开源企业AI工作台Cloudflare OS",
  "美国新AI评测框架不覆盖开放权重模型",
  "中国模型占据AA文生视频榜前十中的九席",
  "摩尔线程上半年收入同比增147%，计划赴港上市",
  "Claude Code将默认开启Auto Mode",
  "OpenAI因网络安全风险放缓Astra发布",
  "英伟达联合华尔街筹划超5000亿美元AI基础设施融资",
  "Meta发布Muse Glimmer开放权重智能体模型",
  "OpenAI推出GPT‑5.6‑Cyber并扩大Daybreak网络防御计划",
  "据报道，Anthropic签下20年、91亿美元算力协议",
  "Manus将恢复独立运营，部分用户数据进入删除安排",
  "英伟达发布Nemotron 3.5 Lightning开放权重模型",
  "OpenAI长期高管Brad Lightcap离职创业",
  "DeepSeek上线V4 Pro 0813：百万上下文，最大输出38.4万词元",
  "Grok 4.6发布：智能指数升至61，进入前沿模型梯队",
  "Google发布Pixel 11系列，以Gemini推动端侧AI升级",
  "Upstage发布Solar Pro 4，智能指数较上代提升28分",
  "Google发布Gemini 3.7 Flash，主攻编程与智能体任务",
  "阿里开放Qwen3.8-2.4T-A95B模型权重",
  "Anthropic据报洽购Decart，交易金额约60亿美元",
  "Cognition据报以400亿美元估值洽谈新一轮融资",
  "OpenAI锁定俄亥俄8GW算力，签下20年租约",
  "Stripe同意以逾80亿美元收购OpenRouter",
  "Anthropic年化收入据报突破650亿美元",
  "Groq完成3.5亿美元融资，继续转向推理云",
  "Google创建的A2A协议转入Agentic AI Foundation",
  "AI自动化初创Relay关停，团队加入Google Chrome",
  "Anthropic暂停部分高风险训练与网络评测",
  "英伟达35亿美元投资联发科，切入定制AI芯片",
  "ChatGPT首次进入欧盟DSA最严格监管层级",
  "Clipto融资1500万美元，端侧搜索估值达2.5亿美元",
  "Circleback把无限量AI会议纪要下放至免费版",
  "逾5万轮对话评测显示聊天机器人危机识别改善",
  "Anthropic发布Claude Fable 5.1与Mythos 5.1",
  "OpenAI确认Astra达到“关键”网络安全能力门槛",
  "AfterQuery估值升至32亿美元，创YC最快独角兽纪录",
  "欧洲敲定3.878亿欧元LUMI-AI超级计算机",
  "AIR携5000万美元出场，瞄准AI智能体供应链安全",
  "Empirik融资2100万美元，用AI提前预测基础设施故障",
  "Meta发布Muse Spark 1.3，现有版本跻身前沿梯队",
  "CrowdStrike与OpenAI把Codex防护推进到运行时",
  "HiddenLayer完成1亿美元B轮融资，扩展智能体运行时安全",
  "Physical Superintelligence携5800万美元组建AI物理实验室",
  "C3 AI季度预订额环比增73%，自由现金流转正",
  "IBM调查：中学课堂AI周使用率已超过七成",
  "DeepSeek开源DeepInfer，推理核心适配英伟达与昇腾",
  "OpenAI收购Orchestra Bio，将药研智能体纳入Rosalind",
  "SpaceX SI业务季度收入75.6亿美元，营业利润转正",
  "Anthropic据报上半年净亏损逾800亿美元，多数来自会计费用",
  "Claude设计蝎毒靶向蛋白，211份实验中17份达到结合标准",
  "Google推出政府专用Gemini智能体方案，先在美国机构预览",
  "Claude Duet开启候补预览，让助手主动汇报并持续办事",
  "OpenAI模型接入谷歌云，部分企业已获私人预览",
  "Meta季度资本开支349.1亿美元，批准无投票权新股",
  "特斯拉披露Optimus启动生产，产线仍处早期爬坡",
  "AI协助发现PHP严重漏洞，维护者主导修复",
  "英伟达推出OpenShell参考架构，把智能体安全延伸到硬件",
  "沃尔玛测试智能体购物网关，将授权与限额纳入交易",
  "星火X2.6端云一体方案发布，4B端侧权重开放",
  "Decisions API正式开放，标准输入每百万词元0.10美元",
  "Agent Skills移交AAIF，技能标准走向中立治理",
  "Uber将ChatGPT Work从千人试点扩至逾3万名员工",
  "Claude完成123个开源库的特定安全性质证明",
  "DeepSeek融资报道更新，产业投资方名单进一步浮现",
  "谷歌与Voltus将虚拟电厂合作规模扩至1GW",
  "OlmoEarth v1.3开放地表嵌入，浏览器可做地图分析",
  "Kimi K3.1 Pro上线，完整权重计划11月4日前公布",
  "OpenAI披露离线训练新边界，强化多层隔离",
  "趋境科技完成超13亿元B轮，扩充AI推理交付能力",
  "MiniMax M3.1 Flash权重可获取，商用附通知与授权条件",
  "Infinity开放智能体运行时，让等待任务挂起后恢复",
  "Hi3D v1.0开放推理代码与权重，细化已有3D几何",
  "GPT-6.1 Terra上线，标准API输入每百万词元1美元",
  "Anthropic公开提交S-1，拟以ANT在纳斯达克上市",
  "SpaceX取得400亿美元GPU融资租赁承诺",
  "腾讯开放Hy-SimulMT，中英同传可边听边译",
  "Meta启动350亿美元发行，另筹划600亿美元后续融资",
  "Runway推出App Studio，用自然语言封装创意工作流",
  "即梦短剧工作室上线，整合剧本、图片与分镜模型",
  "Devin Security升级，前沿模型扫描与修复形成闭环",
  "Genie 4生成可交互有声世界，先向可信测试者预览",
  "英伟达拟投Meta30亿美元，Meta发行定价扩至375亿美元",
  "Anthropic收购Mithril Medicine，将Claude深入药物研发",
  "OpenAI扩展Oracle合作，推进企业流程接入ChatGPT",
  "MAI Image 2.7开放编辑预览，文生图功能仍待推出",
  "LFM3开放六款2B级模型，覆盖视觉、语音与决策",
  "灵光2.0转向持续事务管理，退出对话后仍可跟进",
  "OCI正式提供Vera Rubin，继续规划多吉瓦扩容",
  "Rokid Color全彩眼镜4999元起，计划明年4月交付"
];

function normalizeTitle(title: string) {
  return title.toLowerCase().replace(/[\s：:，,。；;“”‘’\"']/g, "");
}

const previouslyPublishedTitleKeys = new Set(previouslyPublishedTitles.map(normalizeTitle));

function selectNews(candidates: NewsCandidate[]) {
  return [...candidates]
    .filter((item) => item.importance >= 75)
    .filter((item) => !previouslyPublishedTitleKeys.has(normalizeTitle(item.title)))
    .sort((a, b) => b.importance - a.importance);
}

const news = selectNews(newsCandidates);

export default function Home() {
  return (
    <>
      <div className="export-toolbar">
        <ExportButton filename={`AI前沿日报-${report.dateTime}.jpg`} />
      </div>

      <main id="poster-root" className="app-shell">
        <section className="hero-panel" aria-labelledby="page-title">
          <div className="hero-heading">
            <div>
              <img
                className="category-label"
                src={`${referenceAssetBase}/images/category-label.svg`}
                alt=""
                aria-hidden="true"
              />
              <p>AI前沿日报</p>
              <time dateTime={report.dateTime}>{report.dateLabel}</time>
            </div>
            <img
              className="hero-icon"
              src={`${referenceAssetBase}/images/ai-daily-icon.png`}
              alt="AI 日报头图"
            />
          </div>
          <h1 id="page-title">{report.title.split("，").map((line, index, lines) => <span className="headline-line" key={line}>{line}{index < lines.length - 1 ? "，" : ""}</span>)}</h1>
          <p className="hero-summary">{report.summary}</p>
        </section>

        <section className="overview-card" aria-labelledby="overview-title">
          <h2 id="overview-title" className="poster-tab">
            今日概览<span className="tab-arrow" aria-hidden="true" />
          </h2>
          <img className="data-watermark" src={`${referenceAssetBase}/images/jinshi-data-logo.svg`} alt="" aria-hidden="true" />
          <p className="section-note">更新于 13:42（北京时间） · 日内重点</p>
          <article className="overview-item">
            <div className="overview-copy">
              <h3>旗舰上限与日常成本，国产模型沿两条路线推进<span className="pill pill-blue overview-title-tag">模型竞争</span></h3>
              <p>千问4把长程执行、原生视觉和行业任务交付带入正式服务；混元Flash则用更小激活规模和更低调用价格覆盖日常办公。二者分别争取复杂项目与高频工作流，用量榜也开始出现新产品上线后的结构变化。</p>
              <p className="overview-source">综合研判：Qwen / 腾讯 / OpenRouter</p>
            </div>
          </article>
          <article className="overview-item">
            <div className="overview-copy">
              <h3>智能体安全从内部承诺走向外部审视<span className="pill pill-blue overview-title-tag">治理焦点</span></h3>
              <p>加州将OpenAI的测试安全问题诉诸法院，OpenAI则公布更深入的外部驻场评估安排。诉讼与独立评估分别从法律责任和技术证据切入，接下来值得跟踪的是防护改进、评估发现及其对模型发布节奏的影响。</p>
              <p className="overview-source">综合研判：加州司法部 / AP / OpenAI</p>
            </div>
          </article>
          <article className="overview-item">
            <div className="overview-copy">
              <h3>AI投入开始同时接受收入与真实任务检验<span className="pill pill-blue overview-title-tag">产业应用</span></h3>
              <p>百度AI云基础设施增长提供了企业需求的财报观察窗口；书生把科学数据和专业软件操作纳入开源模型，AWS把表格计算接入知识库。苹果通过研究检验健康AI的实际使用，这些进展让关注点从模型能说什么，进一步转向能交付什么。</p>
              <p className="overview-source">综合研判：百度 / 上海AI实验室 / AWS / Apple</p>
            </div>
          </article>
          <div className="quote-box">
            <strong>一句话结论：</strong>
            新模型竞争同时围绕任务能力、调用成本和执行效率展开；应用与收入加速落地，外部安全验证也成为重要跟踪项。
          </div>
        </section>

        <section className="section-block model-pulse-section" aria-label="模型脉搏">
          <p className="eyebrow">模型脉搏<span className="tab-arrow" aria-hidden="true" /></p>
          {modelPulses.map((pulse, index) => (
            <article className="data-card" key={pulse.id}>
              <img className="data-watermark" src={`${referenceAssetBase}/images/jinshi-data-logo.svg`} alt="" aria-hidden="true" />
              <h3><span>{String(index + 1).padStart(2, "0")}</span>{pulse.title}</h3>
              <p className="card-subtitle">{pulse.subtitle}</p>
              <PulseVisual kind={pulse.id} metrics={pulse.metrics} />
              <footer className="source-note">
                <div>
                  <a href={pulse.url} target="_blank" rel="noreferrer">数据来源：{pulse.source}</a>
                  {pulse.licenseUrl && <> · <a href={pulse.licenseUrl} target="_blank" rel="noreferrer">CC BY 4.0</a></>}
                  {pulse.secondaryUrl && <> · <a href={pulse.secondaryUrl} target="_blank" rel="noreferrer">{pulse.secondaryLabel}</a></>}
                </div>
                {pulse.note && <p>{pulse.note}</p>}
              </footer>
            </article>
          ))}
          <aside className="pulse-summary" aria-label="脉搏小结">
            <div className="pulse-summary-head"><span>脉搏小结</span></div>
            <div className="pulse-summary-list">
              <p><b>01</b><span><strong>看首日：</strong>Hy4 Flash以1.88万亿词元进入完整日榜第三，Opus 5.5用量较前日增长93%。</span></p>
              <p><b>02</b><span><strong>看任务：</strong>千问Work360厂商评测中，Qwen4-Max得分52.69，单任务平均费用11.16元。</span></p>
              <p><b>03</b><span><strong>看开源：</strong>书生新增科学多模态选择；科研、文档和表格任务应分别对照对应指标。</span></p>
            </div>


          </aside>
        </section>

        <section className="news-section" aria-labelledby="news-title">
          <p className="eyebrow">前沿电讯<span className="tab-arrow" aria-hidden="true" /></p>
          <p className="section-note">今日重点更新 · 按用户与产业影响排序 · 共 {news.length} 条</p>
          <h2 id="news-title" className="visually-hidden">前沿快讯</h2>
          <div className="timeline">
            {news.map((item, index) => (
              <article className="news-item" key={item.title}>
                <a className="news-link" href={item.url} target="_blank" rel="noreferrer" aria-label={`阅读原文：${item.title}`}>
                  <div className="news-body">
                    <div className="news-meta">
                      <span className={`news-tag ${["tag-blue", "tag-lime", "tag-orange", "tag-purple"][index % 4]}`}>{item.tag}</span>
                      <time dateTime={item.dateTime}>{item.published}</time>
                      <span>{item.source}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="download-panel" aria-label="金十数据 APP 下载">
          <div className="download-brand">
            <img className="download-icon" src={`${referenceAssetBase}/images/jinshi-app-icon.png`} alt="" aria-hidden="true" />
            <div className="download-copy">
              <span className="download-badge">专业·及时·精准·权威</span>
              <h2>金十数据APP</h2>
              <p>7X24跟踪全球市场突发消息</p>
            </div>
          </div>
          <div className="download-qr">
            <img src={`${referenceAssetBase}/images/jinshi-app-qr.png`} alt="扫码下载金十数据 APP" />
            <p>扫码立即下载</p>
          </div>
        </section>
      </main>
    </>
  );
}
