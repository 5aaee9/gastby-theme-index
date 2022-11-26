import React from "react"
import { MDXProvider } from "@mdx-js/react"
import FriendCard from '../components/FriendLinkCard'

const shortcodes = { FriendCard }

export default ({ children }) => (
    <MDXProvider components={shortcodes}>{children}</MDXProvider>
  )