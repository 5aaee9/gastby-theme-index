import React from 'react'
import './TableOfContent.scss'

export type TableOfContentItem = {
    url: string
    title: string
    items?: TableOfContentItem[]
}

function TableItem(props: { item: TableOfContentItem }) {
    const { item } = props

    return <>
        <li className="toc-item">
            <a href={item.url}>{item.title}</a>
        </li>
    </>
}

function TableItemGroup(props: { items: TableOfContentItem[] }) {
    const { items } = props

    return <ul className="toc-group">
        {items.map(it => {
            if (!it.items) {
                return <TableItem item={it} />
            }

            return <li>
                <a href={it.url}>{it.title}</a>
                <TableItemGroup items={it.items} />
            </li>
        })}
    </ul>

}

export default function TableOfContent(props: { data: TableOfContentItem[] }) {
    return <div className="table-of-content">
        <p>目录</p>
        <TableItemGroup items={props.data} />
    </div>
}
