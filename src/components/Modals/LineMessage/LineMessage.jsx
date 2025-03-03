import { styled } from "styled-components";

const Message = styled.div`
  position: absolute;
  background-color: chartreuse;
  width: 100%;
  bottom: -3em;
  height: 2em;
  opacity: 0;
  z-index: 10;

  &.flash {
    animation: error 3s ease-out;
    background-color: red;
  }

  @keyframes error {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const LineMessage = ({ message, show, style = {} }) => {
  return (
    <Message style={style} className={show ? "flash" : ""}>
      {message}
    </Message>
  );
};

export default LineMessage;
