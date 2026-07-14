"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const node_url = require("node:url");
const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
const DATABASE_NAME = "pharmacy.db";
let database = null;
function getDatabase() {
  if (database) {
    return database;
  }
  const userDataPath = electron.app.getPath("userData");
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
  const databasePath = path.join(
    userDataPath,
    DATABASE_NAME
  );
  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  console.log("📦 Database:", databasePath);
  return database;
}
function runMigrations(migrationsPath) {
  const db = getDatabase();
  if (!fs.existsSync(migrationsPath)) {
    console.warn(
      `Migration folder not found: ${migrationsPath}`
    );
    return;
  }
  const migrationFiles = fs.readdirSync(migrationsPath).filter((file) => file.endsWith(".sql")).sort();
  for (const file of migrationFiles) {
    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      "utf8"
    );
    db.exec(sql);
    console.log(`✅ Migration executed: ${file}`);
  }
}
const IPC_CHANNELS = {
  MEDICINE_CREATE: "medicine:create",
  MEDICINE_LIST: "medicine:list",
  MEDICINE_GET_BY_ID: "medicine:getById",
  MEDICINE_UPDATE: "medicine:update",
  MEDICINE_DELETE: "medicine:delete"
};
class MedicineRepository {
  constructor() {
    __publicField(this, "db", getDatabase());
  }
  create(data) {
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
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = stmt.run({
      ...data,
      active: data.active ? 1 : 0,
      createdAt: now,
      updatedAt: now
    });
    return Number(result.lastInsertRowid);
  }
  findAll() {
    return this.db.prepare(
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
      `
    ).all();
  }
  findById(id) {
    return this.db.prepare(
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
      `
    ).get(id);
  }
  update(id, data) {
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
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}
class MedicineService {
  constructor() {
    __publicField(this, "repository", new MedicineRepository());
  }
  create(data) {
    this.validate(data);
    return this.repository.create(data);
  }
  update(id, data) {
    this.validate(data);
    this.repository.update(id, data);
  }
  getAll() {
    return this.repository.findAll();
  }
  getById(id) {
    const medicine = this.repository.findById(id);
    if (!medicine) {
      throw new Error("Medicine not found.");
    }
    return medicine;
  }
  validate(data) {
    debugger;
    if (data.sellingPrice < data.purchasePrice) {
      throw new Error("Selling price cannot be less than purchase price.");
    }
  }
  deleteMedicine(id) {
    this.repository.delete(id);
  }
}
const medicineService = new MedicineService();
function registerMedicineIpc() {
  electron.ipcMain.handle(IPC_CHANNELS.MEDICINE_CREATE, (_, data) => {
    return medicineService.create(data);
  });
  electron.ipcMain.handle(IPC_CHANNELS.MEDICINE_LIST, () => {
    return medicineService.getAll();
  });
  electron.ipcMain.handle(
    IPC_CHANNELS.MEDICINE_GET_BY_ID,
    (_, id) => medicineService.getById(id)
  );
  electron.ipcMain.handle(IPC_CHANNELS.MEDICINE_UPDATE, (_, id, data) => {
    medicineService.update(id, data);
    return true;
  });
  electron.ipcMain.handle(IPC_CHANNELS.MEDICINE_DELETE, (_, id) => {
    medicineService.deleteMedicine(id);
  });
}
const __dirname$1 = path.dirname(node_url.fileURLToPath(typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("main.js", document.baseURI).href));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:");
  console.dir(reason, { depth: null });
  if (reason instanceof Error) {
    console.error(reason.stack);
  }
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err.stack);
});
electron.app.whenReady().then(async () => {
  try {
    const migrationsPath = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "src/backend/database/migrations") : path.join(process.resourcesPath, "migrations");
    console.log("Migrations path:", migrationsPath);
    runMigrations(migrationsPath);
    registerMedicineIpc();
    createWindow();
  } catch (err) {
    console.error("===== STARTUP ERROR =====");
    console.dir(err, { depth: null });
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error(JSON.stringify(err, null, 2));
    }
  }
});
exports.MAIN_DIST = MAIN_DIST;
exports.RENDERER_DIST = RENDERER_DIST;
exports.VITE_DEV_SERVER_URL = VITE_DEV_SERVER_URL;
