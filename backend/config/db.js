import { neon } from "@neondatabase/serverless";
import 'dotenv/config';

const { PGHOST,PGDATABASE,PGUSER,PGPASSWORD } = process.env;

// this sql function we export is used as a tagged template literal
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

