const { Book } = require("../../models/book")

// const getAll = async (req, res) => {
//     const {_id: owner} = req.user;
//     const result = await Book.find({owner},"title author owner")
//     .populate("owner", "name email");
//     res.json(result)
// }

// const getAll = async (req, res) => {
//     const favorite = req.query.favorite;

//     const filter = {};

//     if (favorite !== undefined) {
//         filter.favorite = favorite;
//     }

//     const books = await Book.find(filter);
//     res.json(books);

// }


const paginate = require('mongoose-paginate');

const getAll = async (req, res) => {
    const favorite = req.query.favorite;
    const filter = {};

    if (favorite !== undefined) {
        filter.favorite = favorite === 'true';
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const options = {
        page,
        limit,
        sort: { author: 1 },
    };
        const query = Book.find(filter).sort(options.sort);

        const result = await Book.paginate(query, options);

        res.json(result);
}


module.exports = getAll;