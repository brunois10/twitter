import React from "react";
import { TweetPost } from "./styles";

export interface TweetData {
    id?: number;
    user: string;
    content: string;
    created_at: string;
}

const Tweet: React.FC<TweetData> = ({ user, content, created_at }) => {

    const timeTo = () => {
        const tweetInfo = created_at

        return tweetInfo.substring(0, 10);
    }


    return (
        <TweetPost>
            <h4>@{user}</h4>
            <p>{content}</p>
            <span>{timeTo()}</span>
        </TweetPost>
    )
}

export default Tweet;