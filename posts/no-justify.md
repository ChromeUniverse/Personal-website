---
title: Begone, justified text!
templates: []
description: |
  A short essay on why using justified text on your website is a bad idea, why I chose to remove it from my own website, and why you should too. 
groups: [all, web design, typography, meta]
date: 2021-06-06 15:57:00
--- 

_Disclaimer: I don't know anything about typography. This is just a quick post about why I'm removing all text justification from my website. I've included links to additional resources and reading materials from folks that are much more qualified to write about this sort of stuff than I am._

Over the last couple of days, I noticed that the justified text on some of my posts can sometimes look quite jarring.
As an example, take a look at the following section from my [review on _Sinnohvation_](http://34.200.98.64:3000/sinnohvation).

![image1](https://media.discordapp.net/attachments/693296031982682184/851171575847321700/unknown.png?width=830&height=632)

Notice the (oftentimes huge) gaping holes between words. In particular, check out the 3rd line of the 3rd paragraph and the 2nd and 4th lines of the 4th paragraph. 

It looks horrible. Atrocious. Awful. Disturbing. Ridiculous, even. Besides being unberably ugly, it makes text somewhat harder to read, and since I often invest a lot of time writing and proofreading these posts, I feel betrayed by ugly justification.

In web development/design, text justification is taken care of by  CSS (short for _Cascading Style Sheets_), a special language that goes hand in hand with HTML and whose sole purpose is to style webpages and make them prettier to the human eye. In CSS, we can specify _properties_ which essentially tell the browser how it should render/display a certain part of your webpage. 

Take a look at the following example CSS code snippet. Here, I'm using a set of properties (`width`, `text-align`, `overflow-x`, etc.) to style a `div` with a class of `main`.

```css
.main {
  width: 800px;	
  overflow-wrap: break-word;
  text-align: justify;
  overflow-y: auto;
  overflow-x: auto;
}
```

Notice the `text-align: justify;` property - basically, it's telling the broswer to take the text inside that `div` and _justify_ it, which means stretching out the words so that they touch both the left and right-most edges of the `div`, in the same way that justified text on a book is stretched to align with the left and right margins of the page.

Earlier today I read [this post](https://designforhackers.com/blog/justify-text-html-css/) on _Design For Hackers_ showing why `text-align: justify;` is so bad, and honestly, I agree with Mr. David Kadavy. In fact, after digging a little bit deeper, it appears that justified text on the web [has had a bad reputation for quite some time](https://www.futurehosting.com/blog/why-does-justified-text-have-such-a-bad-reputation-on-the-web/). Even worse, it often looks like a [rookie typography mistake](https://meetchopz.medium.com/10-bad-typography-habits-that-scream-amateur-8bac07f9c041).

Apparently, this is becuase of the incredibly poor text justification algorithm used by CSS/HTML, since all it does is add gaps between words to stretch a line of text to touch the edges of a `div` container, without adding hyphenation, word-splitting or any other sort of modifications to the block of text. This seems to constrat starkly with the justification process in regular print media, notably, books and newspapers. [This post](http://theworldsgreatestbook.com/book-design-basics-hyphens-justification/) by David Bricker in his _Book Design Basics_ series does a good job of explaining how to use hyphenation to justify text for books.

So, for web developers/designers such as myself, it looks like the best option as of right now is to just ditch justification all together in favor of left-aligned text. Thankfully, all I need to do is to change a single line of CSS:

```css
.main {
  width: 800px;	
  overflow-wrap: break-word;
  /* Begone, justified text! */
  text-align: left;
  overflow-y: auto;
  overflow-x: auto;
}
```

And here's how that same section from my _Sinnohvation_ review looks like now:

![image](https://media.discordapp.net/attachments/693296031982682184/851171420952199198/unknown.png?width=858&height=631)

While symmetrical, perfectly aligned blocks of text can look quite aesthetically pleasing in some books, they can really be an eyesore when it comes to webpages. For the time being, removing text justification seems to be a decent compromise.

Expect more typography and web design posts in the next couple of weeks as I spend a little more time working on my website, including improving my webpage generator/templating system, learning responsive design, and improving readability, and adding even more ✨fancy CSS✨.