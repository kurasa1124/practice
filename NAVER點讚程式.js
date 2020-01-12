let clickAll = function() {
  let buttons = document.querySelectorAll(".u_cbox_btn_recomm");
  let title = document.querySelector("._clipTitle");
  if (!title.innerText.includes("김동윤")) {
    alert("Wrong Video!");
    return;
  }
  let all = Array.from(buttons);
  all.forEach((e, i) => {
    let nextButton = document.querySelector("strong.u_cbox_page").nextSibling;
    setTimeout(() => {
      let isSelect = e.classList.contains("u_cbox_btn_recomm_on");
      if (!isSelect) e.click();
      if (nextButton && i == all.length - 1) {
        setTimeout(() => {
          nextButton.click();
          clickAll();
        }, 500);
      }
    }, i * 500);
  });
};
window.addEventListener("touchmove", e => e.preventDefault());
clickAll();
