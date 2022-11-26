import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostArticle from "../components/posts/PostArticle";
import Comment from '../components/Comment'
import { Helmet } from "react-helmet"

export const pageQuery = graphql`
    query NormalPage($id: String!) {
        site {
            siteMetadata {
                title
                titleTemplate
                author {
                    name
                }
            }
        }
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
                date
                updated
                tags
            }
        }
    }
`;

export default function FriendLinkTemplate({ data }) {
    const post = data.mdx;
    const author = post.frontmatter.author ?? data.site.siteMetadata.author.name

    const date = post.frontmatter.date;
    const updated = post.frontmatter.updated ?? date;
    const title = data.site.siteMetadata.titleTemplate.replace("%title%", post.frontmatter.title)

    return <Layout>
            <Helmet>
                <meta property="og:description" content={post.excerpt}/>
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={(new Date(date)).toISOString()}/>
                <meta property="article:modified_time" content={(new Date(updated)).toISOString()}/>
                <meta property="article:author" content={author}/>

                <meta property="og:title" content={title} />
                <title>{title}</title>
            </Helmet>
            <PostArticle
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                tags={post.frontmatter.tags || []}
                html={post.body}
            ></PostArticle>
        <Comment />
    </Layout>;
}
