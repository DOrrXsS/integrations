import React from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { getUrlData, setUrlData } from '../../assets/data/webData';
import styles from './layout.styl';

export default function Main() {
  const urlData = useLoaderData();
  const types = Object.keys(urlData.urlTypes);
  return (
    <div className='urlBoxes'>
      <Form className='newUrl' role='search' method='post'>
        <input name='title' className='textMsgInput' placeholder='url title'/>
        <input name='url' className='urlMsgInput' placeholder='url'/>
        <input type='submit' className='newUrlSubmit' value='new'/>
      </Form>
      {/* return a series of div-box according to urlData.urltypes */}
      {
        types.map((type, index) => {
          return (
            <div key={index} className='urlBox'>
              {urlData.urlTypes[type].map((urlDataObj, index) => {
                return (<div key={index} className='urlItem'>
                  <a href={urlDataObj.url}><i>{urlDataObj.title}</i></a>
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
  setUrlData('functional',updates.title, updates.url);
}