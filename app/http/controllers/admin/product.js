const { productModel } = require("../../../model/products");
const { arrayImages } = require("../../middlewares/functions");
const { productValidator } = require("../../validator/admin/product");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { StatusCodes: statuscode, StatusCodes } = require('http-status-codes');

class AdminProductController extends Controller {
    async createProduct(req, res, next) {
        try {
            const images = arrayImages(req?.files || [], req?.body?.imagepath);
            req.body.tags = req.body.tags.split(",");
            await productValidator.validateAsync(req.body);
            const { title, shortdescription, description, tags } = req.body;
            const product = await productModel.create({ title, shortdescription, description, images, tags });
            return res.status(201).json({
                backdata: req.body,
                data: product
            })
        } catch (error) {
            // deleteFile(req.files)
            next(error);
        }
    }
    async getProducts(req, res, next) {
        try {
            // const products = await productModel.find({});
            const search = req.query.search;
            let products;
            if (search) {
                products = await productModel.find({
                    $text: {
                        $search: new RegExp(search, 'gi')
                    }
                })
            } else {
                products = await productModel.find({});
            }
            return res.status(statuscode.OK).json({ products })
        } catch (error) {
            next(error);
        }
    }
    async getProductByID(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            if (!product) next(createHttpError.NotFound('Product not found'));
            return res.status(statuscode.CREATED).json({
                product
            })

        } catch (error) {
            next(error);
        }
    }


    async editProduct(req, res, next) {
        try {
            function getallobjec(body) {
                return JSON.parse(JSON.stringify(body))
            }

            const { id } = req.params;

            const findProduct = await productModel.findById(id);
            if(!findProduct) throw(createHttpError.NotFound('product not found product'))

            const data = getallobjec(req.body);
            //  data.images = arrayImages(req?.files || [], req?.body?.imagepath);
            // data.tags = req.body.tags.split(",");

            const badkey = ['', ' ', 0, '0', null, undefined];
            const blacklist = ['owner'];

            // Object.keys(data).forEach(key => {
            //     if (data[key] == 'string') data[key] = data[key].trim();
            //     if (data[key].length == 0) delete data[key];
            //     if (badkey.includes(key)) delete data[key];
            //     if (blacklist.includes(key)) delete data[key];
            // });
            const product = await productModel.updateOne({_id: findProduct._id}, {$set: data});
            console.log(product);
            if(product?.modifiedCount == 0) throw(createHttpError.InternalServerError("did not update product"));
            return res.status(StatusCodes.ACCEPTED).json({
                product
            })
        } catch (error) {
            next(error);
        }
    }
    async findProduct(productID) {
        const product = await productModel.findOne({ _id: productID });
        return product
    }
}

module.exports = {
    AdminProductController: new AdminProductController()
}