export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}[]
let posts: postsType = []

export const postsRepository = {
    createNewPost(el: any) {
        const newPost = {
            id: String(+(new Date())),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: 'Admin`s blog'
        }
        posts.push(newPost)

        return newPost
    },

    giveAllPosts() {
        return posts
    },

    givePostById(id: string) {
        const post = posts.find(p => p.id === id)

        return post
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const post = postsRepository.givePostById(id)

        if (!post) {
            return false
        }

        post.title = title
        post.shortDescription = shortDescription
        post.content = content
        post.blogId = blogId

        return true
    },

    deletePostById(id: string) {
        const post = postsRepository.givePostById(id)

        if (!post) {
            return false
        }

        posts = posts.filter(p => p.id !== id)
        return true
    },

    deleteAllPosts() {
        posts = []

        return true
    }
}