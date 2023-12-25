import { Button as TButton, styled } from "tamagui";

export const Button = styled(TButton, {
  name: "Button",
  fontSize: "$4",
  height: "$size.5",
  borderRadius: "$radius.4",
  variants: {
    fullWidth: {
      true: { width: "100%" },
    },
    disabled: {
      true: {
        backgroundColor: "$disabledButtonBackground",
        pressStyle: {
          backgroundColor: "$disabledButtonBackground",
        },
      },
    },
  },
});
