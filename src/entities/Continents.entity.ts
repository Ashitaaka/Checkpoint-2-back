import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountriesEntity } from "./Countries.entity";

@ObjectType()
@Entity()
export class ContinentsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    length: 20,
    transformer: {
      from(value: string) {
        return value.toUpperCase();
      },
      to(value: string) {
        return value.toUpperCase();
      },
    },
  })
  continentCode: string;

  @Field(() => [CountriesEntity])
  @OneToMany(() => CountriesEntity, (country) => country.continent)
  countries: CountriesEntity[];
}
