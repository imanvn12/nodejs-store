
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");
const { BlogModel } = require("../../model/blogs");
const { userModel } = require("../../model/users");
const { blogType } = require("../typeDef/blog.typedef");
const { antype } = require("./anytype.resolver");

const getUserBookmarkedBlog = {
    type: blogType,
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await BlogModel.find({ bookmark: user._id }).populate([
            { path: "bookmark" },
            { path: "author" },
            { path: "category" },
            { path: "like" },
            { path: "dislike" },
            { path: "comments.writer" },
            { path: "comments.answers.writer" }
        ]);
        // console.log(blog);
        return blog
    }

}

const getUserBasket = {
    type: antype,
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphql(req);
        const userBasket = await funcgetUserBasket(user._id);

        return userBasket
    }
}

// ===========================================
async function funcgetUserBasket(userID) {
    const userBasket = await userModel.aggregate([
        {
            $match: {
                _id: userID
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.product.ProductID",
                foreignField: "_id",
                as: "productBasket"
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.course.CourseID",
                foreignField: "_id",
                as: "courseBasket"
            }
        },
        // {
        //     $addFields: {
        //         "localfield": [
        //             "$blogBasket",
        //             "$courseBasket",
        //         ]
        //     }
        // },
        {
            $addFields: {
                "productBasket": {
                    $function: {
                        body: function (productBasket, products) {
                            return productBasket.map(function (product) {
                                const count = products.find(item => item.ProductID.valueOf() == product._id.valueOf()).count;
                                const totalprice = count * product.price;
                                return {
                                    ...product,
                                    productcount: count,
                                    totalprice,
                                    discount: product.discount,
                                    finallprice: totalprice - ((product.discount / 100) * totalprice)
                                }
                            })
                        },
                        args: ["$productBasket", "$basket.product"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $addFields: {
                "courseBasket": {
                    $function: {
                        body: function (courseBasket) {
                            return courseBasket.map(function (course) {
                                const price = course.price;
                                const discount = ((course.discount / 100) * price);
                                const finallprice = price - discount;
                                return {
                                    ...course,
                                    price,
                                    discount,
                                    finallprice
                                }
                            })
                        },
                        args: ["$courseBasket"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $addFields: {
                "allfinalprice": {
                    $function: {
                        body: function (courseBasket, productBasket) {
                            const courseAmount = courseBasket.reduce(function (total, course) {
                                return total + course.finallprice
                            }, 0);
                            const productAmount = productBasket.reduce(function (total, product) {
                                return total + product.finallprice
                            }, 0);
                            const courseIDs = courseBasket.map(function (course) {
                                return course._id
                            });
                            const productIDs = productBasket.map(function (product) {
                                return product._id
                            });
                            return {
                                allfinalprice: productAmount + courseAmount,
                                courseIDs,
                                productIDs
                            }
                        },
                        args: ["$courseBasket", "$productBasket"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $project: {
                // "basket.blog": 1,
                // "basket.course": 1,
                "productBasket._id": 1,
                "productBasket.price": 1,
                "productBasket.productcount": 1,
                "productBasket.totalprice": 1,
                "productBasket.discount": 1,
                "productBasket.finallprice": 1,
                "courseBasket._id": 1,
                "courseBasket.price": 1,
                "courseBasket.discount": 1,
                "courseBasket.finallprice": 1,
                // "localfield": 1
                "allfinalprice": 1
            }
        }
    ])
    return userBasket
}



module.exports = {
    getUserBookmarkedBlog,
    getUserBasket,
    funcgetUserBasket
};