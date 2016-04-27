'use strict';

$(() => {
  $('form.newItemForm').submit(createNewItem);

  renderItems();
});

function delItem(id) {
  console.log('id: ', id );

  $.ajax({
    url: `/api/items/${id}/delete`,
    type: 'DELETE',
  });


  renderItems();
}


function getItems(cb) {
  $.get('/api/items')
    .done(data => {
      console.log( 'item data: ', data )
      cb.apply(null, [data]);
    })
    .fail(err => {
      console.log( 'error: ', err );
    });
}

function renderItems() {
  console.log('now create $items');
  $('#itemTable').empty();

  getItems(items => {
    items.map(item => {
      console.log( 'item: ', item );
      var $tr = $('<tr>');
      var $id = $('<th>').attr('scope', 'row').text(item.id);
      var $desc = $('<td>').text(item.description);
      var $cat = $('<td>').text(item.category);
      var $price = $('<td>').text(item.price);
      var $room = $('<td>').text(item.room);

      var $delBut= $('<button>').text('X').click(() => {
        delItem(item.id);
      });

      var $del = $('<td>').append($delBut);

      $tr.append($id, $desc, $cat, $price, $room, $del);

      $('#itemTable').append($tr);
    });
  });
}




function createNewItem(event) {
  event.preventDefault();
  console.log( 'button clicked!');

  var newItem = {
    description: $('#inputDesc').val(),
    category: $('#inputCat').val(),
    price: $('#inputPrice').val(),
    room: $('#roomSelect').val()
  };

  $('#inputDesc').val('')
  $('#inputCat').val('')
  $('#inputPrice').val('')
  $('#roomSelect').val('')

  console.log( 'newItem: ', newItem );

  $.post('/api/items', newItem)
    .done(() => {
      renderItems();
    })
    .fail(err => {
      console.log('error: ', err);
    });


}
