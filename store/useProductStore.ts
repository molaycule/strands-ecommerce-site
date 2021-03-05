import { Product } from 'types';
import create from 'zustand';

type ProductState = {
  product: Product;
  selectedProductHandler: (selectedProduct: Product) => void;
  removeSelectedProductHandler: () => void;
};

export const useProductStore = create<ProductState>(set => ({
  product: null,
  selectedProductHandler: selectedProduct => set({ product: selectedProduct }),
  removeSelectedProductHandler: () => set({ product: null })
}));
