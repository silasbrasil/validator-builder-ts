import {assert} from '../Assert';
import {isEmpty} from './IsEmpty';

export function isNotEmpty(input: any): assert {
  return (): boolean => {
    return !isEmpty(input)();
  }
}
