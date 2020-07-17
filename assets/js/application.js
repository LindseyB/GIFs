
  // Set the options globally
  // to make LazyLoad self-initialize
  window.lazyLoadOptions = {
    elements_selector: ".lazy"
  };

  // Listen to the initialization event
  // and get the instance of LazyLoad
  window.addEventListener(
    "LazyLoad::Initialized",
    function (event) {
      window.lazyLoadInstance = event.detail.instance;
    },
    false
  );

  window.onload = function() {
    var links = document.getElementsByClassName("js-reveal");
    for(const link of links){
      link.onclick = function() {
        items = document.getElementsByClassName("grid-item");
        const klass = link.dataset.class;
        for(const item of items) {
          if (item.classList.contains(klass)) {
            item.style.display = "inline";
          } else {
            item.style.display = "none";
          }
        }
        lazyLoadInstance.update();
      }
    }
  }