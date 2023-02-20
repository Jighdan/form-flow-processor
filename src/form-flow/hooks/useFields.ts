import { useRef } from "react";
import { ContextProviderProps } from "../interfaces";

type Params<FormFields> = Pick<ContextProviderProps<FormFields>, 'formFieldsInitialState' | 'onFormFieldsUpdate'>;

export const useFields = <FormFields>({ formFieldsInitialState, onFormFieldsUpdate }: Params<FormFields>) => {
	const fields = useRef<FormFields>(formFieldsInitialState);

	const getFields = () => {
		return fields.current;
	};

	const updateFields = (fieldsToUpdate: Partial<FormFields>) => {
		const currentFields = getFields();
		const updatedFields = { ...currentFields, ...fieldsToUpdate };

		fields.current = updatedFields;

		if (onFormFieldsUpdate) {
			onFormFieldsUpdate(updatedFields);
		};
	};

	return { getFields, updateFields };
};
