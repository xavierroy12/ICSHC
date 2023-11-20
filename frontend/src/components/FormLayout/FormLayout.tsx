import { Fragment, useState } from 'react';
import BackButton from '../BackButton';
import { Typography } from '@mui/material';
import ConfirmDialog from '../ConfirmationDialog';

type Props = {
  children: React.ReactNode;
  title: string;
  dirty: boolean;
};

const FormLayout = ({ children, title, dirty }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleBack = (dirty: boolean) => {
    if (dirty) {
      setDialogOpen(true);
    } else {
      history.back();
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    history.back();
  };

  return (
    <Fragment>
      <div className="min-w-fit">
        <div className="mx-8 ">
          <div className="flex">
            <BackButton onclick={() => handleBack(dirty)} />

            <Typography variant="h2" className="my-8 mx-auto">
              {title}
            </Typography>
          </div>
          <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
            <div className="p-4 my-4 mx-auto">{children}</div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};
export default FormLayout;
