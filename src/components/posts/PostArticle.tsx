import React from 'react'
import dayjs from 'dayjs'
import TagChipList from "../utils/TagChipList"
import { MDXRenderer } from "gatsby-plugin-mdx"
import MDXProvider from '../../utils/mdx'

export type ArticleProp = {
    date: Date
    title: string
    html: any
    tags: string[]
}

export default function PostArticle(props: ArticleProp) {
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
                <MDXRenderer>{props.html}</MDXRenderer>
            </MDXProvider>
        </article>
    );
}
