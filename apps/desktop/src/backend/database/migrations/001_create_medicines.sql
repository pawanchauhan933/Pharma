CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    medicine_name TEXT NOT NULL,
    generic_name TEXT,

    manufacturer TEXT NOT NULL,
    category TEXT NOT NULL,

    description TEXT,

    purchase_price REAL NOT NULL,
    selling_price REAL NOT NULL,

    minimum_stock INTEGER NOT NULL,

    active INTEGER NOT NULL DEFAULT 1,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);