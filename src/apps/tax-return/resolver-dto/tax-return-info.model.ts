import { PersonDTO } from '@clients/national-registry/dto/person.dto';
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
  id: number;

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
  id: number;

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
  id: number;

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
  @Field(() => TaxReturnInfoPerson, { nullable: true })
  person?: TaxReturnInfoPerson;

  @Field(() => [TaxReturnInfoDebt], { nullable: true })
  debts?: Array<TaxReturnInfoDebt>;

  @Field(() => [TaxReturnInfoIncome], { nullable: true })
  incomes?: Array<TaxReturnInfoIncome>;

  @Field(() => [TaxReturnInfoProperty], { nullable: true })
  properties?: Array<TaxReturnInfoProperty>;

  @Field({ nullable: true })
  error?: string;
}

export const mapTaxReturnInfo = (
  submission: SubmissionDto | undefined,
  person: PersonDTO | undefined,
  ssn: string,
): TaxReturnInfo => {
  if (!person) {
    return {
      error: `Person with SSN ${ssn} was not found`,
    };
  }

  if (!submission) {
    return {
      person: mapTaxReturnInfoPerson(person),
      error: `No tax return submission found for person with SSN ${ssn}`,
    };
  }

  const { debts, incomes, properties } = submission;

  return {
    person: mapTaxReturnInfoPerson(person),
    debts: debts?.map(mapTaxReturnInfoDebt) ?? [],
    incomes: incomes?.map(mapTaxReturnInfoIncome) ?? [],
    properties: properties?.map(mapTaxReturnInfoProperty) ?? [],
  };
};

export const mapTaxReturnInfoPerson = (
  person: PersonDTO,
): TaxReturnInfoPerson => {
  return {
    name: person.name,
    ssn: person.kennitala,
    address: person.address,
    email: person.email,
    telephone: person.telephone,
  };
};

export const mapTaxReturnInfoDebt = (
  debt: SubmissionDto['debts'][0],
): TaxReturnInfoDebt => {
  const { creditorKennitala } = debt;

  return {
    ...debt,
    creditorSsn: creditorKennitala,
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
