import fs from 'fs';
import matter from 'gray-matter';

const files = fs.readdirSync("./");

const posts = files.map(filename => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
        filename,
        'utf-8'
    )

    const {data: frontmatter}=matter(markdownWithMeta);
    return {
        slug,
        frontmatter
    }
}) 

console.log(posts)



