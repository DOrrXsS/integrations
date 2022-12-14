import localforage from "localforage";

const urlData = {
    urlTypes: {
        functional: [
            {
                title: 'css gradiant',
                url: 'https://cssgradient.io/',
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/',
            },
        ],
        docs: [
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/',
            }
        ]
    }
}


//---------------------------------------------

export async function getUrlData() {
    // localforage.clear();
    let data = await localforage.getItem('urlData');
    if (!data) data = urlData;
    return data;
}

//modify urlData
export async function setUrlData(urlType, title, url) {
    const data = await getUrlData();
    const index = isDataExist(data, urlType, title);
    console.log(`index:${index}`);
    if (index >= 0) {
        return await updateData(urlType, index, title, url);
    }
    data.urlTypes[urlType].unshift({ title: title, url: url, iconSrc: getFavIconUrl(url) });
    localforage.setItem('urlData', data)
    return data;
}

export async function deleteData(urlType, title) {
    const data = await getUrlData();
    let newURLType = data.urlTypes[urlType].filter((obj) => obj.title != title);
    data.urlTypes[urlType] = newURLType;
    localforage.setItem('urlData', data);
}

export async function updateData(urlType, index, title, url) {
    const data = await getUrlData();
    let iconSrc = data? data.urlTypes[urlType][index].iconSrc : getFavIconUrl(data.urlTypes[urlType][index].url);
    data.urlTypes[urlType][index] = { title: title, url: url, iconSrc: iconSrc};
    localforage.setItem('urlData', data)
    return data;
}

//---------------------------------------------

export async function setUrlType(urlType,newData) {
    const data = await getUrlData();
    if(data.urlTypes[urlType]) {
        data.urlTypes[urlType] = newData;
        localforage.setItem('urlData', data);
    }
    return data;
}

export async function addUrlType(str) {
    const data = await getUrlData();
    if(!data.urlTypes[str]) {
        data.urlTypes[str] = {};
    }
    return data;
}

export async function delUrlType(str) {
    const data = await getUrlData();
    if(data.urlTypes[str]) {
        delete data.urlTypes[str];
    }
    return data;
}


//---------------------------------------------

//get all url's icon and add to JSON
export async function loadAllIcons() {
    const data = await getUrlData();
    const urlTypes = Object.keys(urlData.urlTypes)
    try{
        urlTypes.forEach(urlDataType => {
            if(data.urlTypes[urlDataType].length==0) return;
            data.urlTypes[urlDataType].forEach(obj => {
                if(!obj.iconSrc) obj.iconSrc = getFavIconUrl(obj.url);
            })
        })
        localforage.setItem('urlData', data);
    }catch(err) {
        console.log(`loadAllIcon: ${err}`);
    }
}


//return Icon Src String 
function getFavIconUrl(url) {
    var prohost;
    url.replaceAll(' ','');
    prohost = url.match(/([^:\/?#]+:\/\/)?([^\/@:]+)/i);
    prohost = prohost ? prohost : [true, "http://", document.location.hostname];

    //??????url
    if (!prohost[1]) {
      prohost[1] = "http://";
    }
    //??????ico
    return "http://www.google.com/s2/favicons?domain=" + prohost[1] + prohost[2];
  }


  //---------------------------------------------


//??????urlType??????urlType
//????????????????????? ???????????????-1
export function isDataExist(data, urlType, title) {
    let index;
    try {
        data.urlTypes[urlType].forEach((obj, i) => {
            if (obj.title == title) {
                index = i;
            }
        });
    } catch (err) {
        console.log(`isDataExist: ${err.message}`);
    }
    return index >= 0 ? index : -1;
}
  



export default urlData;