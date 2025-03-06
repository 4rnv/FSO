const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test')

const createBlog = async (page, data) => {
    await page.click('button:has-text("Create New Blog")')
    await page.fill('input[name="title"]', data.title)
    await page.fill('input[name="author"]', data.author)
    await page.fill('input[name="url"]', data.url)
    await page.click('button[type="submit"]')
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/blogs/reset')
        await request.post('http://localhost:5173/api/users', {
        data: {
            username: 'testuser',
            password: 'testpassword',
            name: 'Test User'
        }
    })
    await page.goto('http://localhost:5173')
    })

    afterEach(async ({ request }) => {
        await request.post('http://localhost:3003/api/blogs/reset')
    })

    test('Succeeds with correct credentials', async ({ page }) => {
        await page.fill('input[name="username"]', 'testuser')
        await page.fill('input[name="password"]', 'testpassword')
        await page.click('button[type="submit"]')

        await expect(page.getByText('Logged in as Test User')).toBeVisible()
        await expect(page.getByText('Blogs')).toBeVisible()
    })
    test('Fails with wrong credentials', async ({ page }) => {
        await page.fill('input[name="username"]', 'wronguser')
        await page.fill('input[name="password"]', 'wrongpassword')
        await page.click('button[type="submit"]')
        await expect(page.getByText('Error: Wrong username or password')).toBeVisible()
    })
})

describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/blogs/reset')
        await request.post('http://localhost:5173/api/users', {
            data: {
                username: 'homura',
                password: 'homura',
                name: 'homura'
            }
        })
        await page.goto('http://localhost:5173')
        await expect(page.getByTestId('login-form')).toBeVisible()
    })
  
    test('A new blog can be created', async ({ page }) => {
        //console.log(await page.content())
        await page.fill('input[name="username"]', 'homura')
        await page.fill('input[name="password"]', 'homura')
        await page.click('button[type="submit"]')
        await expect(page.getByText('Logged in as homura')).toBeVisible()

        const data = {
            title: 'Test for creating new blog',
            author: 'Neu Blawg',
            url: 'fpiqersg.com'
        }

        await createBlog(page,data)

        await expect(page.getByText(data.title, { exact: true })).toBeVisible()
        await expect(page.getByText(data.author, { exact: true })).toBeVisible()
    })
    
    test('Blog can be liked', async ({ page }) => {

        await page.fill('input[name="username"]', 'homura')
        await page.fill('input[name="password"]', 'homura')
        await page.click('button[type="submit"]')
        await expect(page.getByText('Logged in as homura')).toBeVisible()
        const data = {
            title: 'Test for liking new blog',
            author: 'Laye King',
            url: 'liewb.com'
        }
        await createBlog(page,data)
        await page.getByRole('button', { name: 'Show Details' }).click()

        const likesSpan = await page.locator('.likes').first()
        const likeButton = await page.getByRole('button', { name: 'Like' }).first()
        await likeButton.click()

        await expect(likesSpan).toHaveText('Likes: 1')
    })

    test('Blog can be deleted', async ({ page }) => {
        await page.fill('input[name="username"]', 'homura')
        await page.fill('input[name="password"]', 'homura')
        await page.click('button[type="submit"]')
        await expect(page.getByText('Logged in as homura')).toBeVisible()
        const data = {
            title: 'Test for deleting blog',
            author: 'Del King',
            url: 'liewb.com'
        }
        await createBlog(page,data)
        await page.getByRole('button', { name: 'Show Details' }).click()
        page.on('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`)
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Delete' }).click()
    
        const locator = await page.getByTestId('blogs')
        await expect(locator.getByText(data.title)).not.toBeVisible()
    })

    test('Blogs sorted by likes', async ({ page }) => {
        await page.getByText('Show Details').first().waitFor()
        const locator = await page.getByTestId('blogs')
        const items = await locator.locator('.blog').all()

        let higher = null
        for (let blog of items) {
          await blog.getByRole('button', { name: 'Show Details' }).click()
          const likesText = await blog.locator('.likes').innerText()
          let likes = Number(likesText.match(/\d+/).join(''))
          if (higher === null) {
            higher = likes
          }

          await expect(higger).toBeGreaterThanOrEqual(likes)
        }
    })
})