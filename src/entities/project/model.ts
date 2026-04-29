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
