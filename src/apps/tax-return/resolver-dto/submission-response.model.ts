import { Field, ObjectType } from '@nestjs/graphql';
import { IncomeType, PropertyType, DebtType } from '@clients/tax-return';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class IncomeResponseDto {
  @Field()
  id: number;

  @Field(() => String)
  type: IncomeType;

  @Field({ nullable: true })
  payer?: string;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field({ nullable: true })
  explanation?: string;
}

@ObjectType()
export class PropertyResponseDto {
  @Field()
  id: number;

  @Field(() => String)
  type: PropertyType;

  @Field()
  valueName: string;

  @Field()
  value: number;

  @Field()
  currency: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  properties?: Record<string, unknown>;
}

@ObjectType()
export class DebtResponseDto {
  @Field()
  id: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  type: DebtType;

  @Field()
  currency: string;

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

@ObjectType()
export class SubmissionResponseDto {
  @Field()
  id: number;

  @Field()
  ssn: string;

  @Field()
  status: string;

  @Field(() => [IncomeResponseDto])
  incomes: IncomeResponseDto[];

  @Field(() => [PropertyResponseDto])
  properties: PropertyResponseDto[];

  @Field(() => [DebtResponseDto])
  debts: DebtResponseDto[];
} 