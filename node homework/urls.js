const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Get filename from command line argument
const filename = process.argv[2];

// Read URLs from file
let urls;
try {
  urls = fs.readFileSync(filename, 'utf-8').split('\n');
} catch (error) {
  console.error(`Failed to read ${filename}: ${error}`);
  process.exit(1);
}

// Process each URL
urls.forEach(url => {
  // Parse URL
  const { protocol, hostname } = new URL(url);

  // Determine HTTP or HTTPS module
  const httpModule = protocol === 'https:' ? https : http;

  // Send HTTP request and save response to file
  httpModule.get(url, response => {
    let html = '';
    response.on('data', chunk => html += chunk);
    response.on('end', () => {
      const filename = `${hostname}.html`;
      fs.writeFile(filename, html, error => {
        if (error) {
          console.error(`Failed to save ${url}: ${error}`);
        } else {
          console.log(`Saved ${url} to ${filename}`);
        }
      });
    });
  }).on('error', error => {
    console.error(`Failed to get ${url}: ${error}`);
  });
});