import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ContinentsEntity } from "../entities/Continents.entity";
import ContinentsService from "../services/Continents.service";

@Resolver(() => ContinentsEntity)
export class ContinentsResolver {
  @Query(() => [ContinentsEntity])
  async listContinents(): Promise<ContinentsEntity[]> {
    return await new ContinentsService().getAllContinents();
  }
  @Query(() => ContinentsEntity)
  async getContinentByCode(
    @Arg("code") code: string
  ): Promise<ContinentsEntity | null> {
    return await new ContinentsService().getContinentByCode(code);
  }

  @Mutation(() => ContinentsEntity)
  async createContinent(@Arg("continentCode") continentCode: string) {
    return await new ContinentsService().createContinent(continentCode);
  }
}
