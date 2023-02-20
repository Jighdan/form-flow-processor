import { FlowStore } from "./services/flow-store";
import { Context } from "./context";
import { ContextProviderProps } from "./interfaces";
import { useCurrentStep } from "./hooks/useCurrentStep";
import { useFields } from "./hooks/useFields";
import { useProgressPercentage } from "./hooks/useProgressPercentage";

export function FormFlowProvider<FormFields>({
  steps,
  formFieldsInitialState,
  onFormFieldsUpdate,
  isResumable = false,
  children,
}: ContextProviderProps<FormFields>) {
  const flowStore = new FlowStore(steps);

  const { getFields, updateFields } = useFields({
    formFieldsInitialState,
    onFormFieldsUpdate,
  });

  const {
    currentStep,
    meta,
    CurrentStepView,
    moveToNextValidStep,
    moveToPreviousValidStep,
  } = useCurrentStep({
    flowStore,
    getFields,
    updateFields,
    isFormFlowResumable: isResumable,
  });

  const { progressPercentage } = useProgressPercentage({
    flowStore,
    getFields,
    currentStep,
  });

  return (
    <Context.Provider
      value={{
        CurrentStepView,
        moveToPreviousValidStep,
        moveToNextValidStep,
        progressPercentage,
        meta,
      }}
    >
      {children}
    </Context.Provider>
  );
}
