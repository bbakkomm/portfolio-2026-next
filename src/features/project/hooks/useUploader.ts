"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadThumbnail } from "../api/upload-service";

async function convertToWebP(
  file: File,
  maxWidth = 1200,
  quality = 0.85
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas context를 생성할 수 없습니다."));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("WebP 변환에 실패했습니다."));
            return;
          }
          const webpName = file.name.replace(/\.[^/.]+$/, ".webp");
          resolve(new File([blob], webpName, { type: "image/webp" }));
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("이미지 로드에 실패했습니다."));
    };

    img.src = objectUrl;
  });
}

/**
 * 썸네일 업로드 훅
 * WebP로 변환한 뒤 uploadThumbnail을 호출하고 URL을 반환합니다.
 *
 * @param imgKey  프로젝트 스토리지 폴더 키
 */
export function useUploader(imgKey: string) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
        throw new Error("이미지 파일만 업로드 가능합니다. (SVG 제외)");
      }

      const sizeMb = file.size / 1024 / 1024;
      if (sizeMb > 10) {
        throw new Error(`${sizeMb.toFixed(2)}MB 파일은 10MB 이하만 가능합니다.`);
      }

      const webpFile = await convertToWebP(file);
      const baseName = webpFile.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^\w.-]/g, "_");
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:T.]/g, "")
        .slice(0, 15);
      const renamedFile = new File(
        [webpFile],
        `${baseName}_${timestamp}.webp`,
        { type: "image/webp" }
      );

      return uploadThumbnail(renamedFile, imgKey);
    },
  });

  const handler = (file: File): Promise<string> => mutateAsync(file);

  return { handler, isPending };
}
