import React from 'react'
import 'disqusjs/react/styles/disqusjs.css'
import './Comment.scss'
import { DisqusJS } from 'disqusjs/react/es2015'

export default function Comment() {
    return <DisqusJS
        shortname="indexyz-blog"
        siteName='Indexyz Blog'
        url=""
        api="https://disqus.skk.moe/disqus/"
        apikey="VtpQwhbhO3YTIYSZdx1N8vOJ6me3une1xSIeXhpuPcE4jurE17UlJozkc9qhvjDw"
    ></DisqusJS>
}
