import { env } from "@/shared/config/env";

/**
 * 썸네일 URL을 완전한 이미지 URL로 변환합니다.
 * - 절대 URL(http/https 또는 //로 시작)이면 그대로 반환
 * - 상대 경로이면 NEXT_PUBLIC_IMAGE_URL을 앞에 붙임
 */
const imgUrlMapper = ({ thumbnail }: { thumbnail: string }): string => {
  return /^(https?:)?\/\//.test(thumbnail)
    ? thumbnail
    : `${env.NEXT_PUBLIC_IMAGE_URL}/${thumbnail}`;
};

export default imgUrlMapper;
