import React, { useState } from 'react'
import {  useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import {  getUrlData, setUrlType } from '../../../assets/data/webData.js';
import deleteSvg from '../../../assets/imgs/delete.svg'

export default function UrlType() {
    const urlTypeData = useLoaderData();
    var [fData, setDate] = useState(urlTypeData[1])
    const submit = useSubmit();
    const delData = (urlType, title) => {
        let newData = fData.filter((obj) => obj.title != title)
        setDate(newData);
    };
    return (
        <div id='urlType-details'>
            <ul>
                {fData.map((obj, index) => {
                    return (
                        <li key={index}>
                            <span className='url-label' onClick={() => { window.open(obj.url) }}>{obj.title}</span>
                            <img src={deleteSvg} onClick={()=>{delData(urlTypeData[0], obj.title)}}/>
                        </li>
                    )
                })}
                <div className='formButton'>
                    <button onClick={()=>{
                        console.log(fData);
                        setUrlType(urlTypeData[0],fData);
                        submit(null,{action:'/', method:'post'});
                    }}>confirm</button>
                    <button onClick={()=>{submit(null,{action:'/'})}}>cancel</button>
                </div>
            </ul>
        </div>
    )
}

export async function loader({ request, params }) {
    const urlType = params.urlType;
    const data = await getUrlData();
    const urlTypeData = data.urlTypes[urlType];
    if(!urlTypeData) {
        throw new Error('oops! look where you have braved in');
    }
    return [urlType, urlTypeData];
}