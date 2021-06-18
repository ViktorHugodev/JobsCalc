const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();
    //CRIANDO TABLE profile, que vem os dados name, avatar e etc.
    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);

    await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);

    await db.run(`INSERT INTO profile (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour) VALUES (
    "Victor Hugo",
    "https://github.com/viktorhugodev.png",
    3000,
    5,
    5,
    4,
    75
);`);

    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Boademais",
    2,
    1,
    1617514376018
);`);

    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "WebSite",
    4,
    120,
    1617514376018
);`);

    await db.close();
  },
};


initDb.init()