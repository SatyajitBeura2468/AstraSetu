import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LaunchExperience } from "@/features/launch/launch-experience";

describe("route rendering", () => {
  it("renders the launch route with primary actions", () => {
    render(<LaunchExperience />);
    expect(screen.getByRole("heading", { name: "AstraSetu" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Enter Command Deck/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore the Cosmos/i })).toBeInTheDocument();
  });
});
