import React from 'react'
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom'
import style from './style.styl';


export default function Passages() {
  const postsIndex = useLoaderData();
  return (
    <div>
      <div className='post-lists'>
        {postsIndex.map(({ slug, frontmatter }, index) => {
          let dateObj = frontmatter.date ? new Date(frontmatter.date) : new Date();
          return (
            <div className='post-item' key={index}>
              <img src={`src/assets/imgs/pics/${frontmatter.cover_img}`} />
                <p>{frontmatter.title}</p>
              <p>{`${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`}</p>
              <Link to={`/passages/${slug}`}>Read more</Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export async function loader() {
  let md = await new Promise((resolve, reject) => {
    try {
      fetch('/src/assets/markdown/index.json').then(res =>
        res.json()
      ).then(res => {
        resolve(res);
      })
    } catch (err) {
      console.log(err);
      reject({});
    }
  });
  return md;
}