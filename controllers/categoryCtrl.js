const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) res.status(400).json({ msg: "Category Already Exist" });

      const newCategory = new Category({ name });

      await newCategory.save();

      res.json({ msg: "Category has been created" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category has been deleted" });
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json("Category Updated");
    } catch (error) {
      return res.statud(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryCtrl;
