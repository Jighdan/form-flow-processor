import { StepParams } from 'form-flow';

export type Step = StepParams<FormFields>;

export interface FormFields {
	accountType: string;

	firstName?: string;
	lastName?: string;
	time?: string;
	color?: string;

	companyName?: string;
	industry?: string;
	numberOfEmployees?: number;
};
