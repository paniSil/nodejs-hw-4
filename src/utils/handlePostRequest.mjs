import { createPage, createFormPage } from './createPage.mjs'
import querystring from 'querystring';

export const handlePostRequest = (req, res) => {
  if (req.url === '/submit') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const parsedData = querystring.parse(body)
        const { name, email } = parsedData

        //відсутнє ім'я чи імейл
        if (!name || !email) {
          res.statusCode = 400
          const errorHTML = createPage('Bad Request', 'Invalid form data', 'Please provide both name and email.')
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.setHeader('Content-Length', Buffer.byteLength(errorHTML))
          res.setHeader('X-Content-Type-Options', 'nosniff')
          return res.end(errorHTML)
        }

        // створюється сторінка
        res.statusCode = 200
        const responseHTML = createFormPage(name, email)
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Content-Length', Buffer.byteLength(responseHTML))
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.end(responseHTML)
      } catch (error) {
        console.error('Error parsing form data:', error)
        res.statusCode = 500
        const errorHTML = createPage(
          'Server Error',
          'Error 500',
          'Something went wrong on the server while processing the form.'
        )
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Content-Length', Buffer.byteLength(errorHTML))
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.end(errorHTML)
      }
    })
  } else {
    // should return 404 for POST requests to non-existent routes
    res.statusCode = 404
    const notFoundHTML = createPage('Not Found', 'Page Not Found', 'The requested URL was not found on this server.')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Content-Length', Buffer.byteLength(notFoundHTML))
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.end(notFoundHTML)
  }
}
