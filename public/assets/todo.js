$(document).ready(function(){

  $('form').on('submit',function(){
      var item = $('form input');
      var todo = {item : item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){


        },
          error: function(){
            alert('Server Down');
          }
      });

    });

    $('li').on('click',function(){
      var item = $(this).text().replace(/ /g,'-');

      $.ajax({
        type: 'DELETE',
        url : '/todo/' + item,
        success: function(data){
          //reload webpage
          location.reload();
        },
          error: function(){
            alert('Server hhhDown');
          }
      });
    });


});
