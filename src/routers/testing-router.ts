import {Request, Response, Router} from "express";
import {postsType} from "./posts-router";
import {blogsType} from "./blogs-router";

export const testingRouter = Router({})

let posts: postsType
let blogs: blogsType

testingRouter.delete('/all-data', (req: Request, res: Response) => {

    posts = []
    blogs = []

    if (!posts.length && !blogs.length) {
        res.sendStatus(204)
    }
})