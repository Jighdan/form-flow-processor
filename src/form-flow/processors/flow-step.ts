import { FC } from 'react';

import { FlowStepParams, StepComponentProps } from '../interfaces';

export class FlowStep<FormFields> {
  public index: number;
  public identifier: string;
  public previousStep: FlowStep<FormFields> | null;
  public nextStep: FlowStep<FormFields> | null;
  public Component: FC<StepComponentProps<FormFields>>;

  /**
   * If the step won't gather any information and/or represent information
   * it be asynchronous or just a message, this should be `true`.
   */
  public isAValidationView: boolean;

  /**
   * Validates the `fields` to know if the step meets the conditions
   * to be presented.
   *
   * @param {FormFields} fields - The fields of the form to evaluate
   * @returns {boolean} represents if the step should be presented or not
   */
  public doesMeetConditionFields: (fields: FormFields) => boolean;

  /**
   * Validates whether the step should be part of the flow, useful for conditions
   * on as fields such as `select` or `radio groups`
   *
   * @param {FormFields} fields - The fields of the form to evaluate
   * @returns {boolean} whether the step should be part of the flow or not
   */
  public willBePartOfTheFlow: (fields: FormFields) => boolean;

  constructor({
    isAValidationView,
    previousStep,
    nextStep,
    doesMeetConditionFields,
    Component,
    index,
    identifier,
    willBePartOfTheFlow,
  }: FlowStepParams<FormFields>) {
    this.index = index;
    this.identifier = identifier;
    this.Component = Component;
    this.isAValidationView = !!isAValidationView;
    this.previousStep = previousStep;
    this.nextStep = nextStep;
    this.doesMeetConditionFields = doesMeetConditionFields || (() => true);
    this.willBePartOfTheFlow = willBePartOfTheFlow || (() => true);
  }
}
