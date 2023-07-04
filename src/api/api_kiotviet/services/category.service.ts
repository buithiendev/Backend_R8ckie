import { fetchData } from '../utils/api'

class CategoryService {
    async getAll(pagesize: number) {
        const response = await fetchData(`/categories?pagesize=${pagesize}`)
        const listParentCate: Array<number> = []
        if (response.data && Array.isArray(response.data)) {
            response.data?.forEach((category: any) => {
                if (!category.parentId) listParentCate.push(category.categoryId)
            })
        }
        const promises = listParentCate?.map((id) => {
            return fetchData(`/categories/${id}`)
        })
        const result = await Promise.allSettled(promises)

        const objectId: { [key: string]: any } = {}

        response.data?.forEach((category: any) => {
            const slug = category.categoryName.replaceAll(' ', '-')
            objectId[slug] = category.categoryId
        })

        const categories = result?.map((category) => {
            if (category.status === 'fulfilled') return category.value
        })

        return {
            categories,
            objectId,
        }
    }

    async getObjectId(key: string) {
        const response = await fetchData(`/categories?pagesize=100`)

        for(let i =0; i< response.data.length; i++) {
            const slug = response.data[i].categoryName.replaceAll(' ','-')
            if (slug == key) {
                return response.data[i].categoryId
            }
        }

        return null
    }
}

export default new CategoryService()
