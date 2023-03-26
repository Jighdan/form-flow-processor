import { createContext } from 'react';

import { ContextState } from '../interfaces';

export function generateContext<FormFields>() {
  const context = createContext<ContextState<FormFields>>({
    getStoreFields: () => null,
    CurrentStepView: () => <></>,
    /* eslint-disable @typescript-eslint/no-empty-function */
    updateStoreFields: async () => {},
    moveToPreviousValidStep: () => {},
    moveToNextValidStep: () => {},
    /* eslint-enable @typescript-eslint/no-empty-function */
    progressPercentage: 0,
    meta: {
      previousStepIdentifier: null,
      currentStepIdentifier: null,
      nextStepIdentifier: null,
      isFirstStep: true,
      isLastStep: false,
    },
  });

  return context;
}
