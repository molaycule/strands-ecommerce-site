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

export const ALL_PRODUCTS = gql`
  query AllProduct(
    $categoryName: String
    $sortBy: [SortProductsBy!]
    $search: String
    $skip: Int
    $first: Int
  ) {
    _allProductsMeta(
      where: { category: { name_contains: $categoryName } }
      sortBy: $sortBy
      search: $search
    ) {
      count
    }
    allProducts(
      where: { category: { name_contains: $categoryName } }
      sortBy: $sortBy
      search: $search
      skip: $skip
      first: $first
    ) {
      id
      name
      description
      price
      quantityInStock
      category {
        name
      }
      mainImage {
        publicUrl
      }
      otherImage {
        publicUrl
      }
      facebookLink
      instagramLink
      twitterLink
    }
  }
`;

export const ALL_AREAS = gql`
  query {
    allAreas {
      area
      region {
        name
        fee
      }
    }
  }
`;
