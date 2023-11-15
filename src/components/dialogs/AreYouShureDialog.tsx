import { Button, DialogActions, DialogTitle } from "@mui/material";

interface IComponentProps {
  handleClose: () => void;
  handleYes: () => void;
}

export default function AreYouShureDialog({
  handleClose,
  handleYes,
}: IComponentProps) {
  return (
    <>
      <DialogTitle sx={{ width: "300px", textAlign: "center" }}>
        Si istý?
      </DialogTitle>

      <DialogActions sx={{ width: "300px", justifyContent: "center" }}>
        <Button onClick={handleClose}>Nie</Button>
        <Button onClick={handleYes}>Áno</Button>
      </DialogActions>
    </>
  );
}
