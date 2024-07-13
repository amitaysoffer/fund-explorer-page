type ManagersProps = {
  onShowManagers: (val: boolean) => void;
};

export default function Managers({ onShowManagers }: ManagersProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h3>Filter by manager</h3>
        <ol className="flex gap-4">
          <span>ALL</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </ol>
        <button onClick={() => onShowManagers(false)}>X</button>
      </div>
      <div>
        <ul className="flex gap-4">
          <div className="flex flex-col p-2 bg-white">
            <div>IMAGE</div>
            <h3>Clive Beagles</h3>
            <span>UK Equities</span>
          </div>
          <div className="flex flex-col p-2 bg-white">
            <div>IMAGE</div>
            <h3>Clive Beagles</h3>
            <span>UK Equities</span>
          </div>
          <div className="flex flex-col p-2 bg-white">
            <div>IMAGE</div>
            <h3>Clive Beagles</h3>
            <span>UK Equities</span>
          </div>
        </ul>
      </div>
    </div>
  );
}
