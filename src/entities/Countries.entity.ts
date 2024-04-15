import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { ContinentsEntity } from "./Continents.entity";

@ObjectType()
@Entity()
export class CountriesEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    length: 5,
    transformer: {
      from(value: string) {
        return value.toUpperCase();
      },
      to(value: string) {
        return value.toUpperCase();
      },
    },
  })
  countryCode: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  name: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  emoji: string;

  @Field(() => ContinentsEntity)
  @ManyToOne(() => ContinentsEntity, (continent) => continent.countries)
  continent: ContinentsEntity;
}

@InputType()
export class CreateCountryInput {
  @Field()
  countryCode: string;
  @Field()
  name: string;
  @Field()
  emoji: string;
  @Field()
  continentCode: string;
}

@InputType()
export class CreateCountryWithContinentInput {
  @Field()
  countryDatas: CreateCountryInput;
  @Field()
  continent: ContinentsEntity;
}
