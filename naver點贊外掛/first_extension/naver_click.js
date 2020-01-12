window.addEventListener("load", () => {
  let input = document.getElementById("keywords");
  input.value = localStorage.naverKeyword || "";
  let start = document.getElementById("startClickAll");
  start.addEventListener("click", clickAll);
  let stop = document.getElementById("stopClickAll");
  stop.addEventListener("click", stopAll);
  if (!localStorage.naverClick) {
    input.disabled = false;
    start.disabled = false;
    stop.disabled = true;
  } else {
    input.disabled = true;
    start.disabled = true;
    stop.disabled = false;
  }
});

function clickAll() {
  let start = document.getElementById("startClickAll");
  let stop = document.getElementById("stopClickAll");
  let input = document.getElementById("keywords");
  input.disabled = true;
  start.disabled = true;
  stop.disabled = false;
  localStorage.naverClick = true;
  if (input.value) localStorage.naverKeyword = input.value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    localStorage.naverTabId = tabs[0].id;
    chrome.tabs.executeScript(parseInt(localStorage.naverTabId), {
      code: `
      click();
      function click(){
        let keywords = ${"'" + input.value + "'"};
        let blocks = document.querySelectorAll(".u_cbox_comment_box");
        if(!blocks.length) {return}
        blocks = Array.from(blocks).filter(block=>{
          let notMain = !block.classList.contains("u_cbox_mine");
          let content = block.querySelector(".u_cbox_contents");
          if(keywords && content) {
            let k = keywords.split(" ");
            return notMain && k.find(kw=>content.textContent.includes(kw));
          }
          return notMain
        });
        let buttons = blocks.map(block=>block.querySelector(".u_cbox_btn_recomm"))
        if(!buttons.length){ 
          nextPage()
          return
        }
        let uncheckeds = buttons.filter(button=>button && !button.classList.contains("u_cbox_btn_recomm_on"));
        if(!uncheckeds.length){
          nextPage()
          return
        }
        
        uncheckeds.forEach((btn,i)=>{
          setTimeout(()=>btn.click(),600*i);
          if(i == uncheckeds.length - 1) setTimeout(()=>nextPage(),600 * uncheckeds.length);
        })
      }

      function nextPage(){
        let next = document.querySelector(".u_cbox_page_wrap strong").nextSibling;
        if(next.offsetHeight){
          next.click();
          setTimeout(()=>click(),500);
        }
      }
      `
    });
  });
}

function stopAll() {
  localStorage.clear("naverClick");
  location.reload();
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `
        (async function stop(){
          let page = document.querySelector(".u_cbox_page_wrap strong").textContent;
          await alert(page);
          location.reload();
        })()
      `
    });
  });
}
