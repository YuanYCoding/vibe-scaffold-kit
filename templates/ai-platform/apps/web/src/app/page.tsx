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

export default async function Home() {
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
  const apiUrl = process.env.API_URL ?? publicApiUrl;
  const health = await fetch(`${apiUrl}/api/v1/health`, { cache: "no-store" })
    .then((response) => (response.ok ? "API 与数据库正常" : "API 暂不可用"))
    .catch(() => "API 尚未启动");

  return (
    <main className="grid min-h-screen place-items-center bg-muted/30 px-6 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <Badge className="mb-3" variant="outline">
            AI / Data Platform · shadcn/ui
          </Badge>
          <CardTitle className="text-4xl tracking-tight sm:text-5xl">
            __PROJECT_TITLE__ 已经可以开工。
          </CardTitle>
          <CardDescription className="max-w-2xl text-base">
            Next.js 负责产品体验，FastAPI、Celery、PostgreSQL 和 Python 生态负责
            AI、爬虫与数据管线。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{health}</Badge>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={`${publicApiUrl}/api/v1/health`}>API 健康检查</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`${publicApiUrl}/docs`}>OpenAPI</a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
