import { Button, Loader, Select, SelectItem, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';

type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

type Props = {
  selectedActifs: LightActif[];
  actifs: LightActif[];
  setSelectedActifs: (actifs: LightActif[]) => void;
};

const SelectActifsList = ({
  selectedActifs,
  actifs,
  setSelectedActifs,
}: Props) => {
  const [selectData, setSelectData] = useState<SelectItem[]>([]);

  useEffect(() => {
    const tempActif = actifs;
    selectedActifs.forEach((selected) => {
      const index = tempActif.findIndex((data) => data.id === selected.id);
      if (index) {
        tempActif.splice(index, 1);
      }
    });
    setSelectData(
      actifs
        .filter((actif: LightActif) => !selectedActifs.includes(actif))
        .map(
          (actif: LightActif) =>
            ({
              value: actif.id.toString(),
              label: actif.numero_serie,
            }) as SelectItem
        )
    );
  }, [selectedActifs]);

  const updateData = async (actif: LightActif) => {
    console.log('updateData', actif);

    await setSelectedActifs(
      selectedActifs.filter((data) => data.id !== actif.id)
    );
    console.log('selectedActifs', selectedActifs);
    setSelectData(
      selectData.concat({
        value: actif.id.toString(),
        label: actif.numero_serie,
      })
    );
  };

  return (
    <div className=" mt-20 w-1/3 mr-12">
      <h1 className="text-3xl mb-8">Actifs</h1>
      <div className="bg-gray-200 w-full h-full pt-10 px-4">
        <Select
          className="mb-8"
          searchable
          data={selectData}
          placeholder="Ajouter un actif"
          // disabled={selectData.length === 0}
          onChange={(value) => {
            setSelectedActifs([
              ...selectedActifs,
              actifs.find((actif) => actif.id.toString() === value)!,
            ]);
          }}
        />
        {selectedActifs ? (
          <Table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Numéro de série</th>
              </tr>
            </thead>
            <tbody>
              {selectedActifs.map(
                (actif) =>
                  actif && (
                    <tr key={actif.id}>
                      <td>{actif.nom}</td>
                      <td>{actif.numero_serie}</td>
                      <td>
                        <Button
                          color="red"
                          variant="outline"
                          size="xs"
                          radius="xl"
                          onClick={() => {
                            updateData(actif);
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        ) : (
          <Loader className="m-auto" />
        )}
      </div>
    </div>
  );
};

export default SelectActifsList;
