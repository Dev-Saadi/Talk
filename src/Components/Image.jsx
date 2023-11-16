import React from 'react'

const Image = ({src,alt,name}) => {
  return (
    <img loading="lazy" src={src} alt={alt} className={name} />
  )
}

export default Image