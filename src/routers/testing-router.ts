import {Request, Response, Router} from "express";
import {postsType} from "./posts-router";
import {blogsRepository} from "../repositories/blogs-repository";

export const testingRouter = Router({})

let posts: postsType

testingRouter.delete('/all-data', (req: Request, res: Response) => {

    posts = []
    const blogsDeleted = blogsRepository.deleteAllBlogs()

    if (!posts.length && blogsDeleted === true) {
        res.sendStatus(204)
    }
})