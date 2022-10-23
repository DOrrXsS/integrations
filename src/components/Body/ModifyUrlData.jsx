import React from 'react'
import { useLoaderData, Form, redirect, useNavigate } from 'react-router-dom';
import { isDataExist } from '../../assets/data/webData';

export default function ModifyUrlData() {
    const urlDataType = useLoaderData().slice(1);
    const navigate = useNavigate();
    return (
        <div id='modify-page'>
            <Form id='modifyUrlDataForm' role='search' method='post' action='/' onSubmit={(e) => checkFormSubmit(e,urlDataType)}>
                <label><span>classification:</span><input name='classification' className='classificationMsgInput' placeholder='classification' value={urlDataType} readOnly/></label>
                <label><span>title:</span><input name='title' className='textMsgInput' placeholder='url title' /></label>
                <label><span>url:</span><input name='url' className='urlMsgInput' placeholder='url' /></label>
                <div className='formButton'>
                <input type='submit' className='newUrlSubmit' value='new' />
                <button className='cancelSubmit' onClick={() => {navigate('/')}}>cancel</button>
                </div>
            </Form>
        </div>
    )
}

function checkFormSubmit(e,urlDataType) {
    const title = document.querySelector(".textMsgInput");
    const url = document.querySelector(".urlMsgInput");
    if(title.value.length==0||undefined||null) {
        alert("请输入标题");
        title.focus();
        e.preventDefault();
        return;
    }else if(title.value.length>15) {
        alert("标题过长");
        title.focus();
        e.preventDefault();
        return;
    }
    if(url.value.length==0||undefined||null){
        alert("url为空");
        url.focus();
        e.preventDefault();
        return;
    }
}

export async function loader( {request, params}) {
    const data = params.urlDataType;
    return data;
}
