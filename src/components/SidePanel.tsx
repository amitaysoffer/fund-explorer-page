import { useMemo } from "react";
import data from "../data.json";
import { reduceValues } from "../util";
import Radio from "./Radio";

type SidePanelProps = {
  onShowManagers: (val: boolean) => void;
  showManagers: boolean;
  handleFilterRegionRadioClick: (category: string) => void;
  handleFilterDomicileRadioClick: (category: string) => void;
  selectedFiltersRegion: string[];
  selectedFiltersDomicile: string[];
};

export default function SidePanel({
  onShowManagers,
  showManagers,
  handleFilterRegionRadioClick,
  handleFilterDomicileRadioClick,
  selectedFiltersRegion,
  selectedFiltersDomicile,
}: SidePanelProps) {
  const domiciles = useMemo(() => {
    return reduceValues(data, "domicile");
  }, []);
  const regions = useMemo(() => {
    return reduceValues(data, "region");
  }, []);

  return (
    <div className="w-96 flex flex-col gap-5 items-start">
      <h2 className="text-5xl">Filter</h2>
      <div>
        <Radio
          categories={regions}
          label="region"
          handleFilterRadioClick={handleFilterRegionRadioClick}
          selectedFilters={selectedFiltersRegion}
        />
        <Radio
          categories={domiciles}
          label="domicile"
          handleFilterRadioClick={handleFilterDomicileRadioClick}
          selectedFilters={selectedFiltersDomicile}
        />
      </div>
      {!showManagers && (
        <button
          onClick={() => onShowManagers(true)}
          className="p-4 bg-white rounded-full"
        >
          Show Managers
        </button>
      )}
    </div>
  );
}
