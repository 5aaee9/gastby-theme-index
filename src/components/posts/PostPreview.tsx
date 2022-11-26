import React from "react";
import { Link } from "gatsby";
import TagChipList from "../utils/TagChipList";
import dayjs from 'dayjs'

export type PreviewProps = {
    title: string;
    location: string;
    description: string;
    tags: string[];
    releaseDate: Date;
};

function RenderTime(time?: Date) {
    if (time) {
        return <span className="post-meta post-time">
            <span>时间: </span>
            <time dateTime={time.toString()}>
                {dayjs(time).format("YYYY 年 MM 月 DD 日")}
            </time>
        </span>
    } else {
        return <></>
    }
}

export default function PostPreview(props: PreviewProps) {
    return (
        <div key={props.title}>
            <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h2>
                        <Link to={props.location} itemProp="url">
                            <span itemProp="headline">{props.title}</span>
                        </Link>
                    </h2>
                </header>


                {RenderTime(props.releaseDate)}

                <section>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: props.description,
                        }}
                        itemProp="description"
                    />
                </section>

                <TagChipList
                    tags={props.tags} />
            </article>
        </div>
    );
}
