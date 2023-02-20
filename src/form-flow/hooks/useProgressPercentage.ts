import { useMemo } from "react";
import { FlowStore } from '../services/flow-store';
import { CurrentFormStep } from "../interfaces";
import { useFields } from "./useFields";

type UseFieldsParams<FormFields> = Pick<ReturnType<typeof useFields<FormFields>>, 'getFields'>;

interface Params<FormFields> extends UseFieldsParams<FormFields> {
	flowStore: FlowStore<FormFields>;
	currentStep: CurrentFormStep<FormFields>;
};

export const useProgressPercentage = <FormFields>({ flowStore, getFields, currentStep }: Params<FormFields>) => {
	const progressPercentage = useMemo<number>(() => {
		const fields = getFields();
		const percentage_from = 100;
		const { currentStepIndex, numberOfValidSteps } =
			flowStore.getTotalOfValidSteps(currentStep, fields);

		return (currentStepIndex / numberOfValidSteps) * percentage_from;
	}, [currentStep]);

	return { progressPercentage };
};
