import { FilterKeys } from "../App";

type RadioProps = {
  categories: string[];
  label: FilterKeys;
  handleFilterRadioClick: (category: string) => void;
  selectedFilters: string[];
};

export default function Radio({
  categories,
  label,
  handleFilterRadioClick,
  selectedFilters,
}: RadioProps) {
  return (
    <div>
      <h3 className="capitalize">{label}</h3>
      <div className="flex flex-col gap-2">
        {categories.map((cat, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name={label}
              onChange={() => handleFilterRadioClick(cat)}
              value={cat}
              checked={selectedFilters.includes(cat)}
            />
            <i className="pl-2">{cat}</i>
          </label>
        ))}
      </div>
    </div>
  );
}
