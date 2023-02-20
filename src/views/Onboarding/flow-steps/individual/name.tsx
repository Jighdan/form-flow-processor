import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";

type Fields = Pick<FormFields, "firstName" | "lastName">;

export const StepIndividualName: Step = {
  willBePartOfTheFlow: ({ accountType }) =>
    ["individual", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [fields.accountType === "individual"].every(isTrue),

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { register, formState, handleSubmit } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = ({ firstName, lastName }) => {
      updateStoreFields({ firstName, lastName });
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>First and last name Proszę</h4>

        <input
          {...register("firstName")}
          type="text"
          required
          placeholder="First name"
        />

        <input
          {...register("lastName")}
          type="text"
          required
          placeholder="Last name"
        />

        <button type="submit" disabled={isSubmitButtonDisabled}>
          tak, to jest moje imię
        </button>
      </form>
    );
  },
};
