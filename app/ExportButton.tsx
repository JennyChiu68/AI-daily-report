"use client";

import { useState } from "react";
import { toCanvas } from "html-to-image";

const TARGET_BYTES = 1024 * 1024;

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timer: number | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer !== undefined) window.clearTimeout(timer);
  }
}

function encodeJpeg(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("JPG 编码失败"))),
      "image/jpeg",
      quality,
    );
  });
}

function resizeCanvas(source: HTMLCanvasElement, ratio: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(source.width * ratio));
  canvas.height = Math.max(1, Math.round(source.height * ratio));

  const context = canvas.getContext("2d");
  if (!context) throw new Error("浏览器无法创建图片画布");

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#d8f2ff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function compressNearOneMegabyte(source: HTMLCanvasElement) {
  let canvas = source;
  let fallback: Blob | null = null;

  for (let pass = 0; pass < 4; pass += 1) {
    const smallest = await encodeJpeg(canvas, 0.2);
    fallback = smallest;

    if (smallest.size > TARGET_BYTES) {
      const ratio = Math.min(0.92, Math.sqrt(TARGET_BYTES / smallest.size) * 0.94);
      canvas = resizeCanvas(canvas, ratio);
      continue;
    }

    let low = 0.2;
    let high = 0.98;
    let bestUnderLimit = smallest;

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const quality = (low + high) / 2;
      const candidate = await encodeJpeg(canvas, quality);

      if (candidate.size <= TARGET_BYTES) {
        if (candidate.size > bestUnderLimit.size) bestUnderLimit = candidate;
        low = quality;
      } else {
        high = quality;
      }
    }

    return bestUnderLimit;
  }

  if (fallback && fallback.size > TARGET_BYTES) {
    const ratio = Math.sqrt(TARGET_BYTES / fallback.size) * 0.92;
    return encodeJpeg(resizeCanvas(canvas, ratio), 0.2);
  }
  return fallback ?? encodeJpeg(canvas, 0.72);
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(async (image) => {
      if (image.complete && image.naturalWidth > 0) return;

      const settled = new Promise<void>((resolve) => {
        const finish = () => resolve();
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      });

      await withTimeout(settled, 5000, "素材加载超时").catch(() => undefined);
    }),
  );
}

function getPixelRatio(poster: HTMLElement) {
  const area = Math.max(1, poster.offsetWidth * poster.offsetHeight);
  const safeRatio = Math.sqrt(10_000_000 / area);
  return Math.max(1, Math.min(2, safeRatio));
}

export default function ExportButton({ filename }: { filename: string }) {
  const [label, setLabel] = useState("导出约1M JPG");
  const [busy, setBusy] = useState(false);

  async function exportPoster() {
    const poster = document.getElementById("poster-root");
    if (!poster || busy) return;

    setBusy(true);
    setLabel("正在生成 JPG…");

    try {
      if (document.fonts) {
        await withTimeout(document.fonts.ready, 5000, "字体加载超时").catch(
          () => undefined,
        );
      }
      await waitForImages(poster);

      poster.classList.add("is-exporting");
      await new Promise((resolve) => window.requestAnimationFrame(resolve));

      const width = poster.scrollWidth;
      const height = poster.scrollHeight;
      const canvas = await withTimeout(
        toCanvas(poster, {
          backgroundColor: "#d8f2ff",
          cacheBust: true,
          height,
          pixelRatio: getPixelRatio(poster),
          style: {
            height: `${height}px`,
            margin: "0",
            transform: "none",
            width: `${width}px`,
          },
          width,
        }),
        30000,
        "海报生成超时",
      );
      const blob = await withTimeout(
        compressNearOneMegabyte(canvas),
        15000,
        "图片压缩超时",
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);

      setLabel(`已导出 ${(blob.size / TARGET_BYTES).toFixed(2)}M`);
      window.setTimeout(() => setLabel("导出约1M JPG"), 2400);
    } catch (error) {
      console.error(error);
      const isTimeout = error instanceof Error && error.message.includes("超时");
      setLabel(isTimeout ? "生成超时，请重试" : "导出失败，请重试");
      window.setTimeout(() => setLabel("导出约1M JPG"), 2800);
    } finally {
      poster.classList.remove("is-exporting");
      setBusy(false);
    }
  }

  return (
    <button
      className="export-button"
      type="button"
      onClick={exportPoster}
      disabled={busy}
      aria-busy={busy}
      aria-label="将完整日报导出为约一兆字节的 JPG 图片"
    >
      {label}
    </button>
  );
}
