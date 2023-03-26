import { FormFields, Step } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { isTrue } from "utilities/array-validation";

import { Identifiers } from "../../identifiers";

type Fields = Pick<FormFields, "time">;

export const StepIndividualTime: Step = {
  identifier: Identifiers.INDIVIDUAL_TIME,

  willBePartOfTheFlow: ({ accountType }) =>
    ["individual", ""].includes(accountType),

  doesMeetConditionFields: (fields) =>
    [
      fields.accountType === "individual",
      fields.firstName,
      fields.lastName,
    ].every(isTrue),

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { register, formState, handleSubmit } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isSubmitButtonDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = ({ time }) => {
      updateStoreFields({ time });
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Might be weird, but at what time do you take your trash out?</h4>

        <input
          {...register("time")}
          type="time"
          min="09:00"
          max="17:00"
          required
        />

        <button type="submit" disabled={isSubmitButtonDisabled}>
          sure ?
        </button>
      </form>
    );
  },
};
