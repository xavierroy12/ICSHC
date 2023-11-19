import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({ open, onClose, onConfirm }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Modifications non enregistrées'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir
          quitter ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Non</Button>
        <Button onClick={onConfirm} autoFocus>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
