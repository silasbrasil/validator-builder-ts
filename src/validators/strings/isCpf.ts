import {
  allDigitsAreEqual,
  hasCpfLength,
  calcFirstChecker,
  calcSecondChecker } from '../utils'
import { assert } from '../Assert'



/**
 * [Validador de CPF](https://tiagoporto.github.io/gerador-validador-cpf)
 * @author Tiago Porto
 *
 * @function Validate
 * @param  {string} value  CPF number
 *
 * @returns {boolean}                true = valid || false = invalid
 */
export function isCpf(value: string): assert {
  return (): boolean => {
    if (typeof value !== 'string') {
      return false
    }
  
    const cleanCPF = String(value).replace(/\.|-|\s/g, '')
    const firstNineDigits = cleanCPF.substring(0, 9)
    const checker = cleanCPF.substring(9, 11)
  
    if (!hasCpfLength(cleanCPF) || allDigitsAreEqual(cleanCPF)) {
      return false
    }
  
    const checker1 = calcFirstChecker(firstNineDigits)
    const checker2 = calcSecondChecker(`${firstNineDigits}${checker1}`)
  
    return checker === `${checker1}${checker2}`
  }
}