import { styled } from "styled-components";
import Menu from "../Menu/Menu";

const HeaderStyled = styled.header`
  color: green;
  font-size: 48px;
  font-weight: 900;
  border-bottom: 2px solid #fff;
`;

export default function Header(params) {
  return (
    <>
      <Menu></Menu>
      <HeaderStyled className="header">Список дел</HeaderStyled>
    </>
  );
}
