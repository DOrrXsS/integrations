import React from 'react'
import { useLoaderData } from 'react-router-dom';

export default function UrlType() {
    const urlType = useLoaderData();
    return (
        <div>{urlType}</div>
    )
}

export async function loader({ request, params }) {
    const urlType = params.urlType;
    return urlType;
}