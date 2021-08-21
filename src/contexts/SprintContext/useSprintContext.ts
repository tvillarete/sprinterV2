import { useCallback, useContext } from 'react';

import { SprintContext, SprintContextState } from './provider';

interface SprintContextHook {
  sprintState: SprintContextState;
  updateSprintValue: (
    field: keyof SprintContextState,
    value: SprintContextState[keyof SprintContextState]
  ) => void;
}

const useSprintContext = (): SprintContextHook => {
  const [sprintState, setSprintState] = useContext(SprintContext);

  const updateSprintValue = useCallback(
    (
      field: keyof SprintContextState,
      value: SprintContextState[keyof SprintContextState]
    ) => {
      setSprintState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    [setSprintState]
  );

  return {
    sprintState,
    updateSprintValue,
  };
};

export default useSprintContext;
