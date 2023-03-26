import { generateConsumer } from './generators/consumer';
import { generateContext } from './generators/context';
import { generateProvider } from './generators/provider';
import { Steps } from './interfaces';

interface Parameters<FormFields> {
  steps: Steps<FormFields>;
}

type Client<FormFields> = [ReturnType<typeof generateConsumer<FormFields>>, ReturnType<typeof generateProvider<FormFields>>];

export function createFormFlow<FormFields>({ steps }: Parameters<FormFields>): Client<FormFields> {
  const context = generateContext<FormFields>();
  const consumer = generateConsumer({ context });
  const provider = generateProvider<FormFields>({ context, steps });

  return [consumer, provider];
}
