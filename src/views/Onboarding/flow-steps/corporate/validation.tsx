import { Step } from "../../interfaces";
import { isTrue } from "utilities/array-validation";
import { Link } from "react-router-dom";
import { Routes } from "enums/routes";

export const StepCorporateValidation: Step = {
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
