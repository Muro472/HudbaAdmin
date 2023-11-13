export const timestamp = (val: number | string | null) => {
  if (!val) return null;
  const date = new Date(val);

  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  const year: string | number = date.getFullYear();
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  month < 10 ? (month = "0" + month) : "";
  day < 10 ? (day = "0" + day) : "";
  hours < 10 ? (hours = "0" + hours) : "";
  minutes < 10 ? (minutes = "0" + minutes) : "";

  // const output = month  + '\n'+ day  + ',' + year;
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
