import { Step } from "../../interfaces";
import { isTrue } from "utilities/array-validation";
import { Link } from "react-router-dom";
import { Routes } from "enums/routes";
import { Identifiers } from "../../identifiers";

export const StepCorporateValidation: Step = {
  identifier: Identifiers.CORPORATE_VALIDATION,

  isAValidationView: true,

  willBePartOfTheFlow: ({ accountType }) =>
    ["corporate", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [
      fields.accountType === "corporate",
      fields.companyName,
      fields.industry,
    ].every(isTrue),

  Component: ({ storeFields }) => {
    return (
      <div>
        <h3>Here's what we gathered from you:</h3>

        <pre>{JSON.stringify(storeFields, null, 2)}</pre>

        <Link to={Routes.HOME}>End this</Link>
      </div>
    );
  },
};
