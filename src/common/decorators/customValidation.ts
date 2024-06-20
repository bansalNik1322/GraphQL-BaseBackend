import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function AtleastOne(fields: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'AtleastOne',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          return fields.some(field => !!object[field]); // Return true if any of the specified fields is present
        },
        defaultMessage(args: ValidationArguments) {
          return `At least one of the following fields must be provided: ${fields.join(', ')}.`;
        }
      }
    });
  };
}
