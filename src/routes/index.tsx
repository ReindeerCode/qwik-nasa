import { component$ } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ExplanationSelector } from "~/components/nasaImageComponents/nasaData_selector";

// export const onGet = (requestEvent: RequestEvent) => {
//   return requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
// };

export const useNasaAPI = routeLoader$(async (requestEvent) => {
  const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
  const res = await fetch(
    `${URL}${requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY")}`
  );
  const nasaData = await res.json();
  return nasaData as NasaData;
});

export default component$(() => {
  const response = useNasaAPI();
  return (
    <>
      <h1>
        Title:{" "}
        <p>
          <b>{response.value.title}</b>
        </p>
      </h1>
      <h4>
        Image:{" "}
        <p>
          <link>{response.value.url}</link>
        </p>
      </h4>
      <h4>
        Date:{" "}
        <p>
          <b>{response.value.date}</b>
        </p>
      </h4>
      <h4>
        Explanation:{" "}
        <p>
          <b>{response.value.explanation}</b>
        </p>
      </h4>
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
