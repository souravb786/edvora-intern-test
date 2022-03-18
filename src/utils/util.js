// this file contains utility function which are useful in performing some tasks

export function ApplyFilter(filterArray = [], array) {
  const newArray = array.filter(({ state, city }, idx) => {
    if (filterArray.length === 0) return true;
    else if (filterArray.length === 1) return filterArray[0] === state;
    return filterArray[0] === state && filterArray[1] === city;
  });
  return newArray;
}
export const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export const changeDateFormat = (date) => {
  const data = date.split(" ");
  const onlyDate = data[0].split("/").map((num) => parseInt(num));
  const time = data[1].split(":").map((num) => parseInt(num));

  if (data[2] === "AM") {
    if (time[0] === 12) time[0] = time[0] - 12;
  } else time[0] = time[0] + 12;
  const dateString = `${onlyDate[2]}/${onlyDate[0]}/${onlyDate[1]} ${time[0]}:${time[1]}`;
  const dateDisplay = `${onlyDate[1]}${
    onlyDate[1] % 10 === 1
      ? "st"
      : onlyDate[1] % 10 === 2
      ? "nd"
      : onlyDate[1] % 10 === 3
      ? "rd"
      : "th"
  } ${Months[onlyDate[0] - 1]} ${onlyDate[2]} ${time[0]}:${time[1]}`;
  return { dateString, dateDisplay };
};
