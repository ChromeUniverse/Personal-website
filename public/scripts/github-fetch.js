// This script takes a URL for a GitHub repo and fetches its README in the 'main' branch.

let mini = url.slice(19);
fetch("https://raw.githubusercontent.com/" + mini + "/main/README.md")
  .then(response => {
    response.text().then(text => {
      document.getElementById("readme").innerHTML = marked(text);          
    })        
  }
) 

document.getElementById("repo-link").href = url;