import localforage from "localforage";

const urlData = {
    urlTypes: {
        functional: [
            {
                title: 'css gradiant',
                url: 'https://cssgradient.io/'
            },
            {
                title: 'Fontsource',
                url: 'https://fontsource.org/'
            },
        ],
        docs: [
            {
                title: 'Rollup.js',
                url: 'https://rollupjs.org/guide/en/'
            }
        ]
    }
}

export async function getUrlData() {
    let data = await localforage.getItem('urlData');
    if(!data) data = urlData;
    return data;
}

//modify urlData
export async function setUrlData(urlType, title, url) {
    const data = await getUrlData();
    data.urlTypes[urlType].unshift({title:title, url:url});
    localforage.setItem('urlData', data)
    return data;
}

export async function deleteData(urlType,title) {
    const data = await getUrlData();
    let newURLType = data.urlTypes[urlType].filter((obj) => obj.title!=title);
    data.urlTypes[urlType] = newURLType;
    localforage.setItem('urlData', data);
}


export default urlData;