export const load = async ({ fetch }) => {
  const response = await fetch(
    "http://localhost:8080/api/public/tournament/35"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tournaments");
  }
  const tournaments = await response.json();

  return {
    tournaments,
  };
};
