import CloseIcon from "../assets/icons/CloseIcon";

type ManagerLabelsProps = {
  filterManager: (category: string) => void;
  managers: string[];
  clearAllManagers: () => void;
};

export default function ManagersLabels({
  managers,
  clearAllManagers,
  filterManager,
}: ManagerLabelsProps) {
  return (
    <>
      {managers.length > 0 && (
        <div className="flex justify-between items-center border border-t-light-gray mt-6 pt-6">
          <h3>Selected manager(s)</h3>
          <ul className="flex flex-row-reverse gap-3">
            <button
              onClick={clearAllManagers}
              className="flex p-2 gap-2 items-center bg-red-700 text-white"
            >
              <CloseIcon />
              <span>Clear managers</span>
            </button>

            {managers.map((manager) => (
              <button
                key={manager}
                className="flex justify-between items-center gap-2 p-2 bg-white"
                onClick={() => filterManager(manager)}
              >
                <CloseIcon />
                <span>{manager}</span>
              </button>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
