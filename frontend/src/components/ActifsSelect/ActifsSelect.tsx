import { Button } from '@mui/material';
import ActifsListSelect from '../ActifsListSelect';
import { LightActif } from '../Actifs/type';
import { forwardRef } from 'react';
type Props = {
  actifs: LightActif[];
  selectedActifs: LightActif[];
  setSelectedActifs: (actifs: LightActif[]) => void;
  handleSubmit: () => void;
  buttonLabel?: string;
};

const ActifsSelect = forwardRef(
  (
    {
      actifs,
      selectedActifs,
      setSelectedActifs,
      handleSubmit,
      buttonLabel = 'Modifier',
    }: Props,
    ref
  ) => {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-screen-md mx-auto z-50 pb-10"
      >
        <div className="p-4">
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
            {buttonLabel}
          </Button>
        </div>
      </div>
    );
  }
);
export default ActifsSelect;
