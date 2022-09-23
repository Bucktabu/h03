import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";


export const blogsRouter = Router({})

const nameValidation = body('name').isString().trim().isLength({min: 3, max: 15})
const youtubeUrlValidation = body('youtubeUrl').isString().trim().isURL().isLength({min: 5, max: 100})

export type blogsType = {
    id: string,
    name: string,
    youtubeUrl: string
}[]

export let blogs: blogsType = []

blogsRouter.post('/',
    authenticationGuardMiddleware,
    nameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newBlog = {
            id: String(+(new Date())),
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl
        }
        blogs.push(newBlog)

        res.status(201).send(newBlog)
    }
)

blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blog = blogs.find(b => +b.id === +req.params.id)

    if (!blog) {
        res.sendStatus(404)
    }

    return res.status(200).send(blog)
})


blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    nameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const blog = blogs.find(b => +b.id === +req.params.id)

        if (!blog) {
            res.sendStatus(404)
        } else {
            blog.name = req.body.name
            blog.youtubeUrl = req.body.youtubeUrl
            return res.status(204).send(blog)
        }
    }
)

blogsRouter.delete('/:id',
    authenticationGuardMiddleware,
    (req: Request, res: Response) => {
        const newBlogs = blogs.filter(b => +b.id !== +req.params.id)

        if (newBlogs.length === blogs.length) {
            return res.sendStatus(404)
        }

        blogs = newBlogs

        res.sendStatus(204)
    }
)
