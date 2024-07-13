import { FundsViewProps } from "../App";

export default function ListView({ funds }: FundsViewProps) {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 text-left font-semibold pb-4">
        <div className="py-3 border-b col-span-2">Fund name / Benchmark</div>
        <div className="py-3 border-b">Domicile</div>
        <div className="py-3 border-b">Region</div>
        <div className="py-3 border-b">Holdings</div>
        <div className="py-3 border-b">Fund size</div>
        <div className="py-3 border-b">Launch date</div>
      </div>
      {funds.map((fund) => {
        const {
          id,
          name,
          benchmark,
          domicile,
          fund_size,
          holdings,
          launch_date,
          region,
        } = fund;
        return (
          <div key={id} className="pb-6">
            <div className="grid grid-cols-8 items-center bg-white shadow-md px-4 hover:shadow-xl">
              <div className="py-3 col-span-2">
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-600">{benchmark}</div>
              </div>
              <div className="py-3 ">{domicile}</div>
              <div className="py-3 ">{region}</div>
              <div className="py-3 ">{holdings}</div>
              <div className="py-3 ">{fund_size}</div>
              <div className="py-3 ">{launch_date}</div>
              <div className="py-3  text-blue-600 cursor-pointer">→</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
