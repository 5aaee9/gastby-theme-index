import React from "react";
import { graphql } from "gatsby";
import PostPreview, { PreviewProps } from "../components/posts/PostPreview"
import { generatePostList } from '../utils/post'

import Layout from '../components/Layout'

export const pageQuery = graphql`
    query($tag: String) {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        tags
                        date
                    }
                }
            }
        }
    }
`;

export default function PostList({ data, pageContext }) {
    const posts = data.allMdx.edges.map(it => it.node)

    return <Layout>
        {generatePostList(posts)}
    </Layout>
}

