import { gql } from '@apollo/client';

export const BANNER_ADS = gql`
  query {
    allBannerAds(sortBy: updatedAt_DESC, first: 3) {
      id
      title
      subtitle
      image {
        publicUrl
      }
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

export const TOP_CATEGORIES = gql`
  query {
    allTopCategories {
      id
      category1 {
        name
      }
      category1Image {
        publicUrl
      }
      category2 {
        name
      }
      category2Image {
        publicUrl
      }
      category3 {
        name
      }
      category3Image {
        publicUrl
      }
    }
  }
`;
