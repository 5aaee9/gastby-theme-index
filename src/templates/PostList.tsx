import React from "react"
import { graphql } from "gatsby"
import PostListNav from '../components/posts/PostListNav'
import Layout from '../components/Layout'
import { generatePostList } from '../utils/post'

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }

        allMdx(
            sort: { fields: [frontmatter___date],  order: DESC}
            limit: $limit
            skip: $skip
            filter: { frontmatter: { type: { in: [null, "post"] } } }
        ) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date
                    title
                    tags
                }
            }
        }
    }
`

export default function PostList({ data, pageContext }) {
    const posts = data.allMdx.nodes
    const { totalPage, currentPage } = pageContext

    return <Layout title="All Posts">
        {generatePostList(posts)}
        <PostListNav
            totalPage={totalPage}
            currentPage={currentPage}
        />
    </Layout>
}

