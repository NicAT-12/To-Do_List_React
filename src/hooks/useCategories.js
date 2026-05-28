import { useEffect, useState } from 'react';
import { loadCategories, saveCategories } from '../utils/storage';

export function useCategories() {
    const [categories, setCategories] = useState(loadCategories);
    const [categoryName, setCategoryName] = useState('');
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        saveCategories(categories);
    }, [categories]);

    function addCategory() {
        if (categoryName.trim() === '') return;

        const duplicated = categories.find((category) => {
            return category.toLowerCase() === categoryName.toLowerCase()
        });

        if (duplicated) return;

        setCategories([
            ...categories,
            categoryName
        ]);

        setCategoryName('');
        setShowCategoryInput(false);
    };

    function deleteCategory(categoryToRemove, clearTasksCategory) {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');

        if (!confirmDelete) return;

        setCategories(
            categories.filter((category) => {
                return category !== categoryToRemove;
            })
        );

        clearTasksCategory(categoryToRemove);

        setActiveCategory('');
    };

    return {
        categories,
        categoryName,
        setCategoryName,
        showCategoryInput,
        setShowCategoryInput,
        activeCategory,
        setActiveCategory,
        addCategory,
        deleteCategory
    };
}