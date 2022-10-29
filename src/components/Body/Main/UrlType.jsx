import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { deleteData, getUrlData } from '../../../assets/data/webData.js';
import deleteSvg from '../../../assets/imgs/delete.svg'

export default function UrlType() {
    const urlTypeData = useLoaderData();
    var [fData, setDate] = useState(urlTypeData[1])
    // const delData = (urlType, title) => {
    //     let newData = fData;
    //     console.log(urlType,title);
    //     newData.filter((obj) => !obj.title==title)
    //     console.log(newData);
    // };
    return (
        <div id='urlType-details'>
            <ul>
                {urlTypeData[1].map((obj, index) => {
                    return (
                        <li key={index} onClick={()=>{delData(urlTypeData[0],obj.title)}}>
                            <Link to={obj.url}>
                                <span>{obj.title}</span>
                            </Link>
                            <img src={deleteSvg}/>
                        </li>
                    )
                })}
                <div className='formButton'>
                    <button>confirm</button>
                    <button>cancel</button>
                </div>
            </ul>
        </div>
    )
}

export async function loader({ request, params }) {
    const urlType = params.urlType;
    const data = await getUrlData();
    const urlTypeData = data.urlTypes[urlType];
    return [urlType,urlTypeData];
}