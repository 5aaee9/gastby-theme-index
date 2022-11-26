import React from 'react';
import PostPreview, { PreviewProps } from "../components/posts/PostPreview"

export function generatePostList(posts) {
    const previewRenderPost: PreviewProps[] = posts.map(it => ({
        title: it.frontmatter.title || it.fields.slug,
        location: it.fields.slug,
        description: it.frontmatter.description || it.excerpt,
        tags: it.frontmatter.tags || [],
        releaseDate: it.frontmatter.date
    }))

    return <div className="post-list">
        {previewRenderPost.map(it => PostPreview(it))}
    </div>
}
