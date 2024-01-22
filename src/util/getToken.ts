export const getTokenHeader = (): [string, string] => {
  let token = localStorage.getItem("token");
  if (token) {
    return ["Authorization", `Bearer ${token}`];
  } else {
    return ["Authorization", ""];
  }
};
