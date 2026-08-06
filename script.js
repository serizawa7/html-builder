// =========================
// 要素を取得
// =========================

const textarea = document.getElementById("editorText");

const pcPreview = document.getElementById("pcPreview");

const mobilePreview = document.getElementById("mobilePreview");

const boldBtn = document.getElementById("boldBtn");



// =========================
// プレビューを更新する関数
// =========================

function updatePreview() {

  pcPreview.innerHTML = textarea.value;

  mobilePreview.innerHTML = textarea.value;

}



// =========================
// 文章を入力したとき
// =========================

textarea.addEventListener("input", function () {

  updatePreview();

});



// =========================
// 太字ボタン
// =========================

boldBtn.addEventListener("click", function () {


  const start = textarea.selectionStart;

  const end = textarea.selectionEnd;

  const text = textarea.value;

  const selectedText =
    text.substring(start, end);



  // 文字が選択されている場合

  if (selectedText) {


    textarea.value =

      text.substring(0, start)

      +

      "<strong>"

      +

      selectedText

      +

      "</strong>"

      +

      text.substring(end);


    updatePreview();

  }

});



// =========================
// 下線ボタン
// =========================

const underlineBtn =
  document.getElementById("underlineBtn");


underlineBtn.addEventListener("click", function () {


  const start = textarea.selectionStart;

  const end = textarea.selectionEnd;

  const text = textarea.value;

  const selectedText =
    text.substring(start, end);



  if (selectedText) {


    textarea.value =

      text.substring(0, start)

      +

      "<u>"

      +

      selectedText

      +

      "</u>"

      +

      text.substring(end);


    updatePreview();

  }

});



// =========================
// リンクボタン
// =========================

const linkBtn =
  document.getElementById("linkBtn");


linkBtn.addEventListener("click", function () {


  const start = textarea.selectionStart;

  const end = textarea.selectionEnd;

  const text = textarea.value;

  const selectedText =
    text.substring(start, end);



  if (selectedText) {


    const url =
      prompt("リンク先のURLを入力してください");


    if (url) {


      textarea.value =

        text.substring(0, start)

        +

        '<a href="' + url + '" target="_blank">'

        +

        selectedText

        +

        "</a>"

        +

        text.substring(end);


      updatePreview();

    }

  }

});



// =========================
// HTMLコピー
// =========================

const copyButton =
  document.querySelector(".copy");


copyButton.addEventListener("click", function () {


  navigator.clipboard.writeText(
    textarea.value
  );


  alert("HTMLをコピーしました！");

});



// =========================
// サイドメニュー
// =========================

const sideMenus =
  document.querySelectorAll(".side-menu");


sideMenus.forEach(function (menu) {


  menu.addEventListener("click", function () {


    sideMenus.forEach(function (item) {

      item.classList.remove("active");

    });


    menu.classList.add("active");

  });

});



// =========================
// 最初のプレビュー
// =========================

updatePreview();