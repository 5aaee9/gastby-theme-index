import React from 'react'
import "./Footer.scss"

export default function Footer() {
    return <footer>
        <div  className="container">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
    </footer>
}
