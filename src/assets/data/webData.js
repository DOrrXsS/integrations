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
    if(!urlType) {
        return data;
    }
    let newUrlData = data.urlTypes[urlType].unshift({title:title, url:url});
    return {
        urlTypes:{
            ...data.urlTypes,
            newUrlData
        }
    }
}


export default urlData;