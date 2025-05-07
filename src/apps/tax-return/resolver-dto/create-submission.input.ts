import { Field, InputType } from '@nestjs/graphql';
import {
  IncomeType,
  PropertyType,
  DebtType,
  Currency,
} from '@clients/tax-return';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateSubmissionInput {
  @Field(() => [CreateIncomeInput])
  incomes: CreateIncomeInput[];

  @Field(() => [CreatePropertyInput])
  properties: CreatePropertyInput[];

  @Field(() => [CreateDebtInput])
  debts: CreateDebtInput[];
}

@InputType()
export class CreateIncomeInput {
  @Field(() => String)
  type: IncomeType;

  @Field({ nullable: true })
  payer?: string;

  @Field()
  amount: number;

  @Field(() => String)
  currency: Currency;

  @Field({ nullable: true })
  explanation?: string;
}

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  type: PropertyType;

  @Field()
  valueName: string;

  @Field()
  value: number;

  @Field(() => String)
  currency: Currency;

  @Field(() => GraphQLJSONObject, { nullable: true })
  properties?: Record<string, unknown>;
}

@InputType()
export class CreateDebtInput {
  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  type: DebtType;

  @Field(() => String)
  currency: Currency;

  @Field({ nullable: true })
  creditor?: string;

  @Field({ nullable: true })
  creditorSsn?: string;

  @Field({ nullable: true })
  loanNumber?: string;

  @Field({ nullable: true })
  loanStartDate?: string;

  @Field({ nullable: true })
  loanDurationYears?: number;

  @Field({ nullable: true })
  yearPaymentTotal?: number;

  @Field({ nullable: true })
  nominalPaymentTotal?: number;

  @Field()
  interestPaymentTotal: number;

  @Field()
  remaining: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  properties?: Record<string, unknown>;
} 