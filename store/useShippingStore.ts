import { ShippingDetails } from 'types';
import create from 'zustand';

type ShippingState = {
  shippingDetails: ShippingDetails;
  updateShippingDetails: ({
    fee,
    country,
    state,
    address,
    email
  }: ShippingDetails) => void;
};

export const useShippingStore = create<ShippingState>(set => ({
  shippingDetails: null,
  updateShippingDetails: (newShippingDetails: ShippingDetails) =>
    set(({ shippingDetails }) => ({
      shippingDetails: { ...shippingDetails, ...newShippingDetails }
    }))
}));
