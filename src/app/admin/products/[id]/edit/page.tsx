import { Suspense } from "react"
import type { Metadata } from "next"

import { EditProductClient } from "./edit-product-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Edit ${id}`,
    description: `Update details and inventory for product ${id}.`,
  }
}

async function EditProductContent({ params }: PageProps) {
  const { id } = await params
  return <EditProductClient productId={id} />
}

export default function EditProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <EditProductContent params={params} />
    </Suspense>
  )
}
