import { graphql, useStaticQuery } from 'gatsby'
import React, { PureComponent }  from 'react'
import './CreativeCommons.scss'


type CreativeCommonsLicense = 'by-nc-sa' | 'unlicense'

export type CreativeCommonsProps = {
    title: string
    license: CreativeCommonsLicense
    author: string
}

type LicenseData = {
    name: string
    url: string
}

const CreativeCommonsData: Record<CreativeCommonsLicense, LicenseData> = {
    "by-nc-sa": {
        name: "知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议",
        url: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
    },
    "unlicense": {
        name: "",
        url: ""
    }
}

export default class CreativeCommons extends PureComponent<CreativeCommonsProps> {
    constructor(props: CreativeCommonsProps) {
        super(props)
    }

    render() {
        const license = CreativeCommonsData[this.props.license]

        if (this.props.license === 'unlicense') {
            return <></>
        }

        return <div className="creative-commons-box">
            <div className="creative-commons-meta">
                <p>标题：{this.props.title}</p>
                <p>许可协议：<a href={license.url}>{license.name}</a></p>
                <p>作者: {this.props.author}</p>
            </div>

            <div className="creative-commons-mark"/>
        </div>
    }
}
