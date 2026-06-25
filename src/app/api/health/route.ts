import { ok } from "@/lib/api-response";

export function GET() {
  return ok({
    service: "AstraSetu",
    status: "nominal",
    mode: "local-first demo",
    data: "No environment variables required",
  });
}
