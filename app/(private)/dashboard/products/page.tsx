import { getProducts } from "@/app/api/product/route";
import { ProductsWithImages } from "@/app/types";
import ProductTable from "@/components/ProductTable";

export default async function DashBoardPage() {
  const products:ProductsWithImages[]=await getProducts()
  return (
    <div className="mt-30">
      <ProductTable products={products} />
    </div>
  )
}
