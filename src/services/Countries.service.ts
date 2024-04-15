import { Repository } from "typeorm";
import {
  CountriesEntity,
  CreateCountryInput,
} from "../entities/Countries.entity";
import db from "../db";
import ContinentsService from "./Continents.service";
import { ContinentsEntity } from "../entities/Continents.entity";

export default class CountriesService {
  db: Repository<CountriesEntity>;
  dbContinents: Repository<ContinentsEntity>;
  constructor() {
    this.db = db.getRepository(CountriesEntity);
    this.dbContinents = db.getRepository(ContinentsEntity);
  }

  async getAllCountries(continentCode?: string): Promise<CountriesEntity[]> {
    return await this.db.find({
      where: { continent: { continentCode } ?? undefined },
      relations: { continent: true },
    });
  }

  async getOneByCode(code: string): Promise<CountriesEntity | null> {
    return await this.db.findOne({
      where: { countryCode: code },
      relations: { continent: true },
    });
  }

  async createCountry(data: CreateCountryInput): Promise<CountriesEntity> {
    const { continentCode, countryCode, name, emoji } = data;
    let continent = await this.dbContinents.findOne({
      where: { continentCode },
    });

    if (!continent) {
      await this.dbContinents.save(this.dbContinents.create({ continentCode }));
      continent = await this.dbContinents.findOne({
        where: { continentCode },
      });
    }

    const countryExist = await this.getOneByCode(data.countryCode);

    if (countryExist) throw new Error("Country already exists");

    const newCountry = this.db.create({
      countryCode,
      name,
      emoji,
      continent: continent!,
    });
    return await this.db.save(newCountry);
  }
}
