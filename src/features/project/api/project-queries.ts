import { createClient } from "@/shared/lib/supabase/server";
import type {
  ProjectMeta,
  ProjectDetailFull,
  ProjectPostProps,
} from "@/entities/project/model";

/**
 * 전체 프로젝트 목록 조회 (서버 컴포넌트용)
 * thumbnail, img_key 포함
 */
export async function getProjects(): Promise<ProjectMeta[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_meta")
    .select("*, project_meta_stack(project_stack(type, stack))")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

/**
 * 단일 프로젝트 상세 조회 (서버 컴포넌트용)
 * contents, surmmry, stack join 포함
 */
export async function getProjectDetail(
  id: number
): Promise<ProjectDetailFull | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_meta")
    .select(
      `
      *,
      project_contents (*),
      project_surmmry (*),
      project_pin (id),
      project_meta_stack (
        project_stack (type, stack)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw new Error(error.message);
  }

  return data as ProjectDetailFull;
}

/**
 * 핀된 프로젝트 목록 조회 (서버 컴포넌트용)
 * project_pin 테이블을 통해 핀된 project_meta만 반환
 */
export async function getPinnedProjects(): Promise<ProjectMeta[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_pin")
    .select(`*, project_meta(*, project_meta_stack(project_stack(type, stack)))`);

  if (error) throw new Error(error.message);

  return ((data ?? []).map((r: any) => r.project_meta).filter(Boolean) as ProjectMeta[]);
}

/**
 * Admin 전용 프로젝트 목록 조회 (project_pin 조인 포함)
 */
export async function getProjectsForAdmin(): Promise<ProjectMeta[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_meta")
    .select("*, project_pin (id)")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

/**
 * 편집용 프로젝트 데이터 조회 (서버 컴포넌트용)
 * ProjectPostProps 형태로 반환
 */
export async function getProjectEdit(
  id: number
): Promise<ProjectPostProps | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_meta")
    .select(
      `
      *,
      project_contents (*),
      project_surmmry (*),
      project_pin (id),
      project_meta_stack (
        project_stack (id, type, stack)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data as ProjectPostProps;
}
