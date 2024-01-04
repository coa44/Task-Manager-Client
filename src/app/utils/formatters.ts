import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";

/**
 * Formats given date to spocified date format
 */
export const formatDate = (date: Date): string => {
  return dayjs(date).format(DATE_FORMAT);
};

/**
 * Formats complete API url based on the baseUrl and given route
 */
export const formatUrl = (baseUrl: string, route: string): string => {
  let retVal = baseUrl;
  if (!retVal.endsWith("/")) {
    retVal = retVal + "/";
  }
  retVal = retVal + route;
  return retVal;
};
