import { Button, Title } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { Actif, TableState } from "./type";
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    MRT_RowSelectionState,
  } from 'mantine-react-table';
import { useNavigate } from "react-router-dom";

const Actifs = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [actifs, setActifs] = useState<Actif[]>([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [tableState, setTableState] = useState<TableState>({
    filters: {},
    showColumnFilters: true,
    sortBy: undefined,
    sortDirection: undefined,
    page: 1,
    pageSize: 10,
  });

  const columns = useMemo<MRT_ColumnDef<Actif>[]>( () =>
    [
      { accessorKey: "numero_serie", header: "Numéro de série" , enableColumnFilter: false},
      { accessorKey: "nom", header: "Nom" , enableColumnFilter: false},
      { accessorKey: "modele", header: "Modèle", filterVariant: "autocomplete", },
      { accessorKey: "categorie", header: "Catégorie", filterVariant: "autocomplete" },
      { accessorKey: "statut", header: "Statut", filterVariant: "autocomplete" },
      { accessorKey: "proprietaire", header: "Propriétaire", filterVariant: "autocomplete" },
      { accessorKey: "emplacement", header: "Emplacement", filterVariant: "autocomplete" },
    ],
    [],
  );
  const table = useMantineReactTable({
    columns: columns,
    data: actifs,
    enableFacetedValues: true,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: { ...tableState, isLoading: isLoading, showColumnFilters: true , },
    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { maxHeight: '500px' } },
    mantineTableBodyCellProps: ({ cell }) => ({
      onDoubleClick: () => {
        navigate('/actif/' + cell.row.id);
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });
  
  const handleFilterChange = (column: string, value: string) => {
    setTableState((prevState) => ({ ...prevState, filters: { ...prevState.filters, [column]: value } }));
  };
  
  useEffect(() => {   
    setIsLoading(true); 
    fetch("http://localhost:8000/api/actifs").then((response) => response.json())
      .then((values) => {setActifs(values);})
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));

  }, []);
  useEffect(() => {
    // TODO: adapt to filter change
    setTableState((prevState) => ({ ...prevState, filters: { ...prevState.filters, statut: "En stock" } }));
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-10">
      <Title order={1}>Actifs</Title>
      <div>
        <MantineReactTable table={table}/>
      </div>
      <Button.Group className="flex float-right mt-5">
        <Button className="mr-8" color="indigo" variant="outline" size="md" onClick={() =>navigate('/actif')}>Ajouter</Button>
        <Button className="bg-yellow" variant="outline" color="yellow" size="md" disabled={Object.keys(rowSelection).length === 0}
        onClick={() => {
          const selectedRows = Object.entries(rowSelection)
          .filter(([_, isSelected]) => isSelected)
          .map(([id]) => id);
          if (selectedRows.length === 1) {
            navigate('/actif/' + selectedRows[0]);
          } else {
            navigate('/actifs/modify', { state: { selectedRows } });
          }
        }}>
          Modifier
        </Button>
      </Button.Group>
    </div>
  );
};

export default Actifs
