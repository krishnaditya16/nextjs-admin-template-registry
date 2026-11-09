import * as React from "react"
import type { Metadata } from "next"

import { ProductsClient } from "./products-client"

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your product catalog, inventory levels, and pricing.",
}

export default function ProductsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsClient />
    </React.Suspense>
  )
}
