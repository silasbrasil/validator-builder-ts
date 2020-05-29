import { assert } from "../Assert";
import { isEmpty } from "../common";

export function isEmail(input: string): assert {
  return (): boolean => {
    if (isEmpty(input)()) return false

    return /\w+@\w+\.\w+/i.test(input);
  }
}
