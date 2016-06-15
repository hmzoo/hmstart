var React=require('react');
var ReactDom=require('react-dom');
var reactElement=React.createElement('h1',{className:'header'},"OK");
ReactDom.render(reactElement,document.getElementById('reacttest'));




$('#test').click(function() {
  alert( "Handler for .click() called." );
});

$("#sortabletest").on('change.uk.sortable', function() {
  console.log($(this));
  var sortable = $(this).sortable('toArray');
  console.log(sortable);
});
