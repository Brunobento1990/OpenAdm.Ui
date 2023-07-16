import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useApi } from '../../Service/useApi';
import { ButtonCustom } from '../Buttons/ButtonCustom';
import * as S from './styles'

let loaderHandler: (isLoading: boolean, message?: string, delay?: boolean,url?:string) => void;

export function ModalGeneric() {

    const [show, setShow] = useState<boolean>(false)
    const [delay, setDelay] = useState<boolean | undefined>(false)
    const [message, setMessage] = useState<string>("");
    const [url, setUrl] = useState<string | undefined>();
    const api = useApi();
    
    async function apiDelete() {
        // api.apiDelete(url ?? "");
        setShow(false)
    }

    loaderHandler = (isLoading: boolean, message?: string, delay?: boolean,url?:string) => {
        setUrl(url)
        if (message) {
            setMessage(message);
        } else {
            setMessage('Registro incluido com sucesso!');
        }
        setShow(isLoading);
        setDelay(delay)
    };

    if (!show) {
        return null
    } else if (!delay) {
        setTimeout(() => setShow(false), 2000)
    };

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header 
                closeButton
                onClick={() => setShow(false)}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Barber system
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            {delay &&
                <S.FooterModal>
                    <ButtonCustom
                        text='Confimar'
                        onClick={apiDelete}
                    />
                </S.FooterModal>
            }
        </Modal>
    )
}

export function useModal() {
    return {
        Component: ModalGeneric,
        show: (message?: string, delay?: boolean,url?:string) => loaderHandler(true, message, delay,url),
        hide: () => loaderHandler(false),
    };
}