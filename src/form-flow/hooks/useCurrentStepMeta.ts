import { useMemo } from 'react';

import { ContextStateMeta, CurrentFormStep } from '../interfaces';
import { FlowStep } from '../processors/flow-step';
import { FlowStore } from '../processors/flow-store';

interface Params<FormFields> {
  currentStep: CurrentFormStep<FormFields>;
  flowStore: FlowStore<FormFields>;
}

export const useCurrentStepMeta = <FormFields>({ flowStore, currentStep }: Params<FormFields>) =>
  useMemo<ContextStateMeta>(() => {
    const flowHead: FlowStep<FormFields> | null = flowStore.getHead();
    const flowTail: FlowStep<FormFields> | null = flowStore.getTail();

    const isFirstStep = currentStep?.index === flowHead?.index;
    const isLastStep = currentStep?.index === flowTail?.index;

    const previousStepIdentifier = currentStep?.previousStep?.identifier ?? null;
    const currentStepIdentifier = currentStep?.identifier ?? null;
    const nextStepIdentifier = currentStep?.nextStep?.identifier ?? null;

    return { isFirstStep, isLastStep, previousStepIdentifier, currentStepIdentifier, nextStepIdentifier };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);
