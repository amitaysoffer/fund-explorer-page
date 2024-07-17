import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import data from "../../src/data.json";
import ListView from "../../src/components/ListView";

describe("ListView component", () => {
  it("should render all funds with no filters", () => {
    const handleSortClick = vi.fn();
    render(<ListView funds={data} handleSortClick={handleSortClick} />);

    const funds = screen.getAllByTestId("fund");

    expect(funds).toHaveLength(13);
  });
});
