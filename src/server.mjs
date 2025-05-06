// Імпортуємо необхідні модулі
import createPage from './utils/createPage.mjs';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

function handleGetRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    let html;
    let statusCode = 200;

    switch (pathname) {
        case '/':
            html = createPage('Home', 'Home', 'Welcome to the Home Page');
            break;
        case '/about':
            html = createPage('About', 'About', 'Learn more about us');
            break;
        case '/contact':
            html = createPage('Contact', 'Contact', 'Get in touch'); // Виправлено текст параграфа
            break;
        default:
            statusCode = 404;
            html = createPage('Not Found', 'Page Not Found', 'The requested URL was not found on this server.');
            break;
    }

    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.statusCode = statusCode;
    res.end(html);
}

function handlePostRequest(req, res) {
    if (req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsedData = querystring.parse(body);
                const { name, email } = parsedData;

                if (!name || !email) {
                    res.statusCode = 400;
                    const errorHTML = createPage('Bad Request', 'Invalid form data', 'Please provide both name and email.');
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.setHeader('Content-Length', Buffer.byteLength(errorHTML));
                    res.setHeader('X-Content-Type-Options', 'nosniff');
                    return res.end(errorHTML);
                }

                const responseHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Form Submitted</title>
          </head>
          <body>
            <h1>Form Submitted</h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
          </body>
          </html>
        `;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Content-Length', Buffer.byteLength(responseHTML));
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.end(responseHTML);
            } catch (error) {
                console.error('Error parsing form data:', error);
                res.statusCode = 500;
                const errorHTML = createPage('Server Error', 'Error 500', 'Something went wrong on the server while processing the form.');
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Content-Length', Buffer.byteLength(errorHTML));
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.end(errorHTML);
            }
        });
    } else {
        // Обробка POST запитів до неіснуючих маршрутів
        res.statusCode = 404;
        const notFoundHTML = createPage('Not Found', 'Page Not Found', 'The requested URL was not found on this server.');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Content-Length', Buffer.byteLength(notFoundHTML));
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(notFoundHTML);
    }
}

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') {
            handleGetRequest(req, res);
        } else if (req.method === 'POST') {
            handlePostRequest(req, res);
        } else {
            res.statusCode = 405; // Method Not Allowed
            res.setHeader('Content-Type', 'text/html; charset=utf-8'); // Виправлено Content-Type на text/html
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.end('Method Not Allowed');
        }
    } catch (error) {
        console.error('Server error:', error);
        res.statusCode = 500;
        const errorHTML = createPage('Server Error', 'Error 500', 'Something went wrong on the server.');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Content-Length', Buffer.byteLength(errorHTML));
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(errorHTML);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Обов'язково експортувати створений сервер та інші функції для тестів
module.exports = {
    server,
    createPage,
    handleGetRequest,
    handlePostRequest,
};