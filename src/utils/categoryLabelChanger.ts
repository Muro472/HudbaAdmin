import { categoriesType } from "./categories.ts";

export const categoryLabelChanger = (category: categoriesType) => {
  const translates: { [key in categoriesType]: string } = {
    audiotechnic: "Audiotechnic",
    books: "Knihy",
    cassette: "Cazeta",
    cd: "CD",
    tableGames: "Hry na stole",
    posters: "Plagáty",
    souvenirs: "Pamiatky",
    vinyl: "Vínil",
  };

  return translates[category];
};
