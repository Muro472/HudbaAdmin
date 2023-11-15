export const categories = [
  "audiotechnic",
  "books",
  "cassette",
  "cd",
  "tableGames",
  "posters",
  "souvenirs",
  "vinyl",
] as const;

export type categoriesType = (typeof categories)[number];
