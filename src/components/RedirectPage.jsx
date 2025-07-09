import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGeoLocation } from "../utils/helpers";
import { logMiddleware } from "../utils/logger";
import { Typography } from "@mui/material";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
    const entryIndex = data.findIndex((d) => d.shortcode === shortcode);

    if (entryIndex === -1) {
      alert("Shortcode not found");
      navigate("/");
      return;
    }

    const entry = data[entryIndex];
    const now = new Date();
    const expiry = new Date(entry.expiryAt);
    if (now > expiry) {
      alert("Link has expired.");
      navigate("/");
      return;
    }

    getGeoLocation().then((location) => {
      const click = {
        timestamp: new Date().toISOString(),
        source: document.referrer || "direct",
        location,
      };
      entry.clicks.push(click);
      data[entryIndex] = entry;
      localStorage.setItem("shortenedUrls", JSON.stringify(data));
      logMiddleware("REDIRECT", click);
      window.location.href = entry.longUrl;
    });
  }, [shortcode, navigate]);

  return <Typography>Redirecting...</Typography>;
};

export default RedirectPage;
