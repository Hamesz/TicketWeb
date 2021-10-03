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
      type
      year
      subscriptionDate
      January
      JanuaryNextYear
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
        type
        year
        subscriptionDate
        January
        JanuaryNextYear
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
export const getPaymentDetails = /* GraphQL */ `
  query GetPaymentDetails($id: ID!) {
    getPaymentDetails(id: $id) {
      id
      type
      email
      accountNumber
      sortCode
      beneficiary
      IBAN
      BIC
      cryptoType
      BTCWalletAddress
      createdAt
      updatedAt
    }
  }
`;
export const listPaymentDetails = /* GraphQL */ `
  query ListPaymentDetails(
    $filter: ModelPaymentDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        email
        accountNumber
        sortCode
        beneficiary
        IBAN
        BIC
        cryptoType
        BTCWalletAddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
