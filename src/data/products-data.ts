export interface ProductVariant {
  id: string
  sku: string
  size?: string | null
  color?: string | null
  price: number
  stock: number
  productId?: string
}

export interface ProductImage {
  id: string
  url: string
  altText?: string | null
  order: number
  productId: string
  createdAt?: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  categoryId?: string | null
  category?: ProductCategory | null
  variants: ProductVariant[]
  images: ProductImage[]
}

export const DEFAULT_CATEGORIES: ProductCategory[] = [
  { id: "cat-electronics", name: "Electronics", slug: "electronics" },
  { id: "cat-computers", name: "Computers", slug: "computers" },
  { id: "cat-accessories", name: "Accessories", slug: "accessories" },
  { id: "cat-displays", name: "Displays", slug: "displays" },
  { id: "cat-furniture", name: "Furniture", slug: "furniture" },
  { id: "cat-office", name: "Office Supplies", slug: "office-supplies" },
]

export function getProductTotalStock(product: Product): number {
  return product.variants.reduce((acc, v) => acc + (v.stock || 0), 0)
}

export function getProductPriceRange(product: Product): string {
  if (!product.variants || product.variants.length === 0) return "$0.00"
  const prices = product.variants.map((v) => Number(v.price) || 0)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (min === max) {
    return `$${min.toFixed(2)}`
  }
  return `$${min.toFixed(2)} - $${max.toFixed(2)}`
}

export function getProductCoverImage(product: Product): ProductImage | undefined {
  if (!product.images || product.images.length === 0) return undefined
  return [...product.images].sort((a, b) => a.order - b.order)[0]
}

export const initialProducts: Product[] = [
  {
    id: "PRD-101",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise cancellation with two processors and 8 microphones.",
    isActive: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-02-10T11:30:00Z",
    variants: [
      {
        id: "var-101a",
        sku: "SNY-XM5-BLK",
        color: "Black",
        size: "Standard",
        price: 399.99,
        stock: 25,
        productId: "PRD-101",
      },
      {
        id: "var-101b",
        sku: "SNY-XM5-SLV",
        color: "Silver",
        size: "Standard",
        price: 399.99,
        stock: 17,
        productId: "PRD-101",
      },
    ],
    images: [
      {
        id: "img-101a",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        altText: "Sony WH-1000XM5 Black Front Profile",
        order: 0,
        productId: "PRD-101",
      },
      {
        id: "img-101b",
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        altText: "Sony WH-1000XM5 Silver Folded",
        order: 1,
        productId: "PRD-101",
      },
    ],
  },
  {
    id: "PRD-102",
    name: "MacBook Pro 16-inch M3 Max",
    slug: "macbook-pro-16-m3-max",
    description: "Built for pro workflows with up to 128GB unified memory and Liquid Retina XDR display.",
    isActive: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    createdAt: "2025-01-20T09:00:00Z",
    updatedAt: "2025-02-01T14:15:00Z",
    variants: [
      {
        id: "var-102a",
        sku: "MBP-16-512",
        color: "Space Black",
        size: "512GB / 36GB",
        price: 3499.0,
        stock: 10,
        productId: "PRD-102",
      },
      {
        id: "var-102b",
        sku: "MBP-16-1TB",
        color: "Space Black",
        size: "1TB / 48GB",
        price: 3999.0,
        stock: 5,
        productId: "PRD-102",
      },
    ],
    images: [
      {
        id: "img-102a",
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        altText: "MacBook Pro Space Black Lid Open",
        order: 0,
        productId: "PRD-102",
      },
      {
        id: "img-102b",
        url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80",
        altText: "MacBook Pro Liquid Retina Display Angle",
        order: 1,
        productId: "PRD-102",
      },
    ],
  },
  {
    id: "PRD-103",
    name: "Logitech MX Master 3S Mouse",
    slug: "logitech-mx-master-3s",
    description: "Quiet click ergonomic wireless mouse with 8K DPI any-surface tracking.",
    isActive: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    createdAt: "2025-01-22T10:00:00Z",
    updatedAt: "2025-02-05T16:00:00Z",
    variants: [
      {
        id: "var-103a",
        sku: "LOGI-MX3S-GRY",
        color: "Pale Gray",
        size: "Right-handed",
        price: 99.99,
        stock: 4,
        productId: "PRD-103",
      },
    ],
    images: [
      {
        id: "img-103a",
        url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
        altText: "Logitech MX Master 3S Ergonomic Mouse",
        order: 0,
        productId: "PRD-103",
      },
    ],
  },
  {
    id: "PRD-104",
    name: "Dell UltraSharp 32 4K Monitor",
    slug: "dell-ultrasharp-32-4k",
    description: "IPS Black technology with 2000:1 contrast ratio and 98% DCI-P3 color gamut.",
    isActive: false,
    categoryId: "cat-displays",
    category: { id: "cat-displays", name: "Displays", slug: "displays" },
    createdAt: "2025-01-25T11:00:00Z",
    updatedAt: "2025-02-08T18:20:00Z",
    variants: [
      {
        id: "var-104a",
        sku: "DELL-U32-UHD",
        color: "Platinum Silver",
        size: "32-inch",
        price: 849.5,
        stock: 0,
        productId: "PRD-104",
      },
    ],
    images: [
      {
        id: "img-104a",
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
        altText: "Dell UltraSharp 32 4K Display Front",
        order: 0,
        productId: "PRD-104",
      },
    ],
  },
  {
    id: "PRD-105",
    name: "Keychron Q1 Pro Mechanical Keyboard",
    slug: "keychron-q1-pro",
    description: "Custom CNC aluminum wireless mechanical keyboard with QMK/VIA support.",
    isActive: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    createdAt: "2025-01-28T12:00:00Z",
    updatedAt: "2025-02-09T09:40:00Z",
    variants: [
      {
        id: "var-105a",
        sku: "KEY-Q1-RED",
        color: "Carbon Black",
        size: "Red Switch",
        price: 199.0,
        stock: 16,
        productId: "PRD-105",
      },
      {
        id: "var-105b",
        sku: "KEY-Q1-BRN",
        color: "Carbon Black",
        size: "Brown Switch",
        price: 199.0,
        stock: 12,
        productId: "PRD-105",
      },
    ],
    images: [
      {
        id: "img-105a",
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
        altText: "Keychron Q1 Pro Aluminum Mechanical Keyboard",
        order: 0,
        productId: "PRD-105",
      },
      {
        id: "img-105b",
        url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
        altText: "Keychron Keycaps and Knob Close Up",
        order: 1,
        productId: "PRD-105",
      },
    ],
  },
  {
    id: "PRD-106",
    name: "Anker Prime 20,000mAh Power Bank",
    slug: "anker-prime-20000mah",
    description: "200W total output with smart digital display and compact GaN design.",
    isActive: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    createdAt: "2025-02-01T13:00:00Z",
    updatedAt: "2025-02-10T10:10:00Z",
    variants: [
      {
        id: "var-106a",
        sku: "ANK-PRIME-20K",
        color: "Anker Black",
        size: "20,000mAh",
        price: 129.99,
        stock: 5,
        productId: "PRD-106",
      },
    ],
    images: [
      {
        id: "img-106a",
        url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80",
        altText: "Anker Prime Power Bank with Smart Display",
        order: 0,
        productId: "PRD-106",
      },
    ],
  },
  {
    id: "PRD-107",
    name: "Herman Miller Embody Chair",
    slug: "herman-miller-embody",
    description: "Ergonomic chair engineered for natural spine support and pressure distribution.",
    isActive: true,
    categoryId: "cat-furniture",
    category: { id: "cat-furniture", name: "Furniture", slug: "furniture" },
    createdAt: "2025-02-03T14:00:00Z",
    updatedAt: "2025-02-11T12:00:00Z",
    variants: [
      {
        id: "var-107a",
        sku: "HM-EMB-BLK",
        color: "Black Sync",
        size: "Fully Adjustable",
        price: 1795.0,
        stock: 8,
        productId: "PRD-107",
      },
    ],
    images: [
      {
        id: "img-107a",
        url: "https://images.unsplash.com/photo-1580481077195-c54d3101c79a?w=800&auto=format&fit=crop&q=80",
        altText: "Herman Miller Embody Ergonomic Office Chair",
        order: 0,
        productId: "PRD-107",
      },
    ],
  },
  {
    id: "PRD-108",
    name: "CalDigit TS4 Thunderbolt 4 Dock",
    slug: "caldigit-ts4-tb4",
    description: "18 ports of connectivity with 98W host charging and 8K monitor support.",
    isActive: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    createdAt: "2025-02-05T15:00:00Z",
    updatedAt: "2025-02-11T15:30:00Z",
    variants: [
      {
        id: "var-108a",
        sku: "CAL-TS4-SLV",
        color: "Space Gray",
        size: "Universal",
        price: 399.95,
        stock: 19,
        productId: "PRD-108",
      },
    ],
    images: [
      {
        id: "img-108a",
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
        altText: "CalDigit TS4 Aluminum Hub Front Ports",
        order: 0,
        productId: "PRD-108",
      },
    ],
  },
]
