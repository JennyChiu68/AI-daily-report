# AI前沿日报

现有AI前沿日报的完整源码、素材、信源记录和还原样例。

## 功能需求

[精简需求](docs/requirements/需求提交摘要.txt) · [一页Word需求书](docs/requirements/AI前沿日报本地落地需求.docx)

完整还原现有日报，支持每日生成、编辑预览和下载约1MB的完整JPG。验收以仓库中的2026年11月17日数据及图片为准。

每日内容从哪里获取，见 [信源清单与采集规则](docs/requirements/SOURCE_GUIDE.txt)。

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
