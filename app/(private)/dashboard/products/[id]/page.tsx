import { getProductById } from '@/app/api/product/route'
import ProductForm from '@/components/ProductForm'

export default async function page({params}:{params: {id:string}}) {
    const {id}= params
    const product= await getProductById(id);
  return (
    <div>
        <ProductForm product={product}/>
    </div>
  )
}
