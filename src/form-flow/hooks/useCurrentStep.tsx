import { useState, useMemo, useEffect, FC } from "react";
import { FlowStore } from "../services/flow-store";
import { CurrentFormStep } from "../interfaces";
import { useCurrentStepMeta } from "./useCurrentStepMeta";
import { useFields } from "./useFields";

type UseFieldsWithStorageParams<FormFields> = ReturnType<
  typeof useFields<FormFields>
>;

interface Params<FormFields> extends UseFieldsWithStorageParams<FormFields> {
  flowStore: FlowStore<FormFields>;
  isFormFlowResumable: boolean;
}

export function useCurrentStep<FormFields>({
  flowStore,
  getFields,
  updateFields,
  isFormFlowResumable,
}: Params<FormFields>) {
  const [currentStep, setCurrentStep] =
    useState<CurrentFormStep<FormFields>>(null);

  const CurrentStepView = useMemo<FC>(() => {
    const Component = currentStep?.Component;

    if (Component) {
      const fields = getFields();

      return () => (
        <Component
          storeFields={fields}
          updateStoreFields={updateFields}
          moveToNextStep={moveToNextValidStep}
        />
      );
    }

    return () => <></>;
  }, [currentStep]);

  const meta = useCurrentStepMeta({ flowStore, currentStep });

  useEffect(() => {
    const fields = getFields();
    const initialStep = isFormFlowResumable
      ? flowStore.getLastIncompleteStep(fields)
      : flowStore.getHead();

    setCurrentStep(initialStep);
  }, []);

  const moveToNextValidStep = () => {
    const fields = getFields();
    const nextStep = flowStore.getNextValidStep(currentStep, fields);

    setCurrentStep(nextStep);
  };

  const moveToPreviousValidStep = () => {
    const fields = getFields();
    const previousStep = flowStore.getPreviousValidStep(currentStep, fields);

    setCurrentStep(previousStep);
  };

  return {
    currentStep,
    meta,
    CurrentStepView,
    moveToNextValidStep,
    moveToPreviousValidStep,
  };
}
