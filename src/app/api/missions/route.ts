import { staticDataProvider } from "@/data/providers/static-provider";
import { fail, ok } from "@/lib/api-response";

export function GET() {
  try {
    return ok(staticDataProvider.listMissions());
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unable to load missions");
  }
}
