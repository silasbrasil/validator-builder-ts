import {assert} from '../Assert';


export function exist(input: any): assert {
  return (): boolean => {
    return input !== null || input !== undefined;
  }
}
