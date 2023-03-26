import { StepAccountType } from "./account-type";
import { StepIndividualName } from "./individual/name";
import { StepIndividualTime } from "./individual/time";
import { StepIndividualColor } from "./individual/color";
import { StepIndividualValidation } from "./individual/validation";
import { StepCorporateCompanyName } from "./corporate/company-name";
import { StepCorporateIndustry } from "./corporate/industry";
import { StepCorporateEmployees } from "./corporate/employees";
import { StepCorporateValidation } from "./corporate/validation";

export const STEPS = [
	StepAccountType,
	StepIndividualName,
	StepIndividualTime,
	StepIndividualColor,
	StepIndividualValidation,
	StepCorporateCompanyName,
	StepCorporateIndustry,
	StepCorporateEmployees,
	StepCorporateValidation,
];
