import { getDatabase } from "../database/database";
import { CreateMedicineDto } from "../../shared/types/medicine";

export class MedicineRepository {
  private readonly db = getDatabase();

  create(data: CreateMedicineDto): number {
    const stmt = this.db.prepare(`
      INSERT INTO medicines (
        medicine_name,
        generic_name,
        manufacturer,
        category,
        description,
        purchase_price,
        selling_price,
        minimum_stock,
        active,
        created_at,
        updated_at
      )
      VALUES (
        @medicineName,
        @genericName,
        @manufacturer,
        @category,
        @description,
        @purchasePrice,
        @sellingPrice,
        @minimumStock,
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
          medicine_name AS medicineName,
          generic_name AS genericName,
          manufacturer,
          category,
          description,
          purchase_price AS purchasePrice,
          selling_price AS sellingPrice,
          minimum_stock AS minimumStock,
          active,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM medicines
        ORDER BY medicine_name
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
        medicine_name AS medicineName,
        generic_name AS genericName,
        manufacturer,
        category,
        description,
        purchase_price AS purchasePrice,
        selling_price AS sellingPrice,
        minimum_stock AS minimumStock,
        active,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM medicines
      WHERE id = ?
      `,
      )
      .get(id);
  }

  update(id: number, data: CreateMedicineDto): void {
    const stmt = this.db.prepare(`
    UPDATE medicines
    SET
      medicine_name = @medicineName,
      generic_name = @genericName,
      manufacturer = @manufacturer,
      category = @category,
      description = @description,
      purchase_price = @purchasePrice,
      selling_price = @sellingPrice,
      minimum_stock = @minimumStock,
      active = @active,
      updated_at = @updatedAt
    WHERE id = @id
  `);

    stmt.run({
      id,
      medicineName: data.medicineName,
      genericName: data.genericName,
      manufacturer: data.manufacturer,
      category: data.category,
      description: data.description,
      purchasePrice: data.purchasePrice,
      sellingPrice: data.sellingPrice,
      minimumStock: data.minimumStock,
      active: data.active ? 1 : 0,
      updatedAt: new Date().toISOString(),
    });
  }
  delete(id: number): void {
    const stmt = this.db.prepare(`
    DELETE FROM medicines
    WHERE id = ?
  `);

    stmt.run(id);
  }
}
