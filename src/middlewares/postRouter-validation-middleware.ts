import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";
import {blogsRepository} from "../repositories/blogs-repository";

const titleValidation = body('title').isString().trim().isLength({min: 5, max: 30})
const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 5, max: 100})
const contentValidation = body('content').isString().trim().isLength(({min: 5, max: 1000}))

export const blogIdValidation = body('blogId').isString()
    .custom((id: string) => {
        const blog = blogsRepository.giveBlogById(id)

        if (!blog) {
            throw new Error('blog not found')
        }

        return true
    })

export const postRouterValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware]
