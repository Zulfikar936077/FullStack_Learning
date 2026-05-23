import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const API_URL = process.env.SECRETS_API_URL ?? "https://secrets-api.appbrewery.com";
const __dirname = dirname(fileURLToPath(import.meta.url));

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.set("views", join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

const renderContent = (res, data) => {
  res.render("index.ejs", { content: JSON.stringify(data) });
};

const renderApiError = (res, error) => {
  const errorData = error?.response?.data ?? { error: error?.message ?? "Request failed" };
  renderContent(res, errorData);
};

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    renderContent(res, result.data);
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    renderContent(res, result.data);
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(API_URL + "/secrets/" + searchId, req.body, config);
    renderContent(res, result.data);
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(API_URL + "/secrets/" + searchId, req.body, config);
    renderContent(res, result.data);
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    renderContent(res, result.data);
  } catch (error) {
    renderApiError(res, error);
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
