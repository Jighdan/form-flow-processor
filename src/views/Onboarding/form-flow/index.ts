import { createFormFlow } from 'form-flow';
import { FormFields } from './interfaces';
import { STEPS } from './steps';

export const [useOnboardingFlowContext, OnboardingFlowContextProvider] = createFormFlow<FormFields>({ steps: STEPS })