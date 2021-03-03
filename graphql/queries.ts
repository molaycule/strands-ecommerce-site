import { gql } from '@apollo/client';

export const BANNER_ADS = gql`
  query {
    allBannerAds(sortBy: createdAt_DESC, first: 3) {
      id
      title
      subtitle
      image {
        publicUrl
      }
    }
  }
`;
