type SearchInputProps = {
  input: string;
  onChange: (val: string) => void;
};
export default function SearchInput({ input, onChange }: SearchInputProps) {
  return (
    <input
      className="grow p-4 border-2"
      type="text"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by fund name, ISIN, benchmark, manager"
    />
  );
}
