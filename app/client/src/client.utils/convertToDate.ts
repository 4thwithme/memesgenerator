export default (timestamp: number | string) => {
  const date = new Date(+timestamp);

  return date.toLocaleDateString();
};
