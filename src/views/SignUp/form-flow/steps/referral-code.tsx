import { Identifiers } from "../identifiers";
import { FormFields, Step } from "../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";

type Fields = Pick<FormFields, "referralCode">;

export const StepReferralCode: Step = {
  identifier: Identifiers.REFERRAL_CODE,

  doesMeetConditionFields: (fields) => {
    return !!fields.email;
  },

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const { handleSubmit, register, formState } = useForm<Fields>({
      defaultValues: storeFields,
    });

    const isFormInvalid = !formState.isValid;
    const hasErrors = !!formState.errors?.referralCode?.message;
    const isSubmitButtonDisabled = isFormInvalid || hasErrors;

    const onSubmit: SubmitHandler<Fields> = ({ referralCode }) => {
      updateStoreFields({ referralCode });
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ referralCode: undefined });
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("referralCode")}
          type="text"
          required
          placeholder="enter your referral code"
        />

        <div>
          <button type="button" onClick={onSkip}>
            Skip
          </button>
          <button type="submit" disabled={isSubmitButtonDisabled}>
            Submit Referral Code
          </button>
        </div>
      </form>
    );
  },
};
