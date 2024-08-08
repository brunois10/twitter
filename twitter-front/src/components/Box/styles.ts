import { styled } from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
`

export const Container = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 100px;
    padding: 28px;
    background-color: ${colors.black};
    color: ${colors.white};
    z-index: 1;
    text-align: center;
    gap: 20px;

    @media (max-width: ${breakpoints.desktop}) {
        width: 80%;
        height: 20%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

    h3 {
        font-size: 22px;

        @media (max-width: ${breakpoints.desktop}) {
            margin-bottom: 12px;
          }
    }

    p {
        font-size: 16px;
        opacity: 0.8;
    }
`

export const Box = styled.div`
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        margin: 8px 8px 0px 0px;
        font-weight: bold;
`