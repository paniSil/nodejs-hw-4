import * as logger from "../utils/logger.mjs"

export const errorHandler = (error, req, res) => {
  logger.error('Необроблена помилка:', error)

  if (!res.headersSent) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Внутрішня помилка сервера')
  }

}
