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

  const hdImageBooleans = useStore({
    hdVisible: false,
    viewHDButton: true,
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
        {hdImageBooleans.viewHDButton && (
          <button
            onClick$={() =>
              (hdImageBooleans.hdVisible = !hdImageBooleans.hdVisible) &&
              (hdImageBooleans.viewHDButton = !hdImageBooleans.viewHDButton)
            }
          >
            Click Here To See HD{" "}
          </button>
        )}
        {hdImageBooleans.hdVisible && (
          <button
            onClick$={() =>
              (hdImageBooleans.viewHDButton = !hdImageBooleans.viewHDButton) &&
              (hdImageBooleans.hdVisible = !hdImageBooleans.hdVisible)
            }
          >
            Click Here To Close HD{" "}
          </button>
        )}
        <p>
          <img
            src={responseTable.url}
            alt="Nasa Img of The Day."
            width="500"
            height="600"
          ></img>

          {hdImageBooleans.hdVisible && (
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
      <button>Click Here To Save Todays Nasa News to DB</button>
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
