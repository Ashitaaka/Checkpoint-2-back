import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CountriesEntity,
  CreateCountryInput,
} from "../entities/Countries.entity";
import CountriesService from "../services/Countries.service";

@Resolver(() => CountriesEntity)
export default class CountriesResolver {
  @Query(() => [CountriesEntity])
  async listCountries(
    @Arg("countryCode", { nullable: true }) countryCode?: string
  ): Promise<CountriesEntity[]> {
    return await new CountriesService().getAllCountries(countryCode);
  }
  @Query(() => CountriesEntity)
  async getCountryByCode(@Arg("code") code: string) {
    return await new CountriesService().getOneByCode(code);
  }
  @Mutation(() => CountriesEntity)
  async createCountry(@Arg("data") data: CreateCountryInput) {
    return await new CountriesService().createCountry(data);
  }
}
