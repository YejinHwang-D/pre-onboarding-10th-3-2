export type SuggestionList = {
  q: string;
  page: number;
  limit: number;
  result: string[] | [];
  qty: number;
  total: number;
};