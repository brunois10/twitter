import { styled } from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Feed = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 28px;

    @media (max-width: ${breakpoints.desktop}) {
        width: 100%;
        flex-direction: column;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    h2 {
        font-size: 22px;
        color: ${colors.black};
    }
`

export const TweetBox = styled.div`
        border: 1px solid black;
        padding: 24px;
        margin-bottom: 16px;
        margin-top: 16px;
        background-color: ${colors.lightGray};
        border-radius: 12px;
        
        textarea {
        resize: none;
        width: 100%;
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 16px;
        height: 80px;
        border: solid 1px ${colors.black};
        border-radius: 12px;
        background-color: ${colors.white};
        padding: 8px;
    }
`

export const DivButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export const FeedBox = styled.div`
    border: solid 2px ${colors.black};
    text-align: center;
    margin-top: 16px;
    padding: 0;
    border-radius: 12px;
`

export const LoadingContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
`