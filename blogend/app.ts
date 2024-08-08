const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000  // process.env.PORT读取当前目录下环境变量port的值，若没有则默认端口为3000

app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})