import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import { vi } from 'vitest'

vi.mock('../services/blogs', () => ({
    default: {
        getAll: vi.fn(),
        createBlog: vi.fn(),
        updateBlog: vi.fn(),
        deleteBlog: vi.fn(),
    },
}))

test('renders title and author, does not render URL or likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Shrimp',
    url: 'https://qwer.ty',
    likes: 13
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Component testing is done with react-testing-library')
  const authorElement = screen.getByText('Author: Shrimp')
  const urlElement = screen.queryByText('URL: https://qwer.ty')
  const likesElement = screen.queryByText('Likes: 13')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('clicking the button displays URL and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Shrimp',
        url: 'https://qwer.ty',
        likes: 13
    }

    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)
    const urlElement = screen.getByText('URL: ' + blog.url)
    const likesElement = screen.getByText('Likes: ' + blog.likes)

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls the event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Shrimp',
        url: 'https://qwer.ty',
        likes: 13,
        id: '67bf05a8a9d606171c9caf8a'
    }
    blogService.updateBlog.mockResolvedValue(blog)
    const mockUpdateHandler = vi.fn()
    render(<Blog blog={blog} updateBlog={mockUpdateHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
})
