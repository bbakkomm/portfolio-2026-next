"use client";

import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { FormField, FormItem, FormMessage } from "@/shared/ui/form";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { control, formState } =
    useFormContext<z.infer<typeof projectSchema>>();

  return (
    <FormField
      control={control}
      name="workRange"
      render={({ field }) => (
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                id="date"
                variant="ghost"
                className={cn(
                  "justify-start rounded-sm border text-left font-normal w-full",
                  !field.value?.start && "text-muted-foreground",
                  formState.errors.workRange && "border-destructive"
                )}
              >
                <CalendarIcon className={cn("mr-2 h-4 w-4")} />
                {field.value?.start ? (
                  field.value?.end ? (
                    <>
                      {format(field.value.start, "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}{" "}
                      -{" "}
                      {format(field.value.end, "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}
                    </>
                  ) : (
                    format(field.value.start, "yyyy년 MM월 dd일", {
                      locale: ko,
                    })
                  )
                ) : (
                  <span>작업 기간을 설정해 주세요</span>
                )}
              </Button>
            </PopoverTrigger>
            {formState.errors.workRange && (
              <FormMessage className="text-left mt-3">
                {formState.errors.workRange.message}
              </FormMessage>
            )}
            <PopoverContent className="w-auto p-0" align="start">
              <FormItem className="w-full">
                <Calendar
                  locale={ko}
                  mode="range"
                  captionLayout="dropdown"
                  startMonth={new Date(2015, 0)}
                  endMonth={new Date(new Date().getFullYear(), 11)}
                  selected={{
                    from: field.value?.start ?? undefined,
                    to: field.value?.end ?? undefined,
                  }}
                  onSelect={(range) => {
                    field.onChange({
                      start: range?.from ?? null,
                      end: range?.to ?? null,
                    });
                  }}

                />
              </FormItem>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
