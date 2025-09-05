// // import React, { useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Card from "../cards/Card";
// // import MobSearchPage from "./MobSearchPage";
// // import { useLanguage } from "../../context/LanguageContext";

// // // Define the translations object for all languages

// // // Define the type for supported languages
// // type Language = keyof typeof translations;

// // type ResultItem = {
// //   link: string;
// //   name: string;
// //   img: string;
// // };

// // const SearchPage: React.FC = () => {
// //   const { language } = useLanguage();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const results: ResultItem[] = location.state?.searchResults || [];
// //   // console.log(results, "results");

// //   // Assuming language is stored in the location state or some global state
// //   const Gobal_language: Language = (language || "en") as Language; // Cast to the Language type

// //   // Get the translations for the current language
// //   const searchResultsText =
// //     translations[Gobal_language]?.searchResults ||
// //     translations.en.searchResults;
// //   const noResultsFoundText =
// //     translations[Gobal_language]?.noResultsFound ||
// //     translations.en.noResultsFound;

// //   // 🔁 Redirect back if no search data
// //   useEffect(() => {
// //     if (!location.state?.searchResults) {
// //       navigate("/");
// //     }
// //   }, [location.state, navigate]);

// //   return (
// //     <div className="sm:p-6 p-2 min-h-[70vh]">
// //       <MobSearchPage />
// //       <h2 className="text-2xl text-center sm:text-left sm:pl-8 font-semibold sm:mb-6 my-3 mt-20 sm:mt-0">
// //         {searchResultsText}
// //       </h2>
// //       {results.length > 0 ? (
// //         <div className="flex justify-center flex-wrap items-center gap-4">
// //           {results.map((item, index) => (
// //             <Card
// //               key={index}
// //               link={item.link}
// //               name={item.name}
// //               img={item.img}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-gray-500">{noResultsFoundText}</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchPage;
// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Card from "../cards/Card";
// import MobSearchPage from "./MobSearchPage";

// type ResultItem = {
//   link: string;
//   name: string;
//   img: string;
//   id: string | number;
// };

// const SearchPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const results: ResultItem[] = location.state?.searchResults || [];

//   // Redirect back if no search data
//   useEffect(() => {
//     if (!location.state?.searchResults) {
//       navigate("/");
//     }
//   }, [location.state, navigate]);

//   // Dummy favorite handler
//   const handleFavoriteToggle = (id: string | number) => {
//     console.log("Favorite toggled for id:", id);
//   };

//   return (
//     <div className="sm:p-6 p-2 min-h-[70vh]">
//       <MobSearchPage />
//       <h2 className="text-2xl text-center sm:text-left sm:pl-8 font-semibold sm:mb-6 my-3 mt-20 sm:mt-0">
//         Search Results
//       </h2>

//       {results.length > 0 ? (
//         <div className="flex justify-center flex-wrap items-center gap-4">
//           {results.map((item, index) => (
//             <Card
//               key={index}
//               id={item.id} // use index or item.id if available
//               link={item.link}
//               name={item.name}
//               img={item.img}
//               isFavorite={false} // default value
//               onFavoriteToggle={handleFavoriteToggle}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No results found</p>
//       )}
//     </div>
//   );
// };

// export default SearchPage;

import React from 'react'

function SearchPage() {
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage