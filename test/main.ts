import {
  ValidatorBuilder,
  isNotEmpty,
  isGreaterThan,
  isEmail,
  isCpf,
  isCnpj } from '../src';


/**
 * Next features
 *  - Create Data validator
 *  - Add name property on failure object
 */
interface IPersonTest {
  name: string,
  nin: string,
  age: number,
  email: string,
  cnpj: string
}

class PersonTest extends ValidatorBuilder {
  constructor (
    private name: string,
    private nin: string,
    private age: number,
    private email: string,
    private cnpj: string
  ) {
    super();

    this.onValidate()
      .validateIf(isNotEmpty(this.name), 'name', 'Nome não pode ser vazio', 404)
      .validateIf(isCpf(this.nin), 'cpf', 'CPF é inválido')
      .validateIf(isGreaterThan(this.age, 27), 'age', 'Você menor de idade', 401)
      .validateIf(isEmail(this.email), 'email', 'Você não tem um email válido', 303)
      .validateIf(isCnpj(this.cnpj), 'cnpj', 'Cnpj é inválido')
      .validate();
  }

  public static build({name, nin, age, email, cnpj}: IPersonTest): PersonTest {
    return new PersonTest(name, nin, age, email, cnpj);
  }

  toJson() {
    return {
      name: this.name,
      nin: this.nin,
      age: this.age,
      email: this.email,
      cnpj: this.cnpj
    }
  }
}

const p1: PersonTest = new PersonTest(
  'Joseph',
  '027.182.150-70',
  25,
  'joseph@mail.com',
  '67.160.009/0001-30'
 );

 const p2: PersonTest = new PersonTest(
  'Timothy',
  '123456789',
  17,
  'timothy@mail.com',
  '21.111.0099/0003-20'
);

console.log(p1.isValid())
console.log(p1.getFailures())

console.log(p2.isValid())
console.log(p2.getFailures())
