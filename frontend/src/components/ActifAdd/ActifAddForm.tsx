import { FormikValues } from 'formik';
import { SelectItem } from '../Actif/type';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  dirty: boolean;
  modeles: SelectItem[];
  actif: FormikValues;
};

const ActifAddForm = ({
  handleChange,
  dirty,
  setFieldValue,
  modeles,
  actif,
}: Props) => {
  return <div>in form </div>;
};
export default ActifAddForm;
