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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3001";

  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 px-6 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <Badge className="mb-3" variant="outline">
            TypeScript Platform · shadcn/ui
          </Badge>
          <CardTitle className="text-4xl tracking-tight sm:text-5xl">
            __PROJECT_TITLE__ 已准备好扩展。
          </CardTitle>
          <CardDescription className="max-w-2xl text-base">
            Next.js、NestJS、Prisma/PostgreSQL、Redis、BullMQ、Tailwind CSS 与 shadcn/ui
            已完成分层。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Web 负责产品体验，API 负责业务规则，Worker 负责可靠的后台任务。
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={`${apiUrl}/api/v1/health`}>API 健康检查</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`${apiUrl}/docs`}>OpenAPI</a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
