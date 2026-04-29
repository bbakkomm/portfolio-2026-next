import Resume from "@/features/resume/Resume";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return <Resume />;
}
