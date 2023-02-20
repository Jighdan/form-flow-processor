import { FlowStep } from './flow-step';
import { Steps } from '../interfaces';

export class FlowStore<FormFields> {
  private length: number;
  private head: FlowStep<FormFields> | null;
  private tail: FlowStep<FormFields> | null;

  constructor(steps: Steps<FormFields>) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.initializeSteps(steps);
  }

  public getHead = () => this.head;

  public getTail = () => this.tail;

  public getLength = () => this.length;

  public getNextValidStep = (
    fromStep: FlowStep<FormFields> | null,
    fields: FormFields
  ): FlowStep<FormFields> | null => {
    const isStepLast = fromStep?.index === this.tail?.index;
    let nextStep = fromStep?.nextStep || null;

    if (!fromStep || isStepLast || !nextStep) {
      return null;
    }

    const fromStepIndex = (fromStep?.index || 0) + 1;

    for (let iteration = fromStepIndex; iteration <= this.length; iteration++) {
      const isStepValid = nextStep?.doesMeetConditionFields(fields);

      if (isStepValid) {
        return nextStep;
      }

      nextStep = nextStep?.nextStep || null;
    }

    return null;
  };

  /**
   * Will skip steps with `isValidationView` set as `true`
   */
  public getPreviousValidStep = (
    fromStep: FlowStep<FormFields> | null,
    fields: FormFields
  ): FlowStep<FormFields> | null => {
    const isStepFirst = fromStep?.index === this.head?.index;
    let previousStep = fromStep?.previousStep;

    if (!fromStep || isStepFirst || !previousStep) {
      return null;
    }

    for (let iteration = this.length - 1; iteration >= 0; iteration--) {
      const isStepValid = !!previousStep?.doesMeetConditionFields(fields);
      const isNotAValidationStep = !previousStep?.isAValidationView;

      if (isStepValid && isNotAValidationStep) {
        return previousStep;
      }

      previousStep = previousStep?.previousStep || null;
    }

    return null;
  };

  public getTotalOfValidSteps = (
    currentStep: FlowStep<FormFields> | null,
    fields: FormFields
  ) => {
    let currentStepIndexWithinValidSteps = 0;
    let numberOfValidSteps = 0;
    let step = this.head;

    for (let iteration = 0; iteration <= this.length; iteration++) {
      const isStepValid = !!step?.willBePartOfTheFlow(fields);
      const isStepAValidation = !!step?.isAValidationView;
      const isCurrentStep = step?.index === currentStep?.index;

      if (isCurrentStep) {
        currentStepIndexWithinValidSteps = numberOfValidSteps;
      }

      if (isStepValid && !isStepAValidation) {
        numberOfValidSteps++;
      }

      step = step?.nextStep || null;
    }

    return {
      numberOfValidSteps,
      currentStepIndex: currentStepIndexWithinValidSteps,
    };
  };

  public getLastIncompleteStep = (fields: FormFields): FlowStep<FormFields> | null => {
    let lastValidStep = this.head;
    let step = this.head;

    for (let iteration = 0; iteration < this.length; iteration++) {
      const isNotAValidationStep = !step?.isAValidationView;
      const doesMeetConditionFields = !!step?.doesMeetConditionFields(fields);
      const willBePartOfTheFlow = !!step?.willBePartOfTheFlow(fields);

      if (isNotAValidationStep && doesMeetConditionFields && willBePartOfTheFlow) {
        lastValidStep = step;
      }

      step = step?.nextStep || null;
    };

    return lastValidStep;
  };

  private initializeSteps = (steps: Steps<FormFields>) => {
    for (let [index, step] of steps.entries()) {
      const stepNode = new FlowStep({
        ...step,
        previousStep: this.tail,
        nextStep: null,
        index,
      });

      if (this.head === null) {
        this.head = stepNode;
      }

      if (this.tail !== null) {
        this.tail.nextStep = stepNode;
      }

      this.tail = stepNode;
      this.length += 1;
    }

    return this;
  };
}
