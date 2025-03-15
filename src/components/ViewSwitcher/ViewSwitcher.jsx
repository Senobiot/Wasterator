import { styled } from "styled-components";
import { VIEW_VARIANTS } from "../../constants/constants";
import { setViewVariant } from "../../reducers";
import { getViewVariant } from "../../selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
const variants = Object.values(VIEW_VARIANTS);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: right;
  user-select: none;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 10px;
`;
const Variant = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  opacity: 0.4;

  ${variants.map(
    (e) => `&.${e} {background: 50% / contain url("/view-${e}.svg") no-repeat;}`
  )}

  &.active {
    opacity: 1;
    pointer-events: none;
  }
`;

const ViewSwitcher = () => {
  const dispatch = useDispatch();
  const active = useSelector(getViewVariant);
  const handleClick = (e) =>
    dispatch(setViewVariant(e.target.getAttribute("data")));

  return (
    <Wrapper>
      {variants.map((variant) => (
        <Variant
          onClick={handleClick}
          key={variant}
          data={variant}
          className={variant === active ? `${variant} active` : variant}
        />
      ))}
    </Wrapper>
  );
};

export default ViewSwitcher;
