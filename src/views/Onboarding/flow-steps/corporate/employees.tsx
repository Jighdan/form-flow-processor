import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";

type Fields = Pick<FormFields, "numberOfEmployees">;

export const StepCorporateEmployees: Step = {
  willBePartOfTheFlow: ({ accountType }) =>
    ["corporate", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [
      fields.accountType === "corporate",
      fields.companyName,
      fields.industry,
    ].every(isTrue),

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
        <h4>Number of Employees</h4>

        <input
          {...register("numberOfEmployees")}
          type="number"
          min={1}
          step={1}
          required
        />

        <button type="submit" disabled={isSubmitButtonDisabled}>
          continue
        </button>
      </form>
    );
  },
};
