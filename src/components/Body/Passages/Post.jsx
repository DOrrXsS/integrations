import React from 'react'
import style from './style.styl';
import { marked } from 'marked';

export default function Post(frontmatter) {
  return (
    <div className='post'>
      <div className='postTitle'>
        <p>{frontmatter.data.title}</p>
        <img src={frontmatter.data.cover_img}></img>
      </div>
      <div className='postContent' dangerouslySetInnerHTML={{__html: marked(frontmatter.content)}}/>
    </div>
  )
}
