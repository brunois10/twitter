import { styled } from 'styled-components'
import { colors } from '../../styles'

export const Form = styled.form`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 400px;
    margin: auto;
`

export const Content = styled.div`
    display: grid;
    place-items: center;
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    background-color: ${colors.blue};
    color: ${colors.black};


    h1 {
        margin-bottom: 28px;
    }

    input {
        padding: 10px;
        margin-bottom: 14px;
        font-size: 16px;
    }

    span {
        margin-top: 14px;
        font-weight: bold;
        cursor: pointer;
    }
`