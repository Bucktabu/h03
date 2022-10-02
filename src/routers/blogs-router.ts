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

        !newBlog ? res.sendStatus(404) : res.status(201).send(newBlog)
    }
)

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs: blogsType | null | undefined = await blogsRepository.giveAllBlogs()

    !blogs ? res.sendStatus(404) : res.status(200).send(blogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog: blogType | null = await blogsRepository.giveBlogById(req.params.id)

    !blog ? res.sendStatus(404) : res.status(200).send(blog)
})

blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate: boolean = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl) // почему здесь не указал булеaн

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const blog = await blogsRepository.giveBlogById(req.params.id)
        res.status(204).send(blog)

        // !isUpdate ? res.sendStatus(404) : (
        //         const blog = blogsRepository.giveBlogById(req.params.id)
        //         res.status(204).send(blog)
        //     )
    }
)

blogsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted: boolean = await blogsRepository.deleteBlogById(req.params.id)

        !isDeleted ? res.sendStatus(404) : res.sendStatus(204)
    }
)