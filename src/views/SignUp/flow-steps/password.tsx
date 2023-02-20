import { FormFields, Step } from "../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMemo } from "react";

interface Fields extends Pick<FormFields, "password"> {
  passwordConfirmation: FormFields["password"];
}

export const StepPassword: Step = {
  doesMeetConditionFields: (fields) => !!fields.email,

  Component: ({ moveToNextStep, storeFields, updateStoreFields }) => {
    const form = useForm<Fields>({ mode: "all", defaultValues: storeFields });

    const onSubmit: SubmitHandler<Fields> = ({ password }, event) => {
      updateStoreFields({ password });
      moveToNextStep();
    };

    const fieldPassword = form.watch("password");
    const fieldPasswordConfirmation = form.watch("passwordConfirmation");

    const checks = useMemo<[string, boolean][]>(
      () => [
        [
          "has a lower case letter",
          fieldPassword.toUpperCase() != fieldPassword,
        ],
        [
          "has an upper case letter",
          fieldPassword.toLowerCase() != fieldPassword,
        ],
        ["has a number", /\d/.test(fieldPassword)],
        ["has at least 8 characters", fieldPassword.length >= 8],
        [
          "passwords match",
          !!fieldPassword.length && fieldPassword === fieldPasswordConfirmation,
        ],
      ],
      [fieldPassword, fieldPasswordConfirmation]
    );

    const isSubmitButtonDisabled = useMemo(() => {
      return checks.some(([_label, condition]) => condition === false);
    }, [checks]);

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <code>{fieldPassword}</code>

        <input
          {...form.register("password")}
          type="password"
          required
          placeholder="enter a password"
        />

        <input
          {...form.register("passwordConfirmation")}
          type="password"
          required
          placeholder="enter the same password again"
          autoComplete="new-password"
        />

        <button type="submit" disabled={isSubmitButtonDisabled}>
          Set Password
        </button>

        <ul>
          {checks.map(([label, hasMetCondition]) => (
            <li key={label.toLowerCase().split("").join("-")}>
              <span>
                {hasMetCondition ? "✔️" : "❌"} - {label}
              </span>
            </li>
          ))}
        </ul>
      </form>
    );
  },
};
