React=require('react')
{ div, h1, p, a } = React.DOM

module.exports = React.createClass
  render: ->
    div {}, "hello",
      p {}, "cool"
