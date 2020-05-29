import {assert} from '../Assert';

// export function IsNotNull(input: any): boolean {
//   return input !== null && typeof input !== "undefined";
// }

export function isNotNull(input: any): assert {
  return (): boolean => {
    return input !== null && typeof input !== "undefined";
  }
}