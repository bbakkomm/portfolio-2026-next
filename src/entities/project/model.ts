export type ProjectKey = string;
export type HashTagType = string[];
export type skillType = string[];
export type startDate = Date | string | null;
export type endDate = Date | string | null;

export type STACK_TYPES = "framework" | "lib" | "style" | "database";

export interface ProjectDetailProps {
  id: string;
  title: string;
  skill: string[];
  company: string;
  hashtag: HashTagType;
  projectUrl: string;
  start_date: startDate;
  end_date: endDate;
  thumbnail: string;
  project_pin: { id: number } | null;
  description: string;
  projectDescription: string;
  project_member: string;
  project_meta_stack: Array<{
    project_stack: {
      type: STACK_TYPES;
      stack: string;
    };
  }>;
}

export type ProjectPostProps = ProjectDetailProps;

export interface UploadThumbnailResponseProps {
  message: string;
  imgUrl: string;
}

// DB row 타입 (project_meta 테이블)
export interface ProjectMeta {
  id: number;
  title: string;
  company: string;
  description: string;
  projectDescription: string;
  project_member: string;
  projectUrl: string;
  start_date: string | null;
  end_date: string | null;
  thumbnail: string;
  img_key: string;
  hashtag: string[];
  skill: string[];
}

// project_contents 테이블
export interface ProjectContents {
  id: number;
  project_id: number;
  content: string;
}

// project_surmmry 테이블
export interface ProjectSurmmry {
  id: number;
  project_id: number;
  summary: string;
}

// 상세 조회용 (join 포함)
export interface ProjectDetailFull extends ProjectMeta {
  project_contents: ProjectContents | null;
  project_surmmry: ProjectSurmmry[];
  project_pin: { id: number } | null;
  project_meta_stack: Array<{
    project_stack: {
      type: STACK_TYPES;
      stack: string;
    };
  }>;
}
