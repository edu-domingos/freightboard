import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsCNPJConstraint } from './is-cnpj.validator'; // Importa o validador

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCNPJConstraint,
    });
  };
}
export { IsCNPJConstraint };
