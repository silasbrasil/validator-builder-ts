import {assert} from './validators/Assert';

export interface Failure {
  readonly property: string;
  readonly message: string;
  readonly code: number | string;
}

export interface Rule {
  readonly assert: assert;
  readonly property?: string;
  readonly message?: string;
  readonly code?: number | string;
}

export abstract class ValidatorBuilder {
  private failures: Failure[] = [];
  protected rules: Rule[] = [];

  public onValidate = () => this;

  public isValid = (): boolean => {
    return this.failures.length == 0;
  }

  public isInvalid = (): boolean => {
    return !this.isValid();
  }

  public validateIf = (assert: assert, property: string = '', message: string = "Validation failure", code: number | string = 0): ValidatorBuilder => {
    this.rules.push({ assert, property, message, code });
    return this;
  }

  public validate = (): void => {
    this.rules.forEach(rule => {
      if(!rule.assert()) this.addFailure(rule.property, rule.message, rule.code);
    });
  }

  public getFailures(): Failure[] {
    return this.failures;
  }

  private addFailure(property: string = "", message: string = "", code: number | string = 0) {
    this.failures.push({ property, message, code });
  }
}
