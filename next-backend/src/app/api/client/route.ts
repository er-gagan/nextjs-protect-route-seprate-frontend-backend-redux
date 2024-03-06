import { query } from "@/db/query";
import { apiResponseFailed, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { create_client_table } from "./constant";

export async function POST(request: NextRequest) {
    try {
        let payload: any = await request.json()

        if (payload && Object.keys(payload).length > 0) {
            const res_data: any = await getDataFromToken(request);
            if (res_data.status_code === 200) {
                const { name, email, website, phone, address } = payload
                const { id } = res_data.data.user_data

                const client_table_create = await query({
                    query: create_client_table
                })

                if (client_table_create.status_code === 200) {
                    const insert_bank_data: any = await query({
                        query: `INSERT INTO Client (name, email, website, phone, address) VALUES (?, ?, ?, ?, ?)`,
                        values: [
                            name,
                            email ? email : null,
                            website ? website : null,
                            phone ? phone : null,
                            address ? address : null
                        ]
                    });

                    if (insert_bank_data.status_code === 200) {
                        delete insert_bank_data.data
                        insert_bank_data.message = "Data saved successfully!"
                        return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
                    } else {
                        return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
                    }
                } else {
                    return NextResponse.json(client_table_create, { status: client_table_create.status_code })
                }
            } else {
                return NextResponse.json(res_data, { status: res_data.status_code })
            }
        } else {
            const res_json = apiResponseFailed({ status_code: 500, message: "Please send a valid JSON object" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }

    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function GET(request: NextRequest) {
    try {

        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const rawParams = request.url.split('?')[1];
            const params: any = qs.parse(rawParams);
            const { id, currentPage, perPage, sort, keyName, filterKeyName, filterKeyValue, search } = params

            let get_user_res: any = null
            if (id) {
                get_user_res = await query({
                    query: `SELECT * FROM Client WHERE id = ?`,
                    values: [id],
                });
            } else if (Number(currentPage) && Number(perPage)) {

                const { limit, offset } = getPaginationParams({ currentPage, perPage })

                let whereClauseQuery = ""
                if (filterKeyName === "createdAt" || filterKeyName === "updatedAt") {
                    whereClauseQuery = `WHERE DATE(FROM_UNIXTIME(${filterKeyName})) = ?`
                } else if (filterKeyName) {
                    whereClauseQuery = `WHERE ${filterKeyName} = ?`
                }

                let sortQuery = ""
                if (keyName && sort) {
                    sortQuery = `ORDER BY ${keyName} ${sort}`
                }

                let searchQuery = ""
                const searchVal: any = repeatString({ str: search, times: 1, prefix: "%", suffix: "%" })
                if (search) {
                    searchQuery = `${whereClauseQuery ? "OR" : "WHERE"} name LIKE ?`;
                }


                let newValueArr: any = []
                if (whereClauseQuery) {
                    newValueArr.push(filterKeyValue)
                }
                if (searchQuery) {
                    newValueArr.push(...searchVal)
                }
                newValueArr.push(limit)
                newValueArr.push(offset)


                const p1 = `SELECT 
                Client.*
                FROM Client ${whereClauseQuery} ${searchQuery} ${sortQuery} LIMIT ? OFFSET ?`

                const p2 = p1.replaceAll("undefined", "")
                const queryStr = p2.replaceAll("  ", " ").replaceAll("  ", " ")

                get_user_res = await query({
                    query: queryStr,
                    values: newValueArr
                });

                const get_user_count: any = await query({
                    query: `SELECT COUNT(*) as count FROM Client`,
                    values: [],
                });
                if (get_user_count.status_code === 200) {
                    get_user_res['totalCount'] = get_user_count.data[0].count
                } else {
                    return NextResponse.json(get_user_count, { status: get_user_count.status_code })
                }
            } else {
                const res_json = apiResponseFailed({ status_code: 200, message: "Something went wrong" })
                return NextResponse.json(res_json, { status: res_json.status_code })
            }
            if (get_user_res) {

                if (get_user_res.status_code === 200) {
                    get_user_res.message = "Data fetch successfully!"
                    return NextResponse.json(get_user_res, { status: get_user_res.status_code })
                } else {
                    return NextResponse.json(get_user_res, { status: get_user_res.status_code })
                }
            } else {
                const res_json = apiResponseFailed({ status_code: 500, message: "Data not exist!" })
                return NextResponse.json(res_json, { status: res_json.status_code })
            }
        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function DELETE(request: any) {
    try {
        let payload: any = await request.json()
        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { id } = res_data.data.user_data
            const { client_id } = payload

            if (Array.isArray(client_id) === true) {
                const deleteUser: any = await query({
                    query: `DELETE FROM Client WHERE id IN (${client_id.join(",")})`
                });

                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Data deleted successfully!"
                    }
                    return NextResponse.json(res_data, { status: res_data.status_code })
                } else {
                    return NextResponse.json(deleteUser, { status: deleteUser.status_code })
                }
            } else {
                const deleteUser: any = await query({
                    query: `DELETE FROM Client WHERE id = ?`,
                    values: [client_id],
                });
                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Data deleted successfully!"
                    }
                    return NextResponse.json(res_data, { status: res_data.status_code })
                } else {
                    return NextResponse.json(deleteUser, { status: deleteUser.status_code })
                }
            }

        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function PUT(request: NextRequest) {
    try {
        let payload: any = await request.json()
        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { client_id, name, email, website, phone, address } = payload

            const bankCategoryData: any = await query({
                query: `SELECT * FROM Client WHERE id = ? `,
                values: [client_id],
            })

            if (bankCategoryData.status_code === 200 && bankCategoryData.data.length > 0) {
                const getCategoryData = bankCategoryData.data[0]
                const wholeJson = {
                    ...getCategoryData,
                    name: name ? name : getCategoryData.name,
                    email: email ? email : getCategoryData.email,
                    website: website ? website : getCategoryData.website,
                    phone: phone ? phone : getCategoryData.phone,
                    address: address ? address : getCategoryData.address
                }

                delete wholeJson.id

                const keysData = Object.keys(wholeJson)
                const valuesData = Object.values(wholeJson)
                const queryStr: any = []
                keysData.map(item => {
                    queryStr.push(`${item} = ?`);
                })

                const user_OrgData: any = await query({
                    query: `UPDATE Client SET ${queryStr.join(", ")} WHERE id = ?`,
                    values: [
                        ...valuesData,
                        client_id
                    ]
                });

                if (user_OrgData.status_code === 200) {
                    delete user_OrgData.data
                    user_OrgData.message = "Data updated successfully!"
                    return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
                } else {
                    return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
                }
            } else {
                return NextResponse.json(bankCategoryData, { status: bankCategoryData.status_code })
            }
        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}