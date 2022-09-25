import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {blogRouterValidation} from "../middlewares/blogRouter-validation-middleware";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})

blogsRouter.post('/',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    (req: Request, res: Response) => {
        const newBlog = blogsRepository.createNewBlog(req.body)

        !newBlog ? res.sendStatus(404) : res.status(201).send(newBlog)
    }
)

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.giveAllBlog()

    !blogs ? res.sendStatus(404) : res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blog = blogsRepository.giveBlogById(req.params.id)

    !blog ? res.sendStatus(404) : res.status(200).send(blog)
})

blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    (req: Request, res: Response) => {
        const isUpdate = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const blog = blogsRepository.giveBlogById(req.params.id)
        res.status(204).send(blog)

        // !isUpdate ? res.sendStatus(404) : (
        //         const blog = blogsRepository.giveBlogById(req.params.id)
        //         res.status(204).send(blog)
        //     )
    }
)

blogsRouter.delete('/:id',
    authenticationGuardMiddleware,
    (req: Request, res: Response) => {
        const isDeleted = blogsRepository.deleteBlogById(req.params.id)

        !isDeleted ? res.sendStatus(404) : res.sendStatus(204)
    }
)