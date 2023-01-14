---
title: Where in the World?
subtitle: A React-based web client for the REST Countries API
slug: rest-countries-api
main-image: /images/portfolio/rest-countries-api/home.png
source: https://github.com/ChromeUniverse/REST-Countries-API
demo: https://rest-countries-api-six-green.vercel.app/
tech: [react, vite, tailwind, js]
images: [/images/portfolio/rest-countries-api/home.png, /images/portfolio/rest-countries-api/brazil.png, /images/portfolio/rest-countries-api/norway.png, /images/portfolio/rest-countries-api/usa.png]
---

This project is my solution to a free coding challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). The main goal was to build a website and integrate with the [REST Countries API](https://restcountries.com/) to pull data from various countries around the world and display it like in the design preview files.

I chose to use [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/) and JavaScript for this project. The UI is fully responsive and looks quite nice on mobile devices as well. I also added some nice skeleton animations for when the API data is still being loaded, as well as a light/dark mode toggle too! 😉

The combination of React and Tailwind proved to be an excellent choice for building this site. Breaking down the site's UI into discrete components made it much more manageable to work with, and using Tailwind's utility classes to style the UI components greatly improved my development pace. 

This was also my first project where I used [React Router](https://reactrouter.com/en/main) for displaying views based on different URL routes. The site's home page has some interesting features, such as the search bar and dropdown menu for filtering countries by region. This was implemented by using React's `useMemo()` [hook](https://beta.reactjs.org/reference/react/useMemo), which caches the filtered and alphabetically sorted list of countries between page re-renders. 

Overall, this was a great project which helped me practice my React and Tailwind skills. The end result looks very nice and works perfectly as well.