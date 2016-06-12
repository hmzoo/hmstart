React = require('react')
ReactDOM = require('react-dom')
test = require('./test.coffee')

ReactDOM.render(React.createElement(test),document.getElementById('reacttest'))
