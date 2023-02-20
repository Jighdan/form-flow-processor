import { createContext } from "react";
import { ContextState } from "./interfaces";

export const Context = createContext<ContextState>({
  CurrentStepView: () => <></>,
  moveToPreviousValidStep: () => {},
  moveToNextValidStep: () => {},
  progressPercentage: 0,
  meta: {
    isFirstStep: true,
    isLastStep: false,
  },
});
