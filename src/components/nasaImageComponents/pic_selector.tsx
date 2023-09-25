import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { onGet } from "~/routes";

export interface Pic {
  explanation: string;
}

export const ExplanationSelector = component$(() => {
  const picsResource = useResource$<Pic[]>(async () => {
    const result = await fetch(
      "http://api.nasa.gov/planetary/apod?api_key=" + onGet
      //   "http://api.nasa.gov/planetary/apod?api_key="
    );
    return result.json();
  });

  return (
    <>
      <Resource
        value={picsResource}
        onPending={() => <span>loading...</span>}
        onRejected={(reason) => <span>error... {reason}</span>}
        onResolved={(pics) => (
          <div>
            {pics.explanation}
            {/* {pics.map((pic) => (
              <div>{pic.explanation}</div>
            ))} */}
          </div>
        )}
      />
    </>
  );
});
