import { getProductById } from '@/app/api/product/route'
import ProductForm from '@/components/ProductForm'

export default async function page({params}:{id:string}) {
    const {id}=await params
    const product= await getProductById(id);
  return (
    <div>
        <ProductForm product={product}/>
    </div>
  )
}
