const Blog = ({ blog }) => (
  <div>
    <strong>{blog.title} </strong>
    <span>Author: {blog.author}</span>
  </div>  
)

export default Blog