# *The Lucca Logs* - Vue.js Redesign

## Known issues that need some debugging done

- [ ] Change `href`s that point to the website itself to Vue `<router-link>`s ([this](https://levelup.gitconnected.com/vue-js-replace-a-with-router-link-in-dynamic-html-c423beea0d17) might be useful)
- [X] ~~Fix weird error when parsing dates from YAML frontmatter~~
- [X] ~~Sort post previews by descending date~~
- [X] ~~Close nav menu on click~~
- [X] ~~Fetch new posts or previews on every new route change~~
- [X] ~~Switching between group pages just adds extra post previews to webpage instead of clearing old ones~~
- [X] ~~Prism code snippets are broken~~

## Editing posts

- [ ] Add live reload with post compiler

## SEO

- [ ] Add dynamic `<meta>` tags with Open Graph support
- [ ] Add dynamic `<title>` based on current page

## Design

- [ ] Improve styles (yeah it's vague I know)

## Deployment

- [ ] Set up new deployment workflow for GH Actions

## Views

- [X] ~~Post~~
- [X] ~~Group + Post Previews~~

## Components

- [X] ~~Main App component~~
- [X] ~~Nav~~
- [X] ~~Footer~~

## Router

- [X] ~~Implement new paths in Vue Router:~~
- [X] ~~Add `404` catch all logic~~

## Compiler

- [X] ~~Create new website compiler~~