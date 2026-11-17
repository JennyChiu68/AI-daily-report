# AI前沿日报

现有AI前沿日报的完整源码、素材、信源记录和还原样例。

## 功能需求

[完整需求文档](docs/requirements/AI前沿日报本地落地需求.docx)：功能、信源网址、每日采集规则与验收标准均包含在同一份Word中。

## 运行

Node.js >= 22.13.0。

```bash
npm ci
npm run dev
```

构建与验证：`npm run build`、`npm test`。测试对应11月17日冻结样例；更换日报内容时同步更新预期值。

## 文件位置

- `app/`：日报页面、图表、样式及JPG导出。
- `public/`：品牌素材、二维码及分享图片。
- `research/`：历史信源与核查记录。
- `docs/reference/`：结构化数据及完整JPG样例。
- `docs/requirements/`：精简功能需求。

当前源码包含页面与图片导出，内容保存在`app/page.tsx`中；每日自动生成和可视化编辑需按精简需求实现。
