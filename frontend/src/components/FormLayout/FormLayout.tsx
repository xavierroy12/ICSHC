import { Fragment, useState } from 'react';
import BackButton from '../BackButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import ConfirmDialog from '../ConfirmationDialog';

type Props = {
  children: React.ReactNode;
  title: string;
  dirty: boolean;
  open?: boolean;
  handleClose?: () => void;
  handleConfirm?: () => void;
  hasDialog?: boolean;
};

const FormLayout = ({
  children,
  title,
  dirty,
  open,
  handleClose,
  handleConfirm,
  hasDialog = true,
}: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleBack = (dirty: boolean) => {
    if (dirty) {
      setDialogOpen(true);
    } else {
      history.back();
    }
  };

  const handleCloseBack = () => {
    setDialogOpen(false);
  };

  const handleConfirmBack = () => {
    setDialogOpen(false);
    history.back();
  };

  return (
    <Fragment>
      <div className="min-w-fit">
        <div className="mx-8 ">
          <div className="flex">
            <BackButton onclick={() => handleBack(dirty)} />

            <Typography variant="h2" className="mx-auto">
              {title}
            </Typography>
          </div>
          <div className="flex justify-between w-fit bg-slate-100 dark:bg-slate-800 min-w-fit mt-6">
            <div className="p-4 mx-auto">{children}</div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={handleCloseBack}
        onConfirm={handleConfirmBack}
      />
      {hasDialog && (
        <Dialog open={open ?? false} onClose={handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes vous sur de la modification de l'élément ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
};
export default FormLayout;
