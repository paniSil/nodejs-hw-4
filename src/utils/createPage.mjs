export const createPage = (title, heading, content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
    </head>
    <body>
      <h1>${heading}</h1>
      <p>${content}</p>
    </body>
    </html>
  `
}

export const createFormPage = (name, email) => {
  return `
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
`
}