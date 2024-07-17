import { Category, Fund, sortOrder } from "../types/funds";

export function sortFunds(funds: Fund[], order: sortOrder) {
  return funds.sort((a, b) => {
    if (order === "asc") {
      return a.data.fund_name.localeCompare(b.data.fund_name);
    } else {
      return b.data.fund_name.localeCompare(a.data.fund_name);
    }
  });
}

export function getFundsCategories(data: Fund[], key: Category) {
  return data.reduce((acc: string[], current: Fund) => {
    if (!acc.includes(current.data.details[key])) {
      return [...acc, current.data.details[key]];
    }

    return acc;
  }, []) as string[];
}

export function regionColourPicker(region: string) {
  switch (region.toLowerCase()) {
    case "uk":
      return "border-uk-colour";
    case "asia":
      return "border-asia-colour";
    case "europe":
      return "border-europe-colour";
    case "global":
      return "border-global-colour";
    case "emerging markets":
      return "border-emerging-colour";
    default:
      return "border-uk-colour";
  }
}
