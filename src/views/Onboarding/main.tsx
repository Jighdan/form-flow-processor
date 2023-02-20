import { useFormFlowContext } from "form-flow";
import { FlowTemplate } from "components/FlowTemplate";

export const ViewOnboarding = () => {
  const { CurrentStepView, progressPercentage, meta, moveToPreviousValidStep } =
    useFormFlowContext();

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
