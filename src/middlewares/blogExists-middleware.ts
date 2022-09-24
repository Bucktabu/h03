import {blogs} from "../routers/blogs-router";
import {body} from "express-validator";

export const blogIdValidation = body('blogId').isString()
    .custom(async (id: string) => {
        const blog = await blogs.find(blog => blog.id === id)

        if (!blog) {
            throw new Error('blog not found')
        }

        return true
    })