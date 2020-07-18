var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

  window.onload = function() {
    window.currentClass = "";
    var links = document.getElementsByClassName("js-reveal");
    for(const link of links){
      link.onclick = function() {
        items = document.getElementsByClassName("grid-item");

        for(const activeLinks of document.getElementsByClassName("active")) {
          activeLinks.classList.remove("active");
        }

        const klass = link.dataset.class;
        link.classList.add("active");
        window.currentClass = klass;
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

          lazyLoadInstance.update();
        }
    });

    filter.addEventListener('focusin', (event) => {
        event.target.value = "";
    })
  }