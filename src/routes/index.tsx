import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestEvent } from "@builder.io/qwik-city";
import { ExplanationSelector } from "~/components/nasaImageComponents/pic_selector";

export const onGet = (requestEvent: RequestEvent) => {
  return requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
  //console.log(requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY"));
};



export default component$(() => {
  return (
    <>
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
