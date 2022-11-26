import React from 'react'
import PageHeader from './PageHeader'
import Head from './Head'
import Footer from './Footer'
import FloatActionButton from './FloatActionButton'

interface InputLayout {
    children?: React.ReactNode | React.ReactNode[];
}

export default function Layout({ children }: InputLayout) {
    return (
        <div className="layout">
            <Head></Head>
            <PageHeader></PageHeader>
            <main className="container">{children}</main>
            <FloatActionButton />
            <Footer></Footer>
        </div>
    )
}
