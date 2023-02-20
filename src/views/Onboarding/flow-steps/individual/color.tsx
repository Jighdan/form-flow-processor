import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";

type Fields = Pick<FormFields, "color">;

export const StepIndividualColor: Step = {
  willBePartOfTheFlow: ({ accountType }) =>
    ["individual", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [
      fields.accountType === "individual",
      fields.firstName,
      fields.lastName,
      fields.time,
    ].every(isTrue),

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { register, formState, handleSubmit } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = ({ color }) => {
      updateStoreFields({ color });
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ color: undefined });
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>What is your favorite color?</h4>

        <input {...register("color")} type="color" />

        <button type="button" onClick={onSkip}>
          Actually I'd rather not say
        </button>

        <button type="submit" disabled={isSubmitButtonDisabled}>
          Proceed without judgement
        </button>
      </form>
    );
  },
};
