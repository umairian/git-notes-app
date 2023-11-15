import { Button, ButtonProps, darken, lighten, styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../constants/theme";
import { CSSProperties, MouseEventHandler } from "react";

type colorSchemeType = "light" | "dark";

const CustomColorButton = styled(Button)<
  ButtonProps & { colorScheme: colorSchemeType }
>(({ theme, colorScheme }) => ({
  padding: "5px 25px",
  textTransform: "none",
  color: colorScheme === "light" ? PRIMARY_COLOR : theme.palette.common.white,
  backgroundColor:
    colorScheme === "light" ? theme.palette.common.white : PRIMARY_COLOR,
  "&:hover": {
    color: lighten(colorScheme === "light" ? PRIMARY_COLOR : theme.palette.common.white, 0.1),
    backgroundColor: darken(
      colorScheme === "light" ? theme.palette.common.white : PRIMARY_COLOR,
      0.1
    ),
  },
  border: colorScheme === "light" ? `1px solid ${PRIMARY_COLOR}` : "1px solid white"
}));

export default function CustomButton({
  children,
  colorScheme,
  onClick,
  style,
}: {
  children: React.ReactElement | React.ReactElement[] | string;
  colorScheme: colorSchemeType;
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}) {
  return (
    <CustomColorButton colorScheme={colorScheme} onClick={onClick} style={style}>{children}</CustomColorButton>
  );
}
