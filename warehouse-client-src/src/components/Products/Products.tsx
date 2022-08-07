import { Button, Stack } from '@mui/material';
import { useState } from 'react';

import { fetchProducts, sellProduct } from '../../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { ArticlesUpdater } from '../ArticlesUpdater/ArticlesUpdater';
import { ProductsGrid } from '../ProductsGrid/ProductsGrid';
import { ProductsUpdater } from '../ProductsUpdater/ProductsUpdater';
import { ProductDto } from './../../apis/warehouseApi';

export function Products() {
  const dispatch = useAppDispatch();
  const [selectedProductId, setSelectedProductId] = useState('');
  const products = useAppSelector((state) => state.products) as any;

  const onSell = async () => {
    if (!selectedProductId) {
      alert('Please select a product');
      return;
    }
    const product = products.payload.data.find((p: any) => p.id === selectedProductId) as ProductDto;
    if (product.quantity < 1) {
      alert('This product is out of stock');
      return;
    }

    const saleResult = await dispatch(sellProduct(selectedProductId));
    if (saleResult.meta.requestStatus === 'fulfilled') {
      await dispatch(fetchProducts());
    } else {
      alert('Failed to sell the product');
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} marginBottom={'20px'}>
        <ArticlesUpdater />
        <ProductsUpdater />
        <Button variant="contained" onClick={onSell}>
          Sell
        </Button>
      </Stack>

      <ProductsGrid
        selectedProductId={selectedProductId}
        selectedProductIdChange={(p: string) => setSelectedProductId(p)}
      />
    </div>
  );
}
