import { Identifiers } from "../identifiers";
import { FormFields, Step } from "../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";

type Fields = Pick<FormFields, "accountType">;

export const StepAccountType: Step = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }) => {
    const form = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled =
      !form.formState.isValid || !!form.formState.errors.accountType?.message;

    const onSubmit: SubmitHandler<Fields> = (values) => {
      updateStoreFields(values);
      moveToNextStep();
    };

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4>Which account type suits you?</h4>

        <div>
          <label>
            <input
              type="radio"
              {...form.register("accountType")}
              value="individual"
            />
            Individual
          </label>

          <label>
            <input
              type="radio"
              {...form.register("accountType")}
              value="corporate"
            />
            Corporate
          </label>
        </div>

        <button type="submit" disabled={isSubmitButtonDisabled}>
          Continue
        </button>
      </form>
    );
  },
};
