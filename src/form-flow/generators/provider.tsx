import { Context } from 'react';

import { useCurrentStep } from '../hooks/useCurrentStep';
import { useFields } from '../hooks/useFields';
import { useProgressPercentage } from '../hooks/useProgressPercentage';
import { ContextProviderProps } from '../interfaces';
import { ContextState, Steps } from '../interfaces';
import { FlowStore } from '../processors/flow-store';

interface Parameters<FormFields> {
  context: Context<ContextState<FormFields>>;
  steps: Steps<FormFields>;
}

export function generateProvider<FormFields>({ context, steps }: Parameters<FormFields>) {
  const Provider = context.Provider;

  return ({ initialStoreFields, onStoreUpdate, isResumable = false, children }: ContextProviderProps<FormFields>) => {
    const flowStore = new FlowStore(steps);

    const { getFields, updateFields } = useFields({
      initialStoreFields,
      onStoreUpdate,
    });

    const { currentStep, meta, CurrentStepView, moveToNextValidStep, moveToPreviousValidStep } = useCurrentStep({
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
      <Provider
        value={{
          getStoreFields: getFields,
          updateStoreFields: updateFields,
          CurrentStepView,
          moveToPreviousValidStep,
          moveToNextValidStep,
          progressPercentage,
          meta,
        }}
      >
        {children}
      </Provider>
    );
  };
}
