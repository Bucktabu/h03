import {blogs} from "../routers/blogs-router";

export const blogExists = (id: string) => {
    const blog = blogs.find(blog => blog.id === id)

    if (blog) {
        throw new Error('Blog doesn`t exist')
    }

    return true
}