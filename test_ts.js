const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log("Running tsc...");
  execSync('npx tsc --noEmit');
  console.log("No TypeScript errors found.");
} catch(e) {
  const output = e.stdout ? e.stdout.toString() : e.toString();
  fs.writeFileSync('ts_errors.log', output);
  console.log("Errors written to ts_errors.log");
}
