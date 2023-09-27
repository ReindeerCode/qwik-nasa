import { component$ } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ExplanationSelector } from "~/components/nasaImageComponents/nasaData_selector";

// export const onGet = (requestEvent: RequestEvent) => {
//   return requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
// };

export const useNasaAPI = routeLoader$(async(requestEvent) => {
  const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
  const res = await fetch(`${URL}${requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY")}`);
    const nasaData = await res.json()
  return nasaData as NasaData;
})

export default component$(() => {
  const signal = useNasaAPI();
  return (
    <>
      <h4>Data: {signal.value.explanation}</h4>
      <h4>Data: {signal.value.date}</h4>
      <h4>Data: {signal.value.explanation}</h4>
      <ExplanationSelector />
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Local Host",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
