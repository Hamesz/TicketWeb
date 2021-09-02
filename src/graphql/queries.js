/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      code
      createdAt
      updatedAt
    }
  }
`;
export const listCodes = /* GraphQL */ `
  query ListCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserPayment = /* GraphQL */ `
  query GetUserPayment($id: ID!) {
    getUserPayment(id: $id) {
      id
      year
      subscriptionDate
      January
      February
      March
      April
      May
      June
      July
      August
      September
      October
      November
      December
      createdAt
      updatedAt
    }
  }
`;
export const listUserPayments = /* GraphQL */ `
  query ListUserPayments(
    $filter: ModelUserPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
        subscriptionDate
        January
        February
        March
        April
        May
        June
        July
        August
        September
        October
        November
        December
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
