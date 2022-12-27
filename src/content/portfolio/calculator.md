---
title: Calculator App
subtitle: A multi-theme calculator, inspired by the classic iPhone mobile app
slug: calculator
index: 6
main-image: /images/portfolio/calculator/theme-1.png
source: https://github.com/ChromeUniverse/calculator-app
demo: https://calculator-app-weld-xi.vercel.app/
article: react-calculator-fem-challenge
tech: [react, vite, css, js]
images: [/images/portfolio/calculator/theme-1.png, /images/portfolio/calculator/theme-2.png, /images/portfolio/calculator/theme-3.png]
---

This project is my solution to a free coding challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). The main goal was to build a four-function calculator app and get it looking as close as possible to the design previews that were provided. 

I chose to use [React](https://reactjs.org/), JavaScript and vanilla CSS for this project, and also made the UI fully responsive, making it a joy to use on mobile devices.

This calculator can perform the four basic arithmetic operations and also allows the user to switch between 3 different themes: dark mode, light mode, and high contrast.

Some of the app's features were copied from the classic iPhone calculator app in order to make the UX as intuitive and feature-rich as possible. For instance, this includes concatenating consecutive operations by pressing only the operation keys, repeatedly performing the last operation by pressing `=`, and more. 

To accomplish this, [I developed a custom computation algorithm from scratch](http://localhost:3000/blog/react-calculator-fem-challenge#implementing-the-calculator-algorithm), which covers several edge cases and also manages to closely mimic the behavior of the iPhone's calculator. More details in the article linked above.