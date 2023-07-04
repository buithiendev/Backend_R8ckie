interface Category {
    categoryId: number
    parentId: number
    categoryName: string
    retailerId: number
    hasChild: boolean
    modifiedDate: string
    createdDate: string
    rank: number
}

export default Category