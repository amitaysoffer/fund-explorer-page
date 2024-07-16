import { useMemo, useState } from "react";
import data from "../data.json";
import ManagerCard from "./ManagerCard";
import Letters from "./Letters";
import ManagersLabels from "./ManagersLabels";
import { Fund } from "../types/funds";

type ManagersProps = {
  onShowManagers: (val: boolean) => void;
  handleFilterByManager: (category: string) => void;
  selectedManagers: string[];
  clearAll: () => void;
};

export default function Managers({
  onShowManagers,
  handleFilterByManager,
  selectedManagers,
  clearAll,
}: ManagersProps) {
  const [currentLetter, setCurrentLetter] = useState("All");

  const uniqueFundsPerManager = useMemo(() => {
    const managerMap = data.reduce((acc: Record<string, Fund>, fund: Fund) => {
      if (
        fund.data.manager.fund_manager &&
        !acc[fund.data.manager.fund_manager]
      ) {
        if (currentLetter === "All") {
          acc[fund.data.manager.fund_manager] = fund;
        } else if (
          fund.data.manager.fund_manager
            .toLowerCase()
            .includes(currentLetter.toLowerCase())
        ) {
          acc[fund.data.manager.fund_manager] = fund;
        }
      }

      return acc;
    }, {});

    return Object.values(managerMap);
  }, [currentLetter]);

  return (
    <div>
      <div className="mb-6 border-b border-light-gray py-6 px-6">
        <Letters
          setCurrentLetter={setCurrentLetter}
          currentLetter={currentLetter}
          onShowManagers={onShowManagers}
        />
        <div>
          <ul className="overflow-x-auto flex gap-4">
            {uniqueFundsPerManager.map(
              ({
                id,
                data: {
                  manager: { manager_image, fund_manager: name },
                  details: { region },
                },
              }) => (
                <ManagerCard
                  key={id}
                  image={manager_image}
                  name={name!}
                  region={region}
                  filterManager={handleFilterByManager}
                  selectedManagers={selectedManagers}
                />
              )
            )}
          </ul>
        </div>
        <ManagersLabels
          filterManager={handleFilterByManager}
          managers={selectedManagers}
          clearAll={clearAll}
        />
      </div>
    </div>
  );
}
