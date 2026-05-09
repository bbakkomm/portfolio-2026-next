"use client";

import { useState, useTransition } from "react";
import { Loader2, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { toast } from "sonner";
import type { BlogCategory } from "@/entities/blog/model";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "@/features/blog/api/blog-category-actions";
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

export default function AdminCategoryManager({
  initialCategories,
}: {
  initialCategories: BlogCategory[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!newName.trim() || !newSlug.trim()) return;
    startTransition(async () => {
      try {
        const created = await createCategoryAction(newName.trim(), newSlug.trim());
        setCategories((prev) => [...prev, created]);
        setNewName("");
        setNewSlug("");
        setIsAdding(false);
        toast.success("카테고리가 추가되었습니다.");
      } catch (e) {
        toast.error((e as Error).message);
      }
    });
  };

  const handleUpdate = (id: number) => {
    if (!editName.trim() || !editSlug.trim()) return;
    startTransition(async () => {
      try {
        await updateCategoryAction(id, editName.trim(), editSlug.trim());
        setCategories((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, name: editName.trim(), slug: editSlug.trim() } : c
          )
        );
        setEditingId(null);
        toast.success("카테고리가 수정되었습니다.");
      } catch (e) {
        toast.error((e as Error).message);
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteCategoryAction(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("카테고리가 삭제되었습니다.");
      } catch (e) {
        toast.error((e as Error).message);
      }
    });
  };

  const startEdit = (cat: BlogCategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-0">
        <h3 className="text-base text-foreground/70">카테고리 관리</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsAdding(true);
            setNewName("");
            setNewSlug("");
          }}
        >
          <Plus className="size-3 mr-1" />
          추가
        </Button>
      </div>

      {isAdding && (
        <div className="flex items-center gap-2 py-2 px-3 border-b border-border bg-foreground/5">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="카테고리명"
            className="h-7 text-xs w-32"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Input
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="slug (영문)"
            className="h-7 text-xs w-36 font-mono"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button size="sm" variant="ghost" onClick={handleAdd} disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Check className="size-3 text-emerald-400" />
            )}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
            <X className="size-3" />
          </Button>
        </div>
      )}

      {categories.length === 0 ? (
        <p className="text-foreground/50 text-xs py-3 px-3">카테고리가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-border">
          {categories.map((cat) => (
            <li key={cat.id} className="py-2.5 px-3 flex items-center justify-between">
              {editingId === cat.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-7 text-xs w-32"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                  />
                  <Input
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="h-7 text-xs w-36 font-mono"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleUpdate(cat.id)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Check className="size-3 text-emerald-400" />
                    )}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    <X className="size-3" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{cat.name}</span>
                    <span className="text-xs text-foreground/40 font-mono">{cat.slug}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(cat)}
                      className="h-7 w-7 p-0"
                    >
                      <Pencil className="size-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isPending}
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>카테고리를 삭제하시겠습니까?</AlertDialogTitle>
                          <AlertDialogDescription>
                            해당 카테고리가 적용된 글은 카테고리 없음 상태로 변경됩니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(cat.id)}>
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
