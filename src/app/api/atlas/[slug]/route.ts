import { staticDataProvider } from "@/data/providers/static-provider";
import { fail, ok } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const object = staticDataProvider.getAtlasObject(slug);
    if (!object) return fail("Object not found", 404);
    return ok(object);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unable to load atlas object");
  }
}
