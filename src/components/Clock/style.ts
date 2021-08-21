import styled from "styled-components";

const getColor = (props: any) => {
  const { fontSize, theme } = props;

  switch (fontSize) {
    case "10":
      return theme.colors.red;
    case "12":
      return theme.colors.blue;
    default:
      return "white";
  }
};

export const ClockTimeWrapper = styled.span<any>`
  font-weight: bold;

  color: ${getColor};

  color: ${(props) =>
    props.isExpired ? props.theme.colors.red : props.theme.colors.blue};

  ${(props) => props.theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${(props) => props.theme.colors.red};
`;

export const ClockResetButton = styled.div<any>``;
