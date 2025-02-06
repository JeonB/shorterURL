import express, { Request, Response } from 'express'
import { shortenUrl, getOriginalUrl } from '../utils/urlShortener'
import { HttpCode } from '../core/constants'
const router = express.Router()

// 단축 URL 생성 API
router.post('/shorten', async (req: Request, res: Response): Promise<void> => {
	const { originalUrl } = req.body
	if (!originalUrl) {
		res.status(HttpCode.BAD_REQUEST).json({ error: 'URL is required' })
		return Promise.resolve()
	}

	try {
		const shortUrl = await shortenUrl(originalUrl)
		res.json({ shortUrl })
	} catch (error) {
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to shorten URL' })
	}
})

// 단축 URL 리디렉트 API
router.get('/:shortCode', async (req, res) => {
	const { shortCode } = req.params
	const originalUrl = await getOriginalUrl(shortCode)

	if (originalUrl) {
		res.redirect(originalUrl)
	} else {
		res.status(HttpCode.NOT_FOUND).json({ error: 'URL not found' })
	}
})

export default router
