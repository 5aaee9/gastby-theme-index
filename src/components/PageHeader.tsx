import React from "react";
import "./PageHeader.scss"
import { StaticQuery, graphql, Link } from "gatsby";

const QueryHeader = graphql`
    query QueryHeader {
        site {
            siteMetadata {
                siteUrl
                title
                headerLinks {
                    name
                    url
                    page
                }
            }
        }
    }
`;

export default function PageHeader() {
    return <StaticQuery
        query={QueryHeader}
        render={({
            site: {
                siteMetadata: {
                    title,
                    siteUrl,
                    headerLinks
                }
            }
        }) => {
            return (
                <header className="site-header">
                    <div className="container">
                        <Link to="/">
                            {title}
                        </Link>

                        <div className="header-right">
                            {headerLinks && headerLinks.map(it => {
                                if (it.page) {
                                    return <Link to={it.url} key={it.name}>
                                        {it.name}
                                    </Link>
                                } else {
                                    return <a href={it.url} key={it.name} rel="noopener noreferrer">
                                        {it.name}
                                    </a>
                                }
                            })}
                        </div>
                    </div>
                </header>
            )
        }}

    />
    // const data = {
    //     title: title
    // }

    // return <header className="page-header"></header>;
}
