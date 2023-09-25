import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestEvent } from "@builder.io/qwik-city";

const nasaImageURL = "https://api.nasa.gov/planetary/apod?api_key=";
// //const DB_NASA_IMAGE_PRIVATE_KEY = {import.meta.env.NASA_IMAGE_PRIVATE_KEY}



export default component$(() => {
  const onGet = (requestEvent: RequestEvent) => {
    console.log(requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY"));
  };

  return (
    <>
      <button
        onClick$={() => console.log(import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY)}
      >
        test button
      </button>
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
