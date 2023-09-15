import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const nasaImageURL = "https://api.nasa.gov/planetary/apod?api_key=";

interface NasaResponse {
  date: Date;
  explanation: String;
  title: String;
  url: String;
}

export default component$(() => {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
