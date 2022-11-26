import React from 'react'
import Clip from './Clip'
import { Link } from 'gatsby'
import kebabCase from "lodash/kebabCase"

export default function TagChipList({ tags }: { tags: string[] }) {
    return <div className="clip-group">
        {tags.map((it) => (
            <Link key={it} to={`/tags/${kebabCase(it)}`}>
                <Clip title={it}></Clip>
            </Link>
        ))}
    </div>
}
