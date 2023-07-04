import { BadRequestError } from '../core/error.response'
import productModel from '../models/product.model'
import { fetchData } from '../utils/api'
import categoryService from './category.service'

class ProductService {
    async getAll(params: string) {
        const response = await fetchData(`/products?${params}`)
        const document = await productModel.find({
            id: { $in: response.data?.map((value: any) => value.id) },
        })

        const updatedDocuments = response.data?.map((value: any) => {
            const product = document.find(({ id }) => id == value.id)
            return Object.assign({}, value, {
                description: product?.description,
                discribles: product?.discribles,
            })
        })

        return {
            ...response,
            data: updatedDocuments,
        }
    }

    async getById(id: string, params: string) {
        if (!id) throw new BadRequestError('Invalid product id')
        const response = await fetchData(`/products/${id}?${params}`)

        return response
    }

    async getProductByCateSlug(slug: string, query: string) {
        const categoryId = await categoryService.getObjectId(slug)
        if (!categoryId) return null
        const response = await this.getAll(`categoryId=${categoryId}&${query}`)
        return response
    }
}

export default new ProductService()
