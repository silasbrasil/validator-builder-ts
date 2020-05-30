# Validator Builder
Validador de dados em TypeScript

## Introdução
------------

Essa é uma lib de validação de dados (string, number, date, cpf, cnpj) com o principal foco de uso do padrão Value Objects. Se há a necessidade de validar um formulário de um site ou dados de uma rota de uma API essa lib é ideal.

This is a library to validate data (string, number, date, cpf, cnpj) aim to Value Objects pattern. If you need validate a form or data come from a api route this library is great.

# Exemplos

## Validator Builder

```js
import {
  ValidatorBuilder,
  isNotEmpty,
  isGreaterThan,
  isEmail,
  isCpf,
  isCnpj } from 'validator-builder-ts';

class Person extends ValidatorBuilder {
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
}


const p1: Person = new PersonTest(
  'Joseph',
  '027.182.150-70',
  25,
  'joseph@mail.com',
  '67.160.009/0001-30'
);

const p2: Person = new PersonTest(
  'Timothy',
  '123456789',
  17,
  'timothy@mail.com',
  '21.111.0099/0003-20'
);

p1.isValid() // true
p1.getFailures() // []

p2.isValid() // false
p2.getFailures() 
// [ 
//  { property: 'cpf', message: 'CPF é inválido', code: 0 },
//  { property: 'age', message: 'Você menor de idade', code: 401 },
//  { property: 'cnpj', message: 'Cnpj é inválido', code: 0 } 
// ]
```