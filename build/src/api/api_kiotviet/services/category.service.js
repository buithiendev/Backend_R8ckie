"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../utils/api");
class CategoryService {
    async getAll(pagesize) {
        const response = await (0, api_1.fetchData)(`/categories?pagesize=${pagesize}`);
        const listParentCate = [];
        if (response.data && Array.isArray(response.data)) {
            response.data?.forEach((category) => {
                if (!category.parentId)
                    listParentCate.push(category.categoryId);
            });
        }
        const promises = listParentCate?.map((id) => {
            return (0, api_1.fetchData)(`/categories/${id}`);
        });
        const result = await Promise.allSettled(promises);
        const objectId = {};
        response.data?.forEach((category) => {
            const slug = category.categoryName.replaceAll(' ', '-');
            objectId[slug] = category.categoryId;
        });
        const categories = result?.map((category) => {
            if (category.status === 'fulfilled')
                return category.value;
        });
        return {
            categories,
            objectId,
        };
    }
    async getObjectId(key) {
        const response = await (0, api_1.fetchData)(`/categories?pagesize=100`);
        for (let i = 0; i < response.data.length; i++) {
            const slug = response.data[i].categoryName.replaceAll(' ', '-');
            if (slug == key) {
                return response.data[i].categoryId;
            }
        }
        return null;
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=category.service.js.map