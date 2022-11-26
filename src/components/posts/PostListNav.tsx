import React from "react"
import { Link } from 'gatsby'

export default function PostListNav({ totalPage, currentPage }) {
    return (
        <ul
            style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
            }}
        >
            <li>
                {currentPage - 1 > 0 && (
                    <Link to={currentPage - 1 === 1 ? '/' : `/posts/${currentPage - 1}`} rel="prev">
                        ← 上一页
                    </Link>
                )}
            </li>
            <li>
                {currentPage + 1 <= totalPage && (
                    <Link to={`/posts/${currentPage + 1}`} rel="next">
                        下一页 →
                    </Link>
                )}
            </li>
        </ul>
    );
}
