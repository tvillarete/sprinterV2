import React, { createContext, useState } from 'react';

import { nextMonday } from 'date-fns/esm';
import { DateTime } from 'luxon';
import { Contributor } from 'types';

export interface SprintContextState {
  contributors: Contributor[];
  startDate: DateTime;
  endDate: DateTime;
  numHolidays: number;
}

type SprintContextType = [
  SprintContextState,
  React.Dispatch<React.SetStateAction<SprintContextState>>
];

const defaultState: SprintContextState = {
  contributors: [],
  startDate: DateTime.fromJSDate(nextMonday(Date.now())),
  endDate: DateTime.fromJSDate(nextMonday(Date.now())).plus({ days: 14 }),
  numHolidays: 0,
};

export const SprintContext = createContext<SprintContextType>([
  defaultState,
  () => {},
]);

interface Props {
  children: React.ReactNode;
}

const SprintContextProvider = ({ children }: Props) => {
  const contextStateHooks = useState<SprintContextState>(defaultState);

  return (
    <SprintContext.Provider value={contextStateHooks}>
      {children}
    </SprintContext.Provider>
  );
};

export default SprintContextProvider;
