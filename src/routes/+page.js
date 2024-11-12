import { publicApi } from "$lib/api/index.js";

export const load = async ({ url }) => {
  const page = Number(url.searchParams.get("page")) || 1;
  const response = await publicApi.get(
    `http://localhost:8080/api/public/tournaments?page=${page}&limit=10`
  );

  return {
    tournaments: response,
  };
};
