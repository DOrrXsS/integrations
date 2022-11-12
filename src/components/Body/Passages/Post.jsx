import matter from 'gray-matter';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { marked } from 'marked';

export default function Post() {
  const frontmatter = useLoaderData();
  return (
    <div className='post'>
      <div className='postTitle'>
        <p>{frontmatter.data.title}</p>
        <img src={`/src/assets/imgs/pics/${frontmatter.data.cover_img}`}></img>
      </div>
      <div className='postContent' dangerouslySetInnerHTML={{__html: marked(frontmatter.content)}}/>
    </div>
  )
}


export async function loader({ request, params }) {
  const slug = params.postName;
  console.log(slug);
  if(!slug) {
      throw new Error('oops! look where you have braved in');
  }
  let frontmatter = await new Promise((resolve, reject) => {
    fetch(`/src/assets/markdown/${slug.concat('.md')}`).then(res => {
      return res.text();
    }).then(postRaw => {
      resolve(matter(postRaw));
    }).catch(err => {
      console.log(err);
      reject();
    })
  });
  return frontmatter;
}