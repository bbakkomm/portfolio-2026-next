"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import {
  deleteBlogAction,
  toggleBlogStatusAction,
} from "@/features/blog/api/blog-actions";
import type { BlogPostListItem } from "@/entities/blog/model";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/shared/ui/alert-dialog";

export default function AdminBlogRow({ post }: { post: BlogPostListItem }) {
  const [isStatusPending, startStatusTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleToggleStatus = () => {
    startStatusTransition(async () => {
      await toggleBlogStatusAction(post.id, post.status, post.slug);
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteBlogAction(post.id, post.slug);
    });
  };

  return (
    <li className="py-3 px-3 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "shrink-0 text-[10px] px-1.5 py-0.5 rounded-full border",
            post.status === "published"
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
          )}
        >
          {post.status === "published" ? "공개" : "임시저장"}
        </span>
        <Link
          href={post.status === "published" ? `/blog/${post.slug}` : "#"}
          className="hover:underline text-sm truncate"
          onClick={(e) => post.status !== "published" && e.preventDefault()}
        >
          {post.title}
        </Link>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button
          onClick={handleToggleStatus}
          className={cn(
            "text-xs",
            post.status === "published" && "border-emerald-500/50 text-emerald-300"
          )}
          variant="outline"
          size="sm"
          disabled={isStatusPending}
        >
          {isStatusPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : post.status === "published" ? (
            "비공개"
          ) : (
            "공개"
          )}
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/admin/blog/${post.id}/edit`}>수정</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={isDeletePending}
              className="text-xs"
            >
              {isDeletePending ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                "삭제"
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>글을 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                삭제된 글은 복구할 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
