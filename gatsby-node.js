const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // Define a template for blog post
    const blogPost = path.resolve(`./src/templates/BlogPost.tsx`);
    const blogList = path.resolve(`./src/templates/PostList.tsx`);
    const normalPage = path.resolve('./src/templates/NormalPage.tsx')
    const tagList = path.resolve(`./src/templates/TagList.tsx`);

    // Get all markdown blog posts sorted by date
    const result = await graphql(
        `
            {
                allMdx(
                    sort: { fields: [frontmatter___date], order: ASC }
                    limit: 1000
                ) {
                    nodes {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            type
                        }
                    }
                }

                tagsGroup: allMdx(limit: 2000) {
                    group(field: frontmatter___tags) {
                        fieldValue
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    const posts = result.data.allMdx.nodes;
    const normalPosts = posts.filter(it => {
        const {type} = it.frontmatter

        if (type) {
            if (type === 'post') {
                return true
            }
            return false
        }
        return true
    })
    const otherPosts = posts.filter(it => !normalPosts.includes(it))

    // Create post index pages
    const postsPerPage = 10;
    const numPages = Math.ceil(normalPosts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/` : `/posts/${i + 1}`,
            component: blogList,
            context: {
                currentPage: i + 1,
                totalPage: numPages,
                limit: postsPerPage,
                skip: i * postsPerPage,
            },
        });
    });

    // Create blog posts pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL

    const componentMapping = {
        page: normalPage
    }

    if (normalPosts.length > 0) {
        normalPosts.forEach((post, index) => {
            const previousPostId = index === 0 ? null : normalPosts[index - 1].id;
            const nextPostId =
                index === normalPosts.length - 1 ? null : normalPosts[index + 1].id;

            createPage({
                path: post.fields.slug,
                component: blogPost,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            });
        });
    }

    otherPosts.forEach(post => {
        const {type} = post.frontmatter

        createPage({
            path: post.fields.slug,
            component: componentMapping[type],
            context: {
                id: post.id,
            },
        });
    })

    const tags = result.data.tagsGroup.group;

    tags.forEach((tag) => {
        createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagList,
            context: {
                tag: tag.fieldValue,
            },
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        const value = createFilePath({ node, getNode });

        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type Mdx implements Node {
            frontmatter: MdxFrontmatter!
        }

        type MdxFrontmatter {
            type: String
            license: String
            author: String
        }
    `)
}
/**
 * Replace weboack config
 */
 exports.onCreateWebpackConfig = helper => {
    const { stage, actions, getConfig } = helper

    if (stage === "develop" || stage === 'build-javascript') {
        const config = getConfig()
        const miniCssExtractPlugin = config.plugins.find(
            plugin => plugin.constructor.name === "MiniCssExtractPlugin"
        )

        if (miniCssExtractPlugin) {
            miniCssExtractPlugin.options.ignoreOrder = true
        }
        actions.replaceWebpackConfig(config)
    }
}
