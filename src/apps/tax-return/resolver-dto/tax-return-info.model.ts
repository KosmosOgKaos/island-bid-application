import {
  DebtType,
  IncomeType,
  PropertyType,
  SubmissionDto,
} from '@clients/tax-return';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class TaxReturnInfoPerson {
  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  ssn: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  telephone?: string;
}

@ObjectType()
export class TaxReturnInfoDebt {
  @Field()
  currency: string;

  @Field()
  interestPaymentTotal: number;

  @Field()
  remaining: number;

  @Field()
  type: DebtType;

  @Field({ nullable: true })
  creditor?: string;

  @Field({ nullable: true })
  creditorSsn?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  loanDurationYears?: number;

  @Field({ nullable: true })
  loanNumber?: string;

  @Field({ nullable: true })
  loanStartDate?: string;

  @Field({ nullable: true })
  nominalPaymentTotal?: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  properties?: Record<string, unknown>;

  @Field({ nullable: true })
  yearPaymentTotal?: number;
}

@ObjectType()
export class TaxReturnInfoProperty {
  @Field()
  currency: string;

  @Field()
  type: PropertyType;

  @Field()
  value: number;

  @Field()
  valueName: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  properties?: Record<string, unknown>;
}

@ObjectType()
export class TaxReturnInfoIncome {
  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  type: IncomeType;

  @Field({ nullable: true })
  explanation?: string;

  @Field({ nullable: true })
  payer?: string;
}
@ObjectType()
export class TaxReturnInfo {
  @Field()
  person: TaxReturnInfoPerson;

  @Field(() => [TaxReturnInfoDebt])
  debts: Array<TaxReturnInfoDebt>;

  @Field(() => [TaxReturnInfoIncome])
  incomes: Array<TaxReturnInfoIncome>;

  @Field(() => [TaxReturnInfoProperty])
  properties: Array<TaxReturnInfoProperty>;
}

export const mapTaxReturnInfo = (submission: SubmissionDto): TaxReturnInfo => {
  const { person, debts, incomes, properties } = submission;

  // Person
  const { kennitala } = person;

  return {
    person: {
      ssn: kennitala,
      ...person,
    },
    debts: debts.map(mapTaxReturnInfoDebt),
    incomes: incomes.map(mapTaxReturnInfoIncome),
    properties: properties.map(mapTaxReturnInfoProperty),
  };
};

export const mapTaxReturnInfoDebt = (
  debt: SubmissionDto['debts'][0],
): TaxReturnInfoDebt => {
  const { creditorKennitala } = debt;

  return {
    creditorSsn: creditorKennitala,
    ...debt,
  };
};

export const mapTaxReturnInfoIncome = (
  income: SubmissionDto['incomes'][0],
): TaxReturnInfoIncome => {
  return {
    ...income,
  };
};

export const mapTaxReturnInfoProperty = (
  property: SubmissionDto['properties'][0],
): TaxReturnInfoProperty => {
  return {
    ...property,
  };
};
