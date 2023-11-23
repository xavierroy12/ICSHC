import DeleteIcon from '@mui/icons-material/Delete';

type CustomOptionProps = {
  option: { label: string; value: number };
  onDelete: (value: number) => void;
  currentFiltersGroup: { label: string; value: number } | undefined;
  setCurrentFiltersGroup: (
    value: { label: string; value: number } | undefined
  ) => void;
};

const CustomOption = ({
  option,
  onDelete,
  currentFiltersGroup,
  setCurrentFiltersGroup,
}: CustomOptionProps) => (
  <div className="flex justify-between">
    <span>{option.label}</span>
    <DeleteIcon
      className="ml-4"
      style={{ color: 'red', cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation(); // Stop the event propagation
        // Prompt the user for confirmation
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce filtre?')) {
          onDelete(option.value);
          if (
            currentFiltersGroup &&
            currentFiltersGroup.value === option.value
          ) {
            setCurrentFiltersGroup(undefined); // Reset the selected filter
          }
        }
      }}
    />
  </div>
);
export default CustomOption;
