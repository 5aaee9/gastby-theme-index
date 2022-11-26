import React from 'react'
import dayjs from 'dayjs'
import TagChipList from "../utils/TagChipList"
import MDXProvider from '../../utils/mdx'

export type ArticleProp = {
    date: Date
    title: string
    tags: string[]
    children: any
}

export function PostArticle(props: ArticleProp) {
    console.log(props)
    return (

        <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
        >
            <header>
                <h1 itemProp="headline">{props.title}</h1>

                <div className ="article-meta">
                    <TagChipList tags={props.tags} />
                    {props.date ? (
                        <time dateTime={props.date.toString()}>
                            {dayjs(props.date).format("YYYY 年 MM 月 DD 日")}
                        </time>
                    ): <></>}
                </div>
            </header>
            <MDXProvider>
                {props.children}
            </MDXProvider>
        </article>
    );
}
