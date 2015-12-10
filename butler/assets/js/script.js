
$(function() {
  $('.item_equipment').draggable({
    revert: 'invalid',
    opacity: .4,
    create: function(){$(this).data('position',$(this).position())},
    cursor:'move',
    start:function(){$(this).stop(true,true)}
  });

  $( ".available_equipment_tray" ).droppable({
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function( event, ui ) {
      $( this ).addClass("ui-state-highlight" );
    },
  });

  $( ".equipment_slot" ).droppable({
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    tolerance: "pointer",
    drop: function( event, ui ) {
      $( this ).addClass("ui-state-highlight" );
    },
    out : function(event, ui) {
    },
    revert: function (event, ui) {
    }
  });
})

function snapToMiddle(dragger, target){
  var topMove = target.position().top - dragger.data('position').top + (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
  var leftMove= target.position().left - dragger.data('position').left + (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
  dragger.animate({top:topMove,left:leftMove},{duration:600,easing:'easeOutBack'});
}
