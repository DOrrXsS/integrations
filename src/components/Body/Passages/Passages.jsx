import React from 'react'
import { useLoaderData } from 'react-router-dom'
import matter from 'gray-matter';
import Post from './Post';

export default function Passages() {
  const frontmatter = useLoaderData();
  console.log(frontmatter)
  return (
    <div>
      <div className='posts'>
        <Post {...frontmatter}/>
      </div>
    </div>
  )
}

export async function loader() {
  let md = {};
  md = await new Promise((resolve, reject) => {
    try {
      fetch('/src/assets/markdown/一个计数器例子.md').then(res=>
        res.text()
      ).then(res=>{
        resolve(matter(res));
      })
    }catch(err){
      console.log(err);
      reject({});
    }
  });
  return md;
}