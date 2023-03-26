import { FC, useEffect, useMemo, useState } from 'react';

import { CurrentFormStep } from '../interfaces';
import { FlowStore } from '../processors/flow-store';
import { useCurrentStepMeta } from './useCurrentStepMeta';
import { useFields } from './useFields';

type UseFieldsWithStorageParams<FormFields> = ReturnType<typeof useFields<FormFields>>;

interface Params<FormFields> extends UseFieldsWithStorageParams<FormFields> {
  flowStore: FlowStore<FormFields>;
  isFormFlowResumable: boolean;
}

export function useCurrentStep<FormFields>({ flowStore, getFields, updateFields, isFormFlowResumable }: Params<FormFields>) {
  const [currentStep, setCurrentStep] = useState<CurrentFormStep<FormFields>>(null);

  const CurrentStepView = useMemo<FC>(() => {
    const Component = currentStep?.Component;

    if (Component) {
      return () => (
        <Component
          storeFields={getFields()}
          updateStoreFields={updateFields}
          moveToNextStep={moveToNextValidStep}
          moveToPreviousStep={moveToPreviousValidStep}
          moveToStepByIdentifier={moveToStepByIdentifier}
        />
      );
    }

    return () => <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const meta = useCurrentStepMeta({ flowStore, currentStep });

  useEffect(() => {
    const initialStep = isFormFlowResumable ? flowStore.getLastIncompleteStep(getFields()) : flowStore.getHead();

    setCurrentStep(initialStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveToNextValidStep = () => {
    const nextStep = flowStore.getNextValidStep(currentStep, getFields());

    setCurrentStep(nextStep);
  };

  const moveToPreviousValidStep = () => {
    const previousStep = flowStore.getPreviousValidStep(currentStep, getFields());

    setCurrentStep(previousStep);
  };

  const moveToStepByIdentifier = (identifier: string) => {
    const step = flowStore.getStepByIdentifier(identifier);

    setCurrentStep(step);
  };

  return {
    currentStep,
    meta,
    CurrentStepView,
    moveToNextValidStep,
    moveToPreviousValidStep,
    moveToStepByIdentifier,
  };
}
