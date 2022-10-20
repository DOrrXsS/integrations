import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>Errors</h1>
      <p>{err.statusText || error.message}</p>
    </div>
  )
}
