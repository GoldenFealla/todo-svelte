export const BOARD = ["TODO", "IN PROGRESS", "DONE"] as const;
export type Col = (typeof BOARD)[number];

export type ItemList = {
  [key in (typeof BOARD)[number]]: Item[];
};

export type Item = {
  id: number;
  name: string;
  status: Status;
  lastUpdated: number;
};

export type Status = Col;
