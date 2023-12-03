import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

type GenericData = {
  id: string;
  nom: string;
};

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);

  const [currentTable, setCurrentTable] = useState('categories');
  const [data, setData] = useState<GenericData[]>();

  const [dataDelete, setDataDelete] = useState<GenericData>();

  const [newValue, setNewValue] = useState<string>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const localDarkMode = window.localStorage.getItem('darkMode');
  const modalBgColor =
    localDarkMode === 'true' ? 'bg-slate-600' : 'bg-slate-100';

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentTable(event.target.value as string);
  };

  useEffect(() => {
    setLoading(true);
    fetch(window.name + 'api/admin/' + currentTable)
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
        toast.success('Données récupérées avec succès');
      })
      .catch((error) => {
        toast.error('Erreur lors de la récupération des données');
        console.error('Error:', error);
        setLoading(false);
      });
  }, [currentTable]);

  const handleChangeInput = (value: string, id: string) => {
    setData(
      data?.map((item) =>
        item.id === id ? { ...item, nom: value } : { ...item }
      )
    );
  };

  const handleSave = async (value: string) => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
    const newValue = data?.find((item) => item.nom === value);
    try {
      fetch(window.name + `api/admin/` + currentTable, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Action-Id': id_user, // send the user id in a custom header
        },
        body: JSON.stringify(newValue),
      }).then((response) => {
        if (response.ok) {
          toast.success('Données sauvegardées avec succès');
          refetchData();
        } else {
          toast.error('Une erreur est survenue');
        }
      });
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const refetchData = () => {
    setLoading(true);
    fetch(window.name + 'api/' + currentTable)
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
        toast.success('Données récupérées avec succès');
      })
      .catch((error) => {
        toast.error('Erreur lors de la récupération des données');
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
    const newData = data?.find((value) => value.id === newValue);

    if (!newData || !dataDelete) return;

    const ids = { newId: newData.id, oldId: dataDelete.id };
    try {
      fetch(window.name + `api/admin/` + currentTable, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Action-Id': id_user, // send the user id in a custom header
        },
        body: JSON.stringify(ids),
      }).then((response) => {
        if (response.ok) {
          toast.success('Données sauvegardées avec succès');
          refetchData();
        } else {
          toast.error('Une erreur est survenue');
        }
      });
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const handleDeleteButton = (id: string) => {
    handleOpen();
    setDataDelete(data?.find((item) => item.id === id));
  };

  const confirmDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Fragment>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto w-8/12">
          <div className="mt-8">
            <Typography variant="h2" className="mx-auto">
              Panneau d'administration
            </Typography>
          </div>
          <div className="mt-8">
            <Box sx={{ minWidth: 120, width: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="inputRapportLabel">Table</InputLabel>
                <Select
                  fullWidth
                  labelId="inputRapportLabel"
                  id="inputRapportSelect"
                  value={currentTable}
                  label="Rapport"
                  onChange={handleChange}
                  disabled={false}
                >
                  <MenuItem value={'categories'}>Catégories Actif</MenuItem>
                  <MenuItem value={'statuts'}>Statut Actif</MenuItem>
                  <MenuItem value={'utilisations'}>Utilisation Actif</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          {data && (
            <div className="mt-8 w-1/2">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">Nom</TableCell>
                      <TableCell align="right" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow
                        key={currentTable + '_' + row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            value={row.nom}
                            onChange={(e) =>
                              handleChangeInput(e.target.value, row.id)
                            }
                            onBlur={() => {
                              handleSave(row.nom);
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            onClick={() => {
                              handleDeleteButton(row.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="mt-8 flex justify-end ">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setData([...data, { id: 'new', nom: '' }]);
                  }}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        className="m-auto p-4 w-full h-fit align-right"
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className={'m-auto p-4 py-10 w-1/2 align-right ' + modalBgColor}>
          <IconButton
            tabIndex={0}
            onClick={handleClose}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
          {dataDelete && (
            <Box className="m-auto p-4 mt-10  align-right ">
              {dataDelete.nom} sera remplacé par :
              <Select
                fullWidth
                labelId="inputRapportLabel"
                id="inputRapportSelect"
                value={newValue}
                onChange={(value) => {
                  setNewValue(value.target.value as string);
                }}
                disabled={false}
              >
                {data
                  ?.filter((item) => item.id !== dataDelete.id)
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nom}
                    </MenuItem>
                  ))}
              </Select>
              <Button onClick={confirmDelete}>Confirmer</Button>
            </Box>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default AdminPanel;
