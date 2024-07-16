import { Category, Fund } from "../types/funds";

type RadioProps = {
  filter: string;
  category: Category;
  onClick: (category: string) => void;
  selectedFilters: string[];
  funds: Fund[];
  selectedManagers: string[];
};

export default function Radio({
  category,
  filter,
  onClick,
  selectedFilters,
  funds,
  selectedManagers,
}: RadioProps) {
  const activeFilters = funds.reduce((acc: string[], fund: Fund) => {
    if (!acc.includes(fund.data.details[category])) {
      return [...acc, fund.data.details[category]];
    }

    return acc;
  }, []);

  const isFilterDisabled =
    !activeFilters.includes(filter) && selectedManagers.length > 0;

  return (
    <label
      className={`flex items-center cursor-pointer ${
        isFilterDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        disabled={isFilterDisabled}
        type="checkbox"
        name={filter}
        onChange={() => onClick(filter)}
        value={filter}
        checked={selectedFilters.includes(filter)}
        className="hidden peer"
      />
      <span className="w-5 h-5 border border-teal-600 bg-white peer-checked:bg-teal-check"></span>
      <span className="ml-2 text-blue-light">{filter}</span>
    </label>
  );
}
