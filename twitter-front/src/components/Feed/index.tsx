import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";

import CustomButton from "../Buttons";
import { ModalProps } from "../LoginForm";
import CustomModal from "../Box";

import TweetComponent, { TweetData } from "../Tweets";

import * as S from "./styles";

const TweetFeed = () => {
    const [tweetData, setTweetData] = useState<{ results: TweetData[] }>({ results: [] });
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [newTweet, setNewTweet] = useState({ content: '' });
    const [modalState, setModalState] = useState<ModalProps>({ isVisible: false, title: '', message: '' });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                showModal('Erro', 'Você precisa estar logado para visualizar os tweets!');
                return;
            }

            try {
                const tweetResponse = await fetch('https://brunois10.pythonanywhere.com/tweets/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!tweetResponse.ok) {
                    if (tweetResponse.status === 401) {
                        showModal('Erro', 'Você precisa estar logado para visualizar os tweets!');
                        setToken(null);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                        return;
                    } else {
                        throw new Error('Erro de network');
                    }
                }

                const tweetJson = await tweetResponse.json();
                setTweetData(tweetJson);
            } catch (error) {
                console.error('Error fetching data:', error);
                showModal('Erro', 'Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
            }
        };

        fetchData();
    }, [token, navigate]);

    const handleTweetChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTweet({ content: event.target.value });
    };

    const postTweet = async () => {
        if (newTweet.content.length > 30 && newTweet.content.length < 200) {
            try {
                const postResponse = await fetch('https://brunois10.pythonanywhere.com/tweets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(newTweet),
                });

                if (!postResponse.ok) {
                    alert('Falha ao tentar fazer o tweet!');
                    throw new Error('Erro de network');
                }

                window.location.reload();
            } catch (error) {
                console.error('Error posting tweet:', error);
                showModal('Erro', 'Ocorreu um erro ao postar o tweet. Tente novamente mais tarde.');
            }
        } else if (newTweet.content.length < 20) {
            showModal('Erro', 'O tweet deve conter pelo menos 20 caracteres');
        } else if (newTweet.content.length > 200) {
            showModal('Erro', 'O tweet não pode exceder os 200 caracteres');
        }
    };

    const showModal = (title: string, message: string): void => {
        setModalState({ isVisible: true, title, message });
    };

    const closeModal = () => {
        setModalState({ isVisible: false, title: '', message: '' });

        if (location.pathname === '/twitter' && !token) {
            navigate('/');
        }
    };

    return (
        <>
            <S.Feed className="container">
                <S.Container>
                    <S.TweetBox>
                        <h2>O que está acontecendo?</h2>
                        <textarea value={newTweet.content} onChange={handleTweetChange} placeholder="Escreva o seu tweet!" />
                        <S.DivButton>
                            <CustomButton onClick={postTweet}>Tweet</CustomButton>
                        </S.DivButton>
                    </S.TweetBox>
                    <S.FeedBox>
                        <h2>Tweets</h2>
                    </S.FeedBox>
                    <div>
                        {Array.isArray(tweetData.results) && tweetData.results.length > 0 ? (
                            tweetData.results.slice().reverse().map((tweet, index) => (
                                <TweetComponent key={index} user={tweet.user} content={tweet.content} created_at={tweet.created_at} />
                            ))
                        ) : (
                            <S.LoadingContainer>
                                <RingLoader color="#0283b7" />
                            </S.LoadingContainer>
                        )}
                    </div>
                </S.Container>
            </S.Feed>
            {modalState.isVisible ? <CustomModal handleShowModal={showModal} handleCloseModal={closeModal} title={modalState.title} description={modalState.message} /> : null}
        </>
    );
};

export default TweetFeed;
