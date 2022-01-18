const marked = require('marked');
const markdownRenderer = new marked.Renderer();

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [      
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                renderer: markdownRenderer
              },
            },
          ],
        },
      ],
    },
  }
}

// module.exports = {
  // chainWebpack: config => {
    // config.module.rule('md')
      // .test(/\.md/)
      // .use('html-loader')
      // .loader('html-loader')
      // .end()
      // .use('markdown-loader')
      // .loader('markdown-loader')
      // .end()
  // }
// }

