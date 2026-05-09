"use client";

import { createClient } from "@/shared/lib/supabase/client";

const BUCKET = "blog";

export async function uploadThumbnail(
  file: File,
  imgKey: string
): Promise<string> {
  const supabase = createClient();
  const path = `${imgKey}/${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadContentImage(
  file: File,
  imgKey: string,
  page: string
): Promise<string> {
  const supabase = createClient();
  const path = `${imgKey}/${page}/${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
