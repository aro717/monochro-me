import hljs from 'highlight.js/lib/core'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import latex from 'highlight.js/lib/languages/latex'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('latex', latex)
hljs.registerLanguage('html', xml)

function renderMathJax () {
  if (window.MathJax) {
    window.MathJax.Hub.Config({
      TeX: { equationNumbers: { autoNumber: 'AMS' } },
      tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
      },
      'HTML-CSS': { matchFontHeight: false },
      displayAlign: 'center',
      displayIndent: '2em'
    })
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
  }
}

export default {
  renderMathJax,
  hljs
}
