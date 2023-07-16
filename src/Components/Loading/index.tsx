import {ReactElement, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import * as S from './styles';

let loaderHandler: (isLoading: boolean, message?: string) => void;

function LoaderComponent(): ReactElement | null {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  loaderHandler = (isLoading: boolean, message?: string) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage('Aguarde...');
    }
    setLoading(isLoading);
  };

  if (!loading) return null;

  return (
    <S.View>
      <Spinner animation="border" variant="primary" />
      <S.Text>{message}</S.Text>
    </S.View>
  );
}

export function useLoader() {
  return {
    Component: LoaderComponent,
    show: (message?: string) => loaderHandler(true, message),
    hide: () => loaderHandler(false),
  };
}