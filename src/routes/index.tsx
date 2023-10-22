import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ExplanationSelector } from "~/components/nasaImageComponents/nasaData_selector";


export const useNasaAPI = routeLoader$(async (requestEvent) => {
  const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
  const nasaKey = requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
  const res = await fetch(`${URL}${nasaKey}`);
  const nasaData = await res.json();
  // console.log(nasaData)
  return nasaData;
});



export default component$(() => {
  const response = useNasaAPI().value;
  // console.log(response.title);
  const testResponse = {
    title: response.title,
    url: response.url,
    date: response.date
  };
  console.log(testResponse);
  const testResponse2 = useStore({ title: response.title, url: response.url, date:response.date });
  console.table(testResponse2);

  return (
    <center>
      <h1>
        Title:{" "}
        <p>
          <b>{testResponse2.title}</b>
        </p>
      </h1>
      <h4>
        Image:{" "}
        <p>
          <img
            src={response.url}
            alt="Nasa Img of The Day"
            width="500"
            height="600"
          ></img>
        </p>
      </h4>
      <h4>
        Date:{" "}
        <p>
          <b>{response.date}</b>
        </p>
      </h4>
      <h4>
        Explanation:{" "}
        <p>
          <b>{response.explanation}</b>
        </p>
      </h4>
      <ExplanationSelector />
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
