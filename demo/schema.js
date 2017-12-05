import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import GraphQLPhone from '../src';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      validPhone: {
        type: new GraphQLPhone({
          name: 'ValidPhone',
          country: 'RU'
        }),
        resolve: () => '+7 (915) 000 00 00'
      },
      invalidPhone: {
        type: new GraphQLPhone({
          name: 'InvalidPhone',
          country: 'RU'
        }),
        resolve: () => 'not a phone'
      },
      validMobilePhone: {
        type: new GraphQLPhone({
          name: 'ValidMobilePhone',
          country: 'RU',
          type: 'MOBILE'
        }),
        resolve: () => '+7 (915) 000 00 00'
      },
      invalidMobilePhone: {
        type: new GraphQLPhone({
          name: 'InvalidMobilePhone',
          country: 'RU',
          type: 'MOBILE'
        }),
        resolve: () => '+78005553535'
      }
    }),
  }),
});
