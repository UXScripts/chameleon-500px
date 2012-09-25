$(document).ready(function() {

  _500px.init({
    sdk_key: '6a534bad4652ce1ee60566b5de899aaab90c05d7'
  });

  var WIDGET = $('#chameleon-widget');
  var photos = [];

  function loadPhotos(type, callback) {
    photos = [];
    _500px.api('/photos', { feature: type, page: 1 }, function (response) {
      _.each(response.data.photos, function(photo) {
        photos.push(photo);
      });
      callback();
    });
  }

  function renderPhotos() {
    _.each(photos, function(photo) {
      WIDGET.append(renderPhoto(photo));
    });
    updateMargins();
  }

  function renderPhoto(photo) {
    var div = $('<div/>').addClass('photo-div');
    div.attr('data-id', photo.id);
    var img = $('<img/>').attr('src', photo.image_url.replace('2.jpg', '3.jpg'));
    div.append(img);  
    var title = $('<p/>').addClass('details').html(['<span class="title">' + photo.name + '</span>', '-', photo.user.fullname].join(' '));
    div.append(title);
    return div;
  }

  WIDGET.on('click', '.photo-div', function(event) {
    var div = $(event.currentTarget);
    gecko.openUrl('http://500px.com/photo/' + div.attr('data-id'));
  });

  function loadPhotoFeed() {
    WIDGET.html('');
    var type = gecko.getInstanceData('feed-type', defaultFeed);
    gecko.setTitle(['500px', publicFeeds[type]].join(': '));
    loadPhotos(type, renderPhotos);
  }

  function postConfigure() {
    loadPhotoFeed();
  }

  var umLockout = false;

  function updateMargins() {
    while (umLockout) { }
    umLockout = true;
    var nValue = Math.floor(WIDGET.width() / 280);
    $('.photo-div.endofrow').removeClass('endofrow');
    $('.photo-div:nth-child(' + nValue + 'n)').addClass('endofrow');
    umLockout = false;
  }

  chameleon.widget({  
    
    //Triggered every time the widget loads.
    onLoad: function() {
      loadPhotoFeed();
    },
    
    //Triggered the first time the widget is created.
    onCreate: function() {
    
    },
    
    //Triggered everytime Chameleon resumes  (comes back into focus).        
    onResume: function() {
      updateMargins();
    },
    
    //Triggered every time Chameleon pauses (goes out of focus).
    onPause: function() {

    },
    
    //Triggered every time the size of the widget changes.
    onLayout: function() {
      updateMargins();
    },
    
    //Triggered when the user scrolls the widget to it's top.
    onScrollTop: function() {

    },
    
    //Triggered when the user scrolls the widget away from it's top.
    onScrollElsewhere: function() {

    },
    
    //Triggered when the user enters dashboard edit mode.
    onLayoutModeStart: function() {
          
      
    },
    
    //Triggered when the user exits dashboard edit mode.
    onLayoutModeComplete: function() {
      updateMargins();
    },
    
    //Triggered when the status of network availability changes.
    onConnectionAvailableChanged: function(available) {

    },
    
    //Triggered when the user taps the configure button in the widget title bar.
    onConfigure: function() {
      chameleon.promptHTML({url:"settings.html", result: postConfigure });
    },
    
    
    //Triggered when the user taps the widget titlebar.
    onTitleBar: function() {

    },
    
    //Triggered when the user taps the refresh button on the widget title bar.
    onRefresh: function() {
      if (chameleon.devMode()) {
        gecko.reloadWidget();
      }
    },
    
    //Triggered every time the widget loads, but not in Chameleon.        
    notChameleon: function() {
    },
    
  });

});
