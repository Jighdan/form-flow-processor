import { useMemo } from 'react';

import { CurrentFormStep } from '../interfaces';
import { FlowStore } from '../processors/flow-store';
import { useFields } from './useFields';

type UseFieldsParams<FormFields> = Pick<ReturnType<typeof useFields<FormFields>>, 'getFields'>;

interface Params<FormFields> extends UseFieldsParams<FormFields> {
  currentStep: CurrentFormStep<FormFields>;
  flowStore: FlowStore<FormFields>;
}

export const useProgressPercentage = <FormFields>({ flowStore, getFields, currentStep }: Params<FormFields>) => {
  const progressPercentage = useMemo<number>(() => {
    const percentage_from = 100;
    const { currentStepIndex, numberOfValidSteps } = flowStore.getTotalOfValidSteps(currentStep, getFields());

    return (currentStepIndex / numberOfValidSteps) * percentage_from;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  return { progressPercentage };
};
