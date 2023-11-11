import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"

export default function ActiveLink({children, activeLinkClass, ...props}) {
    const { pathname } = useRouter()
  let className = children.props.className || ""

    if(pathname === props.href){
        className = `${className} ${activeLinkClass ? activeLinkClass : "text-indigo-600"}`
    }

  return (
    <Link {...props} legacyBehavior>
      {
        // With the help of cloneElement I will make a clone Element 
        // under ActiveLink components to get className as a props
        // we have to pass it's another component like "value".

// it act as a wrapper for the Breadcrumbs component for link purposes
        React.cloneElement(children, {className})
      }
    </Link>
  )
}