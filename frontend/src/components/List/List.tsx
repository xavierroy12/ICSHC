import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from 'mui-datatables';
import { Actif } from '../ActifsList/type';
import { Client } from '../ClientsList/type';
import { Commande } from '../CommandesList/CommandesList';
import { Emplacement } from '../EmplacementList/EmplacementList';
import { Modele } from '../ModeleList/type';
import { Utilisateur } from '../UtilisateurList/UtilisateurList';

type DataType = Actif | Client | Commande | Emplacement | Modele | Utilisateur;

type Props = {
  data: DataType[];
  columns: MUIDataTableColumn[];
  setSelectedRows?: (
    allRowsSelected: {
      dataIndex: number;
    }[]
  ) => void;
  handleRowClick: (
    _rowData: string[],
    rowMeta: {
      dataIndex: number;
      rowIndex: number;
    }
  ) => void;
  title: string;
  handleFilerChange?: (displayData: string[][]) => void;
};

const List = ({
  data,
  columns,
  setSelectedRows,
  handleRowClick,
  title,
  handleFilerChange,
}: Props) => {
  const options: Partial<MUIDataTableOptions> = {
    textLabels: {
      body: {
        noMatch: "Désolé, aucun résultat n'a été généré pour la recherche...",
      },
    },
    filterType: 'dropdown',
    responsive: 'simple',
    search: true,
    filter: true,
    tableBodyHeight: 'calc(60vh)',
    pagination: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 100, 200],
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    onRowClick: handleRowClick,
    print: false,
    download: false,
    selectableRows: 'none',
  };
  if (setSelectedRows) {
    options.onRowSelectionChange = (
      _currentRowsSelected: unknown,
      allRowsSelected: {
        dataIndex: number;
      }[]
    ) => {
      if (!setSelectedRows) return;
      setSelectedRows(allRowsSelected);
    };
    options.selectableRows = 'multiple';
  }
  if (handleFilerChange) {
    options.onFilterChange = (
      _changedColumnIndex: string | MUIDataTableColumn | null,
      displayData: string[][]
    ) => {
      if (!handleFilerChange) return;
      handleFilerChange(displayData);
    };
  }
  return (
    <div>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};
export default List;
