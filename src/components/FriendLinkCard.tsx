import React from "react";
import './FriendLinkCard.scss'

type FriendLinkCardProp = {
    description: string;
    image: string;
    name: string;
    url: string;
};

export default function FriendLinkCard(props: FriendLinkCardProp) {
    return <div className="friends-lists">
        <div className="friends-card">
            <a className="friends-link" href={props.url}>
                <div className="image-overlay"></div>
                <div
                    className="friends-image"
                    style={{
                        backgroundImage: `url(${props.image})`,
                    }}
                >
                </div>
            </a>

            <a href={props.url} className="friends-texts">
                <div>
                    <h2>{props.name}</h2>
                    <h3>{props.description}</h3>
                </div>
            </a>
        </div>
    </div>;
}
