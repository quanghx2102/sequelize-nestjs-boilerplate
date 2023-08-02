import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipeCustoms = {
  exceptionFactory: function (validationErrors: ValidationError[] = []) {
    return new BadRequestException(
      validationErrors.map((error) => ({
        field: error.property,
        error: Object.values(error.constraints).join(', '),
      })),
    );
  },
};
