import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 px-6 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <Badge className="mb-3" variant="outline">
            Web Lite · shadcn/ui
          </Badge>
          <CardTitle className="text-4xl tracking-tight sm:text-5xl">
            __PROJECT_TITLE__ 已经可以开工。
          </CardTitle>
          <CardDescription className="max-w-2xl text-base">
            Next.js、PostgreSQL、Prisma、Better Auth、Tailwind CSS 和 shadcn/ui 已准备好。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            从用户系统和核心业务流程开始，数据库变更通过 Prisma Migration 进入 Git。
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/auth">测试用户系统</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/api/health">健康检查</a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
