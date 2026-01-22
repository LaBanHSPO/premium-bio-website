const fs = require('fs');
const path = require('path');

const theme = process.env.THEME || 'next-link';
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

console.log(`Updating tsconfig.json for theme: ${theme}`);

try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    tsconfig.compilerOptions.paths = {
        "@/*": ["./src/*"],
        "@/components/*": [`./src/themes/${theme}/components/*`],
        "@/lib/*": [`./src/themes/${theme}/lib/*`],
        "@/hooks/*": [`./src/themes/${theme}/hooks/*`],
        "@/i18n/*": [`./src/themes/${theme}/i18n/*`],
        "@/theme/*": [`./src/themes/${theme}/*`]
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('tsconfig.json updated successfully.');
} catch (error) {
    console.error('Error updating tsconfig.json:', error);
    process.exit(1);
}
