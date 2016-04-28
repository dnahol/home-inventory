'use strict';

$(() => {
  $('form.newItemForm').submit(createNewItem);
  $('#itemTable').on('click', 'button.delete', delItem);
  $('form.editItemForm').submit(saveEdit);

  renderItems();
  renderRooms();
});



// function editItem(event) {
//   event.preventDefault();
//   var id = $row.data('id');
//   console.log("id: ", id);
//
//   $.get(`/api/items/${id}`)
//   .done(item => {
//
//     $('#editId').val(`${item.id}`);
//     $('#editDesc').val(`${item.description}`);
//     $('#editCat').val(`${item.category}`);
//     $('#editPrice').val(`${item.price}`);
//     $('#editRoom').val(`${item.room}`)
//
//   })
//   .fail(err => {
//     console.error(err);
//   });
// }



function saveEdit(event) {
  event.preventDefault();
  var id = $('#editId').val();
  var newItem = {
    id: id,
    description: $('#editDesc').val(),
    category: $('#editCat').val(),
    price: $('#editPrice').val(),
    room: $('#editRoom').val()
  };

  $('#editId').val('');
  $('#editDesc').val('');
  $('#editCat').val('');
  $('#editPrice').val('');
  $('#editRoom').val('');

  console.log( 'newItem: ', newItem );
//  var $newRow = makeItemRow(newItem);

  $.ajax({
    url: `/api/items/${id}`,
    method: 'PUT',
    data: newItem
  })
  .done((newItem) => {
    renderItems();

  })
  .fail(err => {
    console.error(err);
  });

}


function delItem(e) {
  var $row = $(e.target).closest('tr');
  var id = $row.data('id');
  $.ajax({
    url: `/api/items/${id}`,
    method: 'DELETE',
  })
  .done(() => {
    $row.remove();
  })
  .fail(err => {
    console.error(err);
  });
}


function renderItems() {
  $.get('/api/items')
  .done(items => {
    var $trs = items.map(makeItemRow);
    $('#itemTable').empty().append($trs);
    console.log('items: ', items);
  })
  .fail(err => {
    console.error(err);
  });
}

function makeItemRow(item) {
  var $tr = $('<tr>').data('id', item.id);
  var $id = $('<th>').attr('scope', 'row').text(item.id);
  var $desc = $('<td>').text(item.description);
  var $cat = $('<td>').text(item.category);
  var $price = $('<td>').text(item.price);
  var $room = $('<td>').text(item.room);

  // var $editBut= $('<button>').addClass('edit').addClass('btn').addClass('btn-primary').text('Edit');
  var $delBut= $('<button>').addClass('delete').addClass('btn').addClass('btn-primary').text('X');

  var $del = $('<td>').append($delBut);
  // var $edit = $('<td>').append($editBut);

  $tr.append($id, $desc, $cat, $price, $room, $del);
  return $tr;
}

function renderRooms() {
  $.get('/api/rooms')
  .done(rooms => {
    var $trs = rooms.map(makeRoomRow);
    $('#roomTable').empty().append($trs);
    console.log('rooms: ', rooms);
  })
  .fail(err => {
    console.error(err);
  });
}

function makeRoomRow(room) {
  var $tr = $('<tr>').data('id', room.id);
  var $id = $('<th>').attr('scope', 'row').text(room.id);
  var $desc = $('<td>').text(room.description);


  $tr.append($id, $desc);
  return $tr;
}


function createNewItem(event) {
  event.preventDefault();

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

  $.post('/api/items', newItem)
    .done(item => {
      renderItems();
    })
    .fail(err => {
      console.log('error: ', err);
    });
}
