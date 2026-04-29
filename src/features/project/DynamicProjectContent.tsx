"use client";

import { useState } from "react";
import "./ProjectEditor/editor.css";
import {
  EditorProvider,
  SimpleEditorContents,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { normalizeContentHtml } from "@/shared/lib/normalize-content-html";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

export default function DynamicProjectContent({ contents }: { contents: string }) {
  const { editor } = useSimpleEditor({ editable: false });
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      setZoomSrc((target as HTMLImageElement).src);
    }
  };

  return (
    <>
      <section
        onClick={handleClick}
        className="prose dark:prose-invert prose-sm max-w-none break-keep"
      >
        <EditorProvider editor={editor}>
          <SimpleEditorContents value={normalizeContentHtml(contents)} />
        </EditorProvider>
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
