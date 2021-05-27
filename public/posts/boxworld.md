<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>      
    fetch("https://raw.githubusercontent.com/ChromeUniverse/The-Box-World/main/README.md")
      .then(response => {
        response.text().then(text => {
          document.getElementById("content").innerHTML = marked(text);          
        })        
      }
    )
</script>

<p id="content"></p>
<hr>
<p>
  The above text was automatically fetched from GitHub using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a> and converted to HTML with <a href="https://marked.js.org/">Marked.js</a>. Pretty cool, right? 😉
</p>


