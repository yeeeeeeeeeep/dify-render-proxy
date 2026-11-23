const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// 把前端静态页面托管在这里
app.use(express.static('public'));

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_URL = process.env.DIFY_WORKFLOW_URL;

app.post('/run-workflow', async (req, res) => {
  try {
    const { userInput } = req.body;
    const resp = await axios.post(
      DIFY_URL,
      {
        inputs: {
          userInput
        },
        response_mode: "stream",
        user: "web-user"
      },
      {
        headers: {
          Authorization: `Bearer ${DIFY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("服务启动");
});
