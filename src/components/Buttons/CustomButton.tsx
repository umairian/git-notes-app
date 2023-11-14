import { Button, ButtonProps, darken, lighten, styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../constants/theme";

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
    color: lighten(colorScheme === "light" ? PRIMARY_COLOR : theme.palette.common.white, 0.2),
    backgroundColor: darken(
      colorScheme === "light" ? theme.palette.common.white : PRIMARY_COLOR,
      0.2
    ),
  },
}));

export default function CustomButton({
  children,
  colorScheme,
}: {
  children: React.ReactElement | React.ReactElement[] | string;
  colorScheme: colorSchemeType;
}) {
  return (
    <CustomColorButton colorScheme={colorScheme}>{children}</CustomColorButton>
  );
}
