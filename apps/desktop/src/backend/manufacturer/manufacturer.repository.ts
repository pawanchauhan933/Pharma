import { getDatabase } from "../database/database";
import type { CreateManufacturerDto } from "../../shared/types/manufacturer";

export class ManufacturerRepository {
  private readonly db = getDatabase();

  create(data: CreateManufacturerDto): number {
    const stmt = this.db.prepare(`
      INSERT INTO manufacturers (
        name,
        contact_person,
        phone,
        email,
        address,
        description,
        active,
        created_at,
        updated_at
      )
      VALUES (
        @name,
        @contactPerson,
        @phone,
        @email,
        @address,
        @description,
        @active,
        @createdAt,
        @updatedAt
      )
    `);

    const now = new Date().toISOString();

    const result = stmt.run({
      ...data,
      active: data.active ? 1 : 0,
      createdAt: now,
      updatedAt: now,
    });

    return Number(result.lastInsertRowid);
  }

  findAll() {
    return this.db
      .prepare(
        `
        SELECT
          id,
          name,
          contact_person AS contactPerson,
          phone,
          email,
          address,
          description,
          active,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM manufacturers
        ORDER BY name
      `,
      )
      .all();
  }

  findById(id: number) {
    return this.db
      .prepare(
        `
        SELECT
          id,
          name,
          contact_person AS contactPerson,
          phone,
          email,
          address,
          description,
          active,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM manufacturers
        WHERE id = ?
      `,
      )
      .get(id);
  }

  update(id: number, data: CreateManufacturerDto): void {
    const stmt = this.db.prepare(`
      UPDATE manufacturers
      SET
        name = @name,
        contact_person = @contactPerson,
        phone = @phone,
        email = @email,
        address = @address,
        description = @description,
        active = @active,
        updated_at = @updatedAt
      WHERE id = @id
    `);

    stmt.run({
      id,
      ...data,
      active: data.active ? 1 : 0,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: number): void {
    this.db
      .prepare(
        `
        DELETE FROM manufacturers
        WHERE id = ?
      `,
      )
      .run(id);
  }
}
