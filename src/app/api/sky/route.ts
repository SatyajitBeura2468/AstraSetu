import { ok, fail } from "@/lib/api-response";
import { defaultLocation, skyPlanner } from "@/lib/sky";

export function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    const label = url.searchParams.get("label") ?? defaultLocation.label;
    const latitude = Number(url.searchParams.get("lat") ?? defaultLocation.latitude);
    const longitude = Number(url.searchParams.get("lng") ?? defaultLocation.longitude);
    return ok(
      skyPlanner(date ? new Date(date) : new Date(), {
        label,
        latitude: Number.isFinite(latitude) ? latitude : defaultLocation.latitude,
        longitude: Number.isFinite(longitude) ? longitude : defaultLocation.longitude,
      }),
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unable to calculate sky plan");
  }
}
