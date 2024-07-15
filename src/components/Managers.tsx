import { useMemo, useState } from "react";
import data from "../data.json";
import ManagerCard from "./ManagerCard";
import { Fund } from "../App";
type ManagersProps = {
  onShowManagers: (val: boolean) => void;
  filterDataByManager: (name: string) => void;
  selectManagers: (array: string[]) => void;
};

export default function Managers({
  onShowManagers,
  filterDataByManager,
  selectManagers,
}: ManagersProps) {
  const [currentLetter, setCurrentLetter] = useState("All");

  const uniqueLetters = useMemo(() => {
    const managersNames = data.reduce((acc: string[], current) => {
      if (current.manager_name) {
        return [...acc, current.manager_name];
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

  const uniqueManagerFunds = useMemo(() => {
    const managerMap = data.reduce((acc: Record<string, Fund>, fund: Fund) => {
      if (fund.manager_name && !acc[fund.manager_name]) {
        if (currentLetter === "All") {
          acc[fund.manager_name] = fund;
        } else if (
          fund.manager_name.toLowerCase().includes(currentLetter.toLowerCase())
        ) {
          acc[fund.manager_name] = fund;
        }
      }

      return acc;
    }, {});

    const fundsByManager = Object.values(managerMap);
    const managersSelected = Object.keys(managerMap);

    selectManagers(managersSelected);
    return fundsByManager;
  }, [currentLetter, selectManagers]);

  return (
    <div className="mb-10 border-b border-light-gray py-6 px-4">
      <div className="flex justify-between items-center pb-5">
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
          {uniqueLetters.map((letter) => (
            <button
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
      <div>
        <ul className="overflow-x-auto flex gap-4">
          {uniqueManagerFunds.map(
            ({ id, manager_image, manager_name, region }) => (
              <ManagerCard
                key={id}
                image={manager_image}
                name={manager_name!}
                region={region}
                onManagerClick={filterDataByManager}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
