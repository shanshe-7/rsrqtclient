import { publicApi } from "$lib/api/index.js";

export const load = async ({ params, url }) => {
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 12;
  const id = params?.id;
  const response = await publicApi.get(
    `http://localhost:8080/api/public/tournament/${id}?page=${page}&limit=${limit}`
  );

  return {
    tournaments: response,
  };
};
