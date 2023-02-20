import { StepParams } from 'form-flow';

export type Step = StepParams<FormFields>;

export interface FormFields {
	email: string;
	password: string;
	referralCode?: string;
}
