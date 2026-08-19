/* ==================================================
   HTML Builder
   Canva風デザイン
================================================== */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family:
    "Noto Sans JP",
    "Hiragino Sans",
    Arial,
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #fff8fa 0%,
      #fff4f7 45%,
      #fdf8fb 100%
    );

  color: #4b3b42;
}


/* ==================================================
   全体
================================================== */

#editorPage {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}


/* ==================================================
   サイドバー
================================================== */

.sidebar {
  width: 210px;
  min-width: 210px;

  display: flex;
  flex-direction: column;

  padding: 22px 14px;

  background:
    linear-gradient(
      180deg,
      #fff7f9 0%,
      #ffe9ef 100%
    );

  border-right: 1px solid #f5d6df;

  box-shadow:
    4px 0 18px rgba(217, 132, 155, 0.08);

  z-index: 10;
}


/* ロゴ */

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 6px 8px 24px;
}

.logo-mark {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #f59ab2,
      #e9819f
    );

  color: #fff;

  font-size: 20px;

  box-shadow:
    0 5px 12px rgba(225, 119, 147, 0.25);
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo-text strong {
  font-size: 14px;
  color: #654b55;
}

.logo-text span {
  font-size: 9px;
  color: #b58d99;
  letter-spacing: 0.4px;
}


/* メニューラベル */

.menu-label {
  padding: 0 9px 8px;

  color: #c28c9b;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 1.2px;
}


/* サイドメニュー */

.side-menu {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 6px;
  padding: 11px 10px;

  border: 0;
  border-radius: 12px;

  background: transparent;

  color: #735c65;

  font-family: inherit;
  font-size: 13px;
  font-weight: 500;

  text-align: left;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.side-menu:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: translateX(2px);
}

.side-menu.active {
  background: #fff;

  color: #df7797;

  box-shadow:
    0 4px 12px rgba(217, 132, 155, 0.12);
}

.menu-icon {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #ffe1e8;

  color: #df819b;

  font-size: 13px;
  font-weight: 700;
}

.side-menu.active .menu-icon {
  background:
    linear-gradient(
      135deg,
      #f59ab2,
      #e985a2
    );

  color: #fff;

  box-shadow:
    0 4px 9px rgba(225, 119, 147, 0.22);
}


/* 下部 */

.sidebar-bottom {
  margin-top: auto;
  padding-top: 18px;
}

.tip-card {
  display: flex;
  gap: 8px;

  padding: 12px;

  background: rgba(255, 255, 255, 0.65);

  border: 1px solid #f6d7df;

  border-radius: 14px;
}

.tip-icon {
  font-size: 18px;
}

.tip-card strong {
  display: block;

  margin-bottom: 3px;

  color: #c86f89;

  font-size: 11px;
}

.tip-card p {
  margin: 0;

  color: #a88b94;

  font-size: 9px;
  line-height: 1.6;
}


/* ==================================================
   メインエリア
================================================== */

.main-area {
  flex: 1;

  display: grid;

  grid-template-columns:
    245px
    8px
    minmax(300px, 1fr)
    8px
    minmax(360px, 1.15fr);

  gap: 0;

  padding: 14px;

  min-width: 0;
}


/* ==================================================
   ドラッグバー
================================================== */

.resize-divider {
  position: relative;

  width: 8px;
  min-width: 8px;

  cursor: col-resize;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 20;
}

.resize-divider::before {
  content: "";

  position: absolute;

  width: 3px;
  height: 42px;

  border-radius: 10px;

  background: #efcbd5;

  transition:
    background 0.2s ease,
    height 0.2s ease;
}

.resize-divider span {
  position: relative;

  width: 5px;
  height: 28px;

  border-radius: 10px;

  background:
    repeating-linear-gradient(
      to bottom,
      #dba7b6 0,
      #dba7b6 2px,
      transparent 2px,
      transparent 5px
    );

  opacity: 0;

  transition: opacity 0.2s ease;
}

.resize-divider:hover::before {
  background: #e889a4;
  height: 55px;
}

.resize-divider:hover span {
  opacity: 1;
}

body.is-resizing {
  cursor: col-resize !important;
  user-select: none;
}

body.is-resizing * {
  cursor: col-resize !important;
}


/* ==================================================
   共通カード
================================================== */

.panel,
.editor,
.preview-content {
  min-width: 0;

  background: rgba(255, 255, 255, 0.94);

  border: 1px solid #f4dce3;

  border-radius: 18px;

  box-shadow:
    0 8px 28px rgba(205, 126, 149, 0.08);
}


/* ==================================================
   パネル
================================================== */

.panel {
  padding: 18px;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding-bottom: 8px;
}

.panel-kicker,
.section-kicker {
  display: block;

  margin-bottom: 3px;

  color: #d89bad;

  font-size: 9px;
  font-weight: 700;

  letter-spacing: 1.3px;
}

#panelTitle {
  margin: 0;

  color: #5c4650;

  font-size: 19px;
  font-weight: 700;
}

.panel-decoration {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #fff0f4;

  color: #e68aa3;

  font-size: 15px;
}

.panel-description {
  margin: 3px 0 17px;

  color: #ad929b;

  font-size: 10px;
}


/* ==================================================
   パネルボタン
================================================== */

#panelContent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#panelContent button {
  position: relative;

  width: 100%;

  padding: 12px 13px;

  border: 1px solid #f4dce3;
  border-radius: 11px;

  background: #fffafa;

  color: #6d555e;

  font-family: inherit;

  font-size: 12px;
  font-weight: 500;

  text-align: left;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

#panelContent button::after {
  content: "＋";

  position: absolute;
  right: 12px;

  color: #dda0af;

  font-size: 13px;
}

#panelContent button:hover {
  transform: translateY(-2px);

  background: #fff0f4;

  border-color: #efc4d0;

  box-shadow:
    0 5px 12px rgba(218, 132, 154, 0.12);
}


/* ==================================================
   カラーチャート
================================================== */

.color-tool {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 12px;

  border: 1px solid #f3dce3;
  border-radius: 13px;

  background: #fff8fa;
}

.color-tool-title {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #795e68;

  font-size: 11px;
  font-weight: 600;
}

.color-tool-description {
  margin: 0;

  color: #b2939d;

  font-size: 9px;
  line-height: 1.5;
}

.color-picker-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-picker {
  width: 48px;
  height: 34px;

  padding: 3px;

  border: 1px solid #efd5dd;
  border-radius: 9px;

  background: #fff;

  cursor: pointer;
}

.color-value {
  flex: 1;

  padding: 7px 8px;

  border: 1px solid #efdce2;
  border-radius: 8px;

  background: #fff;

  color: #9c7f89;

  font-family: monospace;
  font-size: 10px;

  text-align: center;
}

.apply-color {
  width: 100% !important;

  margin: 0 !important;
  padding: 9px 10px !important;

  text-align: center !important;

  background:
    linear-gradient(
      135deg,
      #f39ab1,
      #e9819e
    ) !important;

  color: #fff !important;

  border: 0 !important;
}

.apply-color::after {
  display: none !important;
}


/* ==================================================
   エディタ
================================================== */

.editor {
  display: flex;
  flex-direction: column;

  padding: 18px;

  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 12px;
}

.section-header h3,
.preview-header h3 {
  margin: 0;

  color: #5c4650;

  font-size: 15px;
  font-weight: 700;
}

.status-dot {
  padding: 5px 9px;

  border-radius: 20px;

  background: #fff1f4;

  color: #d8889e;

  font-size: 9px;
}

.editor-wrapper {
  flex: 1;

  min-height: 0;

  overflow: hidden;

  border: 1px solid #efdce2;

  border-radius: 12px;

  background: #fffdfd;
}


/* CodeMirror */

.CodeMirror {
  height: 100%;

  font-family:
    "Consolas",
    "Monaco",
    monospace;

  font-size: 12px;

  color: #66525a;

  background: #fffdfd;
}

.CodeMirror-gutters {
  background: #fff6f8;

  border-right: 1px solid #f1dde3;
}

.CodeMirror-linenumber {
  color: #c9a8b2;
}

.CodeMirror-cursor {
  border-left: 2px solid #e88da6;
}

.CodeMirror-selected {
  background: #ffe4eb !important;
}


/* コピー */

.copy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  margin-top: 10px;

  padding: 11px;

  border: 0;
  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #f39ab1,
      #e9819e
    );

  color: #fff;

  font-family: inherit;

  font-size: 11px;
  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 5px 12px rgba(225, 119, 147, 0.18);
}

.copy:hover {
  transform: translateY(-2px);
}


/* ==================================================
   プレビュー
================================================== */

.preview-content {
  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 0;

  padding: 18px;

  overflow: hidden;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-shrink: 0;

  margin-bottom: 14px;
}

.preview-switch {
  display: flex;
  gap: 4px;

  padding: 4px;

  border-radius: 10px;

  background: #fff2f5;
}

.preview-mode-btn {
  padding: 6px 9px;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: #a98791;

  font-family: inherit;

  font-size: 9px;

  cursor: pointer;
}

.preview-mode-btn.active {
  background: #fff;

  color: #d97993;

  box-shadow:
    0 2px 7px rgba(214, 130, 151, 0.12);
}


/* ==================================================
   デバイス
================================================== */

.pc-stage,
.mobile-stage {
  flex: 1;

  min-height: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  overflow: auto;

  padding: 8px 5px 20px;
}

.mobile-stage {
  display: none;
}

.device-label {
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 7px;

  color: #b89da6;

  font-size: 8px;
  font-weight: 600;

  letter-spacing: 0.8px;
}


/* PC */

.pc-device {
  flex-shrink: 0;

  overflow: hidden;

  background: #fff;

  border: 1px solid #e5dce0;

  border-radius: 12px;

  box-shadow:
    0 8px 25px rgba(75, 52, 61, 0.12);
}

.browser-bar {
  height: 28px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 0 10px;

  background: #fff7f9;

  border-bottom: 1px solid #f0e3e7;
}

.browser-dots {
  display: flex;
  gap: 4px;
}

.browser-dots span {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #e7c2cc;
}

.browser-address {
  flex: 1;

  height: 16px;

  display: flex;
  align-items: center;

  padding-left: 8px;

  border-radius: 5px;

  background: #fff;

  color: #c3aab2;

  font-size: 7px;
}

.pc-preview {
  width: 1280px;
  min-height: 720px;

  background: #fff;

  padding: 20px;

  transform-origin: top left;
}


/* スマホ */

.mobile-device {
  position: relative;

  flex-shrink: 0;

  width: 375px;
  min-height: 812px;

  overflow: hidden;

  padding: 8px;

  border: 5px solid #30292d;
  border-radius: 34px;

  background: #30292d;
}

.mobile-camera {
  position: absolute;

  top: 9px;
  left: 50%;

  width: 70px;
  height: 16px;

  transform: translateX(-50%);

  border-radius: 20px;

  background: #211d20;

  z-index: 5;
}

.mobile-preview {
  width: 375px;
  min-height: 812px;

  overflow: hidden;

  background: #fff;

  border-radius: 24px;

  padding: 20px;

  transform-origin: top left;
}


/* ==================================================
   テンプレート
================================================== */

section.template {
  margin: 30px 0;

  padding: 24px;

  background: #fff;

  border: 1px solid #f2dce2;

  border-radius: 16px;
}

.three-split h2 {
  margin-bottom: 22px;
  color: #dc7d97;
}

.split-item {
  margin-bottom: 20px;
}

.split-image {
  width: 100%;
  height: 120px;

  margin-bottom: 10px;

  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #ffe8ee,
      #fff3f6
    );
}

.horizontal-cards {
  display: flex;
  gap: 16px;
}

.horizontal-cards .card {
  flex: 1;

  padding: 12px;

  background: #fff5f7;

  border: 1px solid #f5e1e6;

  border-radius: 12px;
}

.image-text {
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-text img {
  width: 40%;
  border-radius: 11px;
}

.image-text .text {
  flex: 1;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-list .card-item {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 12px;

  background: #fff5f7;

  border: 1px solid #f5e1e6;

  border-radius: 12px;
}

.card-list .card-item img {
  width: 80px;
  height: 80px;

  border-radius: 10px;

  background: #ffe7ed;
}


/* ==================================================
   スクロールバー
================================================== */

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e6c2cc;
  border-radius: 20px;
}


/* ==================================================
   スマホモード
================================================== */

#editorPage.mobile-mode .pc-stage {
  display: none;
}

#editorPage.mobile-mode .mobile-stage {
  display: flex;
}


/* ==================================================
   リサイズ
================================================== */

@media (max-width: 1100px) {

  .sidebar {
    width: 175px;
    min-width: 175px;
  }

  .main-area {
    grid-template-columns:
      220px
      8px
      minmax(280px, 1fr)
      8px
      minmax(320px, 1fr);
  }

}

@media (max-width: 850px) {

  .sidebar {
    width: 70px;
    min-width: 70px;

    padding: 14px 8px;
  }

  .logo-text,
  .menu-label,
  .side-menu > span:not(.menu-icon),
  .sidebar-bottom {
    display: none;
  }

  .logo-area {
    justify-content: center;
    padding-bottom: 18px;
  }

  .side-menu {
    justify-content: center;
    padding: 9px;
  }

  .main-area {
    grid-template-columns: 190px 1fr;
  }

  .resize-divider {
    display: none;
  }

  .preview-content {
    display: none;
  }

}
