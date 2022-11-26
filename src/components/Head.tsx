import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Head() {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    titleTemplate
                }
            }
        }
    `);

    const title = site.siteMetadata.title;

    return (
        <Helmet>
            <html lang="zh-cn" />

            <title>{title}</title>

            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />

            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={site.siteMetadata.title} />

            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
            ></meta>

            <link
                rel="alternate"
                type="application/rss+xml"
                title="RSS"
                href="/feed.xml"
            ></link>
        </Helmet>
    );
}
