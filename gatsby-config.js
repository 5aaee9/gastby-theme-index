module.exports = {
    siteMetadata: {
        title: "Indexyz Blog",
        titleTemplate: `%title% - Indexyz Blog`,
        author: {
            name: `Indexyz`,
            summary: `Sharing light, even in death.`,
        },
        siteUrl: `https://blog.indexyz.me/`,
        headerLinks: [
            {
                name: "友链",
                url: "/links/",
                page: true,
            },
            {
                name: "GitHub",
                url: "https://github.com/Indexyz",
            },
            {
                name: "RSS",
                url: "/feed.xml",
            },
        ],
        defaultLicense: 'by-nc-sa'
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/pages`,
                name: `pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },

        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    "gatsby-remark-autolink-headers",
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    "gatsby-remark-lazy-load",
                    "gatsby-remark-external-links",
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        "gatsby-plugin-sass",
        // {
        //   resolve: "gatsby-plugin-google-analytics",
        //   options: {
        //     trackingId: "",
        //   },
        // },

        "gatsby-plugin-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-omni-font-loader",
            options: {
                mode: "async",
                enableListener: true,
                preconnect: ["https://fonts.gstatic.com"],
                web: [
                    {
                        name: "Blinker",
                        file:
                            "https://fonts.googleapis.com/css2?family=Blinker",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-feed-mdx`,
            options: {
                query: `{
                    site {
                        siteMetadata {
                            title
                            description
                            siteUrl
                            site_url: siteUrl
                        }
                    }
                }`,
                feeds: [
                    {
                        query: ` {
                            allMdx(
                                sort: { order: DESC, fields: [frontmatter___date] },
                                filter: { frontmatter: { type: { in: [null, "post"] } } }
                            ) {
                                edges {
                                    node {
                                        excerpt
                                        html
                                        fields { slug }
                                        frontmatter {
                                            title
                                            date
                                        }
                                    }
                                }
                            }
                        }`,
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map((edge) => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        description: edge.node.excerpt,
                                        date: edge.node.frontmatter.date,
                                        url:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        guid:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        custom_elements: [{ "content:encoded": edge.node.html }],
                                    }
                                );
                            });
                        },
                        output: "/feed.xml",
                        title: "Indexyz Blog",
                    },
                ],
            },
        },
    ],
};
