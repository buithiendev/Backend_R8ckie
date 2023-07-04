import { Product } from './product.interface'

export enum CollectionStatus {
    'active' = 'Đang hoạt động',
    'inactive' = 'Ngừng hoạt động',
}

interface Collection {
    cat_name: string
    cat_description?: string
    products?: Array<Product>
    cat_images: Array<string>
    slug: string
    status?: keyof typeof CollectionStatus
}

export default Collection
