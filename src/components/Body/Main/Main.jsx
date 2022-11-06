import React from 'react';
import { Outlet, useActionData, useLoaderData } from 'react-router-dom';
import { getUrlData, setUrlData } from '../../../assets/data/webData.js';
import './styles/main.styl';
import './styles/float-page.styl';
import { Link } from 'react-router-dom';

import editDark from "../../../assets/imgs/icons/edit-dark.svg";
import QuickNotes from './QuickNotes.jsx';

export default function Main() {
  let urlData = useLoaderData();
  const actionData = useActionData();
  if (actionData && actionData.currentPath == '/') {
    urlData = actionData.data;
  }
  const types = Object.keys(urlData.urlTypes);
  return (
    <>
      <div id='main'>
        <div id='urlDataBoxes'>
          {/* return a series of div-box according to urlData.urltypes */}
          {
            types.map((type, index) => {
              return (
                <ul key={index} className='urlDataBox'>
                  <div className='urlDataBoxLabel'>
                    <Link to={`/${type}`}>
                      <span>{type}</span>
                    </Link>
                    <Link to={`modify:${type}`}>
                      <img className='edit' src={editDark} />
                    </Link>
                  </div>
                  {urlData.urlTypes[type].map((urlDataObj, index) => {
                    return (<li key={index} className='urlDataItem'>
                      <img className='urlIcon' src={urlDataObj.iconSrc} />
                      <span className='url-label' onClick={() => { window.open(urlDataObj.url) }}><i>{urlDataObj.title}</i></span>
                    </li>)
                  })}
                </ul>
              )
            })
          }
        </div>
        <QuickNotes />
      </div>
      <Outlet />
    </>
  )
}

export async function loader({ request, params }) {
  return await getUrlData();
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (updates?.classification) {
    const data = await setUrlData(updates.classification, updates.title, updates.url);
    const currentPath = new URL(request.url).pathname;
    return { currentPath, data };
  }
}

