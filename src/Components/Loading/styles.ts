import styled from 'styled-components';

export const View = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  height: 100vh;
  width: 100vw;
`;

export const Message = styled.span`
    
`

export const Text = styled.span`
  font-size: 22px;
  margin-top: 10px;
  color: black;
`;