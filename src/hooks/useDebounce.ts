import { DELAY } from "../constant/constant";

export const useDebounce = (callback: any) => {
  let time: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, DELAY);
  };
};
