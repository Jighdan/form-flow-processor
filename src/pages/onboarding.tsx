import { FormFlowProvider } from "form-flow";
import { useLocalStorage } from "usehooks-ts";
import { ViewOnboarding, STEPS, FIELDS, FormFields } from "views/Onboarding";

export const PageOnboarding = () => {
  const localStorageKey = "sign-up-flow";
  const [store, setStore] = useLocalStorage(localStorageKey, FIELDS);

  const onFormFieldsUpdate = async (fields: FormFields) => {
    await setStore(fields);
  };

  return (
    <FormFlowProvider
      formFieldsInitialState={store}
      steps={STEPS}
      onFormFieldsUpdate={onFormFieldsUpdate}
      isResumable={false}
    >
      <ViewOnboarding />
    </FormFlowProvider>
  );
};
