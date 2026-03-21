declare module 'class-validator-br' {
  import { ValidationOptions } from 'class-validator';
  export function IsCPF(
    validationOptions?: ValidationOptions,
  ): PropertyDecorator;
}
