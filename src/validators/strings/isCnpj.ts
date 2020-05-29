import { assert } from "../Assert"

const BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999'
]

const STRICT_STRIP_REGEX: RegExp = /[-\\/.]/g
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g

const verifierDigit = (digits: string): number => {
  let index: number = 2
  const reverse: Array<number> = digits.split('').reduce((buffer: Array<number>, number: string) => {
    return [parseInt(number, 10)].concat(buffer)
  }, [])

  const sum: number = reverse.reduce((buffer, number) => {
    buffer += number * index
    index = (index === 9 ? 2 : index + 1)
    return buffer
  }, 0)

  const mod: number = sum % 11
  return (mod < 2 ? 0 : 11 - mod)
}

const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX
  return (number || '').replace(regex, '')
}

export function isCnpj(number: string, strict?: boolean): assert {
  return (): boolean => {
    const stripped: string = strip(number, strict)

    // CNPJ must be defined
    if (!stripped) {
      return false
    }

    // CNPJ must have 14 chars
    if (stripped.length !== 14) {
      return false
    }

    // CNPJ can't be blacklisted
    if (BLACKLIST.includes(stripped)) {
      return false
    }

    let numbers: string = stripped.substr(0, 12)
    numbers += verifierDigit(numbers)
    numbers += verifierDigit(numbers)

    return numbers.substr(-2) === stripped.substr(-2)
  }
}