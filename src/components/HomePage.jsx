import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Paper
} from "@mui/material";
import { generateShortcode, validateUrl } from "../utils/helpers";
import { logMiddleware } from "../utils/logger";

const HomePage = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleShorten = () => {
    const result = urls.map((url) => {
      if (!validateUrl(url.longUrl)) {
        return { error: "Invalid URL format" };
      }

      const validity = parseInt(url.validity) || 30;
      const shortcode = url.shortcode || generateShortcode();
      const now = new Date();
      const expiry = new Date(now.getTime() + validity * 60000);

      const entry = {
        longUrl: url.longUrl,
        shortcode,
        createdAt: now.toISOString(),
        expiryAt: expiry.toISOString(),
        clicks: [],
      };

      const data = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
      if (data.some((d) => d.shortcode === shortcode)) {
        return { error: `Shortcode '${shortcode}' already in use.` };
      }

      const newData = [...data, entry];
      localStorage.setItem("shortenedUrls", JSON.stringify(newData));
      logMiddleware("SHORTEN_URL", entry);
      return { ...entry, shortUrl: `http://localhost:3000/${shortcode}` };
    });

    setResults(result);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🔗 URL Shortener
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Shorten up to 5 URLs with optional expiry and shortcode
        </Typography>

        <Divider sx={{ my: 3 }} />

        {urls.map((url, index) => (
          <Card key={index} sx={{ mb: 3, p: 2 }} variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Long URL"
                    fullWidth
                    value={url.longUrl}
                    onChange={(e) => handleInputChange(index, "longUrl", e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Validity (minutes)"
                    type="number"
                    fullWidth
                    value={url.validity}
                    onChange={(e) => handleInputChange(index, "validity", e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Custom Shortcode"
                    fullWidth
                    value={url.shortcode}
                    onChange={(e) => handleInputChange(index, "shortcode", e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button onClick={addUrlField} disabled={urls.length >= 5} sx={{ mr: 2 }}>
            ➕ Add Another URL
          </Button>
          <Button variant="contained" color="primary" onClick={handleShorten}>
            🚀 Shorten
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {results.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              ✅ Results
            </Typography>
            {results.map((res, i) => (
              <Card key={i} sx={{ mt: 2 }}>
                <CardContent>
                  {res.error ? (
                    <Typography color="error">{res.error}</Typography>
                  ) : (
                    <>
                      <Typography>
                        <strong>Short URL:</strong>{" "}
                        <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">
                          {res.shortUrl}
                        </a>
                      </Typography>
                      <Typography><strong>Expires At:</strong> {res.expiryAt}</Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
