export type Fund = {
  id: number;
  data: FundData;
};

type FundData = {
  manager: FundManager;
  details: FundDetails;
  fund_name: string;
  fund_benchmark: string;
};

type FundManager = {
  fund_manager: string | null;
  manager_image: string | null;
  manager_id: number;
};

export type FundDetails = {
  domicile: string;
  region: string;
  holdings: number;
  fund_size: string;
  launch_date: string;
};

export type Funds = {
  funds: Fund[];
};

export type sortOrder = "asc" | "desc";

export type Category = keyof Pick<FundDetails, "region" | "domicile">;

export type ViewTab = "list" | "grid";
