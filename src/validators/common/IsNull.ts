import {assert} from '../Assert';


export function isNull(input: any): assert {
  return ():boolean => {
    return input === null;
  }
}