
import mysql, { Connection } from "mysql2/promise"
export const connection = async ({ db_name }: { db_name: string | undefined }) => {

    const connection = {
        host: process.env.DATABASE_HOST,
        database: db_name,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
    const dbconnection: Connection = await mysql.createConnection({
        ...connection
    });
    return dbconnection;
}
