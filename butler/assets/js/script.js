(function(){
  //each droppable element needs this for its dragover event
  var allowDragover = function (event) {
      //prevent the browser from any default behavior
      event.preventDefault();
    },
  //each dragable element needs this for its dragstart event
    dragStartHandler = function (event) {

      // Set a reference to the element that is currently being dragged.
      event.originalEvent.dataTransfer.setData("id",event.target.id);

      //var dragIcon = null;
      //create a custom drag image
      //dragIcon = document.createElement('img');
      //dragIcon.src = 'http://bit.ly/bartSimpsonSkateboard200X200';
      //set the custom drag image
      //event.originalEvent.dataTransfer.setDragImage(dragIcon, 100, 100);

    },
  // For droppables that only allow one item to be dropped.
    dropHandlerSingle = function (event) {

      //prevent the browser from any default behavior
      event.preventDefault();

      //only allow one child element at a time
      if($(this).children().length){return;}

      // Get a reference and object of the element that is being dropped.
      var id = event.originalEvent.dataTransfer.getData("id");
      var dropped = document.getElementById(id);

      // If the item is a stacking item, initialize the slider.
      if (dropped.dataset.stacking === "1") {
        equipmentSlider(dropped, event.target);
      }

      // Add the hasChild class so that the UI can update.
      $(event.target).addClass('hasChild');

      // Trigger the custom event so that we can update the UI.
      $(document).trigger('custom:dropEvent');

      // Move the dragged element into the drop target.
      event.target.appendChild(document.getElementById(id));
    },

    // For items that allow multiple items to be dropped in them.
    dropHandlerMultiple = function (event) {
      event.preventDefault();

      // Get the string id of the item that the element was dropped on.
      var droppableID = event.originalEvent.dataTransfer.getData("id");

      // Since the dropped on element might not actually be the container,
      // we need to find the first parent with the droppable class.
      var dropZone = $(event.target).closest('.droppable');

      // Check to see whether or not the container already has the dropped
      // item in it.
      var duplicate = $(dropZone).find('#' + droppableID);

      // If the current item is not in the drop area, do things.
      if (duplicate.length == 0) {
        $(event.target).addClass('hasChild');

        // Add the element back to the start of the list to aid in finding it again.
        event.target.insertBefore(document.getElementById(droppableID), event.target.firstChild);

        // Trigger the custom drop event to update droppables.
        $(document).trigger('custom:dropEvent');
      }
    },

    equipmentSlider = function(dropped, target) {
      var sliderID = $(target).attr('id') + '_slider';
      var sliderElement = document.getElementById(sliderID);

      $(sliderElement).slider();
    };



  $(document).ready(function(){


    //cache a reference to all four blue draggable boxes
    var $dragElements = $('.dragElement');

    //make each dragElement draggable
    $dragElements.attr('draggable','true');

    //bind the dragStartHandler function to all dragElements
    $dragElements.bind('dragstart',dragStartHandler);

    //bind the dropHandlerSingle function to all of the droppable elements (omit the original container)
    var $droppable = $('.droppable');
    $droppable.not('.multipleChildren').bind('drop',dropHandlerSingle);

    //bind the dropHandlerMultiple function to the .droppable.multipleChildren element
    $('.droppable.multipleChildren').bind('drop',dropHandlerMultiple);

    //after something is dropped
    $(document).on('custom:dropEvent',function(){
      //make sure the DOM has been updated
      setTimeout(function(){
        //check each droppable element to see if it has a child
        $('.droppable').each(function(){
          //if this element has no children
          if (!$(this).children().length){
            //remove the hasChild class
            $(this).removeClass('hasChild');
            var slider = document.getElementById($(this).attr('id') + '_slider');
            if ($(slider).hasClass('ui-slider')) {
              $(slider).slider('destroy');
            }
          }
        });
      },50);

    });

    //bind the appropriate handlers for the dragover, dragenter and dragleave events
    $droppable.bind({
      dragover: allowDragover,
      dragenter: function() {
        //ignore this event for the original container of the drag elements
        if ( $(this).hasClass('multipleChildren') ){return;}

        $(this).addClass('dragEnter');
      },
      dragleave: function() {
        $(this).removeClass('dragEnter');
      }
    });
  })
})();
