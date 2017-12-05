# graphql-phone-type

GraphQL schema scalar phone type, based on [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js).

## Installation

```bash
npm i -S graphql-phone-type
```

or with Yarn:

```bash
yarn add graphql-phone-type
```

## Usage

```js
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import GraphQLPhoneType from 'graphql-phone-type'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      mobilePhone: {
        type: new GraphQLPhoneType({
          name: 'MobilePhone',
          country: 'RU',
          type: 'MOBILE'
        }),
        resolve: () => '+7 (915) 000 00 00',
      },
    }),
  }),
})
```

Then you can query it like this:

```graphql
query {
  mobilePhone
}
```

## Demo

An example GraphQL server implementation is available here:
[demo](https://github.com/enniel/graphql-phone-type/tree/master/demo)
