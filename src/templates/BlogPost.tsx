import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "../components/Layout";
import { PostArticle } from "../components/posts/PostArticle"
import Comment from '../components/Comment'
import TableOfContent from '../components/TableOfContent'
import CreativeCommons from "../components/CreativeCommons"
import { Helmet } from "react-helmet"

const BlogPostTemplate = ({ data, location, children }) => {
    const post = data.mdx;
    const { previous, next } = data;
    const license = post.frontmatter.license ?? data.site.siteMetadata.defaultLicense
    const author = post.frontmatter.author ?? data.site.siteMetadata.author.name

    const date = post.frontmatter.date;
    const updated = post.frontmatter.updated ?? date;
    const title = data.site.siteMetadata.titleTemplate.replace("%title%", post.frontmatter.title)

    console.log(post)
    return (
        <Layout>
            <div className="post-body">
                <Helmet>
                <meta property="og:title" content={title} />
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
                    children={children}
                ></PostArticle>

                {() => {
                    if (post.tableOfContents.items) {
                        return <TableOfContent data={post.tableOfContents.items} />
                    }
                }}
            </div>

            <CreativeCommons
                title={post.frontmatter.title}
                license={license}
                author={author} />

            <nav className="blog-post-nav">
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                        gap: '16px',
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li style={{
                        marginLeft: 'auto'
                    }}>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
            <Comment />
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
                titleTemplate
                defaultLicense
                author {
                    name
                }
            }
        }
        mdx(
            id: { eq: $id }
        ) {
            id
            excerpt(pruneLength: 160)
            body
            tableOfContents
            frontmatter {
                title
                date
                updated
                tags
                license
                author
            }
        }

        previous: mdx(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }

        next: mdx(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`;
