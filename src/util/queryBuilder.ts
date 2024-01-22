export const queryBuilder = <T extends {}>(params: T): string => {
  return Object.keys(params)
    .map((k) => {
      let key = k as keyof T;
      if (params[key]) {
        return `${k}=${params[key]}`;
      } else return "";
    })
    .join("&");
};
