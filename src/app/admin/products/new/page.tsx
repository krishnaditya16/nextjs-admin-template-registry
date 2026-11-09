import { Suspense } from "react"
import type { Metadata } from "next"

import { NewProductClient } from "./new-product-client"

export const metadata: Metadata = {
  title: "Add Product",
  description: "Create a new catalog product with pricing, inventory, and media.",
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NewProductClient />
    </Suspense>
  )
}
