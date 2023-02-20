import { FC, ReactNode } from 'react';
import { FlowStep } from "./services/flow-step";

export interface StepComponentProps<FormFields> {
	storeFields: FormFields;
	updateStoreFields: (fields: Partial<FormFields>) => void;
	moveToNextStep: () => void;
}

export interface FlowStepParams<FormFields> {
	index: number;
	isAValidationView?: boolean;
	previousStep: FlowStep<FormFields> | null;
	nextStep: FlowStep<FormFields> | null;
	doesMeetConditionFields?: (fields: FormFields) => boolean;
	willBePartOfTheFlow?: (fields: FormFields) => boolean;
	Component: FC<StepComponentProps<FormFields>>;
};

export type StepParams<FormFields> = Pick<
	FlowStepParams<FormFields>,
	| "Component"
	| "isAValidationView"
	| "doesMeetConditionFields"
	| "willBePartOfTheFlow"
>;

export type Steps<FormFields> = StepParams<FormFields>[];

export interface ContextStateMeta {
	isFirstStep: boolean;
	isLastStep: boolean;
}

export interface ContextState {
	CurrentStepView: FC;
	moveToPreviousValidStep: () => void;
	moveToNextValidStep: () => void;
	progressPercentage: number;
	meta: ContextStateMeta;
};

export interface ContextProviderProps<FormFields> {
	steps: Steps<FormFields>;
	formFieldsInitialState: FormFields;
	onFormFieldsUpdate?: (fields: FormFields) => Promise<void>;
	isResumable?: boolean;
	children: ReactNode;
}

export type CurrentFormStep<FormFields> = FlowStep<FormFields> | null

