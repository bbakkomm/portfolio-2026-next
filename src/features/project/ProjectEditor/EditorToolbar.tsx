"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Link2,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Highlighter,
  Table as TableIcon,
  Undo2,
  Redo2,
  Trash2,
} from "lucide-react";
import { useRef, useCallback } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string>;
}

function Btn({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        isActive
          ? "bg-white/20 text-white"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-4 bg-white/20 mx-0.5 self-center" />;
}

export default function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInTable = editor?.isActive("table") ?? false;

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor || !onImageUpload) return;
      try {
        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch {
        // noop
      } finally {
        e.target.value = "";
      }
    },
    [editor, onImageUpload],
  );

  const handleLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("링크 URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const handleYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("YouTube URL");
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-white/10">
      {/* Undo / Redo */}
      <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="실행 취소">
        <Undo2 size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="다시 실행">
        <Redo2 size={14} />
      </Btn>

      <Sep />

      {/* 텍스트 서식 */}
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="굵게">
        <Bold size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="기울임">
        <Italic size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="밑줄">
        <Underline size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} title="취소선">
        <Strikethrough size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive("highlight")} title="형광펜">
        <Highlighter size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive("subscript")} title="아래 첨자">
        <SubscriptIcon size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive("superscript")} title="위 첨자">
        <SuperscriptIcon size={14} />
      </Btn>

      <Sep />

      {/* 제목 */}
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="제목 1">
        <Heading1 size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="제목 2">
        <Heading2 size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="제목 3">
        <Heading3 size={14} />
      </Btn>

      <Sep />

      {/* 정렬 */}
      <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} title="왼쪽 정렬">
        <AlignLeft size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} title="가운데 정렬">
        <AlignCenter size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} title="오른쪽 정렬">
        <AlignRight size={14} />
      </Btn>

      <Sep />

      {/* 목록 */}
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="글머리 기호">
        <List size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="번호 목록">
        <ListOrdered size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive("taskList")} title="할일 목록">
        <ListChecks size={14} />
      </Btn>

      <Sep />

      {/* 블록 요소 */}
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="인용">
        <Quote size={14} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="코드 블록">
        <Code size={14} />
      </Btn>
      <Btn onClick={handleLink} isActive={editor.isActive("link")} title="링크">
        <Link2 size={14} />
      </Btn>

      <Sep />

      {/* 미디어 */}
      {onImageUpload && (
        <>
          <Btn onClick={() => fileInputRef.current?.click()} title="이미지 삽입">
            <ImageIcon size={14} />
          </Btn>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </>
      )}
      <Btn onClick={handleYoutube} title="YouTube 삽입">
        <YoutubeIcon size={14} />
      </Btn>

      <Sep />

      {/* 표 */}
      <Btn
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
        isActive={isInTable}
        title="표 삽입"
      >
        <TableIcon size={14} />
      </Btn>

      {/* 표 안에 커서가 있을 때 표 조작 버튼 */}
      {isInTable && (
        <>
          <Sep />
          <Btn onClick={() => editor.chain().focus().addColumnBefore().run()} title="열 앞에 추가">
            <span className="font-mono text-[12px] leading-none">+←</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} title="열 뒤에 추가">
            <span className="font-mono text-[12px] leading-none">→+</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().deleteColumn().run()} title="열 삭제">
            <span className="font-mono text-[12px] leading-none">×|</span>
          </Btn>
          <Sep />
          <Btn onClick={() => editor.chain().focus().addRowBefore().run()} title="행 위에 추가">
            <span className="font-mono text-[12px] leading-none">+↑</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().addRowAfter().run()} title="행 아래에 추가">
            <span className="font-mono text-[12px] leading-none">↓+</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().deleteRow().run()} title="행 삭제">
            <span className="font-mono text-[12px] leading-none">×—</span>
          </Btn>
          <Sep />
          <Btn onClick={() => editor.chain().focus().deleteTable().run()} title="표 삭제">
            <Trash2 size={13} />
          </Btn>
        </>
      )}
    </div>
  );
}
