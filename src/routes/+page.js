import { publicApi } from "$lib/api/index.js";

export const load = async () => {
  const response = await publicApi.get(
    "http://localhost:8080/api/public/tournaments"
  );

  return {
    tournaments: response,
  };
};
