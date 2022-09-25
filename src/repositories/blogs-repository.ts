type blogsType = {
    id: string,
    name: string,
    youtubeUrl: string
}[]
let blogs: blogsType = []

export const blogsRepository = {
    createNewBlog(el: any) {
        const newBlog = {
            id: String(+(new Date())),
            name: el.name,
            youtubeUrl: el.youtubeUrl
        }
        blogs.push(newBlog)

        return newBlog
    },

    giveAllBlog() {
        return blogs
    },

    giveBlogById(id: string) {
        const blog = blogs.find(b => b.id === id)

        return blog
    },

    updateBlog(id: string, name: string, youtubeUrl: string) {
        let blog = blogsRepository.giveBlogById(id)

        if (!blog) {
            return false
        }

        blog.name = name
        blog.youtubeUrl = youtubeUrl

        return true
    },

    deleteBlogById(id: string) {
        let blog = blogsRepository.giveBlogById(id)

        if (!blog) {
            return false
        }

        blogs = blogs.filter(b => b.id !== id)
        return true
    },

    deleteAllBlogs() {
        blogs = []

        return true
    }
}