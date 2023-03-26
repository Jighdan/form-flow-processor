import { FlowTemplate } from "components/FlowTemplate";
import { useSignUpFlowContext } from "./form-flow";

export const ViewSignUp = () => {
  const { CurrentStepView, progressPercentage, meta, moveToPreviousValidStep } =
    useSignUpFlowContext();

  return (
    <FlowTemplate
      shouldNavigateHomeOnArrowBack={meta.isFirstStep}
      onArrowBackClick={moveToPreviousValidStep}
      progressPercentage={progressPercentage}
    >
      <CurrentStepView />
    </FlowTemplate>
  );
};
