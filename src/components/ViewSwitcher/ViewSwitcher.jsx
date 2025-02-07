import { useState } from "react";
import { styled } from "styled-components";
import { VIEW_TYPES } from "../../constants/constants";

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
  opacity: 0.5;

  ${VIEW_TYPES.VARIANTS.map(
    (e) =>
      `&.${e} {background: 50% / contain url("/public/view-variant-${e}.svg") no-repeat;}`
  )}

  &.active {
    opacity: 1;
    pointer-events: none;
  }
`;

const ViewSwitcher = ({ changeVariant }) => {
  const activeClass = " active";
  const initialVariants = VIEW_TYPES.VARIANTS.map((e) =>
    e === VIEW_TYPES.DEFAULT ? e + activeClass : e
  );
  const [variants, setActiveVariant] = useState(initialVariants);
  const handleClick = (e) => {
    const type = e.target.getAttribute("data");
    const newVariantState = variants.map((e) => {
      if (e === type) {
        return e + activeClass;
      }

      return e.replace(new RegExp(activeClass), "");
    });
    setActiveVariant(newVariantState);
    changeVariant(type);
  };

  return (
    <Wrapper>
      {variants.map((variant) => (
        <Variant
          onClick={(e) => handleClick(e)}
          key={variant}
          data={variant}
          className={variant}
        />
      ))}
    </Wrapper>
  );
};
export default ViewSwitcher;
