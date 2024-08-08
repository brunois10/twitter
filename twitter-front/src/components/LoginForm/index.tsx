import { ChangeEvent, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';

import Modal from "../Box";
import Button from "../Buttons";
import * as S from "./styles";

type Credentials = {
    username: string;
    password: string;
};

type EmailInfo = {
    email: string;
};

export type ModalProps = {
    isVisible: boolean;
    title: string;
    message: string;
};

const AuthForm = () => {
    const [creds, setCreds] = useState<Credentials>({ username: '', password: '' });
    const [confirmPwd, setConfirmPwd] = useState('');
    const [email, setEmail] = useState<EmailInfo>({ email: '' });
    const [isRegister, setIsRegister] = useState(false);
    const [regData, setRegData] = useState<Credentials & EmailInfo>({ username: '', password: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<ModalProps>({ isVisible: false, title: '', message: '' });

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
        const value = event.target.value;
        setCreds((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === 'email') {
            setEmail({ email: value });
        } else if (field === 'confirmPassword') {
            setConfirmPwd(value);
        }
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    useEffect(() => {
        setRegData({ ...creds, ...email });
    }, [creds, email]);

    const handleLogin = async () => {
        if (creds.username && creds.password.length >= 8) {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(creds),
                });
                const data = await response.json();
                setLoading(false);

                if (data.access && data.refresh) {
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('refreshToken', data.refresh);

                    showModal('Sucesso', 'Usuário logado');
                    resetForm();
                    navigate('/twitter');
                } else {
                    showModal('Erro', 'Conta não encontrada, clique em registrar-se.');
                }
            } catch (error) {
                setLoading(false);
                showModal('Erro', 'Erro ao tentar fazer login. Verifique sua conexão com a internet.');
            }
        } else {
            showModal('Erro', creds.username ? 'Digite uma senha válida!' : 'Digite um usuário válido!');
        }
    };

    const handleRegister = async () => {
        if (regData.email && creds.password.length >= 8 && creds.password === confirmPwd) {
            try {
                const response = await fetch('http://127.0.0.1:8000/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(regData),
                });
                if (response.ok) {
                    showModal('Sucesso', 'Usuário registrado!');
                    resetForm();
                    setIsRegister(false);
                    navigate('/twitter');
                } else {
                    showModal('Erro', 'Não foi possível se cadastrar!');
                }
            } catch (error) {
                showModal('Erro', 'Erro ao tentar se registrar. Verifique sua conexão com a internet.');
            }
        } else {
            showModal('Erro', getRegisterError());
        }
    };

    const resetForm = () => {
        setCreds({ username: '', password: '' });
        setConfirmPwd('');
        setEmail({ email: '' });
        document.querySelectorAll('input').forEach(input => (input.value = ''));
    };

    const getRegisterError = () => {
        if (!regData.email) return 'Digite um e-mail válido!';
        if (creds.password.length < 8) return 'Sua senha deve conter pelo menos 8 dígitos.';
        if (creds.password !== confirmPwd) return 'As senhas não são iguais.';
        return 'Não foi possível registrar sua conta!';
    };

    const showModal = (title: string, message: string) => {
        setModal({ isVisible: true, title, message });
    };

    const closeModal = () => {
        setModal({ isVisible: false, title: '', message: '' });
    };

    return (
        <>
            <S.Form>
                {isRegister ? (
                    <S.Content>
                        <h1>Cadastre-se</h1>
                        <input type="text" placeholder="usuário" onChange={(e) => handleChange(e, 'username')} required />
                        <input type="password" placeholder="senha" onChange={(e) => handleChange(e, 'password')} required />
                        <input type="password" placeholder="senha novamente" onChange={(e) => handleChange(e, 'confirmPassword')} required />
                        <input type="email" placeholder="e-mail" onChange={(e) => handleChange(e, 'email')} required />
                        <Button onClick={handleRegister}>Cadastre-se</Button>
                        <span onClick={toggleForm}>Entrar</span>
                    </S.Content>
                ) : (
                    <S.Content>
                        <h1>Entrar</h1>
                        <input type="text" placeholder="usuário" onChange={(e) => handleChange(e, 'username')} required />
                        <input type="password" placeholder="senha" onChange={(e) => handleChange(e, 'password')} required />
                        {!loading ? (
                            <Button onClick={handleLogin}>Entrar</Button>
                        ) : (
                            <ClipLoader color="#ffffff" />
                        )}
                        <span onClick={toggleForm}>Cadastre-se</span>
                    </S.Content>
                )}
            </S.Form>
            {modal.isVisible && (
                <Modal handleCloseModal={closeModal} handleShowModal={showModal} title={modal.title} description={modal.message} />
            )}
        </>
    );
};

export default AuthForm;
