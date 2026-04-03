import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCNPJ', async: false })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string): boolean {
    if (!cnpj) return false;

    // Remove caracteres não numéricos (caso o CNPJ tenha pontuação como o formato "XX.XXX.XXX/XXXX-XX")
    cnpj = cnpj.replace(/\D/g, '');

    // CNPJ deve ter 14 caracteres
    if (cnpj.length !== 14) return false;

    // Verificação de CNPJ alfanumérico simples
    // Aqui, você pode usar um regex que permita letras e números
    if (!/^[a-zA-Z0-9]+$/.test(cnpj)) return false;

    // Elimina CNPJs inválidos conhecidos (ex: 11111111111111)
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação dos dígitos verificadores (mesmo método de CPF, mas adaptado para CNPJ)
    let sum = 0;
    let pos = 12;

    // Cálculo para o primeiro dígito verificador
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * (pos - i);
    }

    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (firstDigit !== parseInt(cnpj.charAt(12))) return false;

    // Cálculo para o segundo dígito verificador
    sum = 0;
    pos = 13;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * (pos - i);
    }

    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (secondDigit !== parseInt(cnpj.charAt(13))) return false;

    return true;
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}
