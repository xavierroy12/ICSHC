import { Button } from '@mui/material';
import ActifsListSelect from '../ActifsListSelect';
import { LightActif } from '../Actifs/type';
import { forwardRef } from 'react';

type Props = {
  actifs: LightActif[];
  selectedActifs: LightActif[];
  setSelectedActifs: (actifs: LightActif[]) => void;
  handleSubmit: () => void;
};

const ActifsSelect = forwardRef(
  ({ actifs, selectedActifs, setSelectedActifs, handleSubmit }: Props, ref) => {
    return (
      <div
        ref={ref}
        className="max-w-screen-md mx-auto mt-20 bg-white z-50 pb-10"
      >
        <div className="p-4 bg-white">
          <ActifsListSelect
            selectedActifs={selectedActifs}
            setSelectedActifs={setSelectedActifs}
            actifs={actifs}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="mt-4 float-right "
          >
            Modifier
          </Button>
        </div>
      </div>
    );
  }
);
export default ActifsSelect;
