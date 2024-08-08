import { createGlobalStyle } from "styled-components"


export const colors = {
    white: '#fff',
    blue: '#41A8FC',
    black: '#000000',
    gray: '#3c3c3c',
    lightGray: '#d3d3d3',
}

export const breakpoints = {
    desktop: '1024px',
    tablet: '767px'
}


export const GlobalCss = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    }

    body {
        background-color: ${colors.white}
    }

    .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.desktop}) {
        max-width: 80%;
        }
}

    ::-webkit-scrollbar {
        width: 8px;
        }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.gray};
}
`


// Teste python push