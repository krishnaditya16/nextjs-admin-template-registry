export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  description?: string
  imageUrl?: string | null
}

export const initialProducts: Product[] = [
  {
    id: "PRD-101",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    price: 399.99,
    stock: 42,
    status: "In Stock",
    description: "Industry-leading noise cancellation with two processors and 8 microphones.",
  },
  {
    id: "PRD-102",
    name: "MacBook Pro 16-inch M3 Max",
    category: "Computers",
    price: 3499.0,
    stock: 15,
    status: "In Stock",
    description: "Built for pro workflows with up to 128GB unified memory and Liquid Retina XDR display.",
  },
  {
    id: "PRD-103",
    name: "Logitech MX Master 3S Mouse",
    category: "Accessories",
    price: 99.99,
    stock: 4,
    status: "Low Stock",
    description: "Quiet click ergonomic wireless mouse with 8K DPI any-surface tracking.",
  },
  {
    id: "PRD-104",
    name: "Dell UltraSharp 32 4K Monitor",
    category: "Displays",
    price: 849.5,
    stock: 0,
    status: "Out of Stock",
    description: "IPS Black technology with 2000:1 contrast ratio and 98% DCI-P3 color gamut.",
  },
  {
    id: "PRD-105",
    name: "Keychron Q1 Pro Mechanical Keyboard",
    category: "Accessories",
    price: 199.0,
    stock: 28,
    status: "In Stock",
    description: "Custom CNC aluminum wireless mechanical keyboard with QMK/VIA support.",
  },
  {
    id: "PRD-106",
    name: "Anker Prime 20,000mAh Power Bank",
    category: "Electronics",
    price: 129.99,
    stock: 5,
    status: "Low Stock",
    description: "200W total output with smart digital display and compact GaN design.",
  },
  {
    id: "PRD-107",
    name: "Herman Miller Embody Chair",
    category: "Furniture",
    price: 1795.0,
    stock: 8,
    status: "In Stock",
    description: "Ergonomic chair engineered for natural spine support and pressure distribution.",
  },
  {
    id: "PRD-108",
    name: "CalDigit TS4 Thunderbolt 4 Dock",
    category: "Accessories",
    price: 399.95,
    stock: 19,
    status: "In Stock",
    description: "18 ports of connectivity with 98W host charging and 8K monitor support.",
  },
]
