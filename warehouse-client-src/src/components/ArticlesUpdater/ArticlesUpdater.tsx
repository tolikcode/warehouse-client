import { Button } from '@mui/material';
import { useState } from 'react';
import { updateArticles } from '../../app/articlesSlice';
import { fetchProducts } from '../../app/productsSlice';
import { useAppDispatch } from '../../helpers/hooks';

interface InventoryArticle {
  art_id: string;
  name: string;
  stock: string;
}

interface InventoryFile {
  inventory: InventoryArticle[];
}

export function ArticlesUpdater() {
  const dispatch = useAppDispatch();
  const [fileInputKey, setFileInputKey] = useState('');

  const handleFile = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = async (e: any) => {
      try {
        const parseFile: InventoryFile = e?.target?.result && (JSON.parse(e.target.result.toString()) as InventoryFile);
        const articles = parseFile.inventory.map((ia) => ({ id: +ia.art_id, name: ia.name, stock: +ia.stock }));
        const updateResult = await dispatch(updateArticles(articles));
        if (updateResult.meta.requestStatus === 'fulfilled') {
          alert('Inventory was updated successfully');
          await dispatch(fetchProducts());
        } else {
          alert('Failed to update inventory');
        }

        setFileInputKey(Date.now().toString());
      } catch (err) {
        alert('Failed to update inventory' + err);
      }
    };
  };

  return (
    <Button variant="contained" component="label">
      Update inventory
      <input type="file" key={fileInputKey} accept="application/JSON" onChange={handleFile} hidden />
    </Button>
  );
}
