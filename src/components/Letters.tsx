import CloseIcon from "../assets/icons/CloseIcon";
import useUniqueLetters from "../hooks/useUniqueLetters";

type LettersProps = {
  onShowManagers: (val: boolean) => void;
  setCurrentLetter: (value: string) => void;
  currentLetter: string;
  clearAllManagers: () => void;
};

const alphabet: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Letters({
  setCurrentLetter,
  currentLetter,
  onShowManagers,
  clearAllManagers,
}: LettersProps) {
  const uniqueLetters = useUniqueLetters();

  return (
    <div className="flex justify-between items-center pb-5 overflow-x-hidden">
      <h3 className="italic font-semibold">Filter by manager</h3>

      <ol className="flex gap-4">
        <button
          onClick={() => setCurrentLetter("All")}
          className={`
            p-2 rounded-full w-8 h-8 justify-center items-center flex
            ${currentLetter === "All" ? "bg-red-500 text-white" : ""}
            `}
        >
          <span>All</span>
        </button>
        {alphabet.map((letter, index) => (
          <button
            disabled={!uniqueLetters.includes(letter)}
            key={index}
            onClick={() => setCurrentLetter(letter)}
            className={`
            p-2 rounded-full w-8 h-8 justify-center items-center flex
            ${currentLetter === letter ? "bg-red-500 text-white" : ""}
            ${
              !uniqueLetters.includes(letter)
                ? "cursor-not-allowed opacity-20"
                : ""
            }
            `}
          >
            <span>{letter}</span>
          </button>
        ))}
      </ol>
      <button
        onClick={() => {
          onShowManagers(false), clearAllManagers();
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
