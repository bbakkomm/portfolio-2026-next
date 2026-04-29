"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { Button } from "@/shared/ui/button";
import SummaryItem from "./SummaryItem";

export default function ProjectSummary() {
  const { control, formState } =
    useFormContext<z.infer<typeof projectSchema>>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "surmmry",
  });

  const onClickHandler = () => {
    append({
      title: "",
      contents: "",
    });
  };

  const removeItem = (idx: number) => remove(idx);

  return (
    <article className="flex flex-col gap-3">
      {fields.map((e, idx) => (
        <SummaryItem
          key={e.id}
          idx={idx}
          onDelete={removeItem}
          error={!!formState.errors.surmmry?.[idx]}
        />
      ))}

      <div>
        <Button
          type="button"
          variant="ghost"
          className="border border-foreground/30 text-xs"
          onClick={onClickHandler}
        >
          + 추가
        </Button>
      </div>
    </article>
  );
}
