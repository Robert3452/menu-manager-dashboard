import "simplebar/dist/simplebar.min.css";
import React, { forwardRef } from "react";
import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";

const ScrollbarRoot = styled(SimpleBar)``;

// eslint-disable-next-line react/display-name
export const Scrollbar:React.FC<any> = forwardRef((props, ref: any) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});
