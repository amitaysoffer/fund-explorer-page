type ManagerLabelsProps = {
  filterManager: (category: string) => void;
  managers: string[];
  clearAll: () => void;
};

export default function ManagersLabels({
  managers,
  clearAll,
  filterManager,
}: ManagerLabelsProps) {
  return (
    <>
      {managers.length > 0 && (
        <div className="flex justify-between items-center border border-t-light-gray mt-6 pt-6">
          <h3>Selected manager(s)</h3>
          <ul className="flex flex-row-reverse gap-3">
            <li className="flex p-2 gap-3 justify-between items-center bg-red-700 text-white">
              <button onClick={clearAll}>X</button>
              <span>Clear managers</span>
            </li>
            {managers.map((manager) => (
              <li
                key={manager}
                className="flex justify-between items-center gap-3 p-2 bg-white"
              >
                <button onClick={() => filterManager(manager)}>X</button>
                <span>{manager}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
