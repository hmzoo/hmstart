
{ div, h1, p, a } = React.DOM

Jumbotron = React.createClass
  render: ->
    div { className: "jumbotron" },
      div { className: "container" },
        h1 {}, "Hello World"
          p {},
            a {
              className: "btn btn-primary btn-lg"
              href: "#"
              role: "button"
              "Learn more »" }

React.render(Jumbotron, document.getElementById("reacttest"))
