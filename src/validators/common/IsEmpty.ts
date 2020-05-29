import {assert} from '../Assert';
import {isIterable, isIterableEmtpy} from "./";

export function isEmpty (input: any): assert {
  return (): boolean => {
    return input === "" || input === null || input === undefined || interableEmpty(input)
  }
}

function interableEmpty(input: any): boolean {
  if (isIterable(input)) {
      return isIterableEmtpy(input);
  }
  return false;
}
