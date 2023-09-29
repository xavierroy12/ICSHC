import { Button, Loader, Select, SelectItem, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
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
    console.log(
      'filtred',
      actifs.filter(
        (actif) => !selectedActifs.some((selected) => selected.id === actif.id)
      )
    );
    setSelectData(
      actifs
        .filter(
          (actif) =>
            !selectedActifs.some((selected) => selected.id === actif.id)
        )
        .map((actif) => ({
          value: actif.id.toString(),
          label: actif.nom,
        }))
    );
  }, [actifs, selectedActifs]);

  const updateData = (actif: LightActif) => {
    setSelectedActifs(selectedActifs.filter((a) => a.id !== actif.id));
    setSelectData(
      selectData.concat({
        value: actif.id.toString(),
        label: actif.nom,
      })
    );
  };

  return (
    <div className=" mt-20 w-1/3 mr-12">
      <h1 className="text-3xl mb-8">Actifs</h1>
      <div className="bg-gray-200 w-full h-full pt-10 px-4">
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
            <tfoot>
              <tr>
                <td className="justify-end flex" colSpan={3}>
                  <Select
                    data={selectData}
                    placeholder="Ajouter un actif"
                    disabled={selectData.length === 0}
                    onChange={(value) => {
                      setSelectedActifs([
                        ...selectedActifs,
                        actifs.find((actif) => actif.id.toString() === value)!,
                      ]);
                    }}
                  />
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <Loader className="m-auto" />
        )}
      </div>
    </div>
  );
};

export default SelectActifsList;
