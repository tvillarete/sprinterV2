import { Contributor } from 'types';

import { getNumBusinessDays } from './date';

export const getNumActiveContributors = (contributors: Contributor[]) =>
  contributors.reduce((count, curContributor) => {
    return (count += curContributor.isEnabled ? 1 : 0);
  }, 0);

export const getTotalPercentWorking = (contributors: Contributor[]) => {
  const numActiveContributors = getNumActiveContributors(contributors);

  return contributors.reduce((count, curContributor) => {
    return (count +=
      (curContributor.isEnabled ? curContributor.percentWorking : 0) /
      numActiveContributors);
  }, 0);
};

export const getTotalContributorDaysOff = (contributors: Contributor[]) => {
  return contributors.reduce((count, curContributor) => {
    return count + curContributor.vacationDays;
  }, 0);
};

export const getContributorDaysInSprint = (
  contributor: Contributor,
  numBusinessDays: number
) => {
  return (
    ((numBusinessDays - contributor.vacationDays) *
      contributor.percentWorking) /
    100
  );
};

type getTotalWorkingDaysArgs = {
  contributors: Contributor[];
  startDate: string;
  endDate: string;
  numHolidays: number;
};

export const getTotalWorkingDays = ({
  contributors,
  startDate,
  endDate,
  numHolidays,
}: getTotalWorkingDaysArgs) => {
  const numBusinessDays = getNumBusinessDays(startDate, endDate);

  return (
    contributors.reduce((count, curContributor) => {
      return (
        count + getContributorDaysInSprint(curContributor, numBusinessDays)
      );
    }, 0) - numHolidays
  );
};

export const getRolloverPoints = (
  numPointsLastSprint: number,
  numPointsCompleted: number
) => {
  const rolloverPoints = numPointsLastSprint - numPointsCompleted;

  if (rolloverPoints < 0) {
    return 0;
  }

  return rolloverPoints;
};
