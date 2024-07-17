import { Category, Fund } from "../types/funds";

type RadioProps = {
  label: string;
  category: Category;
  onClick: (category: string) => void;
  selectedFilters: string[];
  funds: Fund[];
  selectedManagers: string[];
};

export default function CheckboxFilter({
  category,
  label,
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
    !activeFilters.includes(label) && selectedManagers.length > 0;

  const updatedLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "asia":
        return "Asian Equities";
      case "europe":
        return "Europen Equities";
      case "dublin":
        return "Dublin (Irish ICAV)";
      case "london":
        return "London (UK OEIC)";

      default:
        return label + " Equities";
    }
  };

  return (
    <label
      className={`flex gap-2 items-center cursor-pointer ${
        isFilterDisabled ? "opacity-20 cursor-not-allowed" : ""
      }`}
    >
      <input
        disabled={isFilterDisabled}
        type="checkbox"
        name={label}
        aria-label={label}
        onChange={() => onClick(label)}
        value={label}
        checked={selectedFilters.includes(label)}
        className="hidden peer"
      />
      <span className="w-5 h-5 border border-teal-600 bg-white peer-checked:bg-teal-check"></span>
      <span className="ml-2 text-dark-blue">{updatedLabel(label)}</span>
    </label>
  );
}
