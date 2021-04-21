import { DeliveryDetails } from 'types';
import create from 'zustand';

type DeliveryState = {
  deliveryDetails: DeliveryDetails;
  updateDeliveryDetails: ({
    fee,
    country,
    state,
    address,
    name,
    email,
    phoneNumber
  }: DeliveryDetails) => void;
};

export const useDeliveryStore = create<DeliveryState>(set => ({
  deliveryDetails: null,
  updateDeliveryDetails: (newDeliveryDetails: DeliveryDetails) =>
    set(({ deliveryDetails }) => ({
      deliveryDetails: { ...deliveryDetails, ...newDeliveryDetails }
    }))
}));
