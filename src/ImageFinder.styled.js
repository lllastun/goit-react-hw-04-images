import styled from 'styled-components';
export const StyleHeader = styled.header`
  /* display: flex;
  background-color: blue;
  justify-content: center;
  align-items: center;
  min-height: 1.2em; */
  width: 100%;
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  button {
    cursor: pointer;
  }

  button:hover {
    background-color: #fff1e5;
  }

  img {
    display: block;
  }
`;

export const StyleForm = styled.form`
  display: flex;
  gap: 2px;
`;
export const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledUl = styled.ul`
  display: flex;
  justify-content: center;
  max-width: 1800px;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  padding-left: 0;
`;
export const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 260px;
  min-width: 200px;
  max-height: 200px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;
