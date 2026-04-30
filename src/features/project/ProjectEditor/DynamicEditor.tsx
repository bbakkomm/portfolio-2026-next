"use client";

import "./editor.css";
import { useEffect, useCallback } from "react";
import { EditorContent } from "@tiptap/react";
import { useProjectEditor } from "./useProjectEditor";
import EditorToolbar from "./EditorToolbar";
import { useUploader } from "@/features/project/hooks/useUploader";
import imgUrlMapper from "@/shared/lib/img-url";

interface DynamicEditorProps {
  imgKey: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function DynamicEditor({ imgKey, value, onChange, hasError }: DynamicEditorProps) {
  const { handler } = useUploader(imgKey);

  const onImageUpload = useCallback(
    async (file: File) => {
      const url = await handler(file);
      return imgUrlMapper({ thumbnail: url });
    },
    [handler],
  );

  const { editor } = useProjectEditor({
    editable: true,
    placeholder: "프로젝트 내용을 입력해주세요.",
  });

  // 초기값 및 외부 value 변경 시 content 동기화
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  // editor 내용 변경 시 onChange 호출
  useEffect(() => {
    if (!editor) return;
    const onUpdate = () => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    };
    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
    };
  }, [editor, onChange]);

  return (
    <div
      className={`w-full border ${hasError ? "border-destructive" : "border-border"}`}
    >
      <div className="sticky top-10 z-10 bg-[#171717]">
        <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      </div>
      <div className="p-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
