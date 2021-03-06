$ = require('jquery')
logic = require('./logic')

$(document).ready(function(){
  $('#manipResults section').addClass('hidden')

  var baseurl = 'https://www.reddit.com/subreddits/search.json?'
  var searchterm, numresults, exclude = ''

  $('#manipResults .shower').click(function(){
    $('#manipResults section').toggleClass('hidden')
    if ($('#manipResults section').hasClass('hidden'))
      $('#manipResults .shower').html('<p>Click to show options</p>')
    else
      $('#manipResults .shower').html('<p>Click to hide options</p>')
  })

  $('#gobutton').click(function(e){
    e.preventDefault()

    // remove artifacts of previous search
    $('tbody tr').remove()
    $('#manipResults h3').remove()

    searchterm = $('#search').val().toLowerCase()

    if (searchterm.includes('not:')) {
      exclude = logic.getExcludes(searchterm)
      searchterm = logic.getSearchTerm(searchterm)
    }

    searchterm = 'q=' + searchterm
    numresults = '&limit=' + $('input:checked').val()

    var getter = $.ajax({
      url: baseurl + searchterm + numresults,
      method: 'GET',
      dataType: 'json'
    })

    getter.done(function(res){
      console.log('got the cookie');
      var children = res.data.children

      if (exclude.length)
        children = logic.getArrayExcluding(children, exclude)

      $('#manipResults').prepend('<h3>' + children.length + ' hits</h3>')

      for (child in children) {

          var cell9 = '<td>'+child+'</td>'
          var cell0 = '<td><img src="' + validThumb(children[child].data.header_img) + '" width="150px" height="50"></td>'
          var cell1 = '<td>' + children[child].data.title + '</td>'
          var cell2 = '<td><a href="http://www.reddit.com'+children[child].data.url+'">'+ children[child].data.url + '</a></td>'
          var cell3 = '<td>'+children[child].data.public_description+'</td>'

          $('tbody').append('<tr>' + cell9 + cell0 + cell1 + cell2 + cell3 + '</tr>')

      }
    })

    getter.fail(function(){
      console.log('aint find no cookie');
    })
  })

  $('#removebutton').click(function(){
    var removeThis = $('#remover').val()
    $('td:contains('+removeThis+')').parent().remove()
  })

  $('#remover').keyup(function(){
    var search = $('#remover').val()
    if (search.length) {
        $('td:contains(' + search + ')').css("background-color", "yellow")
        $('td:not(:contains(' + search + '))').css("background-color", "")
    } else {
    	$('td').css("background-color","")
    }
  })

  function validThumb (v) {
      return (v === null)
      ? 'http://placebear.com/150/50'
      : v
  }
});
