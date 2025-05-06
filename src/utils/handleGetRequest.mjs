import url from 'url';
import { createPage } from './createPage.mjs';

export const handleGetRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathname = parsedUrl.pathname

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  let html
  let statusCode = 200

  if (pathname === '/') {
    html = createPage('Home', 'Home', 'Welcome to the Home Page')
  } else if (pathname === '/about') {
    html = createPage('About', 'About', 'Learn more about us')
  } else if (pathname === '/contact') {
    html = createPage('Contact', 'Contact', 'Get in touch')
  } else {
    statusCode = 404
    html = createPage('Not Found', 'Page Not Found', 'The requested URL was not found on this server.')
  }

  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.statusCode = statusCode
  res.end(html)
}
