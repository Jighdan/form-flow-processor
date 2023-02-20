import { Step } from "../interfaces";
import { useEffect, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { Link } from "react-router-dom";
import { Routes } from "enums/routes";
import { isTrue } from "utilities/array-validation";

export const StepAccountCreation: Step = {
  isAValidationView: true,

  doesMeetConditionFields: (fields) =>
    [fields.email, fields.password].every(isTrue),

  Component: () => {
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useIsMounted();

    useEffect(() => {
      void new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        if (isMounted()) {
          setIsLoading(false);
        }
      });
    }, [isMounted]);

    return (
      <div>
        {isLoading ? (
          <>
            <h3>Creating account ...</h3>
          </>
        ) : (
          <h2>Your account was created successfully</h2>
        )}

        <Link to={Routes.HOME} aria-disabled={isLoading}>
          Go Home
        </Link>
      </div>
    );
  },
};
