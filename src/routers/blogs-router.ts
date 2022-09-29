import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {blogRouterValidation} from "../middlewares/blogRouter-validation-middleware";
import {blogsRepository, blogsType, blogType} from "../repositories/blogs-repository";

export const blogsRouter = Router({})

blogsRouter.post('/',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request, res: Response) => {
        const newBlog: blogType = await blogsRepository.createNewBlog(req.body.name, req.body.youtubeUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        } else {
            res.sendStatus(404)
        }
    }
)

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs: blogsType | null | undefined = await blogsRepository.giveBlog(null)

    if (blogs) {
        res.status(200).send(blogs)
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog: blogsType | null | undefined = await blogsRepository.giveBlog(req.params.id)

    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate: boolean = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl) // почему здесь не указал булеaн

        if (isUpdate) {
            const blog = await blogsRepository.giveBlog(req.params.id)
            res.status(204).send(blog)
        } else {
            res.sendStatus(404)
        }
    }
)

blogsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted: boolean = await blogsRepository.deleteBlogById(req.params.id)

        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
)