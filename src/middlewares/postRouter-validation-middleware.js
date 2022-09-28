"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouterValidation = exports.blogIdValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("./input-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
const titleValidation = (0, express_validator_1.body)('title').isString().trim().isLength({ min: 5, max: 30 });
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().isLength({ min: 5, max: 100 });
const contentValidation = (0, express_validator_1.body)('content').isString().trim().isLength(({ min: 5, max: 1000 }));
exports.blogIdValidation = (0, express_validator_1.body)('blogId').isString()
    .custom((id) => {
    const blog = blogs_repository_1.blogsRepository.giveBlog(id);
    if (!blog) {
        throw new Error('blog not found');
    }
    return true;
});
exports.postRouterValidation = [titleValidation, shortDescriptionValidation, contentValidation, exports.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware];
