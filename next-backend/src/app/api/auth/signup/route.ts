
import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, hashData } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json()
        const { name, email, password } = payload
        if (name && email && password) {
            const res_db_create = await query({
                database_name: "",
                query: `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`
            })
            if (res_db_create.status_code === 200) {

                const create_user_table = await query({
                    query: `CREATE TABLE IF NOT EXISTS User (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name varchar(100) not null,
                    email varchar(100) unique,
                    password varchar(200)
                )`
                })

                const hashedPwd = await hashData(password)
                if (create_user_table.status_code === 200) {
                    const insert_user_data = await query({
                        query: `INSERT INTO User (name, email, password) values (?, ?, ?)`,
                        values: [name, email, hashedPwd]
                    })
                    if (insert_user_data.status_code === 200) {
                        const res_json = apiResponseSuccess({ status_code: 200, message: "You have successfully signed up!" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    } else {
                        return NextResponse.json(insert_user_data, { status: insert_user_data.status_code })
                    }
                } else {
                    return NextResponse.json(create_user_table, { status: create_user_table.status_code })
                }
            } else {
                return NextResponse.json(res_db_create, { status: res_db_create.status_code })
            }
        } else {
            const res_json = apiResponseFailed({ status_code: 400, message: "Please provide valid json" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}