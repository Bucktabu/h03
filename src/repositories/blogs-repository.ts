import {blogsCollection} from "./db";

export type blogType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}

export type blogsType = blogType[] // массив данного типа

const time: number = 10800 // three hours

export const blogsRepository = {
    async createNewBlog(name: string, youtubeUrl: string): Promise<blogType> {
        const newBlog: blogType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date(+new Date() - time).toISOString()
        }

        await blogsCollection.insertOne(newBlog)

        return newBlog
    },

    async giveBlog(id: string | null | undefined): Promise<blogsType> {
        const filter: any = {}

        if (id) {
            filter.id = {$regex: id}
        }

        return blogsCollection.find(filter).toArray()
    },

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id}, {$set: {name: name, youtubeUrl: youtubeUrl}})

        return result.matchedCount === 1
    },

    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await blogsCollection.drop() // remove()

        return result
    }
}