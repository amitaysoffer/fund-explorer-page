import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../src/App";

describe("App component", () => {
  let user: UserEvent;
  let input: HTMLInputElement;
  let checkboxUK: HTMLInputElement;
  let checkboxDublin: HTMLInputElement;
  let checkboxLondon: HTMLInputElement;

  beforeEach(() => {
    render(<App />);
    user = userEvent.setup();
    input = screen.getByRole("textbox", { name: "search" });
    checkboxUK = screen.getByRole("checkbox", { name: /uk/i });
    checkboxDublin = screen.getByRole("checkbox", { name: /dublin/i });
    checkboxLondon = screen.getByRole("checkbox", { name: /london/i });
  });

  function getFunds() {
    return screen.getAllByTestId("fund");
  }

  function filterFundsByText(fundsElements: HTMLElement[], text: string) {
    return fundsElements.filter((fund) =>
      fund.textContent?.toLowerCase().includes(text)
    );
  }

  it("displays all funds", () => {
    const funds = getFunds();
    expect(funds).toHaveLength(13);
  });
  it("displays a not found message", async () => {
    await user.type(input, "blah blah");

    const notFoundHeading = await screen.findByRole("heading", {
      name: /no funds/i,
    });

    expect(notFoundHeading).toBeInTheDocument();
  });
  it("displays only funds of region asia", async () => {
    await user.type(input, "asia");
    const funds = getFunds();
    const fundsWithRegionAsia = filterFundsByText(funds, "asia");

    expect(funds).toHaveLength(2);
    expect(fundsWithRegionAsia).toHaveLength(2);
  });
  it("displays all funds after clears input", async () => {
    await user.type(input, "opportunities");
    await user.clear(input);
    const funds = getFunds();

    expect(funds).toHaveLength(13);
  });
  it("displays funds with region UK and input text opportunities", async () => {
    await user.type(input, "opportunities");
    await user.click(checkboxUK);

    const funds = getFunds();
    const fundsTextUKAndOpportunities = funds.filter(
      (fund) =>
        fund.textContent?.toLowerCase().includes("uk") &&
        fund.textContent?.toLowerCase().includes("opportunities")
    );

    expect(funds).toHaveLength(1);
    expect(fundsTextUKAndOpportunities).toHaveLength(1);
  });
  it("displays only funds region UK", async () => {
    await user.click(checkboxUK);

    const funds = getFunds();
    const fundsTextUK = filterFundsByText(funds, "uk");

    expect(funds).toHaveLength(5);
    expect(fundsTextUK).toHaveLength(5);
  });
  it("displays all funds after second click on same filter", async () => {
    await user.click(checkboxUK);
    await user.click(checkboxUK);

    const funds = getFunds();

    expect(funds).toHaveLength(13);
  });
  it("displays only funds regions UK and Europe", async () => {
    const checkboxEurope = screen.getByRole("checkbox", { name: /europe/i });

    await user.click(checkboxUK);
    await user.click(checkboxEurope);

    const funds = getFunds();
    const fundsTextUKAndEurope = funds.filter(
      (fund) =>
        fund.textContent?.toLowerCase().includes("uk") ||
        fund.textContent?.toLowerCase().includes("europe")
    );

    expect(funds).toHaveLength(7);
    expect(fundsTextUKAndEurope).toHaveLength(7);
  });
  it("displays only funds domicile London", async () => {
    await user.click(checkboxLondon);

    const funds = getFunds();
    const fundsTextLondon = filterFundsByText(funds, "london");

    expect(funds).toHaveLength(4);
    expect(fundsTextLondon).toHaveLength(4);
  });
  it("displays only funds domiciles London and Dublin", async () => {
    await user.click(checkboxLondon);
    await user.click(checkboxDublin);

    const funds = getFunds();
    const fundsTextLondon = filterFundsByText(funds, "london");
    const fundsTextDublin = filterFundsByText(funds, "dublin");
    const fundsTextLondonAndDublin = [...fundsTextLondon, ...fundsTextDublin];

    expect(funds).toHaveLength(13);
    expect(fundsTextLondonAndDublin).toHaveLength(13);
  });
  it("displays only funds region UK and domicile Dublin", async () => {
    await user.click(checkboxUK);
    await user.click(checkboxDublin);

    const funds = getFunds();
    const fundsTextUKAndDublin = funds.filter(
      (fund) =>
        fund.textContent?.toLowerCase().includes("uk") &&
        fund.textContent?.toLowerCase().includes("dublin")
    );

    expect(funds).toHaveLength(2);
    expect(fundsTextUKAndDublin).toHaveLength(2);
  });
  it("clears all filters and displays all funds", async () => {
    await user.click(checkboxUK);
    await user.click(checkboxDublin);

    const clearAllButton = await screen.findByRole("button", {
      name: /clear/i,
    });
    await user.click(clearAllButton);

    const funds = getFunds();
    expect(checkboxUK).not.toBeChecked();
    expect(checkboxDublin).not.toBeChecked();
    expect(funds).toHaveLength(13);
  });
  it("displays managers cards", async () => {
    const showManagersButton = screen.getByRole("button", {
      name: /show managers/i,
    });

    await user.click(showManagersButton);
    const managers = await screen.findAllByTestId("manager");

    expect(managers.length).toBeGreaterThan(0);
  });
  it("displays funds of selected manager and add css shadow to selected manager card", async () => {
    const showManagersButton = screen.getByRole("button", {
      name: /show managers/i,
    });

    await user.click(showManagersButton);

    const managerCardButton = screen.getByRole("button", {
      name: /clive beagles/i,
    });

    expect(managerCardButton).not.toHaveClass("shadow-2xl");

    await user.click(managerCardButton);

    const funds = getFunds();

    expect(managerCardButton).toHaveClass("shadow-2xl");
    expect(funds).toHaveLength(2);
  });
  it("displays funds of selected managers", async () => {
    const showManagersButton = screen.getByRole("button", {
      name: /show managers/i,
    });

    await user.click(showManagersButton);

    const managerOneCardButton = screen.getByRole("button", {
      name: /clive beagles/i,
    });
    const managerTwoCardButton = screen.getByRole("button", {
      name: /ada chan/i,
    });

    await user.click(managerOneCardButton);
    await user.click(managerTwoCardButton);

    const funds = getFunds();

    expect(funds).toHaveLength(3);
  });
  it("toggles between list and grid view", async () => {
    let listView = screen.getByTestId("list-view");
    const gridTabButton = screen.getByRole("button", {
      name: /grid view/i,
    });
    const listTabButton = screen.getByRole("button", {
      name: /list view/i,
    });

    expect(listView).toBeInTheDocument();

    await user.click(gridTabButton);

    const gridView = screen.getByTestId("grid-view");
    expect(gridView).toBeInTheDocument();

    await user.click(listTabButton);
    listView = screen.getByTestId("list-view");
    expect(listView).toBeInTheDocument();
  });
});
