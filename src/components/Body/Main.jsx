import React, { useState } from 'react';
import { Form, Outlet, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { getUrlData, setUrlData } from '../../assets/data/webData';
import styles from './layout.styl';
import { Link } from 'react-router-dom';

export default function Main() {
  let urlData = useLoaderData();
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
                  <div className='url-label' onClick={() => {window.open(urlDataObj.url)}}><i>{urlDataObj.title}</i></div>
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
  setUrlData(updates.classification, updates.title, updates.url);
}