const { blogValidation } = require('../../validator/admin/blog');
const path = require('path')
const Controller = require('../controller');
const { deleteFile } = require('../../middlewares/functions');
const { BlogModel } = require('./../../../model/blogs');
const createHttpError = require('http-errors');

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            console.log(req?.body);
            const valided = await blogValidation.validateAsync(req.body);
            console.log(valided);
            req.body.image = path.join(req.body.imagepath, req.body.filename);
            console.log(req?.body?.image);
            const { _id } = req.user;
            const author = _id;
            console.log(req?.user?._id);
            const { title, shorttext, text, tags, category } = valided;
            const image = req.body.image
            const blog = await BlogModel.create({ title, shorttext, text, tags, category, author, image })
            console.log(blog);
            return res.status(201).json({ blog })
        } catch (error) {
            deleteFile(req.body.image)
            next(error);
        }
    }
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {}
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                        'author.__v': 0,
                        'author.otp': 0,
                        'author.roles': 0,
                        'author.bills': 0
                    }
                }
            ])
            return res.status(200).json({ blogs })
        } catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const author = req.user._id;
            const { id } = req.params;
            const data = req.body;
            // req.body.image = path.join(req.body.imagepath, req.body.filename);
            const badKey = ['', ' ', '0', 0, null, undefined];
            const blacklist = ['bookmark', 'like', 'comments', 'dislike'];

            Object.keys(data).forEach(key => {
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (badKey.includes(data[key])) delete data[key];
                if (blacklist.includes(key)) delete data[key];
            });

            const blog = await BlogModel.findOne({ author });
            if (!blog) throw createHttpError.NotFound('blog not found');
            const result = await BlogModel.updateOne({ _id: id }, { $set: data });
            if (result.modifiedCount == 0) throw createHttpError.BadRequest('data did not change');

            return res.status(200).json({
                statuscode: 200,
                success: true,
                message: 'Updated',
                // result
            })
        } catch (error) {
            // deleteFile(req?.body?.image)
            next(error);
        }
    }
}

module.exports = {
    BlogController: new BlogController()
}