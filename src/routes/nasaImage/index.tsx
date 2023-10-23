import { component$, useResource$, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useNasaAPI = routeLoader$(async (requestEvent) => {
  const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
  const nasaKey = requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
  const res = await fetch(`${URL}${nasaKey}`);
  const nasaData = await res.json();
  return nasaData;
});

export default component$(() => {
  const response = useNasaAPI().value;

  const responseTable = useStore({
    date: response.date,
    explanation: response.explanation,
    hdurl: response.hdurl,
    media_type: response.media_type,
    service_version: response.service_version,
    title: response.title,
    url: response.url,
  });

  return (
    <center>
      <h1>
        Title:{" "}
        <p>
          <b>{responseTable.title}</b>
        </p>
      </h1>
      <h4>
        Image / HD Image:{" "}
        <p>
          <img
            src={responseTable.url}
            alt="Nasa Img of The Day"
            width="500"
            height="600"
          ></img>
          <img
            src={responseTable.hdurl}
            alt="Nasa Img of The Day"
            width="500"
            height="600"
          ></img>
        </p>
      </h4>
      <h4>
        Date:{" "}
        <p>
          <b>{responseTable.date}</b>
        </p>
      </h4>
      <h4>
        Explanation:{" "}
        <p>
          <b>{responseTable.explanation}</b>
        </p>
      </h4>
    </center>
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
function async() {
  throw new Error("Function not implemented.");
}
