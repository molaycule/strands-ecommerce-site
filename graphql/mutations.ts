import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderCreateInput) {
    createOrder(data: $data) {
      orderNumber
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $data: ProductUpdateInput) {
    updateProduct(id: $id, data: $data) {
      id
    }
  }
`;
