import CloseIcon from "../assets/icons/CloseIcon";
import RightArrow from "../assets/icons/RightArrow";
import data from "../data.json";
import { Fund } from "../types/funds";
import { getFundsCategories } from "../util";
import CheckboxFilter from "./CheckboxFilter";

type SidePanelProps = {
  onShowManagers: (val: boolean) => void;
  showManagers: boolean;
  handleFilterByRegion: (category: string) => void;
  handleFilterByDomicile: (category: string) => void;
  selectedRegions: string[];
  selectedDomiciles: string[];
  funds: Fund[];
  selectedManagers: string[];
  clearAllFilters: () => void;
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
  clearAllFilters,
}: SidePanelProps) {
  const regions = getFundsCategories(data, "region").sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  const domiciles = getFundsCategories(data, "domicile").sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return (
    <aside className="flex flex-col gap-5 items-start pr-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-light">Filter</h2>
        {(selectedRegions.length > 0 || selectedDomiciles.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="bg-red-700 text-white py-1 px-2 flex gap-2 items-center"
          >
            <CloseIcon />
            <span className="text-sm">Clear all</span>
          </button>
        )}
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <h3 className="capitalize">Region</h3>
          {regions.map((region, index) => (
            <CheckboxFilter
              key={index}
              label={region}
              category="region"
              onClick={handleFilterByRegion}
              selectedFilters={selectedRegions}
              funds={funds}
              selectedManagers={selectedManagers}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <h3 className="capitalize">Domicile</h3>
          {domiciles.map((domicile, index) => (
            <CheckboxFilter
              key={index}
              label={domicile}
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
          onClick={() => (onShowManagers(true), clearAllFilters())}
          className="px-5 py-3 bg-white rounded-full hover:border hover:border-gray-500"
        >
          <div className="flex items-center gap-3">
            <span>Show Managers</span>
            <div className="text-white bg-teal-500 rounded-full p-2">
              <RightArrow />
            </div>
          </div>
        </button>
      )}
    </aside>
  );
}
