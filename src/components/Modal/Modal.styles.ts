import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 5;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;
