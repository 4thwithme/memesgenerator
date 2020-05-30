const parse = (data: string): any => JSON.parse(data);
const stringify = (data: any): string => JSON.parse(data);

const getItem = (key: string): any => {
  const info = parse(localStorage.getItem("userInfo") || "{}");

  return info[key];
};

const setItem = (key: string, value: any): void => {
  const info = parse(localStorage.getItem("userInfo") || "{}");

  localStorage.setItem(
    "userInfo",
    stringify({
      ...info,
      [key]: value
    })
  );
};

export default { getItem, setItem };
