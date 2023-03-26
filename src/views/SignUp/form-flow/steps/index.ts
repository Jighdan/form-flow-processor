import { StepEmail } from "./email";
import { StepReferralCode } from "./referral-code";
import { StepReferralCodeValidation } from "./referral-code.validation";
import { StepPassword } from "./password";
import { StepPasswordValidation } from "./password-validation";
import { StepAccountCreation } from "./account-creation";

export const STEPS = [
	StepEmail,
	StepReferralCode,
	StepReferralCodeValidation,
	StepPassword,
	StepPasswordValidation,
	StepAccountCreation,
];