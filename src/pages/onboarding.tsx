import { useLocalStorage } from "usehooks-ts";
import { ViewOnboarding, OnboardingFlowContextProvider, FormFields } from "views/Onboarding";

const LOCAL_STORAGE_KEY = 'onboarding-flow';
const INITIAL_STORE_FIELDS: FormFields = { accountType: '' };

export const PageOnboarding = () => {
  const [store, setStore] = useLocalStorage<FormFields>(LOCAL_STORAGE_KEY, INITIAL_STORE_FIELDS);

  const onFormFieldsUpdate = async (fields: FormFields) => {
    await setStore(fields);
  };

  return (
    <OnboardingFlowContextProvider
      initialStoreFields={store}
      onStoreUpdate={onFormFieldsUpdate}
      isResumable={false}
    >
      <ViewOnboarding />
    </OnboardingFlowContextProvider>
  );
};
