import { ValidatorBuilder } from '../src/ValidatorBuilder';
import { isNotEmpty, isGreaterThan, isEmail, isCpf, isCnpj } from '../src/validators';


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
      .validateIf(isNotEmpty(this.name), 'name', 'Name não pode ser vazio', 404)
      .validateIf(isCpf(this.nin), 'nin', 'Cpf inválido')
      .validateIf(isGreaterThan(this.age, 24), 'age', 'Você é menino novo', 404)
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

const person: PersonTest = new PersonTest('Silas', '60028651367', 25, 'silas@GMAIL.com', '67.160.009/0001-30');

console.log(person.isValid())
console.log(person.getFailures())
