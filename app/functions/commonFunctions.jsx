// create query string
export const createQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};
