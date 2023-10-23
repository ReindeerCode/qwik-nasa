import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useNasaAPI = routeLoader$(async (requestEvent) => {
  try {
    const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
    const nasaKey = requestEvent.env.get("DB_NASA_IMAGE_PRIVATE_KEY");
    const res = await fetch(`${URL}${nasaKey}`);
    const nasaData = await res.json();
    return nasaData;
    // NEED TO COME BACK TO THIS AND ADD ERROR AND PENDING HANDLING
  } catch (error) {
    return error;
  }
});

export default component$(() => {
  const response = useNasaAPI().value;
  const hdVisible = useSignal(false);
  const viewHDButton = useSignal(true);
  const closeHDButton = useSignal(false);

  const toggleBooleans = $(() => {
    hdVisible.value = !hdVisible.value;
    viewHDButton = !viewHDButton;
    closeHDButton = !closeHDButton;
  });

  const responseTable = useStore({
    date: response.date,
    explanation: response.explanation,
    hdurl: response.hdurl,
    media_type: response.media_type,
    service_version: response.service_version,
    title: response.title,
    url: response.url,
  });
  // working on changing the state of the HD image - goal is to toggle the See HD Button with Close HD Button depending on if HD img is shown
  return (
    <center>
      {/* MAYBE ADD A MAP TO THIS TO ADD THE BELOW CODE INSTEAD OF HARDCODING. YOU'LL NEED TO DECIDE WHAT TO DO WITH INFO RETURNED BY API THAT YOU DON'T CARE ABOUT */}
      <h1>
        Title:{" "}
        <p>
          <b>{responseTable.title}</b>
          {/* ADD <SPAN> TO EACH DIV FOR ERROR OR PENDING STATUS */}
        </p>
      </h1>
      <h4>
        SD Image / HD Image:{" "}
        {viewHDButton.value && (
          <button onClick$={() => (hdVisible.value = !hdVisible.value)}>
            Click Here To See HD{" "}
          </button>
        )}
        {closeHDButton.value && (
          <button onClick$={() => (hdVisible.value = !hdVisible.value)}>
            Click Here To Close HD{" "}
          </button>
        )}
        <p>
          <img
            src={responseTable.url}
            alt="Nasa Img of The Day"
            width="500"
            height="600"
          ></img>

          {hdVisible.value && (
            <img
              src={responseTable.hdurl}
              alt="Nasa HD Img of The Day"
              width="500"
              height="600"
            ></img>
          )}
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
