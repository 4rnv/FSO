const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const blogsLikes = blogs.map((blog) => blog.likes);
  return blogsLikes.reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  const descending = blogs.sort((a, b) => b.likes - a.likes);
  const favorite = descending[0];
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorBlogCount = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (authorBlogCount[author]) {
      authorBlogCount[author]++;
    } else {
      authorBlogCount[author] = 1;
    }
  });
  const authorCountArray = Object.entries(authorBlogCount);
  const sortedAuthors = authorCountArray.sort((a, b) => b[1] - a[1]);
  const mostActiveAuthor = sortedAuthors[0];

  return {
    author: mostActiveAuthor[0],
    blogs: mostActiveAuthor[1],
  };
};

const mostLikes = (blogs) => {
  const authorLikeCount = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (authorLikeCount[author]) {
      authorLikeCount[author] += blog.likes;
    } else {
      authorLikeCount[author] = blog.likes;
    }
  });
  const authorCountArray = Object.entries(authorLikeCount);
  const sortedAuthors = authorCountArray.sort((a, b) => b[1] - a[1]);
  const mostLikedAuthor = sortedAuthors[0];
  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
