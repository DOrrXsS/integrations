import React from 'react'

export default function DataInput(props) {
    let attrs = {};
    Object.assign(attrs, props);
    delete attrs['confirmdata'];
    return (
        <input
            onBlur={(e) => {
                props.confirmdata(e);
            }}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    props.confirmdata(e);
                }
            }}
            {...attrs}
        />
    )
}
