const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');
const slugify = require('slugify');

const createCategory = asyncHandler(async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const createCate = await Category.create(req.body);
        res.json(createCate);
    } catch (e) {
        throw new Error(e);
    }
});

function getCategoryList(allCate, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = allCate.filter((i) => i.parentId == undefined);
    } else {
        category = allCate.filter((i) => i.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: getCategoryList(allCate, cate._id),
        });
    }
    return categoryList;
}

const getAllCategory = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const query = Category.find(JSON.parse(queryStr));
        const allCate = await query;
        if (allCate) {
            const categoryList = getCategoryList(allCate);
            res.json(categoryList);
        }
    } catch (e) {
        throw new Error(e);
    }
});
const getACategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const aCate = await Category.findById({ _id: id });
        res.json(aCate);
    } catch (e) {
        throw new Error(e);
    }
});
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        validateMongoDbId(id);
        const updateCate = await Category.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.json(updateCate);
    } catch (e) {
        throw new Error(e);
    }
});
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const deleteCate = await Category.findByIdAndDelete({ _id: id });
        res.json('Delete Category Successfully');
    } catch (e) {
        throw new Error(e);
    }
});

const getProductCate = asyncHandler(async (req, res) => {
    try {
        let pCate = await Category.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'productList',
                },
            },
        ]);
        pCate = await pCate.slice(0, 4);
        res.json(pCate);
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = { createCategory, getAllCategory, getACategory, updateCategory, deleteCategory, getProductCate };
