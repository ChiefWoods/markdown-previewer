import { writable } from "svelte/store";

export const defaultContent = `# This is a heading
## It can get smaller with more \\#
### And even smaller
#### And much...
##### Much...
###### Smaller

---

This is some normal text
**Here's how to bold it**
_Here's how to make it italic_
***And here's how to do both***
~~Or strikethrough~~

> This is a blockquote
> > And here's how you nest it

1. Create ordered lists with numbers
2. Add more numbers to extend the list
    1. And add spaces to nest it

- Dashes create unordered lists
- Extend the list with more dashes
    - You can nest these too

\`<span>Inline Code is created with backticks</span>\`

\`\`\`
// Triple backticks create code blocks

function makePancakes() {
  alert("Pancakes!");
}
\`\`\`

This is a [link](https://github.com/ChiefWoods/markdown-previewer)
[This is also a link][1]

[1]: https://github.com/ChiefWoods/markdown-previewer

![This is an image](https://avatars.githubusercontent.com/u/73902027?v=4)
`;

export let contents = writable("");
export let editorHeight = writable(0);