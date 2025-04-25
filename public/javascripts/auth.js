async function getAccessToken() {
  const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "ijZO7RVu0kFoiX9O88qWu20i8KzhKnVyfbw0twg1Zcr5E43JYp",
      client_secret: "YE9rHjLlzhWMiAa4qERWbcdCOyYx2y7L98oCgS3C",
    }),
  });

  const data = await res.json();
  return data.access_token;
}

  