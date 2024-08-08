import * as S from "./styles"

type ModalProps = {
    handleShowModal: (title: string, description: string) => void,
    handleCloseModal: () => void,
    title: string
    description: string
}

const Box = ({ title, description, handleCloseModal }: ModalProps) => {

    return (
        <S.Overlay>
        <S.Container>
            <h3>{title}:</h3>
            <p>{description}</p>
            <S.Box>
                <span onClick={handleCloseModal}>X</span>
            </S.Box>
        </S.Container>
        </S.Overlay>
    ) 
}

export default Box;