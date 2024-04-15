import { Repository } from "typeorm";
import { ContinentsEntity } from "../entities/Continents.entity";
import db from "../db";

export default class ContinentsService {
  db: Repository<ContinentsEntity>;

  constructor() {
    this.db = db.getRepository(ContinentsEntity);
  }

  async getAllContinents(): Promise<ContinentsEntity[]> {
    return await this.db.find({ relations: { countries: true } });
  }

  async getContinentByCode(code: string): Promise<ContinentsEntity | null> {
    return await this.db.findOne({
      where: { continentCode: code },
      relations: { countries: true },
    });
  }

  async createContinent(continentCode: string): Promise<ContinentsEntity> {
    const newContinent = this.db.create({ continentCode });
    return await this.db.save(newContinent);
  }
}
