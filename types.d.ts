export type AllBannerAds = {
  allBannerAds: {
    id: string;
    title: string;
    subtitle: string;
    image: {
      publicUrl: string;
    };
  }[];
};

export type AllCategories = {
  allCategories: {
    id: string;
    name: string;
  }[];
};

export type AllTopCategories = {
  allTopCategories: {
    id: string;
    category1: {
      name: string;
    };
    category1Image: {
      publicUrl: string;
    };
    category2: {
      name: string;
    };
    category2Image: {
      publicUrl: string;
    };
    category3: {
      name: string;
    };
    category3Image: {
      publicUrl: string;
    };
  }[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: float;
  category: {
    name: string;
  };
  mainImage: {
    publicUrl: string;
  };
  otherImage: {
    publicUrl: string;
  };
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
};

export type AllProducts = {
  _allProductsMeta: {
    count: number;
  };
  allProducts: Product[];
};

export type ProductRepositoryKey = {
  category: string;
  search: string;
};

export type ProductRepository = {
  products: Map<string, Product>;
  total: number;
};
