"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
  const [message, setMessage] = useState("");
  const submit = async (formData: FormData) => {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "New User");
    const result = await authClient.signUp.email({ email, password, name });
    setMessage(result.error?.message ?? "注册成功");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 px-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">创建本地账号</CardTitle>
          <CardDescription>用于验证本地用户系统和 PostgreSQL 数据写入。</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">姓名</FieldLabel>
                <Input autoComplete="name" id="name" name="name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">邮箱</FieldLabel>
                <Input autoComplete="email" id="email" name="email" required type="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">密码</FieldLabel>
                <Input
                  autoComplete="new-password"
                  id="password"
                  minLength={8}
                  name="password"
                  required
                  type="password"
                />
              </Field>
              <Button className="w-full" type="submit">
                注册
              </Button>
              {message ? (
                <p className="text-sm text-muted-foreground" role="status">
                  {message}
                </p>
              ) : null}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
