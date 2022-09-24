import {body} from "express-validator";
import {blogs} from "../routers/blogs-router";
import {inputValidationMiddleware} from "./input-validation-middleware";

const titleValidation = body('title').isString().trim().isLength({min: 5, max: 30})
const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 5, max: 100})
const contentValidation = body('content').isString().trim().isLength(({min: 5, max: 1000}))

export const blogIdValidation = body('blogId').isString()
    .custom(async (id: string) => {
        const blog = await blogs.find(blog => blog.id === id)

        if (!blog) {
            throw new Error('blog not found')
        }

        return true
    })

export const postRouterValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware]
