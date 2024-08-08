import { styled } from 'styled-components'
import { colors } from '../../styles'

export const TweetPost = styled.div`
    width: 100%;
    background-color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid black;
    border-radius: 12px;
    padding: 20px;
    color: ${colors.black};
    margin-top: 32px;

    h4 {
        font-size: 20px;
        margin-bottom: 12px;
    }

    p {
        margin-bottom: 12px;
        font-size: 16px;
    }

    span {
        display: flex;
        justify-content: flex-end;
    }
`