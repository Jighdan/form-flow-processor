import { Steps } from '../interfaces';
import { FlowStep } from './flow-step';

export class FlowStore<FormFields> {
  /** The first step. */
  private head: FlowStep<FormFields> | null;

  /** The last step. */
  private tail: FlowStep<FormFields> | null;

  /** The size of the list of steps. */
  private length: number;

  constructor(steps: Steps<FormFields>) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.initializeSteps(steps);
  }

  /** Retrieves the first element of the flow */
  public getHead = () => this.head;

  /** Retrieves the last element of the flow */
  public getTail = () => this.tail;

  /**
   * Retrieves the valid step "to the right". Does it by
   * calling each step `doesMeetConditionFields` method.
   *
   * @param fromStep - The step from which the lookup will begin
   * @param {FormFields} fields - The fields of the form
   */
  public getNextValidStep = (fromStep: FlowStep<FormFields> | null, fields: FormFields): FlowStep<FormFields> | null => {
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
   * Will skip steps with `isValidationView` set as `true` since it doesn't
   * make sense to re-validate when moving backwards.
   *
   * @param fromStep - The step from which the lookup will begin
   * @param {FormFields} fields - The fields of the form
   */
  public getPreviousValidStep = (fromStep: FlowStep<FormFields> | null, fields: FormFields): FlowStep<FormFields> | null => {
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

  /**
   * Retrieves the count of valid steps of the flows based on
   * `fields`, and the index of the `currentStep` in reference to
   * the count of valid steps.
   *
   * Will discriminate each step by asserting by calling their method
   * `willBePartOfTheFlow` with the `fields` parameter, and if they are
   * not a validation.
   *
   * @param currentStep - Will use the current step to know what
   *  is the their index in reference to the number of valid steps
   * @param {FormFields} fields - The fields of the form
   */
  public getTotalOfValidSteps = (currentStep: FlowStep<FormFields> | null, fields: FormFields) => {
    let currentStepIndexWithinValidSteps = 0;
    let numberOfValidSteps = 0;
    let step = this.getHead();

    for (let iteration = 0; iteration <= this.length; iteration++) {
      const isStepValid = !!step?.willBePartOfTheFlow(fields);
      const isNotAValidationStep = !step?.isAValidationView;
      const isCurrentStep = step?.index === currentStep?.index;

      if (isCurrentStep) {
        currentStepIndexWithinValidSteps = numberOfValidSteps;
      }

      if (isStepValid && isNotAValidationStep) {
        numberOfValidSteps++;
      }

      step = step?.nextStep || null;
    }

    return {
      numberOfValidSteps,
      currentStepIndex: currentStepIndexWithinValidSteps,
    };
  };

  /**
   * Retrieves the last incomplete step based on the `fields` and
   * each step condition.
   *
   * @param {FormFields} fields - The fields of the form
   * @returns {(FlowStep<FormFields>|null)} The latest incomplete step
   */
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
    }

    return lastValidStep;
  };

  /**
   * Searches a step by it's identifier - the lookup will performed from
   * head to tail.
   *
   * It won't validate if the step can be part of the flow.
   * @param {string} identifier - The identifier of the step
   */
  public getStepByIdentifier = (identifier: string): FlowStep<FormFields> | null => {
    let step = this.head;

    for (let iteration = 0; iteration < this.length; iteration++) {
      if (step?.identifier === identifier) {
        return step;
      }

      step = step?.nextStep || null;
    }

    return null;
  };

  /**
   * Sets up the doubly linked list structure.
   * @param {Steps<FormFields>} steps - The list of steps of the flow
   */
  private initializeSteps = (steps: Steps<FormFields>) => {
    for (const [index, step] of steps.entries()) {
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
