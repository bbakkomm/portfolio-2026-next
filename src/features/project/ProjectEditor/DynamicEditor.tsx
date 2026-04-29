"use client";

import {
  EditorProvider,
  SimpleEditorContents,
  SimpleToolTip,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { useUploader } from "@/features/project/hooks/useUploader";
import imgUrlMapper from "@/shared/lib/img-url";

interface DynamicEditorProps {
  imgKey: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function DynamicEditor({
  imgKey,
  value,
  onChange,
  hasError,
}: DynamicEditorProps) {
  const { handler } = useUploader(imgKey);

  const { editor } = useSimpleEditor({
    placeholder: "프로젝트 내용을 입력해주세요.",
    editable: true,
    uploadCallback: async (file: File) => {
      const url = await handler(file);
      return imgUrlMapper({ thumbnail: url });
    },
  });

  return (
    <div
      className={`w-full border p-5 ${
        hasError ? "border-destructive" : "border-border"
      }`}
    >
      <EditorProvider editor={editor}>
        <div className="sticky top-10 z-10 bg-[#171717]">
          <SimpleToolTip />
        </div>
        <SimpleEditorContents value={value} onChange={onChange} />
      </EditorProvider>
    </div>
  );
}
