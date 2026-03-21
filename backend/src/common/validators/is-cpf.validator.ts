import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    if (!cpf) return false;

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Deve ter 11 dígitos
    if (cpf.length !== 11) return false;

    // Elimina CPFs inválidos conhecidos (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;

    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;

    if (secondDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  defaultMessage() {
    return 'CPF inválido';
  }
}
