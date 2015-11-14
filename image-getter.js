var ImageGetter = function(url) {

  var events = {
    loadstart: function() {},
    progress: function() {},
    load: function() {}    
  };

  var on = function (eventName, fn) {
    if (!events[eventName]) {
      throw "Wrong event name " + eventName;
    }
    events[eventName] = fn;
    return this;
  };

  var get = function() {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = 'blob';  
    
    request.onloadstart = events.loadstart;
    request.onprogress = events.progress;
    request.onload = function(){
      events.load(window.URL.createObjectURL(this.response), this.response);
    };

    request.send(null);

    return this;
  }
  
  return {
    on: on,
    get: get
  };
}