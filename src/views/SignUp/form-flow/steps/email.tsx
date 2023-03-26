import { Identifiers } from "../identifiers";
import { FormFields, Step } from "../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";

type Fields = Pick<FormFields, "email">;

export const StepEmail: Step = {
  identifier: Identifiers.EMAIL,

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const form = useForm<Fields>({
      mode: "onChange",
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled =
      !form.formState.isValid || !!form.formState.errors.email?.message;

    const onSubmit: SubmitHandler<Fields> = ({ email }) => {
      updateStoreFields({ email });
      moveToNextStep();
    };

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label>
          <span>E-Mail</span>
          <input
            {...form.register("email")}
            type="email"
            required
            placeholder="e-mail"
          />
        </label>

        <button type="submit" disabled={isSubmitButtonDisabled}>
          Continue
        </button>
      </form>
    );
  },
};
