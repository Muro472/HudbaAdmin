import { ReactNode } from "react";

import {
  Button,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

const getWidth = (width: number) => String(width) + "px";

interface IComponentProps {
  children: ReactNode;
  width: number;
  title: string;

  optionalButton?: ReactNode;

  handleClose: () => void;
  handleYes: () => void;
}
export default function PromptOverlayLayout({
  title,
  children,
  width,
  optionalButton,
  handleClose,
  handleYes,
}: IComponentProps) {
  return (
    <>
      <DialogTitle sx={{ width: getWidth(width) }}>{title}</DialogTitle>

      <DialogContentText
        sx={{ width: getWidth(width), textAlign: "center", padding: "10px" }}
      >
        {children}
      </DialogContentText>

      <DialogActions sx={{ width: getWidth(width) }}>
        {optionalButton}
        <Button onClick={handleClose}>Zavrieť</Button>
        <Button onClick={handleYes}>Odoslať</Button>
      </DialogActions>
    </>
  );
}
