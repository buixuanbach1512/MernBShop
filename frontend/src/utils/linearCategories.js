const linearCategories = (categories, options = []) => {
    for (let category of categories) {
        options.push({
            id: category._id,
            name: category.name,
        });
        if (category.children.length > 0) {
            linearCategories(category.children, options);
        }
    }
    return options;
};

export default linearCategories;
