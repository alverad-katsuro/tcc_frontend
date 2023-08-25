import { CustomFlowbiteTheme } from "flowbite-react";

export const flowbiteTheme: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: "relative h-full w-full m-auto p-4 md:h-auto max-w-5xl"
    },
    body: {
      base: ""
    }
  },
  card: {
    root: {
      children: "grid gap-4 p-4"
    },
  }
};
