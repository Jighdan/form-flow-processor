import { createFormFlow } from 'form-flow';
import { FormFields } from './interfaces';
import { STEPS } from './steps';

export const [useSignUpFlowContext, SignUpFlowContextProvider] = createFormFlow<FormFields>({ steps: STEPS })