const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/content/knots/organizations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find lines that start with `- " ` and replace them with `untie_implement: "`
  // specifically targeting lines inside frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (frontmatterMatch) {
    let fm = frontmatterMatch[1];
    let body = frontmatterMatch[2];
    
    // We look for floating array items in the frontmatter
    let newFm = fm.split('\n').map(line => {
      if (line.match(/^-\s+"/)) {
        // Remove the leading dash and space, add untie_implement
        return line.replace(/^-\s+"(.*)"'?$/, 'untie_implement: "$1"');
      }
      return line;
    }).join('\n');
    
    if (fm !== newFm) {
      fs.writeFileSync(filePath, `---\n${newFm}\n---\n${body}`, 'utf8');
      fixed++;
      console.log('Fixed:', file);
    }
  }
}
console.log(`Healed ${fixed} files.`);
