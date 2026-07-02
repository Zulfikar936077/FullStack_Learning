import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const __filename = fileURLToPath(import.meta.url);

//Add your own bearer token from the previous lesson.
const yourBearerToken = process.env.SECRETS_API_BEARER_TOKEN || "";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

function formatAxiosError(error) {
  const errorData = error.response?.data ?? {
    error: error.message || "Request failed",
  };
  return JSON.stringify(errorData);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: formatAxiosError(error) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: formatAxiosError(error) });
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
    res.render("index.ejs", { content: formatAxiosError(error) });
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
    res.render("index.ejs", { content: formatAxiosError(error) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: formatAxiosError(error) });
  }
});

if (process.argv[1] === __filename) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app, formatAxiosError };
