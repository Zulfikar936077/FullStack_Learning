import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// Add your own bearer token from the previous lesson.
const yourBearerToken = process.env.SECRETS_API_BEARER_TOKEN;
const getConfig = () => {
  if (!yourBearerToken) {
    throw new Error("Set SECRETS_API_BEARER_TOKEN before calling protected Secrets API routes.");
  }

  return {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
};

const renderResult = (res, data) => {
  res.render("index.ejs", { content: JSON.stringify(data) });
};

const renderError = (res, error) => {
  const content = error.response?.data ?? { error: error.message };
  renderResult(res, content);
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, getConfig());
    renderResult(res, result.data);
  } catch (error) {
    renderError(res, error);
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, getConfig());
    renderResult(res, result.data);
  } catch (error) {
    renderError(res, error);
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      getConfig()
    );
    renderResult(res, result.data);
  } catch (error) {
    renderError(res, error);
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      getConfig()
    );
    renderResult(res, result.data);
  } catch (error) {
    renderError(res, error);
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, getConfig());
    renderResult(res, result.data);
  } catch (error) {
    renderError(res, error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
