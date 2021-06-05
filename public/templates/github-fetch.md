<p id="readme">
  I hope you haven't disabled JavaScript on this page, or else this won't work 😬
</p>
<hr>
<p id="notice">
  The above text was automatically fetched from <a id="repo-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">this GitHub repo</a> using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a> and converted to HTML with <a href="https://marked.js.org/">Marked.js</a>. Pretty cool, right? 😉
</p>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
  mini = 'MINIURL';
  console.log('Trying to fetch from', mini);
  fetch("https://raw.githubusercontent.com/" + mini + "/main/README.md")
    .then(response => {
      response.text().then(text => {
        console.log(text);
        document.getElementById("readme").innerHTML = marked(text);          
      })        
    }
  );
  document.getElementById("repo-link").href = 'FULLURL';
</script>




