---
title: Calculator App
subtitle: A multi-theme calculator, inspired by the classic iPhone mobile app
slug: calculator
main-image: /images/portfolio/calculator/theme-1.png
source: https://github.com/ChromeUniverse/calculator-app
demo: https://calculator-app-weld-xi.vercel.app/
article: react-calculator-fem-challenge
tech: [react, vite, css, js]
images: [/images/portfolio/calculator/theme-1.png, /images/portfolio/calculator/theme-2.png, /images/portfolio/calculator/theme-3.png]
---

This project is my solution to a free coding challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). The main goal was to build a four-function calculator app and get it looking as close as possible to the provided design previews. 

I chose to use [React](https://reactjs.org/), JavaScript and vanilla CSS for this project, and also made the UI fully responsive, making it very enjoyable (and quite familiar as well!) to use on mobile. This calculator can perform the four basic arithmetic operations and also allows the user to switch between 3 different themes: dark mode, light mode, and high contrast.

Some of the app's features were copied from the classic iPhone calculator app in order to make the UX as intuitive and feature-rich as possible. For instance, this includes concatenating consecutive operations by pressing only the operation keys, repeatedly performing the last operation by pressing `=`, and more. To accomplish this, [I developed a custom computation algorithm from scratch](http://localhost:3000/blog/react-calculator-fem-challenge#implementing-the-calculator-algorithm), which covers several edge cases and also manages to closely mimic the behavior of the iPhone's calculator.  

The ability to toggle between multiple themes was implemented by taking advantage of React's [Context API](https://beta.reactjs.org/learn/passing-data-deeply-with-context), in order to avoid having to drill the theme state into deeply nested components. I go into [more detail on the theme context implementation](blog/react-calculator-fem-challenge#adding-multiple-themes-the-easy-ish-way) in the article linked above.

This was a great challenge which really put my React and CSS skills to the test, but by far the most challenging and fascinating part of this project was developing my own algorithm to ensure the calculator UX's felt familiar and intuitive to use. And on that note, mission accomplished! 