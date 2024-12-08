import { publicApi } from "$lib/api/index.js";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ params, url }) => {
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 50;
  const id = params?.id;
  const response = await publicApi.get(
    `${PUBLIC_BASE_URL}/public/tournament/${id}?page=${page}&limit=${limit}`
  );

  const { questions, ...tournament } = response || {};

  return { questions, tournament };
};
