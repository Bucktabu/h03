import {CustomValidator} from "express-validator";
import {postsType} from "../routers/posts-router";

let posts: postsType

export const blogExists: CustomValidator = (value) => {
    const currentBlog = posts.find(el => el.blogId === value)

    if (!currentBlog) {
        throw new Error('Blog doesn`t exist')
    }
}