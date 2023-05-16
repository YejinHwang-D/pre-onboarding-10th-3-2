import apiRequest from "./index";

const RESOURCE = "/search";

export const getSuggestion = async (q: string, page?: number, limit?: number) => {
  if (page === undefined) page = 1;
  if (limit === undefined) limit = 10;
  try {
    const res = await apiRequest.get(`${RESOURCE}?q=${q}&page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.info(error);
    throw new Error("[ERROR] API error.");
  }
};
