import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CONFIG } from '../env';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hideable: false},
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'species',
    headerName: 'Specie',
    minWidth: 150,
    editable: false,
  },
];

interface Character {
  name: string,
  id: number,
  status: string,
  species: string,
}

function parseData(data: any[]) {
  return data.map<Character>((item, index) => {
    return {
      name: item.name,
      id: index + 1,
      status: item.status,
      species: item.species,
    }
  })
}

export function TableComponent() {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    fetch(`${CONFIG.apiBaseUrl}/characters`)
      .then(response => response.json())
      .then(data => {
        setData(parseData(data));
      })
      .catch(error => console.error(error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}


