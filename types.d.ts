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
  price: number;
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

export type CartItem = {
  product: Product;
  quantity: number;
};

export type AllShippings = {
  allShippings: {
    id: string;
    state: string;
    fee: number;
    country: {
      name: string;
    };
  }[];
};

export type ShippingDetails = {
  fee?: number;
  country?: string;
  state?: string;
  address?: string;
  email?: string;
  phone?: string;
};

export type SelectOptions<T> = {
  label: string;
  value: T;
};
