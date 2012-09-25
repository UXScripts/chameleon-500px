$(document).ready(function() {

  var options = [];
  _.each(publicFeeds, function(feed, name) {
    options.push({ value: name, name: feed });
  });

  $("#feed_select").chameleonSelectList({
    title:"Select An Account:",
    list: options,
  });
  
  $("#close-button").click(function(e) {
    var feed_type = $("#feed_select").chameleonSelectList({getSelectedItem:true}).value;
    gecko.setInstanceData('feed-type', feed_type);
    chameleon.close(true);
    return false;
  });

});
