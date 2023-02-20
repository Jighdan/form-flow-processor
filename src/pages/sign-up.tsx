import { FormFlowProvider } from "form-flow";
import { useLocalStorage } from "usehooks-ts";
import { ViewSignUp, STEPS, FIELDS, FormFields } from "views/SignUp";

export const PageSignUp = () => {
  const localStorageKey = 'sign-up-flow';
  const [store, setStore] = useLocalStorage(localStorageKey, FIELDS);

  const onFormFieldsUpdate = async (fields: FormFields) => {
    await setStore(fields);
  };

  return (
    <FormFlowProvider
      formFieldsInitialState={store}
      steps={STEPS}
      onFormFieldsUpdate={onFormFieldsUpdate}
    >
      <ViewSignUp />
    </FormFlowProvider>
  );
};
