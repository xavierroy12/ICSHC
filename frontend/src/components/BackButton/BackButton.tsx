import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type Props = {
  onclick: () => void;
};

const BackButton = ({ onclick }: Props) => {
  return (
    <IconButton onClick={onclick}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export default BackButton;
