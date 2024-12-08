import { publicApi } from "$lib/api/index.js";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ url }) => {
  const page = Number(url.searchParams.get("page")) || 1;
  const response = await publicApi.get(
    `${PUBLIC_BASE_URL}/public/tournaments?page=${page}&limit=10`
  );

  return {
    tournaments: response,
  };
};
