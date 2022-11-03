import React, { useState } from 'react'
import { useLoaderData, Form, useNavigate, useSubmit } from 'react-router-dom';

export default function ModifyUrlData() {
    const urlDataType = useLoaderData().slice(1);
    const navigate = useNavigate();
    let submit = useSubmit();
    const [url,changeUrl] = useState('');
    return (
        <div id='modify-page'>
            <Form id='modifyUrlDataForm' role='search' method='post' action='/' onSubmit={(e) => checkFormSubmit(e, submit)}>
                <label><span>classification:</span><input name='classification' className='classificationMsgInput' placeholder='classification' value={urlDataType} readOnly/></label>
                <label><span>title:</span><input name='title' className='textMsgInput' placeholder='url title' /></label>
                <label><span>url:</span><input name='url' className='urlMsgInput' placeholder='url' value={url} onChange={(e)=>{changeUrl(e.target.value)}} onBlur={e=>changeUrl(checkUrl(url))}/></label>
                <div className='formButton'>
                <input type='submit' className='newUrlSubmit' value='new' />
                <button className='cancelSubmit' onClick={() => {navigate('/')}}>cancel</button>
                </div>
            </Form>
        </div>
    )
}

//检查表格是否符合规范，并确定是否提交
function checkFormSubmit(e,submit) {
    e.preventDefault();
    const title = document.querySelector(".textMsgInput");
    const url = document.querySelector(".urlMsgInput");
    if(title.value.length==0||undefined||null) {
        alert("请输入标题");
        title.focus();
        return;
    }else if(title.value.length>15) {
        alert("标题过长");
        title.focus();
        return;
    }
    if(url.value.length==0||undefined||null){
        alert("url为空");
        url.focus();
        return;
    }
    submit(e.currentTarget);
}

export async function loader( {request, params}) {
    const data = params.urlDataType;
    return data;
}


//检查url，补全协议
function checkUrl(url) {
    var prohost;
    prohost = url.match(/([^:\/?#]+:\/\/)?([^\/@:]+)/i);

    //补全url
    if (!prohost[1]) {
        prohost[1] = "https://";
    }
    return prohost[1] + prohost[2];
}
