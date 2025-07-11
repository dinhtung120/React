import styled, { css } from "styled-components";

const Row = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "type",
})`
  display: flex;

  ${(props) =>
    (props.type || "vertical") === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    (props.type || "vertical") === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
