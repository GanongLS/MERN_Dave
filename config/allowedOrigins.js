const prodAllowedOrigins = ["https://www.whateveryoursite.com"];
const devAllowedOrigins = ["http://127.0.0.1:3300", "http://localhost:3300", "https://www.google.co.id"];
const allowedOrigins = [...prodAllowedOrigins, ...devAllowedOrigins];

module.exports = allowedOrigins