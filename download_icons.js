const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  {
    name: 'terminal.png',
    url: 'https://raw.githubusercontent.com/ubuntu/yaru/master/icons/Suru/256x256/apps/utilities-terminal.png'
  },
  {
    name: 'system-monitor.png',
    url: 'https://raw.githubusercontent.com/ubuntu/yaru/master/icons/Suru/256x256/apps/utilities-system-monitor.png'
  },
  {
    name: 'thunderbird.png',
    url: 'https://raw.githubusercontent.com/ubuntu/yaru/master/icons/Suru/256x256/apps/thunderbird.png'
  }
];

const dir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

icons.forEach(icon => {
  const dest = path.join(dir, icon.name);
  https.get(icon.url, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${icon.name}`);
      });
    } else {
      console.log(`Failed to download ${icon.name}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.log(`Error downloading ${icon.name}: ${err.message}`);
  });
});
