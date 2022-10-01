import {blogsCollection} from "./db";

export type blogType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}

export type blogsType = blogType[] // массив данного типа

const time = 10800

export const blogsRepository = {
    async createNewBlog(name: string, youtubeUrl: string): Promise<blogType> {
        const newBlog: blogType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date(+new Date() - time).toISOString()
        }

        await blogsCollection.insertOne({...newBlog})
        return newBlog
    },

    // async giveBlog(id: string | null | undefined): Promise<blogsType> {
    //     const filter: any = {}
    //
    //     if (id) {
    //         filter.id = {$regex: id}
    //     }
    //
    //     return blogsCollection.find(filter, {projection: {_id: false}}).toArray()
    // },

    async giveAllBlogs(): Promise<blogsType> {
        return blogsCollection.find({project: {_id: 0}}).toArray()
    },

    async giveBlogById (id: string): Promise<blogType | null> {
        return await blogsCollection.findOne({id: id})
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
        try {
            await blogsCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('blogsCollection => deleteAllBlogs =>', e)
            return false
        }
    }
}