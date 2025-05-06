import { handleGetRequest } from '../utils/handleGetRequest.mjs'
import { handlePostRequest } from '../utils/handlePostRequest.mjs'
import { errorHandler } from '../middleware/errorHandler.mjs'

export const handleRequest = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // перенаправляюємося на обробку GET
      handleGetRequest(req, res)
    } else if (req.method === 'POST') {
      // перенаправляюємося на обробку POST
      handlePostRequest(req, res)
    } else {
      // інші методи не доступні
      res.statusCode = 405
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.end('Method Not Allowed')
    }
  } catch (error) {
    errorHandler(error, req, res)
  }
}
