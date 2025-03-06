const { test, expect, beforeEach, describe } = require('@playwright/test')

const createBlog = async (page, data) => {
    await page.click('button:has-text("Create New Blog")')
    await page.fill('input[name="title"]', data.title)
    await page.fill('input[name="author"]', data.author)
    await page.fill('input[name="url"]', data.url)
    await page.click('button[type="submit"]')
}

test('Only user who created the blog can see the delete button', async ({ page, request }) => {
    await request.post('http://localhost:3003/api/blogs/reset')
    await page.goto('http://localhost:5173')
    await page.fill('input[name="username"]', 'homura')
    await page.fill('input[name="password"]', 'homura')
    await page.click('button[type="submit"]')
    await expect(page.getByText('Logged in as homura')).toBeVisible()
    const data = {
        title: 'Test for deleting blog made by user',
        author: 'De Insid',
        url: 'ajfosh.com'
    }
    await createBlog(page,data)
    await page.getByRole('button', { name: 'Show Details' }).click()
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible()

    await page.getByRole('button', { name: 'Logout' }).click()
    await page.reload()
    await page.fill('input[name="username"]', 'sayaka')
    await page.fill('input[name="password"]', 'sayaka')
    await page.click('button[type="submit"]')
    await expect(page.getByText('Logged in as sayaka')).toBeVisible()
    await page.getByRole('button', { name: 'Show Details' }).click()
    await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
})