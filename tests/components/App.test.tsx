import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../src/App";

describe("App component", () => {
  let user: UserEvent;

  beforeEach(() => {
    render(<App />);
    user = userEvent.setup();
  });

  function getFunds() {
    return screen.getAllByTestId("fund");
  }

  function filterFundsByText(funds: HTMLElement[], text: string) {
    return funds.filter((fund) =>
      fund.textContent?.toLowerCase().includes(text)
    );
  }

  it("displays all funds", () => {
    const funds = getFunds();
    expect(funds).toHaveLength(13);
  });
  it("displays a not found message", async () => {
    const input = screen.getByRole("textbox", { name: "search" });
    await user.type(input, "blah blah");

    const notFoundHeading = await screen.findByRole("heading", {
      name: /no funds/i,
    });

    expect(notFoundHeading).toBeInTheDocument();
  });
  it("displays only funds of region asia", async () => {
    const input = screen.getByRole("textbox", { name: "search" });

    await user.type(input, "asia");
    let funds = await screen.findAllByTestId("fund");
    const fundsWithRegionAsia = filterFundsByText(funds, "asia");

    expect(funds).toHaveLength(2);
    expect(fundsWithRegionAsia).toHaveLength(2);

    await user.clear(input);
    funds = await screen.findAllByTestId("fund");
    expect(funds).toHaveLength(13);
  });
  it("displays only funds UK or Europe", async () => {
    const inputUK = screen.getByRole("checkbox", { name: "UK" });
    const inputEurope = screen.getByRole("checkbox", { name: "Europe" });

    await user.click(inputUK);

    let funds = await screen.findAllByTestId("fund");
    const fundsTextUK = filterFundsByText(funds, "uk");

    expect(funds).toHaveLength(5);
    expect(fundsTextUK).toHaveLength(5);

    await user.click(inputEurope);
    funds = await screen.findAllByTestId("fund");
    const fundsTextUKOrEurope = funds.filter(
      (fund) =>
        fund.textContent?.toLowerCase().includes("uk") ||
        fund.textContent?.toLowerCase().includes("europe")
    );

    expect(funds).toHaveLength(7);
    expect(fundsTextUKOrEurope).toHaveLength(7);
  });
  it("displays only funds London and/or Dublin", async () => {
    const inputLondon = screen.getByRole("checkbox", { name: "London" });
    const inputDublin = screen.getByRole("checkbox", { name: "Dublin" });

    await user.click(inputLondon);

    let funds = await screen.findAllByTestId("fund");
    const fundsTextLondon = filterFundsByText(funds, "london");

    expect(funds).toHaveLength(4);
    expect(fundsTextLondon).toHaveLength(4);

    await user.click(inputDublin);
    funds = await screen.findAllByTestId("fund");
    expect(funds).toHaveLength(13);
  });
  it("displays only region UK and domicile Dublin", async () => {
    const inputUK = screen.getByRole("checkbox", { name: "UK" });
    const inputDublin = screen.getByRole("checkbox", { name: "Dublin" });

    await user.click(inputUK);
    await user.click(inputDublin);

    const funds = await screen.findAllByTestId("fund");
    const fundsTextUKAndDublin = funds.filter(
      (fund) =>
        fund.textContent?.toLowerCase().includes("uk") &&
        fund.textContent?.toLowerCase().includes("dublin")
    );

    expect(funds).toHaveLength(2);
    expect(fundsTextUKAndDublin).toHaveLength(2);
  });
  it("displays managers section and funds per manager clicked", async () => {
    const showManagersButton = screen.getByRole("button", {
      name: /show managers/i,
    });

    let managerHeading = screen.queryByRole("heading", {
      name: /filter by manager/i,
    });
    expect(managerHeading).not.toBeInTheDocument();

    await user.click(showManagersButton);
    managerHeading = screen.getByRole("heading", {
      name: /filter by manager/i,
    });

    expect(managerHeading).toBeInTheDocument();

    // Click on first manager
    const managerOne = screen.getByRole("button", { name: /vishal bhatia/i });
    await user.click(managerOne);
    let funds = getFunds();
    expect(funds).toHaveLength(2);

    // Click on second manager
    const managerTwo = screen.getByRole("button", { name: /ada chan/i });
    await user.click(managerTwo);
    funds = await screen.findAllByTestId("fund");
    expect(funds).toHaveLength(3);
  });
});
