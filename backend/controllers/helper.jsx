// check api key
export const checkApiKey = (request) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = new URL(request.url);
  const usersApiKey = url.searchParams.get("apiKey");

  if (usersApiKey === apiKey) {
    return true;
  } else {
    return false;
  }
};
