import { Resource, component$, useResource$ } from "@builder.io/qwik";

//

export const ExplanationSelector = component$(() => {
  const nasaResource = useResource$<NasaObject[]>(async () => {
    const fullKey = import.meta.env.VITE_NASA_FULL_PUBLIC_KEY;
    // const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;

    // console.log(URL);
    // // const dbKey = onGet;
    // // console.log(URL);
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

// export const ExplanationSelector = component$(() => {
//   const nasaResource = useResource$<NasaObject[]>(async () => {
//     const fullKey = import.meta.env.VITE_NASA_FULL_PUBLIC_KEY;
//     // const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
//     const dbKey = onGet;
//     console.log(URL);
//     // const dbKey = onGet;
//     // console.log(URL);
//     const result = await fetch(`${fullKey}`);
//     return result.json();
//   });

//   return (
//     <>
//       <Resource
//         value={nasaResource}
//         onPending={() => <span>loading...</span>}
//         onRejected={(reason) => <span>error... {reason}</span>}
//         onResolved={(response) => (
//           <>
//           <h1>nasaData_selector below this line</h1>
//             <div>
//               {response.explanation}
//               {/* {response.map(() => (
//                 <div>{pic.explanation}</div>
//               ))} */}
//             </div>
//             <div>
//               {response.date}
//               {/* {pics.map((pic) => (
//               <div>{pic.explanation}</div>
//             ))} */}
//             </div>
//           </>
//         )}
//       />
//     </>
//   );
// });

// export interface NasaObject {
//   explanation: string;
// }

// // interface ImportMetaEnv {
// //   readonly DB_NASA_IMAGE_PRIVATE_KEY: string;
// //   readonly VITE_NASA_IMAGE_PUBLIC_KEY: string;
// //   // more env variables...
// // }

// export const ExplanationSelector = component$(() => {
//   const nasaResource = useResource$<NasaObject[]>(async () => {
//     const fullKey = import.meta.env.VITE_NASA_FULL_PUBLIC_KEY;
//     const URL = import.meta.env.VITE_NASA_IMAGE_PUBLIC_KEY;
//     const dbKey = onGet;
//     console.log(dbKey);
//     // const dbKey = onGet;
//     // console.log(URL);
//     const result = await fetch(`${URL}`, {
//       headers: {
//         "X-RapidAPI-Key": "gQSrCgV6Kwowrs1JmhCy0E7dG836PBSeumhvsgVp",
//       },
//     });
//     return result.json();
//   });

//   return (
//     <>
//       <Resource
//         value={nasaResource}
//         onPending={() => <span>loading...</span>}
//         onRejected={(reason) => <span>error... {reason}</span>}
//         onResolved={(response) => (
//           <>
//             <div>
//               {response.explanation}
//               {/* {response.map(() => (
//                 <div>{pic.explanation}</div>
//               ))} */}
//             </div>
//             <div>
//               {response.date}
//               {/* {pics.map((pic) => (
//               <div>{pic.explanation}</div>
//             ))} */}
//             </div>
//           </>
//         )}
//       />
//     </>
//   );
// });
