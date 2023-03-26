import { useLocalStorage } from "usehooks-ts";
import {
  ViewSignUp,
  SignUpFlowContextProvider,
  FormFields,
} from "views/SignUp";

const LOCAL_STORAGE_KEY = "sign-up-flow";
const INITIAL_STORE_FIELDS: FormFields = { email: "", password: "" };

export const PageSignUp = () => {
  const [store, setStore] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    INITIAL_STORE_FIELDS
  );

  const onFormFieldsUpdate = async (fields: FormFields) => {
    await setStore(fields);
  };

  return (
    <SignUpFlowContextProvider
      initialStoreFields={store}
      onStoreUpdate={onFormFieldsUpdate}
    >
      <ViewSignUp />
    </SignUpFlowContextProvider>
  );
};
