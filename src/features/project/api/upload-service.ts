"use client";

import { createClient } from "@/shared/lib/supabase/client";
import imgUrlMapper from "@/shared/lib/img-url";

const BUCKET = "project";

/**
 * 썸네일 이미지를 Storage `project` 버킷에 업로드하고 URL을 반환합니다.
 * @param file    업로드할 이미지 파일 (WebP 변환 후 전달 권장)
 * @param imgKey  프로젝트 식별 키 (스토리지 폴더 경로)
 */
export async function uploadThumbnail(
  file: File,
  imgKey: string
): Promise<string> {
  const supabase = createClient();

  const path = `${imgKey}/${file.name}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw new Error(error.message);

  return imgUrlMapper({ thumbnail: data.path });
}

/**
 * 에디터 콘텐츠 이미지를 Storage `project` 버킷에 업로드하고 URL을 반환합니다.
 * @param file    업로드할 이미지 파일
 * @param imgKey  프로젝트 식별 키
 * @param page    에디터 페이지 구분자 (스토리지 서브폴더)
 */
export async function uploadContentImage(
  file: File,
  imgKey: string,
  page: string
): Promise<string> {
  const supabase = createClient();

  const path = `${imgKey}/${page}/${file.name}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw new Error(error.message);

  return imgUrlMapper({ thumbnail: data.path });
}
