async function getAccessToken() {
    const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "YOUR_CLIENT_ID",
        client_secret: "YOUR_CLIENT_SECRET",
      }),
    });
  
    const data = await res.json();
    return data.access_token;
  }
  
  