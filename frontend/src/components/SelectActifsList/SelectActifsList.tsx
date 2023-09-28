import { Button, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

type Props = {
  selectedActifs: string[];
  actifs: LightActif[];
};

const SelectActifsList = ({ selectedActifs, actifs }: Props) => {
  const [data, setData] = useState<LightActif[]>();
  if (!data)
    setData(
      selectedActifs.map((id) => {
        const actif = actifs.find((a) => a.id.toString() === id);
        if (!actif) return null;
        return {
          id: actif.id,
          nom: actif.nom,
          numero_serie: actif.numero_serie,
        };
      })
    );

  return (
    <div className=" mt-20 w-1/3 mr-12">
      <h1 className="text-3xl mb-8">Actifs</h1>
      <div className="bg-gray-200 w-full h-full pt-10 px-4">
        {data ? (
          <Table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Numéro de série</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (actif) =>
                  actif && (
                    <tr key={actif.id}>
                      <td>{actif.nom}</td>
                      <td>{actif.numero_serie}</td>
                      <Button
                        color="red"
                        variant="outline"
                        size="xs"
                        radius="xl"
                        onClick={() => {
                          setData(data.filter((a) => a.id !== actif.id));
                        }}
                      >
                        <IconTrash />
                      </Button>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SelectActifsList;
