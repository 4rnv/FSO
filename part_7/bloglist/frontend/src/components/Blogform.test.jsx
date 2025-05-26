import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './Blogform'

test('Blog form updates parent state and calls onSubmit', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Shrimp',
      url: 'https://qwer.ty',
    }
  
    const mockAddBlog = vi.fn()
    const user = userEvent.setup()
  
    render(<BlogForm addBlog={mockAddBlog} />);
  
    const inputTitle = screen.getByLabelText('Title')
    const inputAuthor = screen.getByLabelText('Author')
    const inputUrl = screen.getByLabelText('URL')
    const sendButton = screen.getByText('Add Blog')
  
    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(sendButton)
  
    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0]).toStrictEqual(blog)
  })