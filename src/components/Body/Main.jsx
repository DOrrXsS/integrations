import React, { useEffect, useState } from 'react';
import { Form, Outlet, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { getUrlData, setUrlData } from '../../assets/data/webData';
import styles from './layout.styl';
import { Link } from 'react-router-dom';

export default function Main() {
  let urlData = useLoaderData();
  const actionData = useActionData();
  if (actionData && actionData.currentPath == '/') {
    urlData = actionData.data;
  }
  const types = Object.keys(urlData.urlTypes);
  return (
    <div className='urlDataBoxes'>
      <Outlet />
      {/* return a series of div-box according to urlData.urltypes */}
      {
        types.map((type, index) => {
          return (
            <div key={index} className='urlDataBox'>
              <Link to={`modify:${type}`}><span>{type}</span></Link>
              {urlData.urlTypes[type].map((urlDataObj, index) => {
                return (<div key={index} className='urlDataItem'>
                  <img className='urlIcon' src={urlDataObj.iconSrc} />
                  <span className='url-label' onClick={() => {window.open(urlDataObj.url)}}><i>{urlDataObj.title}</i></span>
                </div>)
              })}
            </div>
          )
        })
      }
    </div>
  )
}

export async function loader({ request, params }) {
  return await getUrlData();
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const data = await setUrlData(updates.classification, updates.title, updates.url);
  const currentPath = new URL(request.url).pathname;
  return { currentPath, data };
}

