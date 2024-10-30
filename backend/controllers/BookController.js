const mongoose = require("mongoose");
const Books = require("../models/Books");
const BookController = {
  index: async (req, res) => {
    let limit = 6;
    let page = req.query.page || 1;
    const books = await Books.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalBook = await Books.countDocuments();
    let totalPages = Math.ceil(totalBook / limit);

    let links = {
      nextPage: totalPages == page ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page,
      loopableLinks: [],
    };

    for (let index = 0; index < totalPages; index++) {
      let number = index + 1;
      links.loopableLinks.push({ number });
    }

    let response = {
      links,
      data: books,
    };

    return res.json(response);
  },

  store: async (req, res) => {
    let { title, description, categories } = req.body;
    const book = await Books.create({
      title,
      description,
      categories,
    });

    return res.json(book);
  },

  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(401).json({ msg: "id is not valid" });
      }

      let book = await Books.findById(id);
      if (!book) {
        return res.status(400).json({ msg: "invalid book" });
      }

      res.json(book);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },

  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({ msg: "id is not valid" });
      }
      let book = await Books.findByIdAndDelete(id);
      if (!book) {
        return res.status(400).json({ msg: "invalid book" });
      }
      res.json(book);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },

  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({ msg: "id is not valid" });
      }
      let book = await Books.findByIdAndUpdate(id, { ...req.body });
      if (!book) {
        return res.status(400).json({ msg: "book invalid" });
      }
      res.json(book);
    } catch (e) {
      return res.status(500).json({ msg: "internet error" });
    }
  },
};

module.exports = BookController;
