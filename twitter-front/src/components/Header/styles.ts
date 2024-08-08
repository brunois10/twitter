import { styled } from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Header = styled.div`
    background-color: ${colors.blue};
`

export const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.black};
    height: 85px;
    width: 100%;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        @media (max-width: ${breakpoints.desktop}) {
            font-size: 24px;
        }
    }
`