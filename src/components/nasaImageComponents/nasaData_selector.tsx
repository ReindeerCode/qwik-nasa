import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { useNasaAPI } from "~/routes";




export const ExplanationSelector = component$(() => {
  const nasaResource = useResource$<NasaObject[]>(async () => {
    const fullKey = import.meta.env.VITE_NASA_FULL_PUBLIC_KEY;
    const result = await fetch(`${fullKey}`);
    return result.json();
  });

  return (
    <>
      <Resource
        value={nasaResource}
        onPending={() => <span>loading...</span>}
        onRejected={(reason) => <span>error... {reason}</span>}
        onResolved={(response) => (
          <>
            <h1>nasaData_selector below this line</h1>
            <div>
              {response.explanation}
              {/* {response.map(() => (
                <div>{pic.explanation}</div>
              ))} */}
            </div>
            <div>
              {response.date}
              {/* {pics.map((pic) => (
              <div>{pic.explanation}</div>
            ))} */}
            </div>
          </>
        )}
      />
    </>
  );
});
