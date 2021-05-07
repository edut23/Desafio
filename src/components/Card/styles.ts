import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 88%;
    height: auto;

    margin-top: auto;
  }
`;

export const Title = styled.p`
  font-family: 'Poppins';
  font-size: 48px;

  color: #fff;
`;
