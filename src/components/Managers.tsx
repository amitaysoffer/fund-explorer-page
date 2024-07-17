import { useState } from "react";
import data from "../data.json";
import ManagerCard from "./ManagerCard";
import Letters from "./Letters";
import ManagersLabels from "./ManagersLabels";
import { Fund } from "../types/funds";

type ManagersProps = {
  onShowManagers: (val: boolean) => void;
  handleFilterByManager: (category: string) => void;
  selectedManagers: string[];
  clearAllManagers: () => void;
};

export default function Managers({
  onShowManagers,
  handleFilterByManager,
  selectedManagers,
  clearAllManagers,
}: ManagersProps) {
  const [currentLetter, setCurrentLetter] = useState("All");

  const uniqueFundsPerManager = Object.values(
    data.reduce((acc: Record<string, Fund>, fund: Fund) => {
      if (
        fund.data.manager.fund_manager &&
        !acc[fund.data.manager.fund_manager]
      ) {
        if (currentLetter === "All") {
          acc[fund.data.manager.fund_manager] = fund;
        } else if (
          fund.data.manager.fund_manager[0]
            .toLowerCase()
            .includes(currentLetter.toLowerCase())
        ) {
          acc[fund.data.manager.fund_manager] = fund;
        }
      }

      return acc;
    }, {})
  );

  return (
    <section>
      <div className="mb-6 border-b border-light-gray py-6 px-8">
        <Letters
          setCurrentLetter={setCurrentLetter}
          currentLetter={currentLetter}
          onShowManagers={onShowManagers}
          clearAllManagers={clearAllManagers}
        />
        <div>
          <div className="overflow-x-auto flex gap-5 pb-2">
            {uniqueFundsPerManager.map(
              ({
                data: {
                  manager: {
                    manager_image,
                    fund_manager: name,
                    manager_id: id,
                  },
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
          </div>
        </div>
        <ManagersLabels
          filterManager={handleFilterByManager}
          managers={selectedManagers}
          clearAllManagers={clearAllManagers}
        />
      </div>
    </section>
  );
}
