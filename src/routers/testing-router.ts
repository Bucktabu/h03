import {Request, Response, Router} from "express";

import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {

    const postsDeleted = postsRepository.deleteAllPosts()
    const blogsDeleted = blogsRepository.deleteAllBlogs()

    if (await blogsDeleted && await postsDeleted) {
        res.sendStatus(204)
    }
})