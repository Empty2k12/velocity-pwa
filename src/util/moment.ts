// This module is for importing moment + all necessary languages

import moment from "moment";
import "moment/locale/de";

export default moment;

export const renderDifference = (a: Date, b: Date) => {
  const start = moment(a);
  const end = moment(b);
  const hours = start.diff(end, "hours");
  const minutes = start.diff(end, "minutes") - hours * 60;
  return `${hours}:${minutes.toString().padStart(2, "0")} h`;
};
