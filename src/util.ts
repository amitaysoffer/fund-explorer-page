import { Category, Fund } from "./types/funds";

export function getFundsCategories(data: Fund[], key: Category) {
  return data.reduce((acc: string[], current: Fund) => {
    if (!acc.includes(current.data.details[key])) {
      return [...acc, current.data.details[key]];
    }

    return acc;
  }, []) as string[];
}
