$(document).ready(function() {

  var options = [];
  _.each(publicFeeds, function(feed, name) {
    options.push({ value: name, name: feed });
  });

  $("#feed_select").chameleonSelectList({
    title:"Select An Account:",
    list: options,
  });

  if (gecko.getInstanceData('feed-type') !== null) {
    $("#feed_select").chameleonSelectList({ 
      selectedValue: gecko.getInstanceData('feed-type') 
    });
  }

  if (gecko.getInstanceData('nudity') == true) {
    $("#nude_toggle").attr('checked', 'checked');
  }
  
  $("#save-button").click(function(e) {
    var feed_type = $("#feed_select").chameleonSelectList({getSelectedItem:true}).value;
    var nudity = ($("#nude_toggle").attr('checked') == 'checked');
    var changes = false;

    if (feed_type !== gecko.getInstanceData('feed-type')) {
      gecko.setInstanceData('feed-type', feed_type);
      changes = true;
    }

    if (nudity !== gecko.getInstanceData('nudity')) {
      gecko.setInstanceData('nudity', nudity);
      changes = true;
    }

    chameleon.close(changes);
    return false;
  });

  $("#cancel-button").click(function(e) {
    chameleon.close(false);
    return false;
  });

});
