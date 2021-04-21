import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderCreateInput) {
    createOrder(data: $data) {
      orderNumber
    }
  }
`;
