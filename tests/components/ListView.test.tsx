import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import data from "../../src/data.json";
import ListView from "../../src/components/ListView";

describe("ListView component", () => {
  it("should render all funds with no filters", () => {
    render(<ListView funds={data} />);

    const funds = screen.getAllByTestId("fund");

    expect(funds).toHaveLength(13);
  });
});
