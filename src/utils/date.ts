import { differenceInBusinessDays, differenceInDays } from 'date-fns';
import { DateTime } from 'luxon';

export const getNumBusinessDays = (
  startDateStr: string,
  endDateStr: string
) => {
  return differenceInBusinessDays(
    DateTime.fromISO(endDateStr).toJSDate(),
    DateTime.fromISO(startDateStr).toJSDate()
  );
};

export const getNumDays = (startDateStr: string, endDateStr: string) => {
  return differenceInDays(
    DateTime.fromISO(startDateStr).toJSDate(),
    DateTime.fromISO(endDateStr).toJSDate()
  );
};
