import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//Add your own bearer token from the previous lesson.
const yourBearerToken = process.env.SECRETS_API_BEARER_TOKEN ?? "";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));

function renderApiError(res, error) {
  const content = error.response?.data ?? {
    error: error.message ?? "Unable to reach the Secrets API.",
  };
  res.render("index.ejs", { content: JSON.stringify(content) });
}

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    renderApiError(res, error);
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    renderApiError(res, error);
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app, renderApiError };
