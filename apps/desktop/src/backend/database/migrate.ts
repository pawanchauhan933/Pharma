import fs from "node:fs";
import path from "node:path";

import { getDatabase } from "./database";

export function runMigrations(
  migrationsPath: string,
): void {
  const db = getDatabase();

  if (!fs.existsSync(migrationsPath)) {
    console.warn(
      `Migration folder not found: ${migrationsPath}`,
    );
    return;
  }

  const migrationFiles = fs
    .readdirSync(migrationsPath)
    .filter(file => file.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      "utf8",
    );

    db.exec(sql);

    console.log(`✅ Migration executed: ${file}`);
  }
}