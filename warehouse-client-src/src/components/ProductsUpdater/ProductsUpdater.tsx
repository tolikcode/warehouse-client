import { Button } from '@mui/material';
import { useState } from 'react';

import { fetchProducts, updateProducts } from '../../app/productsSlice';
import { useAppDispatch } from '../../helpers/hooks';

interface FileProduct {
  name: string;
  contain_articles: ProductArticle[];
}

interface ProductArticle {
  art_id: string;
  amount_of: string;
}

interface ProductsFile {
  products: FileProduct[];
}

export function ProductsUpdater() {
  const dispatch = useAppDispatch();
  const [fileInputKey, setFileInputKey] = useState('');

  const handleFile = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = async (e: any) => {
      try {
        const parseFile: ProductsFile = e?.target?.result && JSON.parse(e.target.result.toString());
        const products = parseFile.products.map((p) => ({
          name: p.name,
          productArticles: p.contain_articles.map((pa) => ({ articleId: +pa.art_id, quantityRequired: +pa.amount_of })),
        }));
        const updateResult = await dispatch(updateProducts(products));
        if (updateResult.meta.requestStatus === 'fulfilled') {
          alert('Products were updated successfully');
          await dispatch(fetchProducts());
        } else {
          alert('Failed to sell the product');
        }

        setFileInputKey(Date.now().toString());
      } catch (err) {
        alert('Failed to update inventory' + err);
      }
    };
  };

  return (
    <Button variant="contained" component="label">
      Update products
      <input type="file" key={fileInputKey} accept="application/JSON" onChange={handleFile} hidden />
    </Button>
  );
}
