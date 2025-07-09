import React from "react";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const StatsPage = () => {
  const data = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      {data.map((item, idx) => (
        <Card key={idx} sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Short URL: <a href={`http://localhost:3000/${item.shortcode}`}>http://localhost:3000/{item.shortcode}</a></Typography>
            <Typography>Created At: {item.createdAt}</Typography>
            <Typography>Expires At: {item.expiryAt}</Typography>
            <Typography>Total Clicks: {item.clicks.length}</Typography>
            <List>
              {item.clicks.map((click, i) => (
                <ListItem key={i}>
                  <ListItemText primary={`Clicked on: ${click.timestamp}`} secondary={`From: ${click.source} | Location: ${click.location}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default StatsPage;