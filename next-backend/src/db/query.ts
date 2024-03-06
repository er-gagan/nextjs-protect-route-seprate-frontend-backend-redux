import { apiResponseFailed, apiResponseSuccess } from "@/utils/utils";
import { connection } from "./connection";

export async function query({ database_name, query, values }: { database_name?: string, query: string; values?: any[] }) {
    try {
        const db_name = database_name === "" ? "" : database_name ? database_name : process.env.DATABASE_NAME
        const dbconnection = await connection({ db_name })
        // Connect to the database
        const [results] = await dbconnection.execute(query, values);
        dbconnection.end();
        return apiResponseSuccess({ status_code: 200, message: "Operation succeeded", data: results })
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return apiResponseFailed({ status_code: 400, message: errorMessage });
    }
}