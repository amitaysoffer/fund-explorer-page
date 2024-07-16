import { useMemo } from "react";
import data from "../data.json";

export default function useUniqueLetters() {
  const uniqueLetters = useMemo(() => {
    const managersNames = data.reduce((acc: string[], current) => {
      const manager = current.data.manager.fund_manager;
      if (manager) {
        return [...acc, manager];
      }

      return acc;
    }, []);

    const letterMap: Record<string, boolean> = {};

    managersNames.forEach((name) => {
      for (const letter of name) {
        const upperLetter = letter.trim().toUpperCase();

        if (upperLetter >= "A" && upperLetter <= "Z") {
          letterMap[upperLetter] = true;
        }
      }
    });

    return Object.keys(letterMap).sort();
  }, []);

  return uniqueLetters;
}
