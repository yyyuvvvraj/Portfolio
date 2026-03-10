const fs = require('fs');
const path = require('path');

const dir = 'src';

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(file => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);
let updatedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Teal -> RBR Yellow
  content = content.replace(/--color-neon-blue/g, '--color-rbr-yellow');
  content = content.replace(/#00D2BE/ig, '#FFD700');
  content = content.replace(/0,\s*210,\s*190/g, '255, 215, 0');
  content = content.replace(/0,210,190/g, '255,215,0');

  // Ubuntu Orange -> RBR Red
  content = content.replace(/#E95420/ig, '#E10600');
  content = content.replace(/233,\s*84,\s*32/g, '225, 6, 0');
  content = content.replace(/233,84,32/g, '225,6,0');
  
  // Specific css classes
  content = content.replace(/glow-teal/g, 'glow-yellow');
  content = content.replace(/text-glow-teal/g, 'text-glow-yellow');

  // Any remaining 'neon-blue' in classNames from Tailwind or custom uses
  content = content.replace(/neon-blue/g, 'rbr-yellow');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    updatedFilesCount++;
  }
});

console.log(`\nSuccessfully updated ${updatedFilesCount} files to the Oracle Red Bull Racing theme.`);
