import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Button from "../Buttons"

import * as S from "./styles"

const Header = () => {
    const [logout, setLogout] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=> {
        if (location.pathname === '/twitter') {
            setLogout(true)
        }
    }, [location])

    const handleLogout = () => {
        if (logout) {
            localStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')

            navigate('/')
        }
    }


    return (
        <S.Header>
            <S.Nav className="container">
                <S.Title>
                    <h1>Twitter</h1>
                </S.Title>
                <Button onClick={handleLogout}>{logout ? 'Desconectar' : 'Entrar'}</Button>
            </S.Nav>
        </S.Header>
    )
}

export default Header