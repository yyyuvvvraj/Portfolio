import http from 'http';
import fs from 'fs';

http.get('http://localhost:3000/src/App.tsx', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    const snippet = lines.slice(240, 260).map((l, i) => (i+241) + ': ' + l).join('\n');
    fs.writeFileSync('error_snippet.txt', snippet);
    console.log("Snippet written to error_snippet.txt");
  });
});
