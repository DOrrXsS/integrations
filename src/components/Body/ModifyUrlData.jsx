import React from 'react'
import { useLoaderData, Form } from 'react-router-dom';

export default function ModifyUrlData() {
    const urlDataType = useLoaderData().slice(1);
    return (
        <div id='modify-page'>
            <Form id='modifyUrlDataForm' role='search' method='post' action='/' onSubmit={checkFormSubmit}>
                <label>classification:<input name='classification' className='classificationMsgInput' placeholder='classification' value={urlDataType} readOnly/></label>
                <label>title:<input name='title' className='textMsgInput' placeholder='url title' /></label>
                <label>url:<input name='url' className='urlMsgInput' placeholder='url' /></label>
                <input type='submit' className='newUrlSubmit' value='new' />
            </Form>
        </div>
    )
}

function checkFormSubmit(e) {
    console.log('checking');
    const title = document.querySelector(".textMsgInput");
    const url = document.querySelector(".urlMsgInput");
    if(title.value.length==0||undefined||null) {
        alert("请输入标题");
        title.value = '';
        url.value='';
        title.focus();
        e.preventDefault();
    }else if(title.value.length>15) {
        alert("标题过长");
        title.focus();
        url.value='';
        e.preventDefault();
    }
}

export async function loader( {request, params}) {
    const data = params.urlDataType;
    return data;
}
