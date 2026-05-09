"use client";

import "./editor.css";
import { useEffect, useCallback } from "react";
import { EditorContent } from "@tiptap/react";
import { useBlogEditor } from "./useBlogEditor";
import BlogEditorToolbar from "./BlogEditorToolbar";
import { useUploader } from "@/features/blog/hooks/useUploader";

interface BlogDynamicEditorProps {
  imgKey: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function BlogDynamicEditor({
  imgKey,
  value,
  onChange,
  hasError,
}: BlogDynamicEditorProps) {
  const { handler } = useUploader(imgKey);

  const onImageUpload = useCallback(
    async (file: File) => {
      return await handler(file);
    },
    [handler],
  );

  const { editor } = useBlogEditor({
    editable: true,
    placeholder: "블로그 내용을 입력해주세요.",
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

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
        <BlogEditorToolbar editor={editor} onImageUpload={onImageUpload} />
      </div>
      <div className="p-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
