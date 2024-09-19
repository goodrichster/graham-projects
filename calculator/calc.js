
function add() {
  var x = $('#x').val();
  var y = $('#y').val();
  $('#result').text( parseInt(x) + parseInt(y) );
}


function multiply() {
  var x = $('#x').val();
  var y = $('#y').val();
  $('#result').text( parseInt(x) * parseInt(y) );
}


function subtract() {
  var x = $('#x').val();
  var y = $('#y').val();
  $('#result').text( parseInt(x) - parseInt(y) );
}


function divide() {
  var x = $('#x').val();
  var y = $('#y').val();
  $('#result').text( parseInt(x) / parseInt(y) );
}
