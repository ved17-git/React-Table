import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { helix } from "ldrs";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

function Table() {
  interface Details {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    createdAt: string;
    updatedAt: string;
    price: number;
    sale_price: number;
  }

  helix.register();

  const [data, setData] = useState<Details[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const url: string =
    "https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?table=block&id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1728993600000&signature=hHekjdNgy-7SpjP_SAglqGy9cTHegiJNDJeWf2of9jE&downloadName=sample-data.json";

  useEffect(() => {
    setLoading(true);
    const getDetails = async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setData(res.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    getDetails();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Details>[]>(
    () => [
      {
        accessorKey: "id", 
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 150,
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 150,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString(); 
        },
      },

      {
        accessorKey: "updatedAt",
        header: "Updated At",
        size: 150,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString();
        },
      },

      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },
      {
        accessorKey: "sale_price",
        header: "Sale Price",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, 
      muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    muiTableHeadCellProps: {
        sx: {
          fontWeight: 'bold',
          fontSize: '14px',
        },
      },
  
    paginationDisplayMode: 'pages',
    initialState: { density: 'compact' },

  });

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center ">
        <h1>
          <l-helix size="45" speed="2.5" color="black"></l-helix>
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
      </div>
    );
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}

export default Table;
