import { useRef } from 'react';

import { ContextProviderProps } from '../interfaces';

type Params<FormFields> = Pick<ContextProviderProps<FormFields>, 'initialStoreFields' | 'onStoreUpdate'>;

export const useFields = <FormFields>({ initialStoreFields, onStoreUpdate }: Params<FormFields>) => {
  const fields = useRef<FormFields>(initialStoreFields);

  const getFields = () => fields.current;

  const updateFields = async (fieldsToUpdate: Partial<FormFields>) => {
    const currentFields = getFields();
    const updatedFields = { ...currentFields, ...fieldsToUpdate };

    fields.current = updatedFields;

    if (onStoreUpdate) {
      await onStoreUpdate(updatedFields);
    }
  };

  return { getFields, updateFields };
};
