import { styled } from 'styled-components'
import { colors } from '../../styles'

export const Buttons = styled.button`
    width: 120px;
    padding: 12px;
    background-color: ${colors.black};
    color: ${colors.blue};
    border: 1px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        transition: .5s ease-in;
        background-color: ${colors.gray};
    }
`