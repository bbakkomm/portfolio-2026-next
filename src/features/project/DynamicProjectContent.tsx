"use client";

import { useState, useEffect } from "react";
import "./ProjectEditor/editor.css";
import { EditorContent } from "@tiptap/react";
import { useProjectEditor } from "./ProjectEditor/useProjectEditor";
import { normalizeContentHtml } from "@/shared/lib/normalize-content-html";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

export default function DynamicProjectContent({ contents }: { contents: string }) {
  const { editor } = useProjectEditor({ editable: false });
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(normalizeContentHtml(contents) || "", false);
  }, [editor, contents]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      setZoomSrc((target as HTMLImageElement).src);
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <section
        onClick={handleClick}
        className="prose dark:prose-invert prose-sm max-w-none break-keep"
      >
        <EditorContent editor={editor} />
      </section>
      <Dialog open={!!zoomSrc} onOpenChange={(open) => !open && setZoomSrc(null)}>
        <DialogContent
          className="max-w-[90vw] w-fit p-0 bg-transparent border-0 shadow-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">이미지 확대 보기</DialogTitle>
          {zoomSrc && (
            <img
              src={zoomSrc}
              alt=""
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
