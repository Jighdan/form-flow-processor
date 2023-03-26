import { Identifiers } from "../identifiers";
import { Step } from "../interfaces";
import { isTrue } from "utilities/array-validation";

export const StepPasswordValidation: Step = {
  identifier: Identifiers.PASSWORD_VALIDATION,

  isAValidationView: true,

  doesMeetConditionFields: (fields) =>
    [fields.email, fields.password].every(isTrue),

  Component: ({ moveToNextStep }) => {
    return (
      <div>
        <h2>Your Password has been set!</h2>

        <button type="button" onClick={moveToNextStep}>
          Finish creating account!
        </button>
      </div>
    );
  },
};
