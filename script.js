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

const pcPreview = document.getElementById("pcPreview");
const mobilePreview = document.getElementById("mobilePreview");
const previewContent = document.querySelector(".preview-content");
const pcStage = document.querySelector(".pc-stage");
const mobileStage = document.querySelector(".mobile-stage");
const pcPreviewElement = document.querySelector(".pc-preview");
const mobilePreviewElement = document.querySelector(".mobile-preview");
const pcDevice = document.querySelector(".pc-device");
const mobileDevice = document.querySelector(".mobile-device");
const editorPage = document.getElementById("editorPage");
const mainArea = document.querySelector(".main-area");
const previewPcBtn = document.getElementById("previewPcBtn");
const previewMobileBtn = document.getElementById("previewMobileBtn");
const sideMenus = document.querySelectorAll(".side-menu");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");


/* ==================================================
   プレビュー基準サイズ
================================================== */

const PC_PREVIEW_WIDTH = 720;
const PC_PREVIEW_HEIGHT = 720;

const MOBILE_PREVIEW_WIDTH = 360;
const MOBILE_PREVIEW_HEIGHT = 812;


/* ==================================================
   色設定
================================================== */

let selectedColor = "#e86f9b";
let selectedColorType = "text";


/* ==================================================
   デザイン選択
================================================== */

/*
 * true  → プレビューからデザインを選択するモード
 * false → 通常モード
 */
let designSelectMode = false;

/*
 * 現在選択されているプレビュー要素
 */
let selectedDesignElement = null;

/*
 * 選択された要素の場所
 * PC / スマホ両方で同じ場所を特定するために使用
 */
let selectedDesignPath = null;


/* ==================================================
   プレビュー更新
================================================== */

function updatePreview() {
  const html = editor.getValue();

  pcPreview.innerHTML = html;
  mobilePreview.innerHTML = html;

  setupDesignSelection(pcPreview);
  setupDesignSelection(mobilePreview);

  updatePreviewScale();
}

editor.on("change", function () {
  updatePreview();
});


/* ==================================================
   デザイン選択用の要素を設定
================================================== */

function setupDesignSelection(preview) {
  if (!preview) return;

  /*
   * 以前の選択状態をリセット
   */
  selectedDesignElement = null;

  /*
   * 選択対象
   *
   * section
   * div
   * h1〜h3
   * p
   *
   * を対象にする。
   *
   * imgはクリックすると画像操作と競合するため
   * 今回は対象外。
   */
  const elements = preview.querySelectorAll(
    "section, section div, section h1, section h2, section h3, section p"
  );

  elements.forEach(function (element) {

    /*
     * 同じ要素にイベントが何度も付かないようにする
     */
    if (element.dataset.builderSelectionReady === "true") {
      return;
    }

    element.dataset.builderSelectionReady = "true";

    /*
     * マウスを乗せたとき
     */
    element.addEventListener("mouseenter", function () {

      if (!designSelectMode) return;

      element.classList.add("builder-design-hover");
    });

    /*
     * マウスを外したとき
     */
    element.addEventListener("mouseleave", function () {

      element.classList.remove("builder-design-hover");
    });

    /*
     * クリックしたとき
     */
    element.addEventListener("click", function (event) {

      if (!designSelectMode) return;

      event.preventDefault();
      event.stopPropagation();

      selectDesignElement(element, preview);
    });
  });
}


/* ==================================================
   デザイン要素を選択
================================================== */

function selectDesignElement(element, preview) {

  /*
   * プレビュー内の全選択状態を解除
   */
  document
    .querySelectorAll(".builder-design-selected")
    .forEach(function (item) {
      item.classList.remove("builder-design-selected");
    });

  /*
   * 選択
   */
  element.classList.add("builder-design-selected");

  selectedDesignElement = element;

  /*
   * HTML内で何番目の要素なのかを記録
   */
  selectedDesignPath = getElementPath(element, preview);

  /*
   * 選択モード終了
   */
  designSelectMode = false;

  /*
   * メッセージ
   */
  showDesignMessage("この部分が選択されています。色を選んでください。");
}


/* ==================================================
   HTML内の要素位置を取得
================================================== */

function getElementPath(element, root) {

  const path = [];

  let current = element;

  while (current && current !== root) {

    const parent = current.parentElement;

    if (!parent) break;

    const children = Array.from(parent.children);

    const index = children.indexOf(current);

    path.unshift(index);

    current = parent;
  }

  return path;
}


/* ==================================================
   HTML内の同じ位置の要素を取得
================================================== */

function getElementFromPath(root, path) {

  let current = root;

  for (let i = 0; i < path.length; i++) {

    if (!current.children[path[i]]) {
      return null;
    }

    current = current.children[path[i]];
  }

  return current;
}


/* ==================================================
   デザイン選択モード開始
================================================== */

function startDesignSelection() {

  designSelectMode = true;

  selectedDesignElement = null;
  selectedDesignPath = null;

  /*
   * 選択状態を解除
   */
  document
    .querySelectorAll(".builder-design-selected")
    .forEach(function (item) {
      item.classList.remove("builder-design-selected");
    });

  showDesignMessage(
    "変更したいデザインにマウスを合わせて、クリックしてください。"
  );

  setupDesignSelection(pcPreview);
  setupDesignSelection(mobilePreview);
}


/* ==================================================
   メッセージ表示
================================================== */

function showDesignMessage(message) {

  /*
   * 既存メッセージ
   */
  const oldMessage = document.querySelector(".builder-design-message");

  if (oldMessage) {
    oldMessage.remove();
  }

  const messageBox = document.createElement("div");

  messageBox.className = "builder-design-message";
  messageBox.textContent = message;

  panelContent.prepend(messageBox);

  /*
   * 3秒後に自動で消す
   */
  setTimeout(function () {

    if (messageBox.parentNode) {
      messageBox.remove();
    }

  }, 3000);
}


/* ==================================================
   プレビュー縮尺
================================================== */

function updatePreviewScale() {

  if (!previewContent) return;

  const availableWidth = Math.max(
    previewContent.clientWidth - 40,
    100
  );

  /* PC */

  const pcScale = Math.min(
    availableWidth / PC_PREVIEW_WIDTH,
    1
  );

  if (pcPreviewElement) {
    pcPreviewElement.style.transform =
      `scale(${pcScale})`;
  }

  if (pcDevice) {
    pcDevice.style.width =
      `${PC_PREVIEW_WIDTH * pcScale}px`;
  }

  if (pcStage) {
    pcStage.style.minHeight =
      `${(PC_PREVIEW_HEIGHT + 28) * pcScale + 20}px`;
  }


  /* スマホ */

  const mobileScale = Math.min(
    availableWidth / MOBILE_PREVIEW_WIDTH,
    1
  );

  if (mobilePreviewElement) {
    mobilePreviewElement.style.transform =
      `scale(${mobileScale})`;
  }

  if (mobileDevice) {

    mobileDevice.style.width =
      `${MOBILE_PREVIEW_WIDTH * mobileScale}px`;

    mobileDevice.style.height =
      `${MOBILE_PREVIEW_HEIGHT * mobileScale + 10}px`;
  }

  if (mobileStage) {

    mobileStage.style.minHeight =
      `${(MOBILE_PREVIEW_HEIGHT + 20) * mobileScale}px`;
  }
}


/* ==================================================
   PC / スマホ切り替え
================================================== */

function switchMode(mode) {

  if (mode === "pc") {

    editorPage.classList.remove("mobile-mode");

    pcStage.style.display = "flex";
    mobileStage.style.display = "none";

    previewPcBtn.classList.add("active");
    previewMobileBtn.classList.remove("active");

  } else {

    editorPage.classList.add("mobile-mode");

    pcStage.style.display = "none";
    mobileStage.style.display = "flex";

    previewPcBtn.classList.remove("active");
    previewMobileBtn.classList.add("active");
  }

  updatePreviewScale();
}


previewPcBtn.addEventListener("click", function () {
  switchMode("pc");
});


previewMobileBtn.addEventListener("click", function () {
  switchMode("mobile");
});


/* ==================================================
   HTMLコピー
================================================== */

document
  .querySelector(".copy")
  .addEventListener("click", async function () {

    try {

      let html = editor.getValue();

      if (
        !html.includes("max-width: 720px") &&
        !html.includes("max-width:720px")
      ) {

        html =
          `<div style="max-width: 720px; width: 100%; margin: 0 auto; box-sizing: border-box;">\n` +
          `${html}\n` +
          `</div>`;
      }

      await navigator.clipboard.writeText(html);

      alert("採用管理サイト用HTMLをコピーしました！");

    } catch (error) {

      alert("HTMLのコピーに失敗しました。");
    }
  });


/* ==================================================
   サイドバー
================================================== */

sideMenus.forEach(function (menu) {

  menu.addEventListener("click", function () {

    sideMenus.forEach(function (item) {
      item.classList.remove("active");
    });

    menu.classList.add("active");

    const tab = menu
      .querySelector("span:last-child")
      .innerText
      .trim();

    loadPanel(tab);
  });
});


/* ==================================================
   デザインテンプレート
================================================== */

const templates = {

  vertical3: `<section style="margin: 20px 0; font-family: sans-serif;">
  <h2 style="font-size: 20px; text-align: center; margin-bottom: 20px; color: #333;">デザインが重要な3つの理由</h2>

  <div style="display: flex; flex-direction: column; gap: 16px;">

    <div style="background: #fdf2f5; border: 1px solid #f3dce3; padding: 20px; border-radius: 12px;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #e86f9b;">01｜わかりやすさ</h3>
      <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">説明文が入ります。</p>
    </div>

    <div style="background: #fdf2f5; border: 1px solid #f3dce3; padding: 20px; border-radius: 12px;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #e86f9b;">02｜見やすさ</h3>
      <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">説明文が入ります。</p>
    </div>

    <div style="background: #fdf2f5; border: 1px solid #f3dce3; padding: 20px; border-radius: 12px;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #e86f9b;">03｜ブランディング</h3>
      <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">説明文が入ります。</p>
    </div>

  </div>
</section>`,



  horizontal3: `<section style="margin: 20px 0; font-family: sans-serif;">

  <div style="display: flex; gap: 16px; flex-wrap: wrap;">

    <div style="flex: 1; min-width: 200px; background: #f2f7ff; border: 1px solid #d6e5ff; padding: 16px; border-radius: 12px; box-sizing: border-box;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #4f7cac;">タイトル</h3>
      <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">説明文が入ります。</p>
    </div>

    <div style="flex: 1; min-width: 200px; background: #f2f7ff; border: 1px solid #d6e5ff; padding: 16px; border-radius: 12px; box-sizing: border-box;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #4f7cac;">タイトル</h3>
      <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">説明文が入ります。</p>
    </div>

    <div style="flex: 1; min-width: 200px; background: #f2f7ff; border: 1px solid #d6e5ff; padding: 16px; border-radius: 12px; box-sizing: border-box;">
      <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #4f7cac;">タイトル</h3>
      <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">説明文が入ります。</p>
    </div>

  </div>
</section>`,



  imageText: `<section style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin: 20px 0; font-family: sans-serif;">

  <img src="https://via.placeholder.com/400x250"
       alt="image"
       style="width: 100%; max-width: 320px; height: auto; border-radius: 12px; flex: 1; min-width: 240px; object-fit: cover;">

  <div style="flex: 1; min-width: 240px;">
    <h2 style="font-size: 18px; margin: 0 0 10px 0; color: #333;">セクションタイトル</h2>
    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #555;">説明文が入ります。説明文が入ります。</p>
  </div>

</section>`,



  cardList: `<section style="display: flex; flex-direction: column; gap: 12px; margin: 20px 0; font-family: sans-serif;">

  <div style="display: flex; gap: 16px; align-items: center; background: #ffffff; border: 1px solid #e8e8e8; padding: 12px 16px; border-radius: 12px;">

    <img src="https://via.placeholder.com/80"
         alt="image"
         style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">

    <div>
      <h3 style="font-size: 15px; margin: 0 0 4px 0; color: #333;">タイトル</h3>
      <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.4;">説明文が入ります。</p>
    </div>

  </div>


  <div style="display: flex; gap: 16px; align-items: center; background: #ffffff; border: 1px solid #e8e8e8; padding: 12px 16px; border-radius: 12px;">

    <img src="https://via.placeholder.com/80"
         alt="image"
         style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">

    <div>
      <h3 style="font-size: 15px; margin: 0 0 4px 0; color: #333;">タイトル</h3>
      <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.4;">説明文が入ります。</p>
    </div>

  </div>

</section>`
};


/* ==================================================
   選択範囲を保存
================================================== */

let savedSelection = null;

function saveSelection() {

  const doc = editor.getDoc();
  const selection = doc.listSelections()[0];

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

  const doc = editor.getDoc();

  doc.setSelection(
    savedSelection.anchor,
    savedSelection.head
  );
}


/* ==================================================
   カラー入力
================================================== */

function createColorTool(type) {

  const wrapper = document.createElement("div");

  wrapper.className = "color-tool";


  const title = document.createElement("div");

  title.className = "color-tool-title";

  title.textContent =
    type === "text"
      ? "🔤 文字色"
      : "🖍️ 背景色";


  const description = document.createElement("p");

  description.className =
    "color-tool-description";

  description.textContent =
    "変更したい部分を選択してから色を選んでください";


  const row = document.createElement("div");

  row.className =
    "color-picker-row";


  const picker = document.createElement("input");

  picker.type = "color";

  picker.className =
    "color-picker";

  picker.value =
    selectedColor;


  const value = document.createElement("div");

  value.className =
    "color-value";

  value.textContent =
    picker.value;


  const apply = document.createElement("button");

  apply.type = "button";

  apply.className =
    "apply-color";

  apply.textContent =
    "この色を適用";


  picker.addEventListener(
    "focus",
    saveSelection
  );

  picker.addEventListener(
    "click",
    saveSelection
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

      selectedColor =
        picker.value;

      selectedColorType =
        type;


      /*
       * デザイン選択済みなら
       * プレビューで選んだ部分に色を付ける
       */

      if (selectedDesignPath) {

        applyDesignColor(
          type,
          selectedColor
        );

        return;
      }


      /*
       * 通常の文字選択
       */

      saveSelection();

      applyColor(
        type,
        selectedColor
      );
    }
  );


  row.appendChild(picker);

  row.appendChild(value);

  wrapper.appendChild(title);

  wrapper.appendChild(description);

  wrapper.appendChild(row);

  wrapper.appendChild(apply);


  return wrapper;
}


/* ==================================================
   プレビューで選択したデザインに色を適用
================================================== */

function applyDesignColor(type, color) {

  if (!selectedDesignPath) {

    alert(
      "先に「変更するデザインを選択」を押して、プレビューから変更部分を選択してください。"
    );

    return;
  }


  /*
   * 現在のHTMLをDOMとして解析
   */

  const html =
    editor.getValue();

  const parser =
    new DOMParser();

  const parsed =
    parser.parseFromString(
      `<div id="builder-root">${html}</div>`,
      "text/html"
    );

  const root =
    parsed.getElementById(
      "builder-root"
    );


  /*
   * プレビューと同じ場所の要素を取得
   */

  const target =
    getElementFromPath(
      root,
      selectedDesignPath
    );


  if (!target) {

    alert(
      "選択したデザインをHTML内から取得できませんでした。"
    );

    return;
  }


  /*
   * 文字色
   */

  if (type === "text") {

    target.style.color =
      color;
  }


  /*
   * 背景色
   */

  if (type === "background") {

    target.style.backgroundColor =
      color;
  }


  /*
   * HTMLをCodeMirrorへ戻す
   */

  const newHtml =
    root.innerHTML;

  editor.setValue(
    newHtml
  );


  /*
   * 選択状態をリセット
   */

  selectedDesignPath =
    null;

  selectedDesignElement =
    null;


  /*
   * 再表示
   */

  updatePreview();


  showDesignMessage(
    "色を変更しました！"
  );
}


/* ==================================================
   通常の文字色変更
================================================== */

function applyColor(type, color) {

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


  let before =
    type === "text"
      ? `<span style="color:${color}">`
      : `<span style="background-color:${color}">`;


  let after =
    "</span>";


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

  const buttons =
    [];


  /* ==================================================
     テキスト
  ================================================== */

  if (tab === "テキスト") {

    buttons.push({
      label: "見出し",
      html:
        `<h1 style="font-size: 22px; font-weight: bold; margin: 16px 0 8px 0; color: #333;">見出し</h1>`
    });


    buttons.push({
      label: "小見出し",
      html:
        `<h2 style="font-size: 18px; font-weight: bold; margin: 14px 0 6px 0; color: #444;">小見出し</h2>`
    });


    buttons.push({
      label: "本文",
      html:
        `<p style="font-size: 14px; line-height: 1.6; margin: 8px 0; color: #333;">本文テキスト</p>`
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
        `<blockquote style="border-left: 4px solid #e86f9b; padding-left: 12px; margin: 12px 0; color: #666; font-style: italic;">`,
        "</blockquote>"
      ]
    });


    buttons.push({
      label: "罫線",
      html:
        `<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">`
    });
  }


  /* ==================================================
     ボックス
  ================================================== */

  if (tab === "ボックス") {

    buttons.push({

      label: "メモ",

      html:
        `<div style="background: #fff8fa; border: 1px solid #f3dce3; padding: 16px; border-radius: 12px; margin: 12px 0; color: #444;">メモ内容</div>`
    });


    buttons.push({

      label: "注意",

      html:
        `<div style="background: #fff0f0; border: 1px solid #ffd1d1; padding: 16px; border-radius: 12px; margin: 12px 0; color: #d93838;">注意内容</div>`
    });


    buttons.push({

      label: "ポイント",

      html:
        `<div style="background: #f0f7ff; border: 1px solid #cbe3ff; padding: 16px; border-radius: 12px; margin: 12px 0; color: #1d6fc4;">ポイント内容</div>`
    });
  }


  /* ==================================================
     画像
  ================================================== */

  if (tab === "画像") {

    buttons.push({

      label: "画像挿入",

      html:
        `<img src="https://via.placeholder.com/600x300" alt="画像" style="width: 100%; height: auto; border-radius: 8px; margin: 12px 0; display: block;">`
    });
  }


  /* ==================================================
     カラー
  ================================================== */

  if (tab === "カラー") {

    /*
     * デザイン選択ボタン
     */

    const selectDesignButton =
      document.createElement("button");

    selectDesignButton.textContent =
      "🎨 変更する部分を選択";


    selectDesignButton.className =
      "design-select-button";


    selectDesignButton.addEventListener(
      "click",
      function () {

        startDesignSelection();
      }
    );


    panelContent.appendChild(
      selectDesignButton
    );


    /*
     * 文字色
     */

    panelContent.appendChild(
      createColorTool("text")
    );


    /*
     * 背景色
     */

    panelContent.appendChild(
      createColorTool("background")
    );


    /*
     * 黄色マーカー
     */

    buttons.push({

      label: "黄色マーカー",

      wrap: [
        `<span style="background-color: #fff3a3; padding: 0 2px;">`,
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
          document.createElement("button");

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
        document.createElement("button");

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
   選択文字をタグで囲む
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

    `<a href="${url}" target="_blank" style="color: #e86f9b; text-decoration: underline;">` +
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
    computed
      .gridTemplateColumns
      .split(" ")
      .map(parseFloat);


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
          )
            .gridTemplateColumns
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
   リサイズ
================================================== */

window.addEventListener(
  "resize",
  function () {

    updatePreviewScale();

    editor.refresh();
  }
);

// ==========================================
// 1. プレビュー全画面機能
// ==========================================
function setupFullscreen() {
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const previewContent = document.querySelector(".preview-content");

  if (!fullscreenBtn || !previewContent) return;

  fullscreenBtn.addEventListener("click", () => {
    const isFull = previewContent.classList.toggle("is-fullscreen");
    fullscreenBtn.classList.toggle("active", isFull);
    fullscreenBtn.textContent = isFull ? "✖ 全画面解除" : "⛶ 全画面";
  });

  // ESCキーで解除
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && previewContent.classList.contains("is-fullscreen")) {
      previewContent.classList.remove("is-fullscreen");
      fullscreenBtn.classList.remove("active");
      fullscreenBtn.textContent = "⛶ 全画面";
    }
  });
}

// ==========================================
// 2. 初回マニュアルモーダル機能
// ==========================================
function setupManualModal() {
  const modal = document.getElementById("manualModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const okBtn = document.getElementById("modalOkBtn");
  const noShowCheck = document.getElementById("noShowAgainCheck");

  if (!modal) return;

  // localStorage を確認し、非表示フラグがなければモーダル表示
  const hideManual = localStorage.getItem("hideHTMLBuilderManual");
  if (!hideManual) {
    modal.classList.add("is-open");
  }

  const closeModal = () => {
    if (noShowCheck && noShowCheck.checked) {
      localStorage.setItem("hideHTMLBuilderManual", "true");
    }
    modal.classList.remove("is-open");
  };

  closeBtn?.addEventListener("click", closeModal);
  okBtn?.addEventListener("click", closeModal);

  // 背景クリックで閉じる
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// 初期化実行
document.addEventListener("DOMContentLoaded", () => {
  setupFullscreen();
  setupManualModal();
});


// ==========================================
// プレビュー内の画像クリックで画像URL変更機能（完全上書き版）
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  const handlePreviewImageClick = (e) => {
    // クリックされた要素が img タグの場合
    if (e.target && e.target.tagName === 'IMG') {
      const clickedImg = e.target;
      
      // 現在設定されている src 属性を取得
      const currentSrc = clickedImg.getAttribute('src') || '';

      // URL入力ポップアップを表示（入力済みの場合はそのURL、なければ入力例を表示）
      const newUrl = window.prompt(
        'アップロードした画像のURLを入力してください：',
        currentSrc.startsWith('http') && !currentSrc.includes('placeholder')
          ? currentSrc
          : 'こちらに入力してください'
      );

      // キャンセルまたは空入力の場合はスキップ
      if (newUrl === null || newUrl.trim() === '') return;

      const trimmedUrl = newUrl.trim();

      // 1. PCプレビュー・スマホプレビューの両方の画像の src を直接更新
      clickedImg.setAttribute('src', trimmedUrl);

      const pcPreview = document.getElementById('pcPreview');
      const mobilePreview = document.getElementById('mobilePreview');

      // PCプレビュー上の最新HTML構造を取得
      if (pcPreview) {
        const latestHtml = pcPreview.innerHTML;

        // 2. エディタ（CodeMirror）の値を最新HTMLで強制書き換え
        if (window.editor && typeof window.editor.setValue === 'function') {
          window.editor.setValue(latestHtml);
        }

        // 3. テキストエリアの値も最新HTMLで強制書き換え
        const textarea = document.getElementById('editorText');
        if (textarea) {
          textarea.value = latestHtml;
        }

        // 4. スマホプレビュー側にも同じHTMLを流し込んで同期
        if (mobilePreview) {
          mobilePreview.innerHTML = latestHtml;
        }
      }
    }
  };

  // PCプレビュー・スマホプレビュー両方にイベントをセット
  const pcPreview = document.getElementById('pcPreview');
  const mobilePreview = document.getElementById('mobilePreview');

  if (pcPreview) pcPreview.addEventListener('click', handlePreviewImageClick);
  if (mobilePreview) mobilePreview.addEventListener('click', handlePreviewImageClick);
});
