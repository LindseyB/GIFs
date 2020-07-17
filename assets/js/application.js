
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
    window.currentClass = "";
    var links = document.getElementsByClassName("js-reveal");
    for(const link of links){
      link.onclick = function() {
        items = document.getElementsByClassName("grid-item");
        const klass = link.dataset.class;
        window.currentClass = klass;
        for(const item of items) {
          if (item.classList.contains(klass)) {
            item.style.display = "inline";
          } else {
            item.style.display = "none";
          }
        }

        if(window.lazyLoadInstance) {
            window.lazyLoadInstance.update();
        }
      }
    }

    const filter = document.getElementById("filter");

    filter.addEventListener('change', (event) => {
        if(window.currentClass !== ""){
            const filter = event.target.value;
            const filters = filter.split(" ");
            const regex = new RegExp(filters.join("|"), "i")
            const items = document.getElementsByClassName(window.currentClass);
            for(const item of items){
                if(regex.test(item.src)){
                    item.style.display = "inline";
                } else {
                    item.style.display = "none";
                }
            }
        }
    });

    filter.addEventListener('focusin', (event) => {
        event.target.value = "";
    })
  }