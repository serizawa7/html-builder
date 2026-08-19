/* ==================================================
   CodeMirror 初期化
================================================== */

let editor = CodeMirror.fromTextArea(
  document.getElementById("editorText"),
  {
    mode: "xml",
    lineNumbers: true,
    lineWrapping: true,
    theme: "default",
    indentUnit: 2,
    tabSize: 2,
    autoCloseTags: true
  }
);


/* ==================================================
   要素取得
================================================== */

const pcPreview =
  document.getElementById("pcPreview");

const mobilePreview =
  document.getElementById("mobilePreview");

const previewContent =
  document.querySelector(".preview-content");

const pcStage =
  document.querySelector(".pc-stage");

const mobileStage =
  document.querySelector(".mobile-stage");

const pcPreviewElement =
  document.querySelector(".pc-preview");

const mobilePreviewElement =
  document.querySelector(".mobile-preview");

const pcDevice =
  document.querySelector(".pc-device");

const mobileDevice =
  document.querySelector(".mobile-device");

const editorPage =
  document.getElementById("editorPage");

const mainArea =
  document.querySelector(".main-area");

const previewPcBtn =
  document.getElementById("previewPcBtn");

const previewMobileBtn =
  document.getElementById("previewMobileBtn");

const sideMenus =
  document.querySelectorAll(".side-menu");

const panelTitle =
  document.getElementById("panelTitle");

const panelContent =
  document.getElementById("panelContent");


/* ==================================================
   プレビュー更新
================================================== */

function updatePreview() {

  const html =
    editor.getValue();

  pcPreview.innerHTML =
    html;

  mobilePreview.innerHTML =
    html;

  updatePreviewScale();
}


editor.on(
  "change",
  function () {

    updatePreview();

  }
);


/* ==================================================
   プレビュー縮尺
================================================== */

function updatePreviewScale() {

  if (!previewContent) return;

  const availableWidth =
    Math.max(
      previewContent.clientWidth - 40,
      100
    );

  const pcScale =
    Math.min(
      availableWidth / 1280,
      1
    );

  const mobileScale =
    Math.min(
      availableWidth / 375,
      1
    );


  if (pcPreviewElement) {

    pcPreviewElement.style.transform =
      `scale(${pcScale})`;

  }


  if (pcDevice) {

    pcDevice.style.width =
      `${1280 * pcScale}px`;

  }


  if (pcStage) {

    pcStage.style.minHeight =
      `${748 * pcScale + 20}px`;

  }


  if (mobilePreviewElement) {

    mobilePreviewElement.style.transform =
      `scale(${mobileScale})`;

  }


  if (mobileDevice) {

    mobileDevice.style.width =
      `${375 * mobileScale}px`;

    mobileDevice.style.height =
      `${812 * mobileScale + 10}px`;

  }


  if (mobileStage) {

    mobileStage.style.minHeight =
      `${832 * mobileScale}px`;

  }

}


/* ==================================================
   PC / スマホ切り替え
================================================== */

function switchMode(mode) {

  if (mode === "pc") {

    editorPage.classList.remove(
      "mobile-mode"
    );

    pcStage.style.display =
      "flex";

    mobileStage.style.display =
      "none";

    previewPcBtn.classList.add(
      "active"
    );

    previewMobileBtn.classList.remove(
      "active"
    );

  } else {

    editorPage.classList.add(
      "mobile-mode"
    );

    pcStage.style.display =
      "none";

    mobileStage.style.display =
      "flex";

    previewPcBtn.classList.remove(
      "active"
    );

    previewMobileBtn.classList.add(
      "active"
    );

  }

  updatePreviewScale();

}


previewPcBtn.addEventListener(
  "click",
  function () {

    switchMode("pc");

  }
);


previewMobileBtn.addEventListener(
  "click",
  function () {

    switchMode("mobile");

  }
);


/* ==================================================
   HTMLコピー
================================================== */

document
  .querySelector(".copy")
  .addEventListener(
    "click",
    async function () {

      try {

        await navigator.clipboard.writeText(
          editor.getValue()
        );

        alert(
          "HTMLをコピーしました！"
        );

      } catch (error) {

        alert(
          "HTMLのコピーに失敗しました。"
        );

      }

    }
  );


/* ==================================================
   サイドバー
================================================== */

sideMenus.forEach(
  function (menu) {

    menu.addEventListener(
      "click",
      function () {

        sideMenus.forEach(
          function (item) {

            item.classList.remove(
              "active"
            );

          }
        );

        menu.classList.add(
          "active"
        );

        const tab =
          menu
            .querySelector("span:last-child")
            .innerText
            .trim();

        loadPanel(tab);

      }
    );

  }
);


/* ==================================================
   デザインテンプレート
================================================== */

const templates = {

  vertical3: `
<section class="template three-split">

  <h2>デザインが重要な3つの理由</h2>

  <div class="split-item">

    <div class="split-image"></div>

    <h3>01｜わかりやすさ</h3>

    <p>説明文が入ります。</p>

  </div>

  <div class="split-item">

    <div class="split-image"></div>

    <h3>02｜見やすさ</h3>

    <p>説明文が入ります。</p>

  </div>

  <div class="split-item">

    <div class="split-image"></div>

    <h3>03｜ブランディング</h3>

    <p>説明文が入ります。</p>

  </div>

</section>`,

  horizontal3: `
<section class="template horizontal-cards">

  <div class="card">

    <div class="split-image"></div>

    <h3>タイトル</h3>

    <p>説明文が入ります。</p>

  </div>

  <div class="card">

    <div class="split-image"></div>

    <h3>タイトル</h3>

    <p>説明文が入ります。</p>

  </div>

  <div class="card">

    <div class="split-image"></div>

    <h3>タイトル</h3>

    <p>説明文が入ります。</p>

  </div>

</section>`,

  imageText: `
<section class="template image-text">

  <img
    src="https://via.placeholder.com/400x250"
    alt="image"
  >

  <div class="text">

    <h2>セクションタイトル</h2>

    <p>
      説明文が入ります。
      説明文が入ります。
    </p>

  </div>

</section>`,

  cardList: `
<section class="template card-list">

  <div class="card-item">

    <img
      src="https://via.placeholder.com/80"
      alt="image"
    >

    <div>

      <h3>タイトル</h3>

      <p>説明文が入ります。</p>

    </div>

  </div>

  <div class="card-item">

    <img
      src="https://via.placeholder.com/80"
      alt="image"
    >

    <div>

      <h3>タイトル</h3>

      <p>説明文が入ります。</p>

    </div>

  </div>

</section>`

};


/* ==================================================
   色設定
================================================== */

let selectedColor =
  "#e86f9b";

let selectedColorType =
  "text";


/* ==================================================
   選択範囲を保存
================================================== */

let savedSelection = null;


function saveSelection() {

  const doc =
    editor.getDoc();

  const selection =
    doc.listSelections()[0];

  savedSelection = {

    anchor: {
      line: selection.anchor.line,
      ch: selection.anchor.ch
    },

    head: {
      line: selection.head.line,
      ch: selection.head.ch
    }

  };

}


function restoreSelection() {

  if (!savedSelection) return;

  const doc =
    editor.getDoc();

  doc.setSelection(
    savedSelection.anchor,
    savedSelection.head
  );

}


/* ==================================================
   カラー入力
================================================== */

function createColorTool(
  type
) {

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    "color-tool";


  const title =
    document.createElement(
      "div"
    );

  title.className =
    "color-tool-title";

  title.textContent =
    type === "text"
      ? "🔤 文字色"
      : "🖍️ 背景色";


  const description =
    document.createElement(
      "p"
    );

  description.className =
    "color-tool-description";

  description.textContent =
    "文字を選択してから色を選んでください";


  const row =
    document.createElement(
      "div"
    );

  row.className =
    "color-picker-row";


  const picker =
    document.createElement(
      "input"
    );

  picker.type =
    "color";

  picker.className =
    "color-picker";

  picker.value =
    selectedColor;


  const value =
    document.createElement(
      "div"
    );

  value.className =
    "color-value";

  value.textContent =
    picker.value;


  const apply =
    document.createElement(
      "button"
    );

  apply.type =
    "button";

  apply.className =
    "apply-color";

  apply.textContent =
    "この色を適用";


  picker.addEventListener(
    "focus",
    function () {

      saveSelection();

    }
  );


  picker.addEventListener(
    "click",
    function () {

      saveSelection();

    }
  );


  picker.addEventListener(
    "input",
    function () {

      selectedColor =
        picker.value;

      value.textContent =
        picker.value;

    }
  );


  apply.addEventListener(
    "click",
    function () {

      saveSelection();

      selectedColor =
        picker.value;

      selectedColorType =
        type;

      applyColor(
        type,
        selectedColor
      );

    }
  );


  row.appendChild(
    picker
  );

  row.appendChild(
    value
  );


  wrapper.appendChild(
    title
  );

  wrapper.appendChild(
    description
  );

  wrapper.appendChild(
    row
  );

  wrapper.appendChild(
    apply
  );


  return wrapper;

}


/* ==================================================
   色を適用
================================================== */

function applyColor(
  type,
  color
) {

  restoreSelection();


  const doc =
    editor.getDoc();

  const selection =
    doc.getSelection();


  if (!selection) {

    alert(
      "色を付けたい文字を選択してください。"
    );

    editor.focus();

    return;

  }


  let before = "";
  let after = "";


  if (type === "text") {

    before =
      `<span style="color:${color}">`;

    after =
      "</span>";

  } else {

    before =
      `<span style="background-color:${color}">`;

    after =
      "</span>";

  }


  doc.replaceSelection(
    before +
    selection +
    after
  );


  editor.focus();

}


/* ==================================================
   パネル内容
================================================== */

function loadPanel(tab) {

  panelTitle.innerText =
    tab;

  panelContent.innerHTML =
    "";


  const buttons = [];


  /* ==================================================
     テキスト
  ================================================== */

  if (tab === "テキスト") {

    buttons.push({
      label: "見出し",
      html: "<h1>見出し</h1>"
    });

    buttons.push({
      label: "小見出し",
      html: "<h2>小見出し</h2>"
    });

    buttons.push({
      label: "本文",
      html: "<p>本文テキスト</p>"
    });

    buttons.push({
      label: "太字",
      wrap: [
        "<strong>",
        "</strong>"
      ]
    });

    buttons.push({
      label: "下線",
      wrap: [
        "<u>",
        "</u>"
      ]
    });

    buttons.push({
      label: "リンク",
      link: true
    });

    buttons.push({
      label: "引用",
      wrap: [
        "<blockquote>",
        "</blockquote>"
      ]
    });

    buttons.push({
      label: "罫線",
      html: "<hr>"
    });

  }


  /* ==================================================
     レイアウト
  ================================================== */

  if (tab === "レイアウト") {

    buttons.push({
      label: "2カラム",

      html: `
<div class="two-column">

  <div>左</div>

  <div>右</div>

</div>`
    });


    buttons.push({
      label: "3カラム",

      html: `
<div class="three-column">

  <div>1</div>

  <div>2</div>

  <div>3</div>

</div>`
    });

  }


  /* ==================================================
     ボックス
  ================================================== */

  if (tab === "ボックス") {

    buttons.push({
      label: "メモ",

      html:
        `<div class="memo-box">メモ</div>`
    });


    buttons.push({
      label: "注意",

      html:
        `<div class="alert-box">注意</div>`
    });


    buttons.push({
      label: "ポイント",

      html:
        `<div class="point-box">ポイント</div>`
    });

  }


  /* ==================================================
     画像
  ================================================== */

  if (tab === "画像") {

    buttons.push({
      label: "画像挿入",

      html:
        `<img src="https://via.placeholder.com/600" alt="画像">`
    });

  }


  /* ==================================================
     装飾
  ================================================== */

  if (tab === "装飾") {

    /* 文字色 */

    panelContent.appendChild(
      createColorTool("text")
    );


    /* 背景色 */

    panelContent.appendChild(
      createColorTool("background")
    );


    /* 既存の簡単な装飾 */

    buttons.push({
      label: "黄色マーカー",

      wrap: [
        `<span style="background-color:#fff3a3">`,
        `</span>`
      ]
    });

  }


  /* ==================================================
     デザイン
  ================================================== */

  if (tab === "デザイン") {

    const designButtons = [

      {
        label: "縦3分割型",
        html: templates.vertical3
      },

      {
        label: "横3分割型",
        html: templates.horizontal3
      },

      {
        label: "画像＋テキスト",
        html: templates.imageText
      },

      {
        label: "カードリスト",
        html: templates.cardList
      }

    ];


    designButtons.forEach(
      function (btn) {

        const button =
          document.createElement(
            "button"
          );

        button.textContent =
          btn.label;

        button.addEventListener(
          "click",
          function () {

            insertTag(
              btn.html
            );

          }
        );

        panelContent.appendChild(
          button
        );

      }
    );

    return;

  }


  /* ==================================================
     ボタン生成
  ================================================== */

  buttons.forEach(
    function (btn) {

      const button =
        document.createElement(
          "button"
        );

      button.textContent =
        btn.label;


      if (btn.html) {

        button.addEventListener(
          "click",
          function () {

            insertTag(
              btn.html
            );

          }
        );

      }


      if (btn.wrap) {

        button.addEventListener(
          "click",
          function () {

            wrapSelection(
              btn.wrap[0],
              btn.wrap[1]
            );

          }
        );

      }


      if (btn.link) {

        button.addEventListener(
          "click",
          insertLink
        );

      }


      panelContent.appendChild(
        button
      );

    }
  );

}


/* ==================================================
   HTML挿入
================================================== */

function insertTag(html) {

  const doc =
    editor.getDoc();

  const cursor =
    doc.getCursor();

  doc.replaceRange(
    html,
    cursor
  );

  editor.focus();

}


/* ==================================================
   選択範囲を囲む
================================================== */

function wrapSelection(
  before,
  after
) {

  const doc =
    editor.getDoc();

  const selection =
    doc.getSelection();


  if (!selection) {

    alert(
      "文字を選択してから使用してください。"
    );

    return;

  }


  doc.replaceSelection(
    before +
    selection +
    after
  );

  editor.focus();

}


/* ==================================================
   リンク
================================================== */

function insertLink() {

  saveSelection();


  const url =
    prompt(
      "リンク先URLを入力してください"
    );


  if (!url) {

    editor.focus();

    return;

  }


  restoreSelection();


  const doc =
    editor.getDoc();

  const selection =
    doc.getSelection();


  if (!selection) {

    alert(
      "リンクにしたい文字を選択してください。"
    );

    editor.focus();

    return;

  }


  doc.replaceSelection(
    `<a href="${url}" target="_blank">` +
    selection +
    "</a>"
  );


  editor.focus();

}


/* ==================================================
   3画面の幅をドラッグ変更
================================================== */

const resizeDividers =
  document.querySelectorAll(
    ".resize-divider"
  );


resizeDividers.forEach(
  function (divider) {

    divider.addEventListener(
      "pointerdown",
      function (event) {

        startResize(
          event,
          divider
        );

      }
    );

  }
);


/* ==================================================
   リサイズ開始
================================================== */

function startResize(
  event,
  divider
) {

  event.preventDefault();

  const dividerType =
    divider.dataset.divider;

  const startX =
    event.clientX;

  const computed =
    getComputedStyle(
      mainArea
    );

  const columns =
    computed.gridTemplateColumns
      .split(" ")
      .map(
        function (value) {

          return parseFloat(value);

        }
      );


  let startPanelWidth =
    columns[0];

  let startEditorWidth =
    columns[2];


  document.body.classList.add(
    "is-resizing"
  );


  divider.setPointerCapture(
    event.pointerId
  );


  function onMove(moveEvent) {

    const difference =
      moveEvent.clientX -
      startX;

    const mainWidth =
      mainArea.clientWidth;

    const minimumPanel =
      170;

    const minimumEditor =
      260;

    const minimumPreview =
      280;


    if (
      dividerType ===
      "panel-editor"
    ) {

      let newPanelWidth =
        startPanelWidth +
        difference;


      const maxPanel =
        mainWidth -
        minimumEditor -
        minimumPreview -
        16;


      newPanelWidth =
        Math.max(
          minimumPanel,
          Math.min(
            newPanelWidth,
            maxPanel
          )
        );


      mainArea.style.gridTemplateColumns =
        `${newPanelWidth}px 8px minmax(${minimumEditor}px, 1fr) 8px minmax(${minimumPreview}px, 1fr)`;

    }


    if (
      dividerType ===
      "editor-preview"
    ) {

      let newEditorWidth =
        startEditorWidth +
        difference;


      const panelWidth =
        parseFloat(
          getComputedStyle(
            mainArea
          ).gridTemplateColumns
            .split(" ")[0]
        );


      const maxEditor =
        mainWidth -
        panelWidth -
        minimumPreview -
        16;


      newEditorWidth =
        Math.max(
          minimumEditor,
          Math.min(
            newEditorWidth,
            maxEditor
          )
        );


      mainArea.style.gridTemplateColumns =
        `${panelWidth}px 8px ${newEditorWidth}px 8px minmax(${minimumPreview}px, 1fr)`;

    }


    updatePreviewScale();

    setTimeout(
      function () {

        editor.refresh();

      },
      0
    );

  }


  function stopResize() {

    document.body.classList.remove(
      "is-resizing"
    );


    try {

      divider.releasePointerCapture(
        event.pointerId
      );

    } catch (error) {}


    divider.removeEventListener(
      "pointermove",
      onMove
    );

    divider.removeEventListener(
      "pointerup",
      stopResize
    );

    divider.removeEventListener(
      "pointercancel",
      stopResize
    );


    updatePreviewScale();

    editor.refresh();

  }


  divider.addEventListener(
    "pointermove",
    onMove
  );

  divider.addEventListener(
    "pointerup",
    stopResize
  );

  divider.addEventListener(
    "pointercancel",
    stopResize
  );

}


/* ==================================================
   初期表示
================================================== */

switchMode("pc");

loadPanel("テキスト");

updatePreview();


/* ==================================================
   ウィンドウサイズ変更
================================================== */

window.addEventListener(
  "resize",
  function () {

    updatePreviewScale();

    editor.refresh();

  }
);
