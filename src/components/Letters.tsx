import { useMemo } from "react";
import data from "../data.json";

type LettersProps = {
  onShowManagers: (val: boolean) => void;
  setCurrentLetter: (value: string) => void;
  currentLetter: string;
};

export default function Letters({
  setCurrentLetter,
  currentLetter,
  onShowManagers,
}: LettersProps) {
  const uniqueLetters = useMemo(() => {
    const managersNames = data.reduce((acc: string[], current) => {
      if (current.data.manager.fund_manager) {
        return [...acc, current.data.manager.fund_manager];
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

  return (
    <div className="flex justify-between items-center pb-5 overflow-x-hidden">
      <h3 className="italic font-semibold">Filter by manager</h3>
      <ol className="flex gap-4">
        <button
          onClick={() => setCurrentLetter("All")}
          className={`
            p-2 rounded-full w-8 h-8 justify-center items-center flex
            ${currentLetter === "All" ? "bg-red-500 text-white" : ""}
            `}
        >
          <span>All</span>
        </button>
        {uniqueLetters.map((letter, index) => (
          <button
            key={index}
            onClick={() => setCurrentLetter(letter)}
            className={`
            p-2 rounded-full w-8 h-8 justify-center items-center flex
            ${currentLetter === letter ? "bg-red-500 text-white" : ""}
            `}
          >
            <span>{letter}</span>
          </button>
        ))}
      </ol>
      <button onClick={() => onShowManagers(false)}>X</button>
    </div>
  );
}
