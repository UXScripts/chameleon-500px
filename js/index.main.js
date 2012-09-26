$(document).ready(function() {

  _500px.init({
    sdk_key: '6a534bad4652ce1ee60566b5de899aaab90c05d7'
  });

  var WIDGET = $('#chameleon-widget');
  var photos = [];
  
    chameleon.widget({  
    
    onLoad: function() {
      loadPhotoFeed();
    },
    
    onResume: function() {
      updateSizes();
    },

    onLayout: function() {
      updateSizes();
    },

    onConfigure: function() {
      chameleon.promptHTML({ 
        url:"settings.html", 
        result: postConfigure 
      });
    },

    onRefresh: function() {
      if (chameleon.devMode()) {
        gecko.reloadWidget();
      }
    },    
  });

  WIDGET.on('click', '.photo-div', function(e) {
    var div = $(e.currentTarget);
    gecko.openUrl('http://500px.com/photo/' + div.attr('data-id'));
  });

  function loadPhotos(type, callback) {
    photos = [];
    var options = {
      feature: type, 
      page: 1
    };
    if (gecko.getInstanceData('nudity')) {
      options.exclude = 'Nude';
    }
    _500px.api('/photos', options, function (response) {
      _.each(response.data.photos, function(photo) {
        photos.push(photo);
      });
      callback();
    });
  }

  function renderPhotos() {
    _.each(photos, function(photo) {
      photo.image_url = photo.image_url.replace('2.jpg', '3.jpg');
      WIDGET.append(ich.photo(photo));
    });
    updateSizes();
  }

  function loadPhotoFeed() {
    WIDGET.html('');
    var type = gecko.getInstanceData('feed-type', defaultFeed);
    gecko.setTitle(['500px', publicFeeds[type]].join(': '));
    loadPhotos(type, renderPhotos);
  }

  function postConfigure(success) {
    if (success) {
      loadPhotoFeed();
    }
  }

  function updateSizes() {

    var cols = Math.ceil(WIDGET.width() / 280);
    var image_width = Math.floor((WIDGET.width() - ((cols - 1) * 20)) / cols);

    $('.photo-div').hide();
    
    $('.photo-div img').css('width', image_width + 'px');
    $('.photo-div img').css('height', image_width + 'px');
    $('.photo-div p').css('width', (image_width - 8) + 'px');

    $('.photo-div.endofrow').removeClass('endofrow');
    $('.photo-div:nth-child(' + cols + 'n)').addClass('endofrow');

    $('.photo-div').show();
  }


});
