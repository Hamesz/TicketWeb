/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCode = /* GraphQL */ `
  mutation CreateCode(
    $input: CreateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    createCode(input: $input, condition: $condition) {
      id
      code
      createdAt
      updatedAt
    }
  }
`;
export const updateCode = /* GraphQL */ `
  mutation UpdateCode(
    $input: UpdateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    updateCode(input: $input, condition: $condition) {
      id
      code
      createdAt
      updatedAt
    }
  }
`;
export const deleteCode = /* GraphQL */ `
  mutation DeleteCode(
    $input: DeleteCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    deleteCode(input: $input, condition: $condition) {
      id
      code
      createdAt
      updatedAt
    }
  }
`;
export const createUserPayment = /* GraphQL */ `
  mutation CreateUserPayment(
    $input: CreateUserPaymentInput!
    $condition: ModelUserPaymentConditionInput
  ) {
    createUserPayment(input: $input, condition: $condition) {
      id
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
export const updateUserPayment = /* GraphQL */ `
  mutation UpdateUserPayment(
    $input: UpdateUserPaymentInput!
    $condition: ModelUserPaymentConditionInput
  ) {
    updateUserPayment(input: $input, condition: $condition) {
      id
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
export const deleteUserPayment = /* GraphQL */ `
  mutation DeleteUserPayment(
    $input: DeleteUserPaymentInput!
    $condition: ModelUserPaymentConditionInput
  ) {
    deleteUserPayment(input: $input, condition: $condition) {
      id
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
export const createPaymentDetails = /* GraphQL */ `
  mutation CreatePaymentDetails(
    $input: CreatePaymentDetailsInput!
    $condition: ModelPaymentDetailsConditionInput
  ) {
    createPaymentDetails(input: $input, condition: $condition) {
      id
      type
      email
      accountNumber
      sortCode
      beneficiary
      IBAN
      BIC
      createdAt
      updatedAt
    }
  }
`;
export const updatePaymentDetails = /* GraphQL */ `
  mutation UpdatePaymentDetails(
    $input: UpdatePaymentDetailsInput!
    $condition: ModelPaymentDetailsConditionInput
  ) {
    updatePaymentDetails(input: $input, condition: $condition) {
      id
      type
      email
      accountNumber
      sortCode
      beneficiary
      IBAN
      BIC
      createdAt
      updatedAt
    }
  }
`;
export const deletePaymentDetails = /* GraphQL */ `
  mutation DeletePaymentDetails(
    $input: DeletePaymentDetailsInput!
    $condition: ModelPaymentDetailsConditionInput
  ) {
    deletePaymentDetails(input: $input, condition: $condition) {
      id
      type
      email
      accountNumber
      sortCode
      beneficiary
      IBAN
      BIC
      createdAt
      updatedAt
    }
  }
`;
