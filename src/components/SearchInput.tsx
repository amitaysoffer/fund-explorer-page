import SearchIcon from "../assets/icons/SearchIcon";

type SearchInputProps = {
  input: string;
  onChange: (val: string) => void;
};
export default function SearchInput({ input, onChange }: SearchInputProps) {
  return (
    <>
      <span className="absolute top-1/2 left-6 -translate-y-1/2 text-gray-500">
        <SearchIcon />
      </span>
      <input
        className="grow p-4 focus:outline-none border-2 pl-16"
        type="text"
        aria-label="search"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by fund name, ISIN, benchmark, manager"
      />
    </>
  );
}
