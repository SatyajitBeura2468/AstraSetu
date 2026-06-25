import { staticDataProvider } from "@/data/providers/static-provider";
import { fail, ok } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const mission = staticDataProvider.getMission(slug);
    if (!mission) return fail("Mission not found", 404);
    return ok(mission);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unable to load mission");
  }
}
