import { FC, PropsWithChildren } from 'react';

import { FlowStep } from './processors/flow-step';

export interface StepComponentProps<FormFields> {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  moveToStepByIdentifier: (identifier: string) => void;
  storeFields: FormFields;
  updateStoreFields: (fields: Partial<FormFields>) => Promise<void>;
}

export interface FlowStepParams<FormFields> {
  Component: FC<StepComponentProps<FormFields>>;
  identifier: string;
  index: number;
  nextStep: FlowStep<FormFields> | null;
  previousStep: FlowStep<FormFields> | null;
  doesMeetConditionFields?: (fields: FormFields) => boolean;
  isAValidationView?: boolean;
  willBePartOfTheFlow?: (fields: FormFields) => boolean;
}

export type StepParams<FormFields> = Pick<
  FlowStepParams<FormFields>,
  'Component' | 'isAValidationView' | 'doesMeetConditionFields' | 'willBePartOfTheFlow' | 'identifier'
>;

export type Steps<FormFields> = StepParams<FormFields>[];

export interface ContextStateMeta {
  currentStepIdentifier: string | null;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStepIdentifier: string | null;
  previousStepIdentifier: string | null;
}

export interface ContextState<FormFields> {
  CurrentStepView: FC;
  getStoreFields: () => FormFields | null;
  meta: ContextStateMeta;
  moveToNextValidStep: () => void;
  moveToPreviousValidStep: () => void;
  progressPercentage: number;
  updateStoreFields: (fields: Partial<FormFields>) => Promise<void>;
}

export interface ContextProviderProps<FormFields> extends PropsWithChildren {
  initialStoreFields: FormFields;
  isResumable?: boolean;
  onStoreUpdate?: (fields: FormFields) => Promise<void>;
}

export type CurrentFormStep<FormFields> = FlowStep<FormFields> | null;
