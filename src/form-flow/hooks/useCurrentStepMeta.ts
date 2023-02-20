import { useMemo } from "react";
import { FlowStore } from '../services/flow-store';
import { ContextStateMeta, CurrentFormStep } from '../interfaces';

interface Params<FormFields> {
	flowStore: FlowStore<FormFields>;
	currentStep: CurrentFormStep<FormFields>;
};

export const useCurrentStepMeta = <FormFields>({ flowStore, currentStep }: Params<FormFields>) => {
	const { isFirstStep, isLastStep } = useMemo<ContextStateMeta>(() => {
		const flowHead = flowStore.getHead();
		const flowTail = flowStore.getTail();

		const isFirstStep = currentStep?.index === flowHead?.index;
		const isLastStep = currentStep?.index === flowTail?.index;

		return { isFirstStep, isLastStep };
	}, [currentStep]);

	return { isFirstStep, isLastStep }
}