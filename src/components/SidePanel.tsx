import RightArrow from "../assets/icons/RightArrow";
import data from "../data.json";
import { Fund } from "../types/funds";
import { getFundsCategories } from "../util";
import Radio from "./Radio";

type SidePanelProps = {
  onShowManagers: (val: boolean) => void;
  showManagers: boolean;
  handleFilterByRegion: (category: string) => void;
  handleFilterByDomicile: (category: string) => void;
  selectedRegions: string[];
  selectedDomiciles: string[];
  funds: Fund[];
  selectedManagers: string[];
  clearAll: () => void;
};

export default function SidePanel({
  onShowManagers,
  showManagers,
  handleFilterByRegion,
  handleFilterByDomicile,
  selectedRegions,
  selectedDomiciles,
  funds,
  selectedManagers,
  clearAll,
}: SidePanelProps) {
  const regions = getFundsCategories(data, "region");
  const domiciles = getFundsCategories(data, "domicile");

  return (
    <div className="w-96 flex flex-col gap-5 items-start">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-light">Filter</h2>
        {(selectedRegions.length > 0 || selectedDomiciles.length > 0) && (
          <button
            onClick={clearAll}
            className="bg-red-700 text-white px-3 py-2"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize">Region</h3>
          {regions.map((region, index) => (
            <Radio
              key={index}
              filter={region}
              category="region"
              onClick={handleFilterByRegion}
              selectedFilters={selectedRegions}
              funds={funds}
              selectedManagers={selectedManagers}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <h3 className="capitalize">Domicile</h3>
          {domiciles.map((domicile, index) => (
            <Radio
              key={index}
              filter={domicile}
              category="domicile"
              onClick={handleFilterByDomicile}
              selectedFilters={selectedDomiciles}
              funds={funds}
              selectedManagers={selectedManagers}
            />
          ))}
        </div>
      </div>
      {!showManagers && (
        <button
          onClick={() => onShowManagers(true)}
          className="px-5 py-3 bg-white rounded-full"
        >
          <div className="flex items-center gap-3">
            <span>Show Managers</span>
            <div className="text-white bg-teal-500 rounded-full p-2">
              <RightArrow />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
