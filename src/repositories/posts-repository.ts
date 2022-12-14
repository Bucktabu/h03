import {blogsCollection, postsCollection} from "./db";

export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type postsType = postType[]

const time = 10800

export const postsRepository = {
    async createNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        const newPost: postType = {
            id: String(+new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: 'Simple name', //blogsCollection.find({id: blogId}).name,
            createdAt: new Date().toISOString()
        }

        await postsCollection.insertOne({...newPost})

        return newPost
    },

    // async givePost(id: string | null | undefined): Promise<postsType> {
    //     const filter: any = {}
    //
    //     if (id) {
    //         filter.id = {$regex: id}
    //     }
    //
    //     return postsCollection.find(filter).toArray()
    // },

    async giveAllPosts() : Promise<postsType> {
        return await postsCollection.find({}, {projection: {_id: false}}).toArray()
    },

    async givePostById(id: string): Promise<postType | null> {
       return await postsCollection.findOne({id:id}, {projection: {_id: false}})
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})

        return result.matchedCount === 1
    },

    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllPosts(): Promise<boolean> {
        try {
            await postsCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('postsCollection => deleteAllPosts =>', e)
            return false
        }
    }
}