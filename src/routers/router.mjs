export const handleRequest = async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (req.method === 'GET') {
            if (pathname === '/') {
                return await getHomePage(req, res);
            }
            if (pathname === '/about') {
                return await getAboutPage(req, res);
            }
            if (pathname === '/contact') {
                return await getContactPage(req, res);
            }
            return await getNotFoundPage(req, res);
        }

        if (req.method === 'POST') {
            if (pathname === '/submit') {
                return await postSubmit(req, res);
            }
            return await getNotFoundPage(req, res);
        }

        // Обробка інших методів (наприклад, PUT, DELETE)
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(generateHTML('Method Not Allowed', 'Method Not Allowed', `The HTTP method ${req.method} is not supported for this route.`));
    } catch (error) {
        console.error('Server error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(generateHTML('Server Error', 'Internal Server Error', 'Something went wrong on the server.'));
    }
};