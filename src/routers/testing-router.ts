import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {

    const postsDeleted = postsRepository.deleteAllPosts()
    const blogsDeleted = blogsRepository.deleteAllBlogs()

    if (postsDeleted && blogsDeleted) {
        res.sendStatus(204)
    }
})