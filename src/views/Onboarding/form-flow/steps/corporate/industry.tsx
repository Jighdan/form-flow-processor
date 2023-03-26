import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";
import { Identifiers } from "../../identifiers";

type Fields = Pick<FormFields, "industry">;

export const StepCorporateIndustry: Step = {
  identifier: Identifiers.CORPORATE_INDUSTRY,

  willBePartOfTheFlow: ({ accountType }) =>
    ["corporate", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [fields.accountType === "corporate", fields.companyName].every(isTrue),

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { register, formState, handleSubmit } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = (values) => {
      updateStoreFields(values);
      moveToNextStep();
    };

    const options = ["oso 1", "oso 2", "oso 3", "oso 4"];

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Company Name, Proszę</h4>
        <h5>
          Just kidding, <b>What is your favorite bear?!?!1?</b>
        </h5>

        <select {...register("industry")} required>
          {options.map((option) => (
            <option key={option.toLowerCase()} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitButtonDisabled}>
          yes, I named my company, mean bear
        </button>
      </form>
    );
  },
};
