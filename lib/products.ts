export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string;
  pattern: string;
  image: string;
};

// Products are currently defined in `app/dashboard/page.tsx`.
// Centralizing them here avoids duplication and lets the cart render product details reliably.
export const products: Product[] = [
  // JACKETS
  {
    id: 1,
    name: "Cargo Jacket",
    price: 3499,
    category: "Jackets",
    color: "Olive Green",
    pattern: "Solid",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
  },
  {
    id: 5,
    name: "Graphic Bomber",
    price: 4299,
    category: "Jackets",
    color: "Jet Black",
    pattern: "Graphic",
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400",
  },
  {
    id: 7,
    name: "Structured Blazer",
    price: 5199,
    category: "Jackets",
    color: "Camel",
    pattern: "Twill",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400",
  },
  {
    id: 13,
    name: "Denim Trucker Jacket",
    price: 3899,
    category: "Jackets",
    color: "Indigo Blue",
    pattern: "Denim",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
  },

  // TOPS
  {
    id: 2,
    name: "Essential Tee",
    price: 899,
    category: "Tops",
    color: "Chalk White",
    pattern: "Plain",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    id: 4,
    name: "Oversized Hoodie",
    price: 2799,
    category: "Tops",
    color: "Ash Grey",
    pattern: "Fleece",
    image: "https://wtflex.in/cdn/shop/files/shadow_panel_hoodie_Ai_wessite_front.png?v=1767708769",
  },
  {
    id: 8,
    name: "Box-Fit Shirt",
    price: 1299,
    category: "Tops",
    color: "Sky Blue",
    pattern: "Poplin",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
  },
  {
    id: 14,
    name: "Ribbed Polo",
    price: 1199,
    category: "Tops",
    color: "Forest Green",
    pattern: "Ribbed",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
  },

  // BOTTOMS
  {
    id: 3,
    name: "Wide Leg Trousers",
    price: 2199,
    category: "Bottoms",
    color: "Navy",
    pattern: "Solid",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
  },
  {
    id: 6,
    name: "Relaxed Joggers",
    price: 1599,
    category: "Bottoms",
    color: "Heather Grey",
    pattern: "Jersey",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
  },
  {
    id: 15,
    name: "Slim Chinos",
    price: 1999,
    category: "Bottoms",
    color: "Khaki",
    pattern: "Twill",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
  },
  {
    id: 16,
    name: "Distressed Jeans",
    price: 2599,
    category: "Bottoms",
    color: "Medium Wash",
    pattern: "Denim",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
  },

  // DRESSES
  {
    id: 9,
    name: "Slip Midi Dress",
    price: 2899,
    category: "Dresses",
    color: "Ivory",
    pattern: "Satin",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
  },
  {
    id: 10,
    name: "Linen Shirt Dress",
    price: 2499,
    category: "Dresses",
    color: "Sand Beige",
    pattern: "Linen",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
  },
  {
    id: 17,
    name: "Wrap Maxi Dress",
    price: 3199,
    category: "Dresses",
    color: "Terracotta",
    pattern: "Floral",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400",
  },

  // FOOTWEAR
  {
    id: 11,
    name: "Chunky Sneakers",
    price: 4599,
    category: "Footwear",
    color: "Triple White",
    pattern: "Mesh",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    id: 12,
    name: "Suede Chelsea Boots",
    price: 5999,
    category: "Footwear",
    color: "Tan Brown",
    pattern: "Suede",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400",
  },
  {
    id: 18,
    name: "Low Top Canvas",
    price: 1899,
    category: "Footwear",
    color: "Jet Black",
    pattern: "Canvas",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
  },

  // ACCESSORIES
  {
    id: 19,
    name: "Leather Crossbody",
    price: 3299,
    category: "Accessories",
    color: "Cognac",
    pattern: "Leather",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  },
  {
    id: 20,
    name: "Ribbed Beanie",
    price: 699,
    category: "Accessories",
    color: "Charcoal",
    pattern: "Knit",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400",
  },
  {
    id: 21,
    name: "Woven Belt",
    price: 899,
    category: "Accessories",
    color: "Tan",
    pattern: "Woven",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
];

