import React from 'react'

const Button = (props: any) => {

    return (<>
        {props.buttontype === "primary" ? (<>
            <button
                {...props}
                className={`bg-primary1 border-primary1 border text-primary4 py-1.5 px-3 rounded-md ${props.className}`}
            >
                {props.title}
            </button>
        </>) : props.buttontype === "secondary" && (<>
            <button
                {...props}
                className={`border border-primary1 py-1.5 px-3 rounded-md text-primary1 ${props.className}`}
            >
                {props.title}
            </button>
        </>)}
    </>)
}

export default Button
