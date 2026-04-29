"use client";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema/login-schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import useStore from "@/shared/store/useStore";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { CardDescription, CardTitle } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";

export default function LoginForm() {
  const ref = useRef<boolean>(false);
  const [lock, setLock] = useState(false);
  const { setAuth } = useStore();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (formData: z.infer<typeof loginSchema>) => {
      const supabase = createClient();

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: formData.user_id,
          password: formData.user_password,
        });

      if (loginError || !loginData?.session) {
        throw new Error(
          "정보가 일치하지 않거나 존재하지 않는 사용자 입니다."
        );
      }

      const userEmail = loginData.session.user.email;

      const { data: adminData } = await supabase
        .from("admin")
        .select("nickname, role")
        .eq("email", userEmail)
        .single();

      return {
        id: loginData.session.user.id,
        email: userEmail ?? null,
        nickname: adminData?.nickname ?? null,
        role: adminData?.role ?? null,
      };
    },
    onSuccess: (userData) => {
      toast.success("로그인 되었습니다.");
      setAuth(userData);
      router.push(ROUTES.HOME);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      user_id: "",
      user_password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = (loginData: z.infer<typeof loginSchema>) => {
    if (ref.current) return;
    setLock(true);
    ref.current = true;
    mutate(loginData);

    setTimeout(() => {
      ref.current = false;
      setLock(false);
    }, 2000);
  };

  return (
    <section className="max-w-[600px] w-full mx-auto">
      <div className="mb-4 flex flex-col gap-2 py-5">
        <CardTitle className="text-3xl text-center">PORTFOLIO</CardTitle>
        <CardDescription className="text-center">Admin</CardDescription>
        <div className="border-y py-4 border-border mt-4">
          <div className="text-xs text-indigo-200 gap-2 text-center">
            해당 PORTFOLIO는 권한이 인가 된 사용자만 사용가능합니다.
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Admin Id"
                    className="py-3 px-3 border-0 border-b focus-visible:ring-0 transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="user_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="password"
                    className="py-3 px-3 border-0 border-b focus-visible:ring-0 transition-all"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={lock} className="w-full p-6">
            Login
          </Button>
        </form>
      </Form>
    </section>
  );
}
