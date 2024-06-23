const {Pool} = require('pg');
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

// Hosted DB
let connectionString = "postgres://postgres.fjghcpzuknouvfnkkgiy:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
connectionString = connectionString.replace("[YOUR-PASSWORD]", process.env.DATABASE_PASSWORD);
// Local DB
// exports.pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'mcalab',
//     password: 'pass1234',
//     port: 5432,
// })

exports.pool = new Pool({connectionString});
