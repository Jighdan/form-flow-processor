import { Step } from "../interfaces";
import { useEffect, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { isTrue } from "utilities/array-validation";

export const StepReferralCodeValidation: Step = {
  isAValidationView: true,

  doesMeetConditionFields: (fields) => [fields.email, fields.referralCode].every(isTrue),

  Component: ({ moveToNextStep }) => {
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useIsMounted();

    useEffect(() => {
      void new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        if (isMounted()) {
          setIsLoading(false);
        }
      });
    }, [isMounted]);

    const onClick = () => {
      moveToNextStep();
    };

    return (
      <div>
        {isLoading ? (
          <h2>Validating ...</h2>
        ) : (
          <h2>Cool, this is a valid referral code</h2>
        )}

        <button type="button" disabled={isLoading} onClick={onClick}>
          Continue
        </button>
      </div>
    );
  },
};
