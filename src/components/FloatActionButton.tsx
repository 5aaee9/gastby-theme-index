import React from 'react'
import './FloatActionButton.scss'
import { AiOutlineVerticalAlignTop } from "react-icons/ai";

export default function FloatActionButton(props) {
    return <>
        <div className="fab">
            <button onClick={()=>window.scrollTo(0, 0)}>
                <AiOutlineVerticalAlignTop />
            </button>
        </div>
    </>
}