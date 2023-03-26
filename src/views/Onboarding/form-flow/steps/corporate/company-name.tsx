import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";

import { Identifiers } from "../../identifiers";

type Fields = Pick<FormFields, "companyName">;

export const StepCorporateCompanyName: Step = {
  identifier: Identifiers.CORPORATE_COMPANY_NAME,

  willBePartOfTheFlow: ({ accountType }) =>
    ["corporate", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [fields.accountType === "corporate"].every(isTrue),

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { register, formState, handleSubmit } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = (values) => {
      updateStoreFields(values);
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Company Name, Proszę</h4>

        <input
          {...register("companyName")}
          type="text"
          required
          placeholder="Company Name"
        />

        <button type="submit" disabled={isSubmitButtonDisabled}>
          yes, I named my company
        </button>
      </form>
    );
  },
};
