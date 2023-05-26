"use client";

import { flowbiteTheme as theme } from "@/style/theme";
import { Flowbite } from "flowbite-react";
import { FC, PropsWithChildren } from "react";

const FlowbiteContext: FC<PropsWithChildren> = function ({ children }) {
  return <Flowbite theme={{ theme, dark: true }}>{children}</Flowbite>;
};

export default FlowbiteContext;
