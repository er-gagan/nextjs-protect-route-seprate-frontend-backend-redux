
export const showLoader = () => {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = "block"
    }
}

export const hideLoader = () => {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = "none"
    }
}

export const handleNavigation = ({ path, router }: { path: string, router: any }) => {
    if (location.pathname !== path) {
        showLoader()
    }
    router.push(path)
}

export const removeWhiteSpace = (value: string) => {
    if (typeof value === "string") {
        return value.replace(/\s+/g, " ").trim()
    }
    return value
}

export const repeatString = ({ str, times, prefix, suffix }: { str: string, times: number, prefix?: string, suffix?: string }) => {
    if (str) {

        const result: any = [];
        for (let i = 0; i < times; i++) {
            result.push(`${prefix ? prefix : ""}${str}${suffix ? suffix : ""}`)
        }
        return result;
    }
    return ""
}


export const getPaginationParams = ({ currentPage, perPage }: { currentPage: string, perPage: string }) => {
    const limit: string = parseInt(perPage).toString();
    const offset = ((parseInt(currentPage) - 1) * parseInt(limit)).toString();
    return { limit, offset }
}

export const getDate = () => {
    const date: Date = new Date()
    const timestamp_date: number = date.valueOf() / 1000
    const createdAt: string = String(Math.floor(timestamp_date))
    const updatedAt: string = String(Math.floor(timestamp_date))
    return { createdAt, updatedAt }
}

export const catchBlockHandler = (error: Error) => {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    const res_json = apiResponseFailed({ status_code: 400, message: errorMessage })
    return res_json
}

export const apiResponseSuccess = ({ status_code, message, data }: { status_code: number, message: string, data?: any }) => {
    if (data) {
        return {
            status_code,
            status: "success",
            message,
            data
        }
    }
    return {
        status_code,
        status: "success",
        message
    }
}

export const apiResponseFailed = ({ status_code, message, data }: { status_code: number, message: string, data?: any }) => {
    if (data) {
        return {
            status_code,
            status: "failed",
            message,
            data
        }
    }
    return {
        status_code,
        status: "failed",
        message
    }
}

