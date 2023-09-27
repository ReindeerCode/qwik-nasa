export const useNasaAPI = routeLoader(async (requestEvent) => {
  const res = await fetch(requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY"));
});
