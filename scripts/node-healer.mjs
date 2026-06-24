import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const dir = path.join(process.cwd(), 'src/content/knots/organizations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) continue;
  
  let fm = match[1];
  const body = match[2];
  
  try {
    yaml.load(fm);
  } catch (e) {
    if (e.name === 'YAMLException' && e.reason === 'bad indentation of a mapping entry') {
      // Find trailing double quotes like `...""` and fix them
      fm = fm.replace(/""$/gm, '"');
      
      // Fix never_say arrays that got stringified `never_say: "['foo', 'bar']"`
      fm = fm.replace(/^never_say: "\[(.*?)\]"$/m, 'never_say: [$1]');
      
      try {
        yaml.load(fm);
        fs.writeFileSync(filePath, `---\n${fm}\n---\n${body}`, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed formatting natively: ${file}`);
      } catch (e2) {
        // Still broken, try to fix line by line
        const lines = fm.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().endsWith('""')) {
            lines[i] = lines[i].replace(/""$/, '"');
          }
        }
        fm = lines.join('\n');
        
        try {
          yaml.load(fm);
          fs.writeFileSync(filePath, `---\n${fm}\n---\n${body}`, 'utf8');
          fixedCount++;
          console.log(`✅ Fixed formatting natively (pass 2): ${file}`);
        } catch(e3) {
           console.log(`❌ Still failing: ${file} - ${e3.reason}`);
        }
      }
    }
  }
  
  // also catch the array stringifications even if they don't throw bad indentation
  let changed = false;
  let newFm = fm.replace(/^never_say:\s*"\[(.*?)\]"$/mg, (match, inner) => {
      changed = true;
      // Clean up internal single quotes inside the stringified array
      inner = inner.replace(/'([^']*)'/g, '"$1"'); 
      return `never_say: [${inner}]`;
  });
  
  if (changed) {
      try {
         yaml.load(newFm);
         fs.writeFileSync(filePath, `---\n${newFm}\n---\n${body}`, 'utf8');
         fixedCount++;
         console.log(`✅ Fixed never_say array: ${file}`);
      } catch(e4) {}
  }
}
console.log(`\nHealed ${fixedCount} files`);
