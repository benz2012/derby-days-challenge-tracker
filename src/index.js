import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

// POLYFILLS
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

render(<App />, document.getElementById('app'))
