import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
});

export const getAll = async(req, res) => {
    try {
        const data = await Product.find();

        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {}
};
export const get = async(req, res) => {
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/products/${id}`);
        const data = await Product.findOne({ _id: id });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async(req, res) => {
    try {
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
                
            });
        }
        const data = await Product.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async(req, res) => {
    try {
        // await axios.delete(`http://localhost:3002/products/${req.params.id}`);
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async(req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};