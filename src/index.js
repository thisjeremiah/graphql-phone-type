import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { isValidNumber, getNumberType } from 'libphonenumber-js';

const validator = (ast, { country = 'US', type } = {}) => {
  const { kind, value } = ast;
  if (kind !== Kind.STRING) {
    throw new GraphQLError(`Query error: Can only parse strings got a: ${kind}`, [ ast ]);
  }

  let isValid = isValidNumber(value, country);
  if (isValid && type) {
    isValid = getNumberType(value, country) === type;
  }
  if (!isValid) {
    throw new GraphQLError('Query error: Not a valid phone number', [ ast ]);
  }

  return value;
};

export class GraphQLPhoneType extends GraphQLScalarType {
  constructor(options = {}) {
    const { name, description } = options;
    super({
      name,
      description,
      serialize: value => {
        const ast = {
          kind: Kind.STRING,
          value
        };
        return validator(ast, options);
      },
      parseValue: value => {
        const ast = {
          kind: Kind.STRING,
          value
        };
        return validator(ast, options);
      },
      parseLiteral: ast => validator(ast, options)
    });
  }
}

export default GraphQLPhoneType;
