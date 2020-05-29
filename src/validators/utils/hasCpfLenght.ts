export const hasCpfLength = (cpf: string): void | boolean => {
  if (cpf.length > 11) {
    return false
  } else if (cpf.length < 11) {
    return false
  }

  return true
}