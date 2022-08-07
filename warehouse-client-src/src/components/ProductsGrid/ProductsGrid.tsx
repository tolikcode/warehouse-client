import { useEffect } from 'react';

import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { fetchProducts } from '../../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { isFailed, isLoading, isNotRequested } from '../../helpers/RequestState';

interface ProductsGridProps {
  selectedProductId: string;
  selectedProductIdChange: any;
}

export function ProductsGrid(props: ProductsGridProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  useEffect(() => {
    if (isNotRequested(products)) {
      dispatch(fetchProducts());
    }
  }, []);

  if (isLoading(products)) {
    return <span>Loading...</span>;
  }

  if (isFailed(products)) {
    return <span>Failed to load...</span>;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
  ];

  const onSelectionChange = (selection: GridSelectionModel) => {
    props.selectedProductIdChange(selection.length ? selection[0].toString() : '');
  };

  return (
    <div style={{ height: 500 }}>
      <DataGrid rows={products.payload.data} columns={columns} onSelectionModelChange={(m) => onSelectionChange(m)} />
    </div>
  );
}
