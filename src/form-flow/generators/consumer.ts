import { Context, useContext } from 'react';

import { ContextState } from '../interfaces';

interface Parameters<FormFields> {
  context: Context<ContextState<FormFields>>;
}

export const generateConsumer = <FormFields>({ context }: Parameters<FormFields>) => {
  return () => useContext(context);
};
