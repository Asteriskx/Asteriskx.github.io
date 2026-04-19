import{a as l,p as s,q as z}from"./chunk-LFPYN7LY-CkqpkPzF.js";import{_ as E}from"./preload-helper-BXl3LOEh.js";const T=8,u=8,A=.5,Z=450,w=110,S=w*(T-1)+Z+150,f=150;function ss(e){const n=100/T,r=n*e,c=n*(e+1);return`polygon(${r-u-A}% 0%, ${c-u+A}% 0%, ${c+u+A}% 100%, ${r+u-A}% 100%)`}function L({logos:e,intervalMs:n}){const[r,c]=l.useState(0),[o,t]=l.useState(null),[i,h]=l.useState(!1),j=l.useRef(r);return j.current=r,l.useEffect(()=>{const a=setInterval(()=>{const d=(j.current+1)%e.length;t(d),h(!1),setTimeout(()=>c(d),S),setTimeout(()=>h(!0),S+50),setTimeout(()=>t(null),S+50+f)},n);return()=>clearInterval(a)},[e.length,n]),s.jsxs("div",{className:"slash-logo-wrap",children:[s.jsx("img",{src:e[r],alt:"logo",className:"slash-logo-base"}),o!==null&&s.jsx("div",{className:`slash-strips-wrapper${i?" leaving":""}`,style:{"--fadeout-ms":`${f}ms`},children:Array.from({length:T},(a,d)=>s.jsx("div",{style:{position:"absolute",inset:0,clipPath:ss(d)},children:s.jsx("div",{className:"slash-strip-inner",style:{position:"absolute",inset:0,backgroundImage:`url(${e[o]})`,backgroundSize:"cover",backgroundPosition:"center",animationDelay:`${d*w}ms`}})},d))})]})}const ns=["/assets/image/logo-v2.png","/assets/image/logo-v3.png","/assets/image/logo-v4.png","/assets/image/logo-v5.png"];function es(){return s.jsx("div",{className:"logo-slash-demo",children:s.jsx(L,{logos:ns,intervalMs:2400})})}const rs=["/assets/image/logo-v2.png","/assets/image/logo-v3.png","/assets/image/logo-v4.png","/assets/image/logo-v5.png"];function p(e,n,r,c){const[o,t]=l.useState(""),i=l.useRef(!1),h=l.useRef(c);return h.current=c,l.useEffect(()=>{if(!r||i.current)return;t(""),i.current=!1;let j=0,a=null;const d=setInterval(()=>{t(e.slice(0,j+1)),j++,j>=e.length&&(clearInterval(d),i.current=!0,a=setTimeout(()=>h.current(),180))},n);return()=>{clearInterval(d),a&&clearTimeout(a)}},[r,e,n]),o}function ls(){const[e,n]=l.useState(0),r=()=>n(C=>C+1),c=p("name",85,e>=1,r),o=p("たっけん",75,e>=2,r),t=p("@あすた",75,e>=3,r),i=p("role",85,e>=4,r),h=p("Chief Engineer, Embedded Software.",50,e>=5,r),j=p("info",85,e>=6,r),a=p("C / C# / Rust を中心に、組み込みシステムから",32,e>=7,r),d=p("デスクトップアプリ・言語設計まで幅広く手がけています。",32,e>=8,r),m=p("skills",85,e>=9,r),[x,D]=l.useState(!1),[N,B]=l.useState(!1),[H,X]=l.useState(!1),[Q,J]=l.useState(!1),[V,W]=l.useState(!1);return l.useEffect(()=>{if(e<10)return;const C=setTimeout(()=>D(!0),80),$=setTimeout(()=>B(!0),220),q=setTimeout(()=>X(!0),360),K=setTimeout(()=>J(!0),500),Y=setTimeout(()=>W(!0),640);return()=>{clearTimeout(C),clearTimeout($),clearTimeout(q),clearTimeout(K),clearTimeout(Y)}},[e]),l.useEffect(()=>{const C=setTimeout(()=>n(1),500);return()=>clearTimeout(C)},[]),s.jsx("div",{className:"hero-terminal",children:s.jsxs("div",{className:"term-body",children:[s.jsxs("div",{className:"term-commands",children:[s.jsxs("span",{className:"term-line",children:[s.jsx("span",{className:"term-prompt",children:"$"}),s.jsx("span",{className:"term-cmd",children:c}),e<2&&s.jsx("span",{className:"term-blink",children:"▌"})]}),e>=2&&s.jsx("div",{className:"term-result",children:s.jsxs("span",{className:"term-result-line",children:[s.jsx("span",{children:o}),s.jsx("span",{className:"term-name-accent",children:t})]})}),e>=4&&s.jsxs("span",{className:"term-line",children:[s.jsx("span",{className:"term-prompt",children:"$"}),s.jsx("span",{className:"term-cmd",children:i}),e===4&&s.jsx("span",{className:"term-blink",children:"▌"})]}),e>=5&&s.jsx("div",{className:"term-result",children:s.jsx("span",{className:"term-result-line term-role-val",children:h})}),e>=6&&s.jsxs("span",{className:"term-line",children:[s.jsx("span",{className:"term-prompt",children:"$"}),s.jsx("span",{className:"term-cmd",children:j}),e===6&&s.jsx("span",{className:"term-blink",children:"▌"})]}),e>=7&&s.jsxs("div",{className:"term-result",children:[s.jsx("span",{className:"term-result-line",children:a}),e>=8&&s.jsx("span",{className:"term-result-line",children:d})]}),e>=9&&s.jsxs("span",{className:"term-line",children:[s.jsx("span",{className:"term-prompt",children:"$"}),s.jsx("span",{className:"term-cmd",children:m}),e===9&&s.jsx("span",{className:"term-blink",children:"▌"})]}),e>=10&&s.jsxs("div",{className:"term-result",children:[x&&s.jsxs("span",{className:"term-skill-row",children:[s.jsx("span",{className:"term-sk-cat",children:"Systems   "}),s.jsx("span",{className:"term-sk-sep",children:" │ "}),s.jsx("span",{className:"term-sk-val",children:"C · C++ · Assembly · Rust"})]}),N&&s.jsxs("span",{className:"term-skill-row",children:[s.jsx("span",{className:"term-sk-cat",children:"App       "}),s.jsx("span",{className:"term-sk-sep",children:" │ "}),s.jsx("span",{className:"term-sk-val",children:"C# · Java · Python"})]}),H&&s.jsxs("span",{className:"term-skill-row",children:[s.jsx("span",{className:"term-sk-cat",children:"Web/Script"}),s.jsx("span",{className:"term-sk-sep",children:" │ "}),s.jsx("span",{className:"term-sk-val",children:"TypeScript · Node.js · Ruby · VBA · HTML"})]}),Q&&s.jsxs("span",{className:"term-skill-row",children:[s.jsx("span",{className:"term-sk-cat",children:"Graphics  "}),s.jsx("span",{className:"term-sk-sep",children:" │ "}),s.jsx("span",{className:"term-sk-val",children:"Processing · p5.js · Three.js"})]}),V&&s.jsxs("span",{className:"term-skill-row",children:[s.jsx("span",{className:"term-sk-cat",children:"Infra     "}),s.jsx("span",{className:"term-sk-sep",children:" │ "}),s.jsx("span",{className:"term-sk-val",children:"Linux (Ubuntu · Arch · CentOS) · NW L1–L4 · サーバ構築"})]})]}),s.jsx("div",{className:"term-divider"}),s.jsxs("div",{className:"hero-tags",children:[s.jsx("span",{className:"htag",children:"Systems"}),s.jsx("span",{className:"htag",children:"Language Design"}),s.jsx("span",{className:"htag",children:"Desktop Apps"}),s.jsxs("span",{className:"htag-pair",children:[s.jsx("span",{className:"htag htag-graphics",children:"Graphics"}),s.jsx("span",{className:"htag htag-infra",children:"Infra"})]})]}),s.jsxs("a",{href:"#work",className:"hero-cta",children:["Work ",s.jsx("span",{className:"cta-arrow",children:"↓"})]})]}),s.jsx("div",{className:"term-logo",children:s.jsx(L,{logos:rs,intervalMs:5e3})})]})})}function ds(){const[e,n]=l.useState(0);return s.jsxs("div",{className:"hero-terminal-demo",children:[s.jsx(ls,{},e),s.jsx("button",{className:"hero-terminal-demo-replay",onClick:()=>n(r=>r+1),"aria-label":"再生",children:"[ replay ]"})]})}const cs={title:"ポートフォリオを全面刷新した話",date:"2026-03-25",description:"SSH ログイン風アニメーション・Three.js パーティクル背景・OGP 対応まで。2026年3月に行った全面リニューアルの記録。",tags:["Web","React"]};function y(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"ポートフォリオを全面刷新した話"}),`
`,s.jsx(n.p,{children:"2026年3月、このサイトを一から作り直した。"}),`
`,s.jsxs(n.p,{children:[`以前のサイトは静的な HTML と CSS だけで作った、いわゆる「とりあえず置いてあるポートフォリオ」だった。
悪くはないんだけど、せっかく作るなら `,s.jsx("span",{style:{color:"var(--accent)"},children:s.jsx(n.strong,{children:"自分が面白いと思えるもの"})}),` にしたかった。
ということで今回は演出にこだわって、いくつかの仕掛けを作り込んだ。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"サイトを開くと SSH ログイン画面が出る"}),`
`,s.jsx(n.p,{children:"最初に目に入るのがこれ。サイトを開くと、いきなりターミナル（コマンドプロンプトみたいな黒い画面）が表示されて、SSH ログイン風のアニメーションが流れる。"}),`
`,s.jsx(n.p,{children:"SSH というのはサーバーへのリモート接続に使われる仕組みで、エンジニアには馴染みが深いもの。それを演出として再現した。"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`$ ssh asteriskx@portfolio
› Connected to asteriskx.net  # since 2018
Login: asteriskx
Password: ••••••••
Verifying... ████████████████████ 100%
Access granted.
`})}),`
`,s.jsx(n.p,{children:"その後、ロゴをアスキーアート（文字だけで作った絵）で表示して、ポートフォリオ本体に遷移する。"}),`
`,s.jsx(n.p,{children:`「ポートフォリオなのにログイン画面？」という感じではあるけど、こういう細かいところへのこだわりがこのサイトのコンセプトだったりする。
画面をクリックすればスキップできるので安心してほしい。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"背景がずっと動いている"}),`
`,s.jsx(n.p,{children:"メインページの背景は、光の粒や幾何学的なパターンが常に動き続けている。静止画ではなく、ずっと「生きている」ような見た目にしたかった。"}),`
`,s.jsx(n.h3,{children:"光の粒がロゴを形成する"}),`
`,s.jsx(n.p,{children:"ページを開くと、細かい光の粒が画面のあちこちから集まって、螺旋を描きながらロゴの形に収束していく。ロゴが完成した後も、各パーティクルが微妙に揺らぎ続けている。"}),`
`,s.jsxs(n.p,{children:["ただのエフェクトに見えるけど、",s.jsx(n.strong,{children:"実際にロゴ画像のピクセルを読み取って、そのピクセルの座標に向かって飛んでいく"}),"という仕組みになっている。"]}),`
`,s.jsx(n.h3,{children:"クリックすると波紋が広がる"}),`
`,s.jsx(n.p,{children:"画面をクリックすると、シアン色の同心円が水面の波紋のようにじわっと広がる。同時に背景の小さな星たちも揺れて、しばらくしてまた元の位置に戻る。ぜひ試してみてほしい。"}),`
`,s.jsx(n.h3,{children:"アスタリスクが背景に浮かぶ"}),`
`,s.jsxs(n.p,{children:["背景にはグリッド状のタイルが敷き詰められていて、一定間隔でアスタリスク（",s.jsx(n.code,{children:"*"}),"）の形をしたタイルだけがパタパタとフリップして浮かび上がる。"]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"*"})," はこのサイト名「asteriskx」の由来のシンボル。目立つ場所には置かずに、背景にひっそりと忍ばせてある。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"メインページのこだわり"}),`
`,s.jsx(n.h3,{children:"ロゴが斜めストリップで切り替わる"}),`
`,s.jsx(n.p,{children:"自己紹介エリアの右側にあるロゴ画像は、一定間隔で別バージョンのロゴに切り替わる。ただのクロスフェードじゃなくて、斜めのストリップが順番にスライドインしながら次の画像を覆っていく演出を入れた。"}),`
`,s.jsx(es,{}),`
`,s.jsxs(n.p,{children:["N 枚のストリップを少しずつ時間差（stagger）をつけてスライドインさせることで、斜めに塗り込まれるように見える。",s.jsx(n.code,{children:"clip-path: polygon()"})," を使ってストリップを傾けているのがポイント。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h3,{children:"タイプライターで自己紹介が打ち込まれる"}),`
`,s.jsx(n.p,{children:`自己紹介のエリアにあるターミナル風のウィンドウでは、スキルが1行ずつタイプライターで打ち込まれていく。
ただのテキスト表示ではなく、文字が入力されていく様子をアニメーションで再現している。`}),`
`,s.jsx(ds,{}),`
`,s.jsx(n.h3,{children:"見出しにスキャン演出"}),`
`,s.jsx(n.p,{children:"About や Work などのセクション見出しは、スクロールして画面に入ってくると光線がテキストを左から右へ塗り込んでいく演出が入る。細かいけど、こういうのが好き。"}),`
`,s.jsx(n.h3,{children:"Work カードのホバーエフェクト"}),`
`,s.jsx(n.p,{children:"制作物一覧のカードにカーソルを乗せると、枠線をレーザー光線のように走るアニメーションが出る。Blog カードはホバー時にマトリクス風の文字が降ってくる。"}),`
`,s.jsx(n.p,{children:"文字セットにサイト名を混ぜてあるのはご愛嬌。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"モバイル対応の苦労"}),`
`,s.jsx(n.p,{children:"デスクトップで完璧に仕上げても、スマホで崩れるとテンションが下がる。"}),`
`,s.jsx(n.h3,{children:"Android で表示が崩れる問題"}),`
`,s.jsx(n.p,{children:"Android の Chrome には、小さすぎる文字を自動で大きくする機能がある。これがログイン演出のアスキーアートアイコンに悪さをして、盛大に崩れる。現在も調査・対応中。"}),`
`,s.jsx(n.h3,{children:"iPhone 横向きで画面からはみ出す"}),`
`,s.jsx(n.p,{children:"iPhone を横向きにすると縦の高さが極端に小さくなるため、ログイン演出のコンテンツが画面に収まらなくなっていた。横向きを検出して縦積みレイアウトに切り替えることで解決した。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"Twitter でシェアしたときのカード画像も作った"}),`
`,s.jsx(n.p,{children:"URL を Twitter（X）に貼ったときに出てくるプレビュー画像（OGP 画像）も、サイト本体のデザインと合わせて専用に作った。"}),`
`,s.jsx(n.p,{children:"ターミナルウィンドウ・キャラクター・技術スタックバッジ・アスタリスクの装飾を 1200×630px のサイズにまとめている。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.h2,{children:"技術スタック"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"要素"}),s.jsx(n.th,{children:"採用技術"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"フレームワーク"}),s.jsx(n.td,{children:"React Router v7（SSG）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"3D / アニメーション"}),s.jsx(n.td,{children:"Three.js"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"言語"}),s.jsx(n.td,{children:"TypeScript"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"スタイル"}),s.jsx(n.td,{children:"CSS（global.css 一元管理）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ホスティング"}),s.jsx(n.td,{children:"GitHub Pages"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx(n.p,{children:"作り込むと止まらなくなるのが趣味開発の良いところで、困るところでもある。"}),`
`,s.jsx(n.p,{children:"とりあえず今は満足している。"})]})}function is(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(y,{...e})}):y(e)}const hs=Object.freeze(Object.defineProperty({__proto__:null,default:is,frontmatter:cs},Symbol.toStringTag,{value:"Module"}));function g({items:e}){return s.jsxs("nav",{className:"blog-toc","aria-label":"目次",children:[s.jsx("span",{className:"blog-toc-header",children:"// table of contents"}),s.jsx("ol",{className:"blog-toc-list",children:e.map((n,r)=>s.jsxs("li",{className:"blog-toc-item",children:[s.jsxs("span",{className:"blog-toc-num",children:[String(r+1).padStart(2,"0"),"."]}),s.jsx("a",{href:n.href,className:"blog-toc-link",children:n.label})]},n.href))})]})}const ts={title:"React Router v7 で SSG して GitHub Pages にデプロイする",date:"2026-03-26",description:"ssr: false + prerender で完全静的化し、GitHub Actions で gh-pages ブランチに自動デプロイするまでの手順書。カスタムドメイン・OGP 静的注入・動的ルートの列挙も含む。",tags:["Web","React"]};function R(e){const n={a:"a",code:"code",h1:"h1",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"React Router v7 で SSG して GitHub Pages にデプロイする"}),`
`,s.jsx(n.p,{children:"このサイト（asteriskx.net）の構築時に整理した手順をそのまま残しておく。"}),`
`,s.jsx(n.p,{children:"未来の自分が同じ構成を作るときのリファレンスとして。"}),`
`,s.jsx(g,{items:[{label:"プロジェクト作成",href:"#s1"},{label:"SSG に切り替える（react-router.config.ts）",href:"#s2"},{label:"動的ルートを列挙する（ブログ記事など）",href:"#s3"},{label:"静的 HTML に CSS / OGP を直接注入する（vite.config.ts）",href:"#s4"},{label:"MDX を使う場合（ブログ記事）",href:"#s5"},{label:"GitHub Actions でデプロイする",href:"#s6"},{label:"GitHub Pages のブランチ設定（初回のみ）",href:"#s7"},{label:"カスタムドメインの DNS 設定",href:"#s8"},{label:"CNAME ファイルの対応",href:"#s9"},{label:"ハマりポイントまとめ",href:"#s-tips"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s0",children:"最終的な構成"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`remix-app/
  app/
    routes/          # ページルート
    content/blog/    # MDX ブログ記事
  react-router.config.ts  # SSG 設定
  vite.config.ts          # ビルドプラグイン
  public/
    CNAME            # カスタムドメイン設定
.github/
  workflows/
    deploy.yml       # GitHub Actions
`})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"フレームワーク"}),"：React Router v7（",s.jsx(n.code,{children:"@react-router/dev"})," ベース）"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"ビルド成果物"}),"：",s.jsx(n.code,{children:"remix-app/build/client/"})," に全ページの静的 HTML + アセット"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"デプロイ先"}),"：",s.jsx(n.code,{children:"gh-pages"})," ブランチ → GitHub Pages"]}),`
`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"1. プロジェクト作成"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[`npx create-react-router@latest remix-app
`,s.jsx(n.span,{className:"hljs-built_in",children:"cd"}),` remix-app
npm install
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"create-react-router"})," で雛形が生成される。デフォルトは SSR（Node サーバー前提）なので、次の手順で SSG に切り替える。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"2. SSG に切り替える（react-router.config.ts）"}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"react-router.config.ts"})," を以下のように設定する。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"type"})," { ",s.jsx(n.span,{className:"hljs-title class_",children:"Config"})," } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"@react-router/dev/config"'}),`;

`,s.jsx(n.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"default"}),` {
  `,s.jsx(n.span,{className:"hljs-attr",children:"ssr"}),": ",s.jsx(n.span,{className:"hljs-literal",children:"false"}),",          ",s.jsx(n.span,{className:"hljs-comment",children:"// SSR を無効化（クライアントサイドのみ）"}),`
  `,s.jsx(n.span,{className:"hljs-keyword",children:"async"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"prerender"}),"(",s.jsx(n.span,{className:"hljs-params"}),`) {
    `,s.jsx(n.span,{className:"hljs-keyword",children:"return"})," [",s.jsx(n.span,{className:"hljs-string",children:'"/"'}),"];      ",s.jsx(n.span,{className:"hljs-comment",children:"// 静的生成するパスを列挙"}),`
  },
} `,s.jsx(n.span,{className:"hljs-keyword",children:"satisfies"})," ",s.jsx(n.span,{className:"hljs-title class_",children:"Config"}),`;
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"ssr: false"})," にすると ",s.jsx(n.code,{children:"react-router build"})," が完全静的ファイルを吐くようになる。"]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"prerender()"})," に列挙したパスそれぞれの HTML が生成される。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"3. 動的ルートを列挙する（ブログ記事など）"}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"/blog/:slug"})," のような動的ルートは、ビルド時にスラッグを全て列挙して渡す必要がある。"]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"glob"})," で MDX ファイルを走査してスラッグを取り出す。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{className:"hljs language-bash",children:`npm install --save-dev glob
`})}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"type"})," { ",s.jsx(n.span,{className:"hljs-title class_",children:"Config"})," } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"@react-router/dev/config"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { glob } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"glob"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," path ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"path"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { fileURLToPath } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"url"'}),`;

`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," __dirname = path.",s.jsx(n.span,{className:"hljs-title function_",children:"dirname"}),"(",s.jsx(n.span,{className:"hljs-title function_",children:"fileURLToPath"}),"(",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),".",s.jsx(n.span,{className:"hljs-property",children:"meta"}),".",s.jsx(n.span,{className:"hljs-property",children:"url"}),`));

`,s.jsx(n.span,{className:"hljs-keyword",children:"async"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"function"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"getBlogSlugs"}),"(",s.jsx(n.span,{className:"hljs-params"}),"): ",s.jsx(n.span,{className:"hljs-title class_",children:"Promise"}),"<",s.jsx(n.span,{className:"hljs-built_in",children:"string"}),`[]> {
  `,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," files = ",s.jsx(n.span,{className:"hljs-keyword",children:"await"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"glob"}),"(",s.jsx(n.span,{className:"hljs-string",children:'"app/content/blog/*.mdx"'}),", { ",s.jsx(n.span,{className:"hljs-attr",children:"cwd"}),`: __dirname });
  `,s.jsx(n.span,{className:"hljs-keyword",children:"return"})," files.",s.jsx(n.span,{className:"hljs-title function_",children:"map"}),"(",s.jsxs(n.span,{className:"hljs-function",children:["(",s.jsx(n.span,{className:"hljs-params",children:"f"}),") =>"]})," path.",s.jsx(n.span,{className:"hljs-title function_",children:"basename"}),"(f, ",s.jsx(n.span,{className:"hljs-string",children:'".mdx"'}),`));
}

`,s.jsx(n.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"default"}),` {
  `,s.jsx(n.span,{className:"hljs-attr",children:"ssr"}),": ",s.jsx(n.span,{className:"hljs-literal",children:"false"}),`,
  `,s.jsx(n.span,{className:"hljs-keyword",children:"async"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"prerender"}),"(",s.jsx(n.span,{className:"hljs-params"}),`) {
    `,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," slugs = ",s.jsx(n.span,{className:"hljs-keyword",children:"await"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"getBlogSlugs"}),`();
    `,s.jsx(n.span,{className:"hljs-keyword",children:"return"}),` [
      `,s.jsx(n.span,{className:"hljs-string",children:'"/"'}),`,
      `,s.jsx(n.span,{className:"hljs-string",children:'"/blog"'}),`,
      ...slugs.`,s.jsx(n.span,{className:"hljs-title function_",children:"map"}),"(",s.jsxs(n.span,{className:"hljs-function",children:["(",s.jsx(n.span,{className:"hljs-params",children:"s"}),") =>"]})," ",s.jsxs(n.span,{className:"hljs-string",children:["`/blog/",s.jsx(n.span,{className:"hljs-subst",children:"${s}"}),"`"]}),`),
    ];
  },
} `,s.jsx(n.span,{className:"hljs-keyword",children:"satisfies"})," ",s.jsx(n.span,{className:"hljs-title class_",children:"Config"}),`;
`]})}),`
`,s.jsx(n.p,{children:"記事ファイルを追加するたびに自動で列挙されるので、手動管理が不要。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"4. 静的 HTML に CSS / OGP を直接注入する（vite.config.ts）"}),`
`,s.jsxs(n.p,{children:["React Router の ",s.jsx(n.code,{children:"meta()"})," 関数は ",s.jsx(n.strong,{children:"クライアント側で実行される"}),"。"]}),`
`,s.jsx(n.p,{children:"SSG でビルドされた静的 HTML ファイルの中には meta タグが含まれないため、クローラーには OGP が届かない。"}),`
`,s.jsx(n.p,{children:"また、Three.js などの重い描画が走る前に背景色が白く光るいわゆる「白発光」も問題になる。"}),`
`,s.jsxs(n.p,{children:["どちらも Vite の ",s.jsx(n.code,{children:"transformIndexHtml"})," フックで静的 HTML を直接書き換えることで解決できる。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { reactRouter } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"@react-router/dev/vite"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { defineConfig, ",s.jsx(n.span,{className:"hljs-keyword",children:"type"})," ",s.jsx(n.span,{className:"hljs-title class_",children:"Plugin"})," } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"vite"'}),`;

`,s.jsx(n.span,{className:"hljs-keyword",children:"function"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"injectCriticalBg"}),"(",s.jsx(n.span,{className:"hljs-params"}),"): ",s.jsx(n.span,{className:"hljs-title class_",children:"Plugin"}),` {
  `,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," ",s.jsx(n.span,{className:"hljs-variable constant_",children:"SITE_URL"}),"  = ",s.jsx(n.span,{className:"hljs-string",children:'"https://example.com"'}),`;
  `,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," ",s.jsx(n.span,{className:"hljs-variable constant_",children:"OGP_IMAGE"})," = ",s.jsxs(n.span,{className:"hljs-string",children:["`",s.jsx(n.span,{className:"hljs-subst",children:"${SITE_URL}"}),"/assets/image/ogp.png`"]}),`;

  `,s.jsx(n.span,{className:"hljs-keyword",children:"const"}),` ogpTags = [
    `,s.jsx(n.span,{className:"hljs-string",children:'`<meta property="og:type"        content="website">`'}),`,
    `,s.jsxs(n.span,{className:"hljs-string",children:['`<meta property="og:url"         content="',s.jsx(n.span,{className:"hljs-subst",children:"${SITE_URL}"}),'">`']}),`,
    `,s.jsx(n.span,{className:"hljs-string",children:'`<meta property="og:title"       content="サイトタイトル">`'}),`,
    `,s.jsx(n.span,{className:"hljs-string",children:'`<meta property="og:description" content="サイト説明">`'}),`,
    `,s.jsxs(n.span,{className:"hljs-string",children:['`<meta property="og:image"       content="',s.jsx(n.span,{className:"hljs-subst",children:"${OGP_IMAGE}"}),'">`']}),`,
    `,s.jsx(n.span,{className:"hljs-string",children:'`<meta name="twitter:card"       content="summary_large_image">`'}),`,
    `,s.jsx(n.span,{className:"hljs-string",children:'`<meta name="twitter:site"       content="@yourhandle">`'}),`,
    `,s.jsxs(n.span,{className:"hljs-string",children:['`<meta name="twitter:image"      content="',s.jsx(n.span,{className:"hljs-subst",children:"${OGP_IMAGE}"}),'">`']}),`,
  ].`,s.jsx(n.span,{className:"hljs-title function_",children:"join"}),"(",s.jsx(n.span,{className:"hljs-string",children:'""'}),`);

  `,s.jsx(n.span,{className:"hljs-keyword",children:"return"}),` {
    `,s.jsx(n.span,{className:"hljs-attr",children:"name"}),": ",s.jsx(n.span,{className:"hljs-string",children:'"inject-critical-bg"'}),`,
    `,s.jsx(n.span,{className:"hljs-title function_",children:"transformIndexHtml"}),"(",s.jsx(n.span,{className:"hljs-params",children:"html"}),`) {
      `,s.jsx(n.span,{className:"hljs-comment",children:"// color-scheme: dark でスクロールバー等のシステム UI も暗色に統一できる"}),`
      `,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," criticalCss = ",s.jsx(n.span,{className:"hljs-string",children:"`<style>html,body{background:#181c2a;color-scheme:dark}</style>`"}),`;
      `,s.jsx(n.span,{className:"hljs-keyword",children:"return"})," html.",s.jsx(n.span,{className:"hljs-title function_",children:"replace"}),"(",s.jsx(n.span,{className:"hljs-string",children:'"<head>"'}),", ",s.jsxs(n.span,{className:"hljs-string",children:["`<head>",s.jsx(n.span,{className:"hljs-subst",children:"${criticalCss}"}),s.jsx(n.span,{className:"hljs-subst",children:"${ogpTags}"}),"`"]}),`);
    },
  };
}

`,s.jsx(n.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"default"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"defineConfig"}),`({
  `,s.jsx(n.span,{className:"hljs-attr",children:"plugins"}),`: [
    `,s.jsx(n.span,{className:"hljs-title function_",children:"injectCriticalBg"}),`(),
    `,s.jsx(n.span,{className:"hljs-title function_",children:"reactRouter"}),`(),
  ],
});
`]})}),`
`,s.jsxs(n.p,{children:["ポイントは ",s.jsxs(n.strong,{children:[s.jsx(n.code,{children:"reactRouter()"})," より前にプラグインを置くこと"]}),"。"]}),`
`,s.jsx(n.p,{children:"後ろに置くと HTML の変換タイミングがずれる場合がある。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"5. MDX を使う場合（ブログ記事）"}),`
`,s.jsx(n.p,{children:"MDX でブログ記事を書く場合は以下のパッケージを追加する。"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{className:"hljs language-bash",children:`npm install --save-dev @mdx-js/rollup @types/mdx remark-frontmatter remark-mdx-frontmatter remark-gfm rehype-highlight
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"パッケージ"}),s.jsx(n.th,{children:"役割"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"@mdx-js/rollup"})}),s.jsx(n.td,{children:"Vite で MDX をバンドルする"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"@types/mdx"})}),s.jsx(n.td,{children:"MDX ファイルを TypeScript から import したときの型エラーを解消する"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"remark-frontmatter"})}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"---"})," で囲まれた frontmatter を解析する"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"remark-mdx-frontmatter"})}),s.jsx(n.td,{children:"frontmatter を MDX の export として使えるようにする"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"remark-gfm"})}),s.jsx(n.td,{children:"テーブル・チェックボックスなど GitHub Flavored Markdown を有効にする"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.code,{children:"rehype-highlight"})}),s.jsx(n.td,{children:"コードブロックにシンタックスハイライトを適用する"})]})]})]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"vite.config.ts"})," に ",s.jsx(n.code,{children:"mdx()"})," プラグインを追加する。",s.jsxs(n.strong,{children:[s.jsx(n.code,{children:"reactRouter()"})," より前に置くこと"]}),"。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { reactRouter } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"@react-router/dev/vite"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," mdx ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"@mdx-js/rollup"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," remarkFrontmatter ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"remark-frontmatter"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," remarkMdxFrontmatter ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"remark-mdx-frontmatter"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," remarkGfm ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"remark-gfm"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," rehypeHighlight ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"rehype-highlight"'}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," { defineConfig } ",s.jsx(n.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(n.span,{className:"hljs-string",children:'"vite"'}),`;

`,s.jsx(n.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"default"})," ",s.jsx(n.span,{className:"hljs-title function_",children:"defineConfig"}),`({
  `,s.jsx(n.span,{className:"hljs-attr",children:"plugins"}),`: [
    `,s.jsx(n.span,{className:"hljs-title function_",children:"mdx"}),`({
      `,s.jsx(n.span,{className:"hljs-attr",children:"remarkPlugins"}),`: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      `,s.jsx(n.span,{className:"hljs-attr",children:"rehypePlugins"}),`: [rehypeHighlight],
    }),
    `,s.jsx(n.span,{className:"hljs-title function_",children:"reactRouter"}),`(),
  ],
});
`]})}),`
`,s.jsx(n.p,{children:"frontmatter の型定義を用意しておくと各ルートで使いやすい。"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// app/types.ts"}),`
`,s.jsx(n.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"interface"})," ",s.jsx(n.span,{className:"hljs-title class_",children:"PostFrontmatter"}),` {
  `,s.jsx(n.span,{className:"hljs-attr",children:"title"}),": ",s.jsx(n.span,{className:"hljs-built_in",children:"string"}),`;
  `,s.jsx(n.span,{className:"hljs-attr",children:"date"}),": ",s.jsx(n.span,{className:"hljs-built_in",children:"string"}),`;
  `,s.jsx(n.span,{className:"hljs-attr",children:"description"}),": ",s.jsx(n.span,{className:"hljs-built_in",children:"string"}),`;
}
`]})}),`
`,s.jsxs(n.p,{children:["記事ファイルは ",s.jsx(n.code,{children:"app/content/blog/yyyymmdd-タイトル.mdx"})," の形式で作成する。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{className:"hljs language-mdx",children:`---
title: "記事タイトル"
date: "2026-01-01"
description: "記事の説明"
---

# 記事タイトル

本文...
`})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"rehype-highlight"})," はコードブロックにクラスを付与するだけなので、別途テーマの CSS を import する必要がある。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// root.tsx などエントリーポイントで import する"}),`
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(n.span,{className:"hljs-string",children:'"highlight.js/styles/github-dark.css"'}),`;
`]})}),`
`,s.jsxs(n.p,{children:["テーマは highlight.js のデモページ（",s.jsx(n.a,{href:"https://highlightjs.org/demo%EF%BC%89%E3%81%A7%E7%A2%BA%E8%AA%8D%E3%81%A7%E3%81%8D%E3%82%8B%E3%80%82",children:"https://highlightjs.org/demo）で確認できる。"})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"6. GitHub Actions でデプロイする"}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:".github/workflows/deploy.yml"})," を作成する。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-yaml",children:[s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Build"})," ",s.jsx(n.span,{className:"hljs-string",children:"and"})," ",s.jsx(n.span,{className:"hljs-string",children:"Deploy"}),`

`,s.jsx(n.span,{className:"hljs-attr",children:"on:"}),`
  `,s.jsx(n.span,{className:"hljs-attr",children:"push:"}),`
    `,s.jsx(n.span,{className:"hljs-attr",children:"branches:"})," [",s.jsx(n.span,{className:"hljs-string",children:"master"}),`]

`,s.jsx(n.span,{className:"hljs-attr",children:"permissions:"}),`
  `,s.jsx(n.span,{className:"hljs-attr",children:"contents:"})," ",s.jsx(n.span,{className:"hljs-string",children:"write"}),`

`,s.jsx(n.span,{className:"hljs-attr",children:"jobs:"}),`
  `,s.jsx(n.span,{className:"hljs-attr",children:"build-deploy:"}),`
    `,s.jsx(n.span,{className:"hljs-attr",children:"runs-on:"})," ",s.jsx(n.span,{className:"hljs-string",children:"ubuntu-latest"}),`
    `,s.jsx(n.span,{className:"hljs-attr",children:"defaults:"}),`
      `,s.jsx(n.span,{className:"hljs-attr",children:"run:"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"working-directory:"})," ",s.jsx(n.span,{className:"hljs-string",children:"remix-app"}),"   ",s.jsx(n.span,{className:"hljs-comment",children:"# remix-app/ 配下でコマンドを実行"}),`

    `,s.jsx(n.span,{className:"hljs-attr",children:"steps:"}),`
      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"uses:"})," ",s.jsx(n.span,{className:"hljs-string",children:"actions/checkout@v4"}),`

      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"uses:"})," ",s.jsx(n.span,{className:"hljs-string",children:"actions/setup-node@v4"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"with:"}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"node-version:"})," ",s.jsx(n.span,{className:"hljs-string",children:'"20"'}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"cache:"})," ",s.jsx(n.span,{className:"hljs-string",children:'"npm"'}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"cache-dependency-path:"})," ",s.jsx(n.span,{className:"hljs-string",children:"remix-app/package-lock.json"}),`

      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Install"})," ",s.jsx(n.span,{className:"hljs-string",children:"dependencies"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"run:"})," ",s.jsx(n.span,{className:"hljs-string",children:"npm"})," ",s.jsx(n.span,{className:"hljs-string",children:"ci"}),`

      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Build"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"run:"})," ",s.jsx(n.span,{className:"hljs-string",children:"npm"})," ",s.jsx(n.span,{className:"hljs-string",children:"run"})," ",s.jsx(n.span,{className:"hljs-string",children:"build"}),`

      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Copy"})," ",s.jsx(n.span,{className:"hljs-string",children:"CNAME"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"run:"})," ",s.jsx(n.span,{className:"hljs-string",children:"cp"})," ",s.jsx(n.span,{className:"hljs-string",children:"public/CNAME"})," ",s.jsx(n.span,{className:"hljs-string",children:"build/client/CNAME"}),"   ",s.jsx(n.span,{className:"hljs-comment",children:"# カスタムドメインを維持する（後述）"}),`

      `,s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Deploy"})," ",s.jsx(n.span,{className:"hljs-string",children:"to"})," ",s.jsx(n.span,{className:"hljs-string",children:"gh-pages"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"uses:"})," ",s.jsx(n.span,{className:"hljs-string",children:"peaceiris/actions-gh-pages@v4"}),`
        `,s.jsx(n.span,{className:"hljs-attr",children:"with:"}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"github_token:"})," ",s.jsx(n.span,{className:"hljs-string",children:"${{"})," ",s.jsx(n.span,{className:"hljs-string",children:"secrets.GITHUB_TOKEN"})," ",s.jsx(n.span,{className:"hljs-string",children:"}}"}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"publish_dir:"})," ",s.jsx(n.span,{className:"hljs-string",children:"remix-app/build/client"}),"      ",s.jsx(n.span,{className:"hljs-comment",children:"# ビルド成果物のディレクトリ"}),`
          `,s.jsx(n.span,{className:"hljs-attr",children:"force_orphan:"})," ",s.jsx(n.span,{className:"hljs-literal",children:"true"}),"                        ",s.jsx(n.span,{className:"hljs-comment",children:"# gh-pages ブランチを常にリセット"}),`
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"force_orphan: true"})," にしておくと ",s.jsx(n.code,{children:"gh-pages"})," ブランチに余計なコミット履歴が積まれない。"]}),`
`,s.jsx(n.p,{children:"デプロイのたびに差分なしで完全上書きされるので管理が楽。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"7. GitHub Pages のブランチ設定（初回のみ）"}),`
`,s.jsx(n.p,{children:"Actions でデプロイしても、GitHub Pages 側でブランチを指定しないと公開されない。初回だけ以下の設定が必要。"}),`
`,s.jsxs(n.ol,{children:[`
`,s.jsxs(n.li,{children:["リポジトリの ",s.jsx(n.strong,{children:"Settings"})," → ",s.jsx(n.strong,{children:"Pages"})," を開く"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"Source"})," を ",s.jsx(n.code,{children:"Deploy from a branch"})," に設定"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"Branch"})," を ",s.jsx(n.code,{children:"gh-pages"})," / ",s.jsx(n.code,{children:"(root)"})," に設定して Save"]}),`
`]}),`
`,s.jsx(n.p,{children:"以降は master へのプッシュで自動デプロイされる。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"8. カスタムドメインの DNS 設定"}),`
`,s.jsx(n.p,{children:"カスタムドメインを使う場合、ドメインレジストラ側で DNS レコードを設定する必要がある。"}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"サブドメイン（www など）の場合：CNAME レコード"})}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`www.example.com  →  username.github.io
`})}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"apex ドメイン（example.com そのもの）の場合：A レコード × 4件"})}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`example.com  →  185.199.108.153
example.com  →  185.199.109.153
example.com  →  185.199.110.153
example.com  →  185.199.111.153
`})}),`
`,s.jsx(n.p,{children:"DNS の反映には数分〜数時間かかる場合がある。"}),`
`,s.jsxs(n.p,{children:["設定後、GitHub リポジトリの ",s.jsx(n.strong,{children:"Settings → Pages → Custom domain"})," にドメインを入力して Save する。"]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"Enforce HTTPS"})," のチェックボックスも有効にしておくこと（証明書の発行に数分かかる場合がある）。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s9",children:"9. CNAME ファイルの対応"}),`
`,s.jsxs(n.p,{children:["GitHub Pages でカスタムドメインを使う場合、",s.jsx(n.code,{children:"gh-pages"})," ブランチのルートに ",s.jsx(n.code,{children:"CNAME"})," ファイルが必要。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`remix-app/public/CNAME
`})}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`example.com
`})}),`
`,s.jsxs(n.p,{children:["ただし ",s.jsx(n.code,{children:"force_orphan: true"})," でデプロイするたびブランチがリセットされるので、ビルド後に明示的にコピーしないと CNAME が消えてカスタムドメインが外れてしまう。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-yaml",children:[s.jsx(n.span,{className:"hljs-bullet",children:"-"})," ",s.jsx(n.span,{className:"hljs-attr",children:"name:"})," ",s.jsx(n.span,{className:"hljs-string",children:"Copy"})," ",s.jsx(n.span,{className:"hljs-string",children:"CNAME"}),`
  `,s.jsx(n.span,{className:"hljs-attr",children:"run:"})," ",s.jsx(n.span,{className:"hljs-string",children:"cp"})," ",s.jsx(n.span,{className:"hljs-string",children:"public/CNAME"})," ",s.jsx(n.span,{className:"hljs-string",children:"build/client/CNAME"}),`
`]})}),`
`,s.jsxs(n.p,{children:["このステップを忘れると、プッシュのたびにドメインが ",s.jsx(n.code,{children:"*.github.io"})," に戻る。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s-tips",children:"ハマりポイントまとめ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"問題"}),s.jsx(n.th,{children:"原因"}),s.jsx(n.th,{children:"解決策"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"OGP タグがクローラーに読まれない"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"meta()"})," はクライアント実行で静的 HTML には含まれない"]}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"transformIndexHtml"})," で直接注入"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"白発光（背景が一瞬白くなる）"}),s.jsx(n.td,{children:"JS 読み込み前の背景色が未設定"}),s.jsxs(n.td,{children:["critical CSS を ",s.jsx(n.code,{children:"transformIndexHtml"})," で注入"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Actions でデプロイしても公開されない"}),s.jsx(n.td,{children:"GitHub Pages 側のブランチ設定が未完了"}),s.jsxs(n.td,{children:["Settings → Pages で ",s.jsx(n.code,{children:"gh-pages"})," を指定"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"カスタムドメインが繋がらない"}),s.jsx(n.td,{children:"DNS レコード未設定、または反映待ち"}),s.jsx(n.td,{children:"A レコード × 4 または CNAME レコードを設定して待つ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"カスタムドメインがデプロイのたびに外れる"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"force_orphan"})," で CNAME が消える"]}),s.jsxs(n.td,{children:["ビルド後に ",s.jsx(n.code,{children:"cp public/CNAME build/client/CNAME"})]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"動的ルートの HTML が生成されない"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"prerender()"})," に列挙されていない"]}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"glob"})," でスラッグを列挙して渡す"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"MDX テーブルが崩れる"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"remark-gfm"})," が未設定"]}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"vite.config.ts"})," の ",s.jsx(n.code,{children:"remarkPlugins"})," に追加"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"コードブロックに色がつかない"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"rehype-highlight"})," の CSS が未 import"]}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"root.tsx"})," で ",s.jsx(n.code,{children:"highlight.js/styles/xxx.css"})," を import"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"MDX を import すると型エラー"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"@types/mdx"})," が未インストール"]}),s.jsx(n.td,{children:s.jsx(n.code,{children:"npm install --save-dev @types/mdx"})})]})]})]})]})}function js(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(R,{...e})}):R(e)}const xs=Object.freeze(Object.defineProperty({__proto__:null,default:js,frontmatter:ts},Symbol.toStringTag,{value:"Module"}));function as({height:e=420}){const n=l.useRef(null),r=l.useRef(null);return l.useEffect(()=>{let c=null,o=null;return(async()=>{const t=await E(()=>import("./three.module-CpB-wl7P.js"),[]),{initBgDemo:i}=await E(async()=>{const{initBgDemo:h}=await import("./initBgDemo-B2-49WjR.js");return{initBgDemo:h}},[]);!n.current||!r.current||(o=i(r.current,n.current,t,h=>{c=h}))})(),()=>{c!==null&&cancelAnimationFrame(c),o?.()}},[]),s.jsx("div",{ref:n,className:"bg-demo-container",style:{height:e},children:s.jsx("canvas",{ref:r,className:"bg-demo-canvas"})})}const os={title:"Three.js パーティクル背景の実装メモ",date:"2026-03-26",description:"ポートフォリオ背景の Three.js パーティクルアニメーション実装記録。Ping-Pong RT・フェーズサイクル・Sobel NMS エッジ検出・雨滴波紋エフェクトまで。",tags:["Web","Three.js"]};function O(e){const n={code:"code",h1:"h1",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"Three.js パーティクル背景の実装メモ"}),`
`,s.jsx(g,{items:[{label:"完成形と概要",href:"#s1"},{label:"ファイル構成",href:"#s2"},{label:"SSG との統合",href:"#s3"},{label:"Ping-Pong レンダーターゲット",href:"#s4"},{label:"フェーズサイクル",href:"#s5"},{label:"アイコンエッジ検出（Sobel + NMS）",href:"#s6"},{label:"雨滴波紋エフェクト",href:"#s7"},{label:"ハマりポイントまとめ",href:"#s8"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"01. 完成形と概要"}),`
`,s.jsx(n.p,{children:`このサイトの背景で動いているパーティクルアニメーション、地味に作り込んでいる。
下のデモで触れるので試してみてほしい（クリックで波紋が広がる）。`}),`
`,s.jsx(as,{height:420}),`
`,s.jsx(n.p,{children:"ざっくり何が起きているかというと："}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"2800 個のパーティクルが螺旋を描きながら自分のアイコン形状に収束していく"}),`
`,s.jsx(n.li,{children:"収束後は脈動しながらアイコンを形成し続ける（FORMED フェーズ）"}),`
`,s.jsx(n.li,{children:"一定時間後に爆散、また収束を繰り返す"}),`
`,s.jsx(n.li,{children:"収束・爆散中はパーティクルにトレイル（尾）がつく"}),`
`,s.jsx(n.li,{children:"FORMED 中は雨滴が背景星を揺らす波紋エフェクトが入る"}),`
`,s.jsx(n.li,{children:"クリックすると波紋リングがスポーンする"}),`
`]}),`
`,s.jsxs(n.p,{children:["技術的に面白かったのは ",s.jsx(n.strong,{children:"トレイル残像の実装"}),"（Ping-Pong RT）と ",s.jsx(n.strong,{children:"アイコン形状の抽出"}),"（Sobel NMS）の2点。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"02. ファイル構成"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`remix-app/app/
  components/
    BgCanvas.tsx     # React コンポーネント（useEffect でキャンバス管理）
  lib/
    initBg.ts        # Three.js アニメーション本体（純粋な TS ロジック）
`})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"BgCanvas.tsx"}),` は React の責務だけを担う薄いラッパー。
キャンバス要素の ref 管理・動的 import・クリーンアップのみ。`]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"initBg.ts"}),` が実体。
Three.js を引数で受け取る関数として設計しているのは、SSG ビルド時（Node.js 環境）に `,s.jsx(n.code,{children:'import "three"'})," が実行されないようにするため。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// BgCanvas.tsx の useEffect 内"}),`
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," ",s.jsx(n.span,{className:"hljs-variable constant_",children:"THREE"})," = ",s.jsx(n.span,{className:"hljs-keyword",children:"await"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),"(",s.jsx(n.span,{className:"hljs-string",children:'"three"'}),`);
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," { initBg } = ",s.jsx(n.span,{className:"hljs-keyword",children:"await"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),"(",s.jsx(n.span,{className:"hljs-string",children:'"../lib/initBg"'}),`);
cleanup = `,s.jsx(n.span,{className:"hljs-title function_",children:"initBg"}),"(canvasRef.",s.jsx(n.span,{className:"hljs-property",children:"current"}),", ",s.jsx(n.span,{className:"hljs-variable constant_",children:"THREE"}),`, iconDataUrls, onFrame);
`]})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"03. SSG との統合"}),`
`,s.jsxs(n.p,{children:[`React Router v7 の SSG では、ページは Node.js でビルド時に HTML 化される。
`,s.jsx(n.code,{children:"window"})," も ",s.jsx(n.code,{children:"document"})," も存在しないので、Three.js を普通に import するとビルドが落ちる。"]}),`
`,s.jsxs(n.p,{children:["解決策は ",s.jsxs(n.strong,{children:[s.jsx(n.code,{children:"ClientOnly"})," コンポーネント + 動的 import"]})," の組み合わせ。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-tsx",children:[s.jsx(n.span,{className:"hljs-comment",children:"// root.tsx"}),`
<`,s.jsx(n.span,{className:"hljs-title class_",children:"ClientOnly"})," fallback={",s.jsx(n.span,{className:"hljs-literal",children:"null"}),`}>
  {`,s.jsx(n.span,{className:"hljs-function",children:"() =>"})," ",s.jsx(n.span,{className:"xml",children:s.jsxs(n.span,{className:"hljs-tag",children:["<",s.jsx(n.span,{className:"hljs-name",children:"BgCanvas"})," />"]})}),`}
</`,s.jsx(n.span,{className:"hljs-title class_",children:"ClientOnly"}),`>
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"ClientOnly"})," はブラウザでのみレンダリングし、",s.jsx(n.code,{children:"BgCanvas"})," 内の ",s.jsx(n.code,{children:"useEffect"})," で ",s.jsx(n.code,{children:'import("three")'})," を呼ぶことで、Three.js のコードが Node.js に触れることはない。"]}),`
`,s.jsxs(n.p,{children:["さらに ",s.jsx(n.code,{children:"BgCanvas"})," を root.tsx に置いてページ遷移でも ",s.jsx(n.strong,{children:"アンマウントしない"}),` ようにしている。
ページ移動のたびに Three.js の初期化・破棄が走るのを防ぐため。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"04. Ping-Pong レンダーターゲット"}),`
`,s.jsxs(n.p,{children:["パーティクルに ",s.jsx(n.strong,{children:"尾（トレイル）"}),` をつけたかった。
普通に `,s.jsx(n.code,{children:"requestAnimationFrame"})," でキャンバスをクリアしながら描くと残像は残らない。"]}),`
`,s.jsxs(n.p,{children:["解決策が ",s.jsx(n.strong,{children:"Ping-Pong レンダーターゲット"}),"（RTT）。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`フレーム N の処理:
  rtA に描画開始
    └─ rtB（前フレーム）をブリット
    └─ フェードクワッド（背景色へ少し近づける）で rtB を薄める
    └─ 星・パーティクルを描画
  rtA を画面に出力
  rtA と rtB をスワップ（次フレームの「前フレーム」が rtA になる）
`})}),`
`,s.jsxs(n.p,{children:[`毎フレーム前フレームを少し暗くして重ねることで、自然にフェードする残像が生まれる。
`,s.jsx(n.code,{children:"fadeMat.opacity"})," をフェーズごとに変えることで、GATHERING 中は残像を短く・DISPERSING 中は長くしている。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:["fadeMat.",s.jsx(n.span,{className:"hljs-property",children:"opacity"})," = phase === ",s.jsx(n.span,{className:"hljs-string",children:'"GATHERING"'})," ? ",s.jsx(n.span,{className:"hljs-number",children:"0.28"})," : phase === ",s.jsx(n.span,{className:"hljs-string",children:'"DISPERSING"'})," ? ",s.jsx(n.span,{className:"hljs-number",children:"0.22"})," : ",s.jsx(n.span,{className:"hljs-number",children:"0.12"}),`;
`]})}),`
`,s.jsx(n.p,{children:"数値が大きいほど「前フレームを強く暗くする」→ トレイルが短くなる。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"05. フェーズサイクル"}),`
`,s.jsx(n.p,{children:"アニメーションは 4 フェーズのループで管理している。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フェーズ"}),s.jsx(n.th,{children:"フレーム数"}),s.jsx(n.th,{children:"内容"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"FLYING"}),s.jsx(n.td,{children:"120"}),s.jsx(n.td,{children:"不可視。画像ロード中に円ターゲットへ事前収束させる準備フェーズ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"GATHERING"}),s.jsx(n.td,{children:"300"}),s.jsx(n.td,{children:"螺旋を描きながらアイコン形状へ収束。トレイルあり"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"FORMED"}),s.jsx(n.td,{children:"300"}),s.jsx(n.td,{children:"アイコン形状を維持しつつ脈動。雨滴波紋が入る"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"DISPERSING"}),s.jsx(n.td,{children:"100"}),s.jsx(n.td,{children:"初期シェイク → 中心から爆散。トレイルあり"})]})]})]}),`
`,s.jsxs(n.p,{children:["実際には ",s.jsx(n.strong,{children:"FLYING は起動時の1回だけ"}),"で、以降は ",s.jsx(n.code,{children:"GATHERING → FORMED → DISPERSING → GATHERING ..."})," のループ。"]}),`
`,s.jsx(n.p,{children:"GATHERING フェーズの螺旋は、目標方向に垂直な速度成分を加えることで実現している。"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// 螺旋成分：目標方向に垂直な速度を加え銀河の腕のような軌跡を生む"}),`
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," spiralStrength = ",s.jsx(n.span,{className:"hljs-title class_",children:"Math"}),".",s.jsx(n.span,{className:"hljs-title function_",children:"max"}),"(",s.jsx(n.span,{className:"hljs-number",children:"0"}),", ",s.jsx(n.span,{className:"hljs-number",children:"1.0"})," - progress * ",s.jsx(n.span,{className:"hljs-number",children:"1.5"}),") * ",s.jsx(n.span,{className:"hljs-number",children:"0.12"}),`;
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"}),` perpX = -dy / dist;
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"}),` perpY =  dx / dist;
p.`,s.jsx(n.span,{className:"hljs-property",children:"x"})," += (p.",s.jsx(n.span,{className:"hljs-property",children:"tx"})," - p.",s.jsx(n.span,{className:"hljs-property",children:"x"}),") * lerpT + perpX * ",s.jsx(n.span,{className:"hljs-title class_",children:"Math"}),".",s.jsx(n.span,{className:"hljs-title function_",children:"min"}),"(dist, ",s.jsx(n.span,{className:"hljs-number",children:"80"}),`) * spiralStrength;
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"progress"})," が上がるにつれ螺旋成分がゼロになり、最終的に直線収束に切り替わる。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"06. アイコンエッジ検出（Sobel + NMS）"}),`
`,s.jsxs(n.p,{children:["パーティクルの収束先（ターゲット座標）はアイコン PNG の ",s.jsx(n.strong,{children:"エッジ"}),` から抽出している。
単純にランダムサンプリングすると塗りつぶしになって輪郭感が出ない。`]}),`
`,s.jsx(n.p,{children:"処理の流れ："}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"① Sobel フィルタで勾配計算"})}),`
`,s.jsx(n.p,{children:"各ピクセルの輝度に 3×3 Sobel カーネルを適用し、エッジの強さ（magnitude）と方向（gradX/gradY）を求める。"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"const"})," gx = -neighbors[",s.jsx(n.span,{className:"hljs-number",children:"0"}),"] - ",s.jsx(n.span,{className:"hljs-number",children:"2"})," * neighbors[",s.jsx(n.span,{className:"hljs-number",children:"3"}),"] - neighbors[",s.jsx(n.span,{className:"hljs-number",children:"5"}),`]
         +  neighbors[`,s.jsx(n.span,{className:"hljs-number",children:"2"}),"] + ",s.jsx(n.span,{className:"hljs-number",children:"2"})," * neighbors[",s.jsx(n.span,{className:"hljs-number",children:"4"}),"] + neighbors[",s.jsx(n.span,{className:"hljs-number",children:"7"}),`];
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," gy = -neighbors[",s.jsx(n.span,{className:"hljs-number",children:"0"}),"] - ",s.jsx(n.span,{className:"hljs-number",children:"2"})," * neighbors[",s.jsx(n.span,{className:"hljs-number",children:"1"}),"] - neighbors[",s.jsx(n.span,{className:"hljs-number",children:"2"}),`]
         +  neighbors[`,s.jsx(n.span,{className:"hljs-number",children:"5"}),"] + ",s.jsx(n.span,{className:"hljs-number",children:"2"})," * neighbors[",s.jsx(n.span,{className:"hljs-number",children:"6"}),"] + neighbors[",s.jsx(n.span,{className:"hljs-number",children:"7"}),`];
`]})}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"② 非最大値抑制（NMS）でエッジを 1px に細線化"})}),`
`,s.jsx(n.p,{children:`Sobel だけだと境界が数ピクセル幅になる。
勾配方向の前後ピクセルと比較し、極大でないピクセルを捨てることで 1px のエッジだけ残す。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"③ アルファ境界を追加サンプリング"})}),`
`,s.jsxs(n.p,{children:[`PNG の不透明→透明の境界ピクセルは Sobel では拾えない場合がある。
`,s.jsx(n.code,{children:"alpha >= 30"})," かつ隣接ピクセルに ",s.jsx(n.code,{children:"alpha < 30"})," があるピクセルを 2 倍の密度で追加している。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-keyword",children:"const"}),` onAlphaBoundary =
  `,s.jsx(n.span,{className:"hljs-title function_",children:"alpha"}),"(x, y) >= ",s.jsx(n.span,{className:"hljs-number",children:"30"}),` &&
  (`,s.jsx(n.span,{className:"hljs-title function_",children:"alpha"}),"(x - ",s.jsx(n.span,{className:"hljs-number",children:"1"}),", y) < ",s.jsx(n.span,{className:"hljs-number",children:"30"})," || ",s.jsx(n.span,{className:"hljs-title function_",children:"alpha"}),"(x + ",s.jsx(n.span,{className:"hljs-number",children:"1"}),", y) < ",s.jsx(n.span,{className:"hljs-number",children:"30"}),` || ...);
`,s.jsx(n.span,{className:"hljs-keyword",children:"if"}),` (onAlphaBoundary) {
  pts.`,s.jsx(n.span,{className:"hljs-title function_",children:"push"}),"(...); pts.",s.jsx(n.span,{className:"hljs-title function_",children:"push"}),"(...); ",s.jsx(n.span,{className:"hljs-comment",children:"// 2倍密度"}),`
}
`]})}),`
`,s.jsxs(n.p,{children:["NMS threshold は ",s.jsx(n.code,{children:"26"}),`。
低すぎるとノイズだらけ、高すぎると細部が消える。
チューニングの結果この値に落ち着いた。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"07. 雨滴波紋エフェクト"}),`
`,s.jsx(n.p,{children:"FORMED フェーズ中、300〜600ms ランダム間隔で画面内にランダムな「雨滴」をスポーンさせ、背景星（bgStars）に衝撃を与えて揺らすエフェクト。"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// 近距離での爆発的な力を抑えるため上限 5 でクランプ"}),`
`,s.jsx(n.span,{className:"hljs-keyword",children:"const"})," force = ",s.jsx(n.span,{className:"hljs-title class_",children:"Math"}),".",s.jsx(n.span,{className:"hljs-title function_",children:"min"}),"((drop.",s.jsx(n.span,{className:"hljs-property",children:"strength"})," * ",s.jsx(n.span,{className:"hljs-number",children:"40"}),") / (wd * ",s.jsx(n.span,{className:"hljs-number",children:"0.03"})," + ",s.jsx(n.span,{className:"hljs-number",children:"1"}),"), ",s.jsx(n.span,{className:"hljs-number",children:"5"}),`);
star.`,s.jsx(n.span,{className:"hljs-property",children:"vx"}),` += (wx / wd) * force;
star.`,s.jsx(n.span,{className:"hljs-property",children:"vy"}),` += (wy / wd) * force;
`]})}),`
`,s.jsxs(n.p,{children:["雨滴の ",s.jsx(n.code,{children:"strength"})," は毎フレーム ",s.jsx(n.code,{children:"* 0.97"})," で減衰し、",s.jsx(n.code,{children:"0.05"}),` を下回ったら配列から除去。
星は波紋後に元の位置へスプリング力で戻る。`]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-ts",children:[s.jsx(n.span,{className:"hljs-comment",children:"// 元位置への引き戻し"}),`
star.`,s.jsx(n.span,{className:"hljs-property",children:"vx"})," += (star.",s.jsx(n.span,{className:"hljs-property",children:"ox"})," - star.",s.jsx(n.span,{className:"hljs-property",children:"x"}),") * ",s.jsx(n.span,{className:"hljs-number",children:"0.02"}),`;
star.`,s.jsx(n.span,{className:"hljs-property",children:"vx"})," *= ",s.jsx(n.span,{className:"hljs-number",children:"0.88"}),"; ",s.jsx(n.span,{className:"hljs-comment",children:"// 減衰"}),`
`]})}),`
`,s.jsx(n.p,{children:`パーティクル本体はノータッチ。
背景星だけを揺らすことで、「水面に雨が落ちてアイコンの周りが揺れる」ような演出になっている。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"08. ハマりポイントまとめ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"問題"}),s.jsx(n.th,{children:"原因"}),s.jsx(n.th,{children:"解決策"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"起動時に白く発光する"}),s.jsx(n.td,{children:"WebGL デフォルト状態でキャンバスが白になる"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"setClearColor(0x181c2a)"})," + ",s.jsx(n.code,{children:"clear()"})," をレンダラー生成直後に実行"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ページ遷移後も白発光する"}),s.jsx(n.td,{children:"JS 停止後にブラウザがバッファを破棄する"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"preserveDrawingBuffer: true"})," + ",s.jsx(n.code,{children:"pagehide"})," で暗色クリアを確定描画"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Sobel が透明ピクセルで誤反応"}),s.jsx(n.td,{children:"アルファ=0 のピクセルを輝度 0 として計算してしまう"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"alpha < 30"})," のピクセルを ",s.jsx(n.code,{children:"-1"})," 扱いにして近傍に含む場合はスキップ"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"タイル・星の X/Y 座標変換を共通化したら歪んだ"}),s.jsx(n.td,{children:"アスペクト比が 1:1 でないのに同一スケールを使っていた"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"toWorldX"})," / ",s.jsx(n.code,{children:"toWorldY"})," を X・Y で完全に独立させる"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"GATHERING → FORMED でトレイル残像が矩形に見える"}),s.jsx(n.td,{children:"前フレームのトレイル積算が残る"}),s.jsx(n.td,{children:"フェーズ切り替え 1 フレーム目に rtA/rtB を両方クリア"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"DISPERSING 開始直後に矩形パーティクルが瞬間出現"}),s.jsx(n.td,{children:"円マスクが即座に外れる"}),s.jsx(n.td,{children:"DISPERSING 序盤は FORMED と同じ円マスクを継続し progress に応じて徐々に解除"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"アイコン切り替え後もパーティクルが前のアイコン形状を保持"}),s.jsxs(n.td,{children:[s.jsx(n.code,{children:"iconTargets.length > 0"})," の guard で上書きをスキップしていた"]}),s.jsxs(n.td,{children:["guard を外して ",s.jsx(n.code,{children:"i === 0"})," のロード完了時に必ず ",s.jsx(n.code,{children:"iconTargets"})," を上書き"]})]})]})]})]})}function ps(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(O,{...e})}):O(e)}const ms=Object.freeze(Object.defineProperty({__proto__:null,default:ps,frontmatter:os},Symbol.toStringTag,{value:"Module"})),gs={title:"CAN / CAN FD 解説メモ — 車載通信プロトコルの仕組み",date:"2026-03-28",description:"車載 ECU 開発知見をもとに CAN / CAN FD を整理。物理層・フレーム構造・調停・エラー処理・CAN FD との違い・車載ネットワーク全体像・プロトコル比較まで。",tags:["組み込み","車載"]};function _(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"CAN / CAN FD 解説メモ — 車載通信プロトコルの仕組み"}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:`車載 ECU 開発を通じて得た知見を整理した備忘録。
一般公開されている仕様書を読み込み、培った理解をベースに書いている。`}),`
`]}),`
`,s.jsx(g,{items:[{label:"車載ネットワーク概要",href:"#s1"},{label:"CAN とは",href:"#s2"},{label:"物理層とバス構造",href:"#s3"},{label:"CAN フレームの種類と構造",href:"#s4"},{label:"調停メカニズム（CSMA/CA）",href:"#s5"},{label:"エラー検出と Error State",href:"#s6"},{label:"CAN FD とは",href:"#s7"},{label:"CAN FD フレーム構造と Bit Rate Switch",href:"#s8"},{label:"CAN FD の注意点",href:"#s9"},{label:"車載プロトコル比較",href:"#s10"},{label:"その他の活用シーン",href:"#s11"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"01. 車載ネットワーク概要"}),`
`,s.jsx(n.h3,{children:"ECU とは"}),`
`,s.jsx(n.p,{children:`ECU（Electronic Control Unit）は車載コンピュータの総称。
センサーからの入力をもとに制御判断を行い、アクチュエータへ指令を出す。
現代の量産車には数十〜100 以上の ECU が搭載されており、これらが CAN バスを通じて互いに連携している。`}),`
`,s.jsx(n.p,{children:"用途に応じて専用の ECU（エンジン制御・ブレーキ制御・ボディ制御など）が設けられており、それぞれが担当領域のリアルタイム制御に特化した設計になっている。"}),`
`,s.jsx(n.h3,{children:"ネットワーク全体図"}),`
`,s.jsxs(n.p,{children:["現代の自動車は用途ごとに ",s.jsx(n.strong,{children:"複数の CAN バスを分離し、Gateway ECU で橋渡しする"}),` 構成が一般的。
バスを分けることで、ドメインをまたいだノイズ・障害伝播を防ぎ、セキュリティの境界も引きやすくなる。`]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`                        ┌─────────────────────────────────────────────┐
                        │              Gateway ECU                    │
                        │  （バス間ルーティング・プロトコル変換）         │
                        └──────┬──────────┬──────────┬───────────────┘
                               │          │          │
              ┌────────────────┘          │          └──────────────────┐
              │                           │                             │
   ┌──────────▼──────────┐   ┌────────────▼────────────┐   ┌──────────▼──────────┐
   │  パワートレイン CAN  │   │      ボディ CAN          │   │    ADAS / Safety    │
   │   500 kbit/s        │   │   125〜250 kbit/s        │   │    CAN FD / Eth     │
   ├─────────────────────┤   ├─────────────────────────┤   ├─────────────────────┤
   │ ・エンジン ECU      │   │ ・ボディ制御 ECU         │   │ ・カメラ ECU        │
   │ ・トランスミッション │   │ ・ドア / ウィンドウ      │   │ ・レーダー ECU      │
   │ ・インバータ（EV）  │   │ ・ライト / ワイパー      │   │ ・LiDAR             │
   │ ・ABS / ESC         │   │ ・エアコン ECU           │   │ ・ADAS 統合 ECU     │
   │ ・EPS ECU           │   │                         │   │                     │
   └─────────────────────┘   └──────────┬──────────────┘   └─────────────────────┘
                                         │ LIN バス
                              ┌──────────▼──────────┐
                              │  LIN スレーブ群      │
                              │  （シート・ミラー等）  │
                              └─────────────────────┘
`})}),`
`,s.jsx(n.h3,{children:"主要 ECU の役割"}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"エンジン ECU（ECM）"})}),`
`,s.jsx(n.p,{children:`パワートレインの中核。
燃料噴射量・点火タイミング・スロットル開度などを制御する。
車速・エンジン回転数・冷却水温といった基本情報を CAN バス上に周期的に配信しており、他の ECU がこれを参照して協調動作する。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"EPS ECU（電動パワーステアリング）"})}),`
`,s.jsx(n.p,{children:`車速・操舵角を受信し、アシスト量をリアルタイムに計算する。
ESC / VSA と連携して横滑り防止にも関与する。
ADAS 連携ではレーンキープ・自動操舵の操舵指令を CAN FD 経由で受け取るケースが増えており、Steer-by-Wire ではさらに厳密なリアルタイム性が求められる。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"トランスミッション ECU（TCU）"})}),`
`,s.jsx(n.p,{children:`AT / CVT / DCT などの変速制御を担う。
エンジン ECU とはトルク要求・シフトタイミングを CAN でやり取りし、変速ショックの低減やエンジンブレーキ協調を実現する。
EV / HEV ではモーターとエンジンの切り替え制御にも関わり、インバータ ECU との連携が加わる。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"ABS / ESC ECU"})}),`
`,s.jsx(n.p,{children:`ブレーキ制御と車両安定性の要。
各輪の車輪速センサーから回転数を取得し、ロック防止（ABS）・横滑り防止（ESC）・トラクションコントロールを行う。
EPS・ADAS と CAN で協調しており、自動緊急ブレーキ（AEB）では ADAS 統合 ECU からの減速指令を受けて制動を実行する。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"インバータ ECU（EV / HEV）"})}),`
`,s.jsx(n.p,{children:`EV・HEV のモーター駆動を制御する、エンジン ECU に代わるパワートレインの中核。
バッテリーの DC を AC に変換してモーターを回し、回生ブレーキ時は AC → DC 変換で回収する。
高電圧系（数百 V）を扱うため、CAN 通信で異常検出・緊急停止の応答性が重要になる。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"ボディ ECU（BCM）"})}),`
`,s.jsx(n.p,{children:`ドア・ライト・ワイパー・パワーウィンドウなどのボディ系デバイスを統合管理する。
速度よりコスト重視の領域で、ボディ CAN（125〜250 kbit/s）に接続されることが多い。
シート・ミラーなど低速で済むスレーブ群は LIN で束ね、BCM がマスターとしてゲートウェイ的に動作する構成が一般的。`}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"ADAS 統合 ECU"})}),`
`,s.jsx(n.p,{children:`カメラ・ミリ波レーダー・LiDAR から受け取ったデータをセンサーフュージョンし、衝突回避・レーンキープ・ACC などの判断を行う。
扱うデータ量が大きいため、CAN FD や Automotive Ethernet で接続されることが多い。
EPS や ESC への制御指令を出す側であり、車両安全に直結するため ASIL-D（ISO 26262 最高レベル）が求められることもある。`}),`
`,s.jsx(n.h3,{children:"診断インターフェース（OBD-II）"}),`
`,s.jsx(n.p,{children:`OBD-II（On-Board Diagnostics II）は、1996 年に米国で乗用車への搭載が義務化された車両診断の標準規格。
欧州では EOBD として 2001 年から義務化されており、現在は世界共通の診断インターフェースとして定着している。`}),`
`,s.jsxs(n.p,{children:["物理的には ",s.jsx(n.strong,{children:"16 ピンの DLC（Diagnostic Link Connector）"}),` として車内（多くはハンドル下）に設置されており、診断ツールや PC を繋ぐ外部アクセス口になっている。
通信の下位レイヤーには CAN（ISO 15765-4）が使われており、診断ツールは CAN バス経由で各 ECU とやり取りする。`]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`診断ツール（PC / スキャナ）
     │
  DLC コネクタ（OBD-II ポート）
     │
  Gateway ECU ─── 各ドメイン CAN バスへルーティング
`})}),`
`,s.jsxs(n.p,{children:["OBD-II が定義するのはあくまで ",s.jsx(n.strong,{children:"物理ポートと基本診断データ（排ガス・MIL 等）のアクセス方法"}),` まで。
ECU のフラッシュ書き込みや内部パラメータの読み書きには、上位プロトコルの `,s.jsx(n.strong,{children:"UDS（ISO 14229）"}),` を使う。
実務では「OBD-II ポート経由で UDS サービスを発行する」という形が標準的。`]}),`
`,s.jsx(n.p,{children:"厳密には OBD-II（ISO 15031 / SAE J1979）と UDS（ISO 14229）は別プロトコルだが、実務では OBD-II ポート経由で UDS サービスを使うのが一般的。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"サービス ID（SID）"}),s.jsx(n.th,{children:"意味"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x10"}),s.jsx(n.td,{children:"DiagnosticSessionControl（診断セッション開始）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x11"}),s.jsx(n.td,{children:"ECUReset"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x22"}),s.jsx(n.td,{children:"ReadDataByIdentifier（DID 読み出し）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x2E"}),s.jsx(n.td,{children:"WriteDataByIdentifier（DID 書き込み）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x27"}),s.jsx(n.td,{children:"SecurityAccess（セキュリティ解除）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x34 / 0x36 / 0x37"}),s.jsx(n.td,{children:"RequestDownload / TransferData / RequestTransferExit（フラッシュ書き込み）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x19"}),s.jsx(n.td,{children:"ReadDTCInformation（DTC 読み出し）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x14"}),s.jsx(n.td,{children:"ClearDiagnosticInformation（DTC 消去）"})]})]})]}),`
`,s.jsxs(n.p,{children:["ECU 開発中は ",s.jsx(n.strong,{children:"0x22 / 0x2E"})," で内部変数の読み書きデバッグ、リリース前は ",s.jsx(n.strong,{children:"0x34〜0x37"})," でフラッシュ書き込み確認、量産後は ",s.jsx(n.strong,{children:"0x19"}),` で DTC 確認、という流れが基本になる。
UDS / DTC の詳細は`,s.jsx(n.a,{href:"/blog/20260328-uds-dtc-vehicle-diagnostics",children:"こちらの記事"}),"にまとめている。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"02. CAN とは"}),`
`,s.jsx(n.p,{children:`CAN（Controller Area Network）は、1986 年に Bosch が開発したシリアル通信プロトコル。
もともとは自動車内の ECU 同士を繋ぐために設計された。
それまでは ECU ごとに専用ハーネスを引いていたが、CAN バス 1 本にすべてぶら下げる構成にすることで配線を大幅に削減できる。`}),`
`,s.jsx(n.p,{children:"現在は ISO 11898 として標準化されており、車載だけでなく産業機器・医療機器・ロボットなど幅広い分野で使われている。"}),`
`,s.jsx(n.h3,{children:"車載ネットワークの変遷"}),`
`,s.jsx(n.p,{children:`1980 年代は各メーカーが独自プロトコルを使っていたが、CAN の登場で業界が一本化。
その後、帯域不足を補う形で CAN FD・Automotive Ethernet へと進化してきた。`}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"年代"}),s.jsx(n.th,{children:"規格"}),s.jsx(n.th,{children:"速度"}),s.jsx(n.th,{children:"備考"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1980 年代"}),s.jsx(n.td,{children:"各社独自（I-BUS / BEAM / MPCS など）"}),s.jsx(n.td,{children:"〜10 kbps"}),s.jsx(n.td,{children:"メーカーごとにバラバラ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1986〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"CAN"})}),s.jsx(n.td,{children:"最大 1 Mbit/s"}),s.jsx(n.td,{children:"Bosch が提唱、業界標準へ集約"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2003〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"LIN 2.0"})}),s.jsx(n.td,{children:"最大 20 kbit/s"}),s.jsx(n.td,{children:"低コスト補助バスとして普及"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2004〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"FlexRay"})}),s.jsx(n.td,{children:"最大 10 Mbit/s"}),s.jsx(n.td,{children:"X-by-Wire 向け。高コストで普及は限定的"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2012〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"CAN FD"})}),s.jsx(n.td,{children:"最大 8 Mbit/s"}),s.jsx(n.td,{children:"CAN の後継。ペイロード 64 バイト"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2015〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"100BASE-T1"})}),s.jsx(n.td,{children:"100 Mbit/s"}),s.jsx(n.td,{children:"車載 Ethernet 元年（IEEE 802.3bw）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2016〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"1000BASE-T1"})}),s.jsx(n.td,{children:"1 Gbit/s"}),s.jsx(n.td,{children:"ADAS・カメラ伝送に普及（IEEE 802.3bp）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2018〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"CAN XL"})}),s.jsx(n.td,{children:"最大 10 Mbit/s"}),s.jsx(n.td,{children:"CAN FD の後継（CiA 610、標準化進行中）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2020〜"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"10GBASE-T1"})}),s.jsx(n.td,{children:"10 Gbit/s"}),s.jsx(n.td,{children:"L4 自動運転・8K カメラ向け（IEEE 802.3ch）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"〜現在"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"Ethernet TSN"})}),s.jsx(n.td,{children:"—"}),s.jsx(n.td,{children:"時刻同期・QoS を追加し決定論的遅延を実現"})]})]})]}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"特徴まとめ："})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"項目"}),s.jsx(n.th,{children:"内容"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"最大通信速度"}),s.jsx(n.td,{children:"1 Mbit/s（CAN 2.0）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"最大ペイロード"}),s.jsx(n.td,{children:"8 バイト"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"トポロジー"}),s.jsx(n.td,{children:"バス型（マルチマスター）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"差動信号"}),s.jsx(n.td,{children:"CAN_H / CAN_L の 2 線"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"標準化"}),s.jsx(n.td,{children:"ISO 11898-1（データリンク層）/ ISO 11898-2（物理層）"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"03. 物理層とバス構造"}),`
`,s.jsxs(n.p,{children:["CAN は ",s.jsx(n.strong,{children:"差動信号（Differential Signaling）"}),` を使う。
ノイズ耐性が高く、自動車のエンジンルームのような電気的ノイズの多い環境でも安定して動作する。`]}),`
`,s.jsx(n.h3,{children:"電圧レベル"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"状態"}),s.jsx(n.th,{children:"CAN_H"}),s.jsx(n.th,{children:"CAN_L"}),s.jsx(n.th,{children:"差動電圧"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ドミナント（0）"}),s.jsx(n.td,{children:"≈ 3.5 V"}),s.jsx(n.td,{children:"≈ 1.5 V"}),s.jsx(n.td,{children:"≈ 2.0 V"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"リセッシブ（1）"}),s.jsx(n.td,{children:"≈ 2.5 V"}),s.jsx(n.td,{children:"≈ 2.5 V"}),s.jsx(n.td,{children:"≈ 0 V"})]})]})]}),`
`,s.jsx(n.p,{children:`ドミナントはバスを「0」に強制する状態、リセッシブはバスを「1」にする（引っ張られていない）状態。
複数ノードが同時に送信した場合、ドミナントがリセッシブに勝つ。
この性質が後述の調停で重要になる。`}),`
`,s.jsx(n.h3,{children:"バス構造と終端抵抗"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`  Node A       Node B       Node C
    |             |             |
 [CANH]─────────────────────── [CANH]
 [CANL]─────────────────────── [CANL]
   │                             │
 [120Ω]                       [120Ω]   ← 終端抵抗（両端に必須）
`})}),`
`,s.jsxs(n.p,{children:["バスの両端に ",s.jsx(n.strong,{children:"120 Ω の終端抵抗"}),` を入れる。
これが欠けると信号の反射が起きて通信が不安定になるので注意。
ノード数が増えてもバスのインピーダンスを 60 Ω（並列合成）に保つのが目的。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"04. CAN フレームの種類と構造"}),`
`,s.jsx(n.p,{children:"CAN には 4 種類のフレームがある。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フレーム"}),s.jsx(n.th,{children:"用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Data Frame"})}),s.jsx(n.td,{children:"データを送信する通常フレーム"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Remote Frame"})}),s.jsx(n.td,{children:"他ノードにデータ送信を要求する"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Error Frame"})}),s.jsx(n.td,{children:"エラー検出時に送信してバスをリセット"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Overload Frame"})}),s.jsx(n.td,{children:"受信側が処理待ちを通知する（まれに使用）"})]})]})]}),`
`,s.jsx(n.p,{children:"通常の通信は Data Frame がメイン。"}),`
`,s.jsx(n.h3,{children:"Data Frame の構造（標準フォーマット 11bit ID）"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:` SOF │   Arbitration  │ Control │    Data    │  CRC  │ ACK │ EOF │ IFS
  1  │ ID[10:0] + RTR │IDE r0 DLC│  0〜8 Byte│15+1bit│1+1  │  7  │  3  [bit]
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フィールド"}),s.jsx(n.th,{children:"ビット数"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"SOF"}),s.jsx(n.td,{children:"1"}),s.jsx(n.td,{children:"Start Of Frame。フレーム開始を示すドミナントビット"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ID"}),s.jsx(n.td,{children:"11（標準）/ 29（拡張）"}),s.jsx(n.td,{children:"メッセージの識別子。値が小さいほど高優先度"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"RTR"}),s.jsx(n.td,{children:"1"}),s.jsx(n.td,{children:"Remote Transmission Request。Data=0, Remote=1"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IDE"}),s.jsx(n.td,{children:"1"}),s.jsx(n.td,{children:"ID Extended。標準=0, 拡張=1"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"DLC"}),s.jsx(n.td,{children:"4"}),s.jsx(n.td,{children:"Data Length Code。データのバイト数（0〜8）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Data"}),s.jsx(n.td,{children:"0〜64 bit"}),s.jsx(n.td,{children:"ペイロード（最大 8 バイト）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"CRC"}),s.jsx(n.td,{children:"15 + 1"}),s.jsx(n.td,{children:"誤り検出用 CRC とデリミタ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ACK"}),s.jsx(n.td,{children:"1 + 1"}),s.jsx(n.td,{children:"受信成功ノードがドミナントで上書きする確認ビット"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"EOF"}),s.jsx(n.td,{children:"7"}),s.jsx(n.td,{children:"End Of Frame。すべてリセッシブ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IFS"}),s.jsx(n.td,{children:"3"}),s.jsx(n.td,{children:"Intermission。フレーム間スペース"})]})]})]}),`
`,s.jsx(n.h3,{children:"ビットスタッフィング"}),`
`,s.jsxs(n.p,{children:[`CAN は NRZ（Non-Return-to-Zero）符号化を使う。
同じ値が 5 ビット以上連続すると同期が取れなくなるため、`,s.jsx(n.strong,{children:"5 ビット連続したら補数ビットを 1 つ挿入"}),` するルールがある（Bit Stuffing）。
受信側は逆にデスタッフィングして元のデータを復元する。
CRC フィールドまでが Bit Stuffing の対象で、EOF 以降は対象外。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"05. 調停メカニズム（CSMA/CA）"}),`
`,s.jsxs(n.p,{children:[`CAN はマルチマスター方式なので、複数ノードが同時に送信を開始する可能性がある。
これを解決するのが `,s.jsx(n.strong,{children:"CSMA/CA（Carrier Sense Multiple Access / Collision Avoidance）"}),"。"]}),`
`,s.jsx(n.h3,{children:"調停の仕組み"}),`
`,s.jsx(n.p,{children:`送信ノードは自分が送ったビットをバスから読み返す。
ドミナント（0）はリセッシブ（1）に勝つ特性を利用し、ID の上位ビットから 1 ビットずつ比較する。
自分が送った「1（リセッシブ）」がバス上では「0（ドミナント）」になっていたら、他のノードが勝っているとわかる。
負けたノードは即座に送信を中止し、バスが空くのを待ってリトライする。`}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`Node A  ID: 0b011 0000 0001  →  送信優先度：高
Node B  ID: 0b011 0000 0101  →  送信優先度：低

bit 0〜7 は一致。bit 8 で A=0（ドミナント）、B=1（リセッシブ）
→ B はドミナントを検出して送信を中止。A が継続。
`})}),`
`,s.jsxs(n.p,{children:["この方式は ",s.jsx(n.strong,{children:"非破壊的調停"}),` と呼ばれる。
衝突しても A のフレームは破壊されず、そのまま送信が完了する。
イーサネットの CSMA/CD（衝突検出＆再送）と違い、再送ロスがない。`]}),`
`,s.jsx(n.h3,{children:"優先度の決まり方"}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"ID の数値が小さいほど優先度が高い。"}),`
緊急性の高いメッセージには小さい ID を割り当てる設計が基本。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"06. エラー検出と Error State"}),`
`,s.jsx(n.p,{children:"CAN は通信の信頼性を高めるため、5 種類のエラー検出メカニズムを持つ。"}),`
`,s.jsx(n.h3,{children:"エラー検出の種類"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"エラー種別"}),s.jsx(n.th,{children:"検出方法"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Bit Error"})}),s.jsx(n.td,{children:"送信ビットとバスの値が不一致（調停中を除く）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Stuff Error"})}),s.jsx(n.td,{children:"6 ビット以上同値が連続（ビットスタッフ違反）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CRC Error"})}),s.jsx(n.td,{children:"受信した CRC が計算値と不一致"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Form Error"})}),s.jsx(n.td,{children:"EOF・デリミタなど固定フォーマット部が不正"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ACK Error"})}),s.jsx(n.td,{children:"送信したフレームに誰も ACK を返さなかった"})]})]})]}),`
`,s.jsxs(n.p,{children:["エラーを検出したノードは ",s.jsx(n.strong,{children:"Error Frame"})," を送信してバスに通知し、全ノードが現在のフレームを破棄してリカバリを行う。"]}),`
`,s.jsx(n.h3,{children:"Error State（エラー状態の遷移）"}),`
`,s.jsx(n.p,{children:`各ノードは TEC（Transmit Error Counter）と REC（Receive Error Counter）を持つ。
エラー発生で増加し、正常送受信で減少する。
カウンタ値に応じて 3 つの状態を遷移する。`}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`TEC / REC < 128        → Error Active   (正常。Active Error Frame を送信)
TEC or REC ≥ 128       → Error Passive  (Passive Error Frame を送信。バスへの影響が小さい)
TEC ≥ 256              → Bus Off        (バスから切り離し。送受信一切不可)
`})}),`
`,s.jsx(n.p,{children:`Bus Off から復帰するには、バス上で 128 × 11 ビットの連続リセッシブを検出する必要がある。
一部のノードが故障してもバス全体が巻き込まれにくい設計になっている。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"07. CAN FD とは"}),`
`,s.jsx(n.p,{children:`CAN FD（CAN with Flexible Data-rate）は、Bosch が 2012 年に策定した CAN の拡張規格。
ISO 11898-1:2015 に取り込まれ、現在は標準化されている。`}),`
`,s.jsx(n.h3,{children:"登場背景"}),`
`,s.jsxs(n.p,{children:[`車載システムの高度化に伴い、ECU 間で扱うデータ量が爆増した。
ADAS（先進運転支援システム）やカメラ、OTA（Over-the-Air）アップデートなどは、CAN 2.0 の `,s.jsx(n.strong,{children:"8 バイト / 1 Mbit/s"}),` では帯域が足りなくなってきた。
Ethernet に移行するほどでもないが、CAN の信頼性とコストは維持したい、という文脈で生まれたのが CAN FD。`]}),`
`,s.jsx(n.h3,{children:"CAN 2.0 と CAN FD の比較"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"項目"}),s.jsx(n.th,{children:"CAN 2.0"}),s.jsx(n.th,{children:"CAN FD"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"最大ペイロード"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"8 バイト"})}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"64 バイト"})})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"調停フェーズ速度"}),s.jsx(n.td,{children:"最大 1 Mbit/s"}),s.jsx(n.td,{children:"最大 1 Mbit/s（同じ）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"データフェーズ速度"}),s.jsx(n.td,{children:"最大 1 Mbit/s"}),s.jsxs(n.td,{children:[s.jsx(n.strong,{children:"最大 8 Mbit/s"}),"（実装依存）"]})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"CRC 長"}),s.jsx(n.td,{children:"15 bit"}),s.jsx(n.td,{children:"17 bit（≤16 byte）/ 21 bit（>16 byte）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ESI ビット"}),s.jsx(n.td,{children:"なし"}),s.jsx(n.td,{children:"あり（Error State Indicator）"})]})]})]}),`
`,s.jsxs(n.p,{children:["ポイントは ",s.jsx(n.strong,{children:"2 段階のビットレート"}),`。
調停フェーズは従来と同じ低速で行い、調停が確定したデータフェーズだけ高速に切り替える。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"08. CAN FD フレーム構造と Bit Rate Switch"}),`
`,s.jsx(n.h3,{children:"CAN FD Data Frame の構造"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:` SOF │  Arbitration  │      Control        │    Data     │    CRC     │ ACK │ EOF
  1  │ ID + RRS(RTR) │IDE EDL(FDF) BRS ESI DLC│ 0〜64 Byte│17 or 21+1 │1+1  │  7  [bit]
                                ↑    ↑
                              FDF   BRS ← ここから高速フェーズ開始
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"追加フィールド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"FDF（EDL）"})}),s.jsx(n.td,{children:"CAN FD Frame。このビットが 1 だと FD フレームとして扱う"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"BRS"})}),s.jsx(n.td,{children:"Bit Rate Switch。1 のとき、このビット以降をデータフェーズ速度で送信"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ESI"})}),s.jsx(n.td,{children:"Error State Indicator。送信ノードが Error Passive 状態なら 1"})]})]})]}),`
`,s.jsx(n.h3,{children:"ペイロード長と DLC の対応"}),`
`,s.jsx(n.p,{children:"CAN FD では DLC が 9〜15 の場合、バイト数が非線形にマッピングされる。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"DLC"}),s.jsx(n.th,{children:"バイト数"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0〜8"}),s.jsx(n.td,{children:"0〜8（CAN と同じ）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"9"}),s.jsx(n.td,{children:"12"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"10"}),s.jsx(n.td,{children:"16"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"11"}),s.jsx(n.td,{children:"20"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"12"}),s.jsx(n.td,{children:"24"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"13"}),s.jsx(n.td,{children:"32"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"14"}),s.jsx(n.td,{children:"48"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"15"}),s.jsx(n.td,{children:"64"})]})]})]}),`
`,s.jsx(n.h3,{children:"Bit Rate Switch の動作"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:` ← Nominal Bitrate（例: 500 kbit/s）→  ← Data Bitrate（例: 2 Mbit/s）→  ← Nominal →

[SOF][Arbitration][Control...BRS] [ESI][Data][CRC] [ACK][EOF]
                            ↑高速開始                   ↑高速終了
`})}),`
`,s.jsx(n.p,{children:`BRS ビットのサンプルポイントで物理層トランシーバがビットレートを切り替える。
調停中はすべてのノードが同じ速度で張り付いているが、調停確定後は送信ノードだけが高速フェーズに入るイメージ。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s9",children:"09. CAN FD の注意点"}),`
`,s.jsx(n.h3,{children:"後方互換性"}),`
`,s.jsxs(n.p,{children:["CAN FD フレームを ",s.jsx(n.strong,{children:"CAN 2.0 ノードは正しく受信できない。"}),`
CAN 2.0 ノードは FDF ビットを Form Error と解釈し、Error Frame を送信してしまう。
CAN FD を導入する際はバス上のすべてのノードが FD 対応している必要がある。
（または CAN 2.0 ノードを FD フレームが流れるバスから分離する構成にする）`]}),`
`,s.jsx(n.h3,{children:"クロック要件"}),`
`,s.jsxs(n.p,{children:["データフェーズの高速化に伴い、",s.jsx(n.strong,{children:"ノード間のクロック精度"}),` がシビアになる。
CAN 2.0 では許容されていた水晶発振器のばらつきも、高速フェーズでは問題になりうる。
CAN FD 対応トランシーバ・コントローラを選定する際は、データシートのクロック精度要件を必ず確認すること。`]}),`
`,s.jsx(n.h3,{children:"伝送距離とビットレートのトレードオフ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"データビットレート"}),s.jsx(n.th,{children:"最大バス長の目安"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1 Mbit/s"}),s.jsx(n.td,{children:"≈ 40 m"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2 Mbit/s"}),s.jsx(n.td,{children:"≈ 20 m"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"5 Mbit/s"}),s.jsx(n.td,{children:"≈ 10 m"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"8 Mbit/s"}),s.jsx(n.td,{children:"≈ 数 m"})]})]})]}),`
`,s.jsx(n.p,{children:`高速になるほど伝播遅延の影響が大きくなり、バス長が制限される。
実際の設計では終端処理・ケーブル品質・スタブ長も含めて余裕を持たせること。`}),`
`,s.jsx(n.h3,{children:"CAN FD vs CAN XL"}),`
`,s.jsxs(n.p,{children:["2018 年頃から CiA（CAN in Automation）/ Bosch が ",s.jsx(n.strong,{children:"CAN XL"}),` の仕様策定を進めている。
ペイロード最大 2048 バイト、最大 10 Mbit/s を目指す規格だが、2026 年時点ではまだ普及途上。
CAN → CAN FD → CAN XL という進化のラインは覚えておいて損はない。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s10",children:"10. 車載プロトコル比較"}),`
`,s.jsx(n.p,{children:`車載には CAN 以外にも複数の通信プロトコルがある。
用途・コスト・帯域のバランスで使い分けるのが実情。`}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"プロトコル"}),s.jsx(n.th,{children:"速度"}),s.jsx(n.th,{children:"トポロジー"}),s.jsx(n.th,{children:"ペイロード"}),s.jsx(n.th,{children:"主な用途"}),s.jsx(n.th,{children:"特徴"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"LIN"})}),s.jsx(n.td,{children:"最大 20 kbit/s"}),s.jsx(n.td,{children:"シングルマスター / スレーブ"}),s.jsx(n.td,{children:"8 バイト"}),s.jsx(n.td,{children:"シート・ミラー・スイッチ類"}),s.jsx(n.td,{children:"安価・1 線・低速でよい箇所に"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CAN 2.0"})}),s.jsx(n.td,{children:"最大 1 Mbit/s"}),s.jsx(n.td,{children:"バス型"}),s.jsx(n.td,{children:"8 バイト"}),s.jsx(n.td,{children:"パワートレイン・ボディ"}),s.jsx(n.td,{children:"車載の基本。実績が厚い"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CAN FD"})}),s.jsx(n.td,{children:"調停 1 Mbit/s・データ最大 8 Mbit/s"}),s.jsx(n.td,{children:"バス型"}),s.jsx(n.td,{children:"64 バイト"}),s.jsx(n.td,{children:"ADAS・OTA 対応 ECU"}),s.jsx(n.td,{children:"CAN の信頼性を維持しつつ高帯域化"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"FlexRay"})}),s.jsx(n.td,{children:"最大 10 Mbit/s"}),s.jsx(n.td,{children:"バス / スター（デュアルチャネル）"}),s.jsx(n.td,{children:"254 バイト"}),s.jsx(n.td,{children:"シャシー制御・X-by-Wire"}),s.jsx(n.td,{children:"時分割・決定論的遅延が強み。高コスト"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Automotive Ethernet"})}),s.jsx(n.td,{children:"100 Mbit/s〜10 Gbit/s"}),s.jsx(n.td,{children:"P2P / スイッチ"}),s.jsx(n.td,{children:"大容量"}),s.jsx(n.td,{children:"カメラ・OTA・中央演算"}),s.jsx(n.td,{children:"帯域最大。ハーネスが太い・EMC 対策が必要"})]})]})]}),`
`,s.jsx(n.h3,{children:"使い分けの判断基準"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`                帯域が要る？
                    │
           No ──────┴────── Yes
           │                 │
      リアルタイム性？     決定論的？（FlexRay 領域）
           │                 │
     Yes        No      No ──┴── Yes
      │          │       │        │
    CAN / CAN FD  LIN  Ethernet  FlexRay
`})}),`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"実務での選定ポイント："})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"LIN"}),`: コスト最優先。
マスター ECU が CAN を喋り、スレーブ群には LIN でぶら下げるのが定番構成`]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"CAN FD"}),": 既存 CAN インフラを活かしつつ帯域を上げたい場合の第一選択"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"FlexRay"}),`: ステア・バイ・ワイヤ等の X-by-Wire で厳密な周期保証が必要な箇所。
ただし新規採用は減少傾向で CAN FD に置き換えられつつある`]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"Automotive Ethernet（100BASE-T1 / 1000BASE-T1）"}),`: 車体が 1 本の撚り線で Gigabit を通せる規格（IEEE 802.3bw / 802.3bp）。
OTA・ドライブレコーダー・高解像度カメラ伝送など大容量が必要な箇所`]}),`
`]}),`
`,s.jsx(n.h3,{children:"Automotive Ethernet T1 シリーズの進化"}),`
`,s.jsx(n.p,{children:`T1 とは「1 本の撚り線（ツイストペア）で通信する」車載専用 Ethernet の総称。
通常の 2 線対ではなく 1 線対にすることでハーネス重量・コストを削減している。`}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"規格"}),s.jsx(n.th,{children:"速度"}),s.jsx(n.th,{children:"IEEE 規格"}),s.jsx(n.th,{children:"主な用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"10BASE-T1S / T1L"}),s.jsx(n.td,{children:"10 Mbit/s"}),s.jsx(n.td,{children:"802.3cg"}),s.jsx(n.td,{children:"センサー・アクチュエータ向け低速バス"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"100BASE-T1"}),s.jsx(n.td,{children:"100 Mbit/s"}),s.jsx(n.td,{children:"802.3bw"}),s.jsx(n.td,{children:"ADAS 補助・ボディ系 ECU"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1000BASE-T1"}),s.jsx(n.td,{children:"1 Gbit/s"}),s.jsx(n.td,{children:"802.3bp"}),s.jsx(n.td,{children:"カメラ・レーダー伝送"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2.5GBASE-T1"}),s.jsx(n.td,{children:"2.5 Gbit/s"}),s.jsx(n.td,{children:"802.3ch"}),s.jsx(n.td,{children:"高解像度センサー統合"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"5GBASE-T1"}),s.jsx(n.td,{children:"5 Gbit/s"}),s.jsx(n.td,{children:"802.3ch"}),s.jsx(n.td,{children:"同上"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"10GBASE-T1"})}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"10 Gbit/s"})}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"802.3ch"})}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"L4 自動運転・8K カメラ・LiDAR 統合"})})]})]})]}),`
`,s.jsx(n.p,{children:`IEEE 802.3ch は 2020 年承認。量産車への採用は 2022 年頃から始まりつつある。
将来的には中央集権型アーキテクチャ（Zone ECU / Central Computer）でのバックボーンとして使われる想定。`}),`
`,s.jsx(n.h3,{children:"Ethernet TSN（Time-Sensitive Networking）"}),`
`,s.jsxs(n.p,{children:[`通常の Ethernet はベストエフォート型で遅延を保証できない。
TSN は IEEE 802.1 ファミリーの拡張仕様群で、`,s.jsx(n.strong,{children:"時刻同期・帯域予約・優先制御"})," を追加して決定論的な遅延を実現する。"]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"TSN 主要規格"}),s.jsx(n.th,{children:"内容"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IEEE 802.1AS"}),s.jsx(n.td,{children:"高精度時刻同期（gPTP）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IEEE 802.1Qbv"}),s.jsx(n.td,{children:"時分割ゲーティング（TAS）。フレームを時間スロットで送信"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IEEE 802.1Qbu"}),s.jsx(n.td,{children:"フレームプリエンプション。優先フレームが割り込み可能"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"IEEE 802.1CB"}),s.jsx(n.td,{children:"フレーム複製・除去による冗長化"})]})]})]}),`
`,s.jsx(n.p,{children:`CAN の強みだった「決定論的遅延」を Ethernet で実現しようというのが TSN の本質。
AUTOSAR Adaptive Platform や車載 Ethernet バックボーンへの統合が進んでいる。`}),`
`,s.jsx(n.h3,{children:"AUTOSAR との関係"}),`
`,s.jsxs(n.p,{children:["AUTOSAR（AUTomotive Open System ARchitecture）は車載ソフトウェアのミドルウェア標準で、CAN / CAN FD / LIN / Ethernet をすべて ",s.jsx(n.strong,{children:"COM スタック"}),` として抽象化する。
アプリ層は物理プロトコルを意識せず `,s.jsx(n.code,{children:"Com_SendSignal()"})," / ",s.jsx(n.code,{children:"Com_ReceiveSignal()"}),` を呼ぶだけでよい設計になっている。
プロトコル変更の影響をアプリ層に波及させない、という点で実務上かなり助かる仕組み。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s11",children:"11. その他の活用シーン"}),`
`,s.jsx(n.h3,{children:"産業機器・ロボット"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"CANopen"}),`（IEC 61158）: 産業用 CAN の上位プロトコル。
モーターコントローラ・PLC などで標準的に使われている。`]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"DeviceNet"}),": 米国製造業向けの CAN ベースフィールドバス。"]}),`
`,s.jsx(n.li,{children:"ロボットアームの各軸 ECU 間通信など、リアルタイム性が求められる用途に向いている。"}),`
`]}),`
`,s.jsx(n.h3,{children:"医療機器"}),`
`,s.jsx(n.p,{children:`患者監視システムや手術ロボットなど、高信頼性と決定論的な遅延が求められる分野でも採用されている。
高信頼性が求められる医療機器分野でも広く採用されている。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"まとめ"})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"CAN は差動 2 線・マルチマスター・非破壊的調停の堅牢なプロトコル"}),`
`,s.jsx(n.li,{children:"ドミナント / リセッシブの性質が調停とエラー検出の両方を支えている"}),`
`,s.jsx(n.li,{children:"CAN FD は「調停は低速・データは高速」の 2 段階レートで帯域を拡張"}),`
`,s.jsx(n.li,{children:"後方互換がないため、FD 導入はバス全体の対応状況を要確認"}),`
`,s.jsx(n.li,{children:"車載では LIN / CAN / CAN FD / FlexRay / Ethernet を用途に応じて使い分ける"}),`
`]}),`
`]})]})}function Ns(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(_,{...e})}):_(e)}const Cs=Object.freeze(Object.defineProperty({__proto__:null,default:Ns,frontmatter:gs},Symbol.toStringTag,{value:"Module"})),us={title:"UDS / DTC 解説メモ — 車載診断の仕組み",date:"2026-03-28",description:"車載 ECU 開発の実務知見をもとに UDS / DTC を整理。通信モデル・主要サービス・DTC 構造・ステータスバイト・FreezeFrame・診断フローまで。",tags:["組み込み","車載"]};function M(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"UDS / DTC 解説メモ — 車載診断の仕組み"}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsxs(n.p,{children:[`これまでの車載 ECU 開発を通じて得た知見を整理した備忘録。
CAN / CAN FD の仕組みについては`,s.jsx(n.a,{href:"/blog/20260328-can-canfd-protocol",children:"こちらの記事"}),"を参照。"]}),`
`]}),`
`,s.jsx(g,{items:[{label:"UDS とは",href:"#s1"},{label:"UDS の通信モデル",href:"#s2"},{label:"主要 UDS サービス一覧",href:"#s3"},{label:"DTC とは",href:"#s4"},{label:"DTC ステータスバイト",href:"#s5"},{label:"DTC の検出と記録フロー",href:"#s6"},{label:"FreezeFrame / Snapshot",href:"#s7"},{label:"UDS 0x19 サブファンクション",href:"#s8"},{label:"実務での診断フロー",href:"#s9"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"01. UDS とは"}),`
`,s.jsxs(n.p,{children:["UDS（Unified Diagnostic Services）は、ISO 14229 で定義された車載 ECU の",s.jsx(n.strong,{children:"診断通信プロトコル"}),`。
OEM・サプライヤー間で統一された診断インターフェースを提供し、ECU のソフト書き込み・DTC 読み出し・内部データの参照などを標準的な手順で行える。`]}),`
`,s.jsx(n.h3,{children:"プロトコルスタック上の位置"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`┌──────────────────────────────────┐
│  UDS（ISO 14229-1）              │  ← アプリケーション層
│  診断サービス定義（SID）          │
├──────────────────────────────────┤
│  ISO-TP（ISO 15765-2）           │  ← トランスポート層
│  マルチフレーム分割・再構築       │
├──────────────────────────────────┤
│  CAN / CAN FD（ISO 11898）       │  ← データリンク + 物理層
│  フレーム送受信                  │
└──────────────────────────────────┘
`})}),`
`,s.jsxs(n.p,{children:[`UDS のメッセージは最大数千バイトになりうるが、CAN のペイロードは 8 バイト（FD でも 64 バイト）。
この差を埋めるのが `,s.jsx(n.strong,{children:"ISO-TP"}),"（Transport Protocol）で、長いメッセージを複数の CAN フレームに分割して送受信する。"]}),`
`,s.jsx(n.h3,{children:"ISO-TP のフレーム種別"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フレーム"}),s.jsx(n.th,{children:"略称"}),s.jsx(n.th,{children:"役割"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Single Frame"}),s.jsx(n.td,{children:"SF"}),s.jsx(n.td,{children:"7 バイト以下のメッセージを 1 フレームで送信"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"First Frame"}),s.jsx(n.td,{children:"FF"}),s.jsx(n.td,{children:"分割送信の最初のフレーム。全体長を通知"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Consecutive Frame"}),s.jsx(n.td,{children:"CF"}),s.jsx(n.td,{children:"2 フレーム目以降の連続データ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Flow Control"}),s.jsx(n.td,{children:"FC"}),s.jsx(n.td,{children:"受信側が送信ペースを制御（BS / STmin）"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"02. UDS の通信モデル"}),`
`,s.jsxs(n.p,{children:["UDS は",s.jsx(n.strong,{children:"クライアント / サーバーモデル"}),`で動作する。
診断ツール（テスター）がクライアント、ECU がサーバー。`]}),`
`,s.jsx(n.h3,{children:"リクエスト / レスポンス"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`テスター                         ECU
   │                              │
   │── Request（SID + データ）──→ │
   │                              │  処理
   │←─ Positive Response ────────│  （SID + 0x40 + データ）
   │   or                        │
   │←─ Negative Response ────────│  （0x7F + SID + NRC）
`})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"Positive Response"}),": SID に 0x40 を加えた値が先頭に来る（例: 0x22 → 0x62）"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"Negative Response"}),": 固定で ",s.jsx(n.code,{children:"0x7F"})," + 元の SID + NRC（エラーコード）"]}),`
`]}),`
`,s.jsx(n.h3,{children:"主な NRC（Negative Response Code）"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"NRC"}),s.jsx(n.th,{children:"値"}),s.jsx(n.th,{children:"意味"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"generalReject"}),s.jsx(n.td,{children:"0x10"}),s.jsx(n.td,{children:"汎用拒否"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"serviceNotSupported"}),s.jsx(n.td,{children:"0x11"}),s.jsx(n.td,{children:"そのサービスは未対応"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"subFunctionNotSupported"}),s.jsx(n.td,{children:"0x12"}),s.jsx(n.td,{children:"サブファンクションが未対応"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"incorrectMessageLengthOrInvalidFormat"}),s.jsx(n.td,{children:"0x13"}),s.jsx(n.td,{children:"メッセージ長不正"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"conditionsNotCorrect"}),s.jsx(n.td,{children:"0x22"}),s.jsx(n.td,{children:"実行条件を満たしていない"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"requestSequenceError"}),s.jsx(n.td,{children:"0x24"}),s.jsx(n.td,{children:"サービスの呼び出し順序が不正"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"requestOutOfRange"}),s.jsx(n.td,{children:"0x31"}),s.jsx(n.td,{children:"パラメータが範囲外"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"securityAccessDenied"}),s.jsx(n.td,{children:"0x33"}),s.jsx(n.td,{children:"セキュリティ未解除"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"invalidKey"}),s.jsx(n.td,{children:"0x35"}),s.jsx(n.td,{children:"セキュリティキーが不正"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"exceededNumberOfAttempts"}),s.jsx(n.td,{children:"0x36"}),s.jsx(n.td,{children:"試行回数上限超過"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"uploadDownloadNotAccepted"}),s.jsx(n.td,{children:"0x70"}),s.jsx(n.td,{children:"アップロード / ダウンロード拒否"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"responsePending"}),s.jsx(n.td,{children:"0x78"}),s.jsx(n.td,{children:"処理中。もう少し待って（テスターはタイムアウトを延長）"})]})]})]}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"0x78 responsePending"}),` は実務でよく遭遇する。
ECU がフラッシュ消去中など時間のかかる処理をしているとき、タイムアウトを防ぐために ECU 側から繰り返し送信される。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"03. 主要 UDS サービス一覧"}),`
`,s.jsx(n.h3,{children:"診断セッション / セキュリティ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"SID"}),s.jsx(n.th,{children:"サービス名"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x10"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"DiagnosticSessionControl"})}),s.jsx(n.td,{children:"診断セッションの切り替え（Default / Extended / Programming）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x11"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ECUReset"})}),s.jsx(n.td,{children:"ECU リセット（Hard / Soft / KeyOffOnReset）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x27"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"SecurityAccess"})}),s.jsx(n.td,{children:"Seed & Key 方式でセキュリティ解除"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x28"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"CommunicationControl"})}),s.jsx(n.td,{children:"通常通信の有効 / 無効切り替え"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x3E"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"TesterPresent"})}),s.jsx(n.td,{children:"テスター接続維持（セッションタイムアウト防止）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x85"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ControlDTCSetting"})}),s.jsx(n.td,{children:"DTC 検出の一時停止 / 再開"})]})]})]}),`
`,s.jsx(n.h3,{children:"データ読み書き"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"SID"}),s.jsx(n.th,{children:"サービス名"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x22"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ReadDataByIdentifier"})}),s.jsx(n.td,{children:"DID（Data Identifier）を指定してデータ読み出し"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x2E"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"WriteDataByIdentifier"})}),s.jsx(n.td,{children:"DID を指定してデータ書き込み"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x23"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ReadMemoryByAddress"})}),s.jsx(n.td,{children:"メモリアドレスを直接指定して読み出し"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x2F"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"InputOutputControlByIdentifier"})}),s.jsx(n.td,{children:"アクチュエータの強制駆動テスト"})]})]})]}),`
`,s.jsx(n.h3,{children:"フラッシュ書き込み（リプロ）"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"SID"}),s.jsx(n.th,{children:"サービス名"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x34"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"RequestDownload"})}),s.jsx(n.td,{children:"ダウンロード開始要求（アドレス・サイズ指定）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x36"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"TransferData"})}),s.jsx(n.td,{children:"データ転送（ブロック単位）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x37"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"RequestTransferExit"})}),s.jsx(n.td,{children:"転送完了通知"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x31"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"RoutineControl"})}),s.jsx(n.td,{children:"ルーチン実行（消去・検証・チェックサム計算など）"})]})]})]}),`
`,s.jsx(n.h3,{children:"DTC 関連"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"SID"}),s.jsx(n.th,{children:"サービス名"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x19"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ReadDTCInformation"})}),s.jsx(n.td,{children:"DTC の読み出し（詳細は s8 参照）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x14"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ClearDiagnosticInformation"})}),s.jsx(n.td,{children:"DTC の消去"})]})]})]}),`
`,s.jsx(n.h3,{children:"典型的なフラッシュ書き込みシーケンス"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`0x10 02          → Programming Session 開始
0x27 01 / 02     → SecurityAccess（Seed 取得 → Key 送信）
0x85 02          → DTC 検出停止
0x28 03 01       → 通常通信停止
0x31 01 FF00     → RoutineControl: フラッシュ消去
0x34 ...         → RequestDownload
0x36 01 [data]   → TransferData（ブロック 1）
0x36 02 [data]   → TransferData（ブロック 2）
  ...
0x37             → RequestTransferExit
0x31 01 FF01     → RoutineControl: チェックサム検証
0x11 01          → ECUReset（Hard Reset）
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"04. DTC とは"}),`
`,s.jsxs(n.p,{children:["DTC（Diagnostic Trouble Code）は、ECU が検出した",s.jsx(n.strong,{children:"異常を識別するためのコード"}),`。
「どのセンサーが」「どんな異常を」起こしたかを一意に特定できるように体系化されている。`]}),`
`,s.jsx(n.h3,{children:"DTC の構造（3 バイト = 24 ビット）"}),`
`,s.jsx(n.p,{children:"UDS で扱う DTC は 3 バイト構成。"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`バイト 1         バイト 2         バイト 3
[上位 2bit][6bit] [8bit]          [8bit]
  カテゴリ   固有ID              Failure Type
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"バイト"}),s.jsx(n.th,{children:"内容"}),s.jsx(n.th,{children:"例"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"バイト 1-2"}),s.jsx(n.td,{children:"DTC 番号（故障箇所）"}),s.jsx(n.td,{children:"0x0301 = シリンダー 1 ミスファイア系"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"バイト 3"}),s.jsx(n.td,{children:"Failure Type（故障種別）"}),s.jsx(n.td,{children:"0x11 = 回路の地絡（Short to Ground）"})]})]})]}),`
`,s.jsx(n.h3,{children:"OBD-II 表記との対応"}),`
`,s.jsxs(n.p,{children:["OBD-II では DTC を ",s.jsx(n.strong,{children:"5 文字のコード"}),"（例: ",s.jsx(n.code,{children:"P0301"}),"）で表現する。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`P  0  3  0  1
│  │  │  └──┘ 固有番号
│  │  └────── サブシステム（3 = 点火系）
│  └───────── 0 = SAE 標準 / 1 = メーカー固有
└──────────── カテゴリ
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"プレフィックス"}),s.jsx(n.th,{children:"カテゴリ"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"P"})}),s.jsx(n.td,{children:"Powertrain（パワートレイン）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"B"})}),s.jsx(n.td,{children:"Body（ボディ）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"C"})}),s.jsx(n.td,{children:"Chassis（シャシー）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"U"})}),s.jsx(n.td,{children:"Network / Communication（通信系）"})]})]})]}),`
`,s.jsx(n.p,{children:`UDS の 3 バイト DTC と OBD-II の 5 文字コードは相互変換可能。
上位 2 ビットがカテゴリ（P/B/C/U）に対応している。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"05. DTC ステータスバイト"}),`
`,s.jsxs(n.p,{children:["各 DTC には ",s.jsx(n.strong,{children:"1 バイトのステータス情報"}),` が付随する。
8 ビットそれぞれに意味があり、DTC の現在の状態を表す。`]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"Bit"}),s.jsx(n.th,{children:"名称"}),s.jsx(n.th,{children:"意味"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"testFailed"})}),s.jsx(n.td,{children:"現在テスト失敗中（異常が出ている）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"testFailedThisOperationCycle"})}),s.jsx(n.td,{children:"今回の運転サイクルでテスト失敗あり"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"2"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"pendingDTC"})}),s.jsx(n.td,{children:"保留中（確定前だが異常が検出された）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"3"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"confirmedDTC"})}),s.jsx(n.td,{children:"確定済み（条件を満たして DTC が確定）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"4"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"testNotCompletedSinceLastClear"})}),s.jsx(n.td,{children:"前回 DTC 消去後、テストが未完了"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"5"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"testFailedSinceLastClear"})}),s.jsx(n.td,{children:"前回 DTC 消去後にテスト失敗あり"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"6"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"testNotCompletedThisOperationCycle"})}),s.jsx(n.td,{children:"今回の運転サイクルでテスト未完了"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"7"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"warningIndicatorRequested"})}),s.jsx(n.td,{children:"MIL（警告灯）点灯要求あり"})]})]})]}),`
`,s.jsx(n.h3,{children:"よく使う組み合わせ"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`ステータスバイト = 0x09 (bit0=1, bit3=1)
→ testFailed + confirmedDTC = 「現在異常が出ていて、確定済み」

ステータスバイト = 0x08 (bit3=1)
→ confirmedDTC のみ = 「過去に確定したが、現在は異常なし（間欠故障）」

ステータスバイト = 0x04 (bit2=1)
→ pendingDTC のみ = 「異常を検出したが、まだ確定していない」
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"06. DTC の検出と記録フロー"}),`
`,s.jsxs(n.p,{children:[`DTC は検出されたら即座に確定するわけではない。
誤検出を防ぐため、`,s.jsx(n.strong,{children:"デバウンスカウンタ"}),"と",s.jsx(n.strong,{children:"運転サイクル"}),"を使った段階的な確定プロセスがある。"]}),`
`,s.jsx(n.h3,{children:"状態遷移"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`異常検出
  │
  ▼
[デバウンス]  ← カウンタが閾値に達するまで繰り返し判定
  │ 閾値到達
  ▼
[Pending]    ← pendingDTC = 1。1 運転サイクル目の異常
  │ 次の運転サイクルでも再発
  ▼
[Confirmed]  ← confirmedDTC = 1。MIL 点灯条件を満たす場合あり
  │
  ├─ 異常が消えた場合 → testFailed = 0（confirmedDTC は残る）
  │
  ├─ 複数サイクル正常 → Aging（自動消去対象になる）
  │
  └─ テスターで消去 → 0x14 ClearDiagnosticInformation
`})}),`
`,s.jsx(n.h3,{children:"デバウンス方式"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"方式"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"カウンタベース"})}),s.jsx(n.td,{children:"テスト失敗でカウンタ加算、成功で減算。閾値到達で Pending"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"タイムベース"})}),s.jsx(n.td,{children:"異常が一定時間（例: 500ms）継続したら Pending"})]})]})]}),`
`,s.jsx(n.p,{children:`どちらを使うかは ECU / DTC ごとに設計で決まる。
AUTOSAR の Dem（Diagnostic Event Manager）モジュールがこのデバウンスロジックを管理している。`}),`
`,s.jsx(n.h3,{children:"Aging（自然消去）"}),`
`,s.jsxs(n.p,{children:[`Confirmed DTC は、異常が出なくなった後も一定回数の運転サイクルが正常に完了するまで保持される。
一般的には `,s.jsx(n.strong,{children:"40 運転サイクル"}),` で Aging 完了（OBD-II 要件）。
Aging が完了すると confirmedDTC ビットが自動的にクリアされる。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"07. FreezeFrame / Snapshot"}),`
`,s.jsxs(n.p,{children:["DTC が記録される際、",s.jsx(n.strong,{children:"その瞬間の ECU 内部データ"}),`を一緒に保存する仕組みが FreezeFrame（Snapshot）。
「いつ・どんな状況で異常が起きたか」を後から解析するための重要な情報。`]}),`
`,s.jsx(n.h3,{children:"記録される典型的なデータ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"DID"}),s.jsx(n.th,{children:"パラメータ"}),s.jsx(n.th,{children:"例"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0xF186"}),s.jsx(n.td,{children:"診断セッション"}),s.jsx(n.td,{children:"Default Session"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"エンジン回転数"}),s.jsx(n.td,{children:"rpm"}),s.jsx(n.td,{children:"2400 rpm"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"車速"}),s.jsx(n.td,{children:"km/h"}),s.jsx(n.td,{children:"60 km/h"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"エンジン冷却水温"}),s.jsx(n.td,{children:"℃"}),s.jsx(n.td,{children:"92 ℃"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"吸気温度"}),s.jsx(n.td,{children:"℃"}),s.jsx(n.td,{children:"35 ℃"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"バッテリー電圧"}),s.jsx(n.td,{children:"V"}),s.jsx(n.td,{children:"13.8 V"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"走行距離"}),s.jsx(n.td,{children:"km"}),s.jsx(n.td,{children:"45,230 km"})]})]})]}),`
`,s.jsxs(n.p,{children:["記録タイミングは DTC が ",s.jsx(n.strong,{children:"Pending → Confirmed に遷移した瞬間"}),`が一般的。
ただし ECU の設計によっては Pending 時点で FreezeFrame を取る場合もある。`]}),`
`,s.jsx(n.h3,{children:"Extended Data Record"}),`
`,s.jsxs(n.p,{children:["FreezeFrame に加えて、DTC ごとに ",s.jsx(n.strong,{children:"Extended Data"}),"（拡張データ）を持てる。"]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"データ"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Occurrence Counter"}),s.jsx(n.td,{children:"DTC 発生回数"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"Aging Counter"}),s.jsx(n.td,{children:"Aging サイクルカウンタ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"最終発生タイムスタンプ"}),s.jsx(n.td,{children:"最後に testFailed になった時刻"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"08. UDS 0x19 サブファンクション"}),`
`,s.jsxs(n.p,{children:["SID 0x19（ReadDTCInformation）は",s.jsx(n.strong,{children:"サブファンクション"}),`で読み出し方法を指定する。
実務で頻繁に使うものを中心に整理。`]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"SF"}),s.jsx(n.th,{children:"名称"}),s.jsx(n.th,{children:"用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x01"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportNumberOfDTCByStatusMask"})}),s.jsx(n.td,{children:"ステータスマスクに合致する DTC の件数を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x02"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportDTCByStatusMask"})}),s.jsx(n.td,{children:"ステータスマスクに合致する DTC の一覧を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x04"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportDTCSnapshotRecordByDTCNumber"})}),s.jsx(n.td,{children:"特定 DTC の FreezeFrame を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x06"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportDTCExtDataRecordByDTCNumber"})}),s.jsx(n.td,{children:"特定 DTC の Extended Data を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x09"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportDTCBySeverityMaskRecord"})}),s.jsx(n.td,{children:"重要度マスクで DTC をフィルタ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x0A"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportSupportedDTC"})}),s.jsx(n.td,{children:"ECU がサポートする全 DTC を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0x14"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"reportDTCFaultDetectionCounter"})}),s.jsx(n.td,{children:"デバウンスカウンタの現在値を取得"})]})]})]}),`
`,s.jsx(n.h3,{children:"使用例: Confirmed DTC を全件取得"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`Request:  19 02 08
              │  │  └─ StatusMask = 0x08（confirmedDTC のみ）
              │  └──── SF = 0x02（reportDTCByStatusMask）
              └─────── SID = 0x19

Response: 59 02 08 [DTC1 高][DTC1 中][DTC1 低][Status1] [DTC2 ...] ...
`})}),`
`,s.jsx(n.h3,{children:"使用例: 特定 DTC の FreezeFrame を取得"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`Request:  19 04 03 01 11 FF
              │  │  └──────┘ └─ RecordNumber = 0xFF（全レコード）
              │  │  DTC = 0x030111
              │  └─ SF = 0x04
              └──── SID = 0x19

Response: 59 04 03 01 11 [Status] [RecordNum] [DID1][Data1] [DID2][Data2] ...
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s9",children:"09. 実務での診断フロー"}),`
`,s.jsx(n.h3,{children:"開発フェーズ別の使い分け"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フェーズ"}),s.jsx(n.th,{children:"主に使うサービス"}),s.jsx(n.th,{children:"目的"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"開発中"})}),s.jsx(n.td,{children:"0x22 / 0x2E / 0x2F"}),s.jsx(n.td,{children:"DID 読み書き・アクチュエータ強制駆動でロジック検証"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"結合テスト"})}),s.jsx(n.td,{children:"0x19 / 0x14 / 0x85"}),s.jsx(n.td,{children:"DTC の発生確認・消去・検出停止"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"リプロ（書き込み）"})}),s.jsx(n.td,{children:"0x10 / 0x27 / 0x34 / 0x36 / 0x37"}),s.jsx(n.td,{children:"ソフト書き換え"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"量産ライン"})}),s.jsx(n.td,{children:"0x2E / 0x31"}),s.jsx(n.td,{children:"個体情報書き込み・EOL（End Of Line）検査"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"市場（ディーラー）"})}),s.jsx(n.td,{children:"0x19 / 0x14 / 0x22"}),s.jsx(n.td,{children:"故障診断・DTC 確認・消去"})]})]})]}),`
`,s.jsx(n.h3,{children:"ディーラーでの典型的な診断手順"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`1. 診断ツール接続
   └→ 0x10 01（Default Session）

2. 全 ECU に DTC 一括問い合わせ
   └→ 0x19 02 09（testFailed + confirmedDTC）

3. 該当 DTC の FreezeFrame 確認
   └→ 0x19 04 [DTC] FF
   └→ 発生時の車速・回転数・水温などから状況を推測

4. 修理実施

5. DTC 消去
   └→ 0x14 FF FF FF（全 DTC 消去）

6. テスト走行後、再度 DTC 確認
   └→ 0x19 02 09
   └→ 再発なしを確認して完了
`})}),`
`,s.jsx(n.h3,{children:"開発時のデバッグ Tips"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"0x2F InputOutputControl"}),` でアクチュエータを強制駆動すると、ハーネス断線の切り分けが楽になる。
ECU から「モーターを回せ」と指令して動かなければハーネスか負荷側、動けば制御ロジック側の問題`]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"0x85 02 ControlDTCSetting OFF"}),` をリプロ前に忘れると、書き込み中に大量の通信系 DTC が記録されてしまう。
リプロシーケンスでは必ず DTC 検出を止めてから書き込む`]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"0x19 14 reportDTCFaultDetectionCounter"}),` でデバウンスカウンタを見ると、「あと何回で DTC 確定するか」がわかる。
間欠故障の再現テストで重宝する`]}),`
`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"まとめ"})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"UDS は ISO 14229 で定義された車載診断の統一プロトコル。ISO-TP で CAN 上に載る"}),`
`,s.jsx(n.li,{children:"リクエスト / レスポンスモデルで、Positive（SID + 0x40）/ Negative（0x7F + NRC）で応答"}),`
`,s.jsx(n.li,{children:"DTC は 3 バイト構成で、1 バイトのステータスバイトが現在の状態を表す"}),`
`,s.jsx(n.li,{children:"検出 → Pending → Confirmed → Aging / 消去の段階的なライフサイクルがある"}),`
`,s.jsx(n.li,{children:"FreezeFrame で異常発生時の環境データを記録し、後から原因解析に活用できる"}),`
`,s.jsx(n.li,{children:"0x19 のサブファンクションを使い分けることで、必要な DTC 情報を効率よく取得できる"}),`
`]}),`
`]})]})}function As(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(M,{...e})}):M(e)}const bs=Object.freeze(Object.defineProperty({__proto__:null,default:As,frontmatter:us},Symbol.toStringTag,{value:"Module"})),Ds={title:"CCP / XCP 解説メモ — 車載 ECU 計測・キャリブレーション通信",date:"2026-03-31",description:"車載 ECU 開発の実務知見をもとに CCP / XCP を整理。プロトコル概要・パケット構造・DAQ / ODT・キャリブレーション・A2L ファイル・主要コマンドまで。",tags:["組み込み","車載"]};function P(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"CCP / XCP 解説メモ — 車載 ECU 計測・キャリブレーション通信"}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsxs(n.p,{children:[`これまでの車載 ECU 開発を通じて得た知見を整理した備忘録。
CAN / CAN FD の仕組みについては`,s.jsx(n.a,{href:"/blog/20260328-can-canfd-protocol",children:"こちらの記事"}),`を参照。
UDS / DTC については`,s.jsx(n.a,{href:"/blog/20260328-uds-dtc-vehicle-diagnostics",children:"こちらの記事"}),"を参照。"]}),`
`]}),`
`,s.jsx(g,{items:[{label:"CCP / XCP とは",href:"#s1"},{label:"プロトコルスタック上の位置",href:"#s2"},{label:"CCP の概要",href:"#s3"},{label:"XCP の概要・パケット構造",href:"#s4"},{label:"DAQ（データ計測）",href:"#s5"},{label:"ODT と DAQ リスト",href:"#s6"},{label:"キャリブレーション",href:"#s7"},{label:"A2L ファイル",href:"#s8"},{label:"主要コマンド一覧",href:"#s9"},{label:"実務での使い方",href:"#s10"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"01. CCP / XCP とは"}),`
`,s.jsx(n.p,{children:`CCP（CAN Calibration Protocol）と XCP（Universal Measurement and Calibration Protocol）は、**ECU 内部変数のリアルタイム計測（DAQ）とキャリブレーション（パラメータ書き換え）**を行うためのプロトコル。
ASAM（Association for Standardization of Automation and Measuring Systems）が規格化している。`}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"プロトコル"}),s.jsx(n.th,{children:"規格"}),s.jsx(n.th,{children:"位置づけ"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CCP"})}),s.jsx(n.td,{children:"ASAM MCD-1 CCP"}),s.jsx(n.td,{children:"CAN 専用の旧世代プロトコル"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"XCP"})}),s.jsx(n.td,{children:"ASAM MCD-1 XCP"}),s.jsx(n.td,{children:"CAN / CAN FD / Ethernet / USB など複数トランスポートに対応した後継"})]})]})]}),`
`,s.jsxs(n.p,{children:["UDS が「診断・書き込み」用途であるのに対し、XCP は",s.jsx(n.strong,{children:"開発・適合段階でのリアルタイム観測と値の書き換え"}),`に特化している。
ツールとしては Vector の CANape や ETAS の INCA が代表的。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"02. プロトコルスタック上の位置"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`┌──────────────────────────────────────────┐
│  XCP（ASAM MCD-1 XCP）                   │  ← アプリケーション層
│  計測・キャリブレーション定義             │
├──────────────────────────────────────────┤
│  トランスポート層                         │
│  XCP on CAN / XCP on CAN FD              │
│  XCP on Ethernet（TCP or UDP）           │
│  XCP on USB / SPI など                   │
├──────────────────────────────────────────┤
│  CAN / CAN FD / Ethernet など            │  ← データリンク + 物理層
└──────────────────────────────────────────┘
`})}),`
`,s.jsxs(n.p,{children:["XCP はトランスポート層を抽象化しているため、",s.jsx(n.strong,{children:"上位のコマンド体系はどのトランスポートでも共通"}),`。
CCP は CAN 専用であり XCP の前身にあたる。現在の新規開発では XCP on CAN が主流。`]}),`
`,s.jsx(n.h3,{children:"車両ネットワーク上の XCP 全体像"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`  ┌─────────────────────────────────────┐
  │  適合 PC                            │
  │  CANape / INCA                      │
  └────────────────┬────────────────────┘
                   │ USB / Ethernet
                   │
  ┌────────────────┴────────────────────┐
  │  CAN インターフェース                │
  │  （Vector VN シリーズ など）         │
  └────────────────┬────────────────────┘
                   │
  ════════════════ CAN バス ════════════════════════
         │                   │                   │
  ┌──────┴───────┐   ┌───────┴──────┐   ┌────────┴─────┐
  │  Engine ECU  │   │  Brake ECU   │   │   Body ECU   │
  │              │   │              │   │              │
  │  XCP スレーブ│    │  XCP スレーブ│   │  （XCP なし） │
  │  ● DAQ       │   │  ● DAQ       │   │              │
  │  ● Calib     │   │  ● Calib     │   │              │
  └──────────────┘   └──────────────┘   └──────────────┘
`})}),`
`,s.jsxs(n.p,{children:[`適合ツールから見ると「CAN ID で区別された複数の XCP スレーブ」が並ぶ構成。
`,s.jsx(n.code,{children:"CONNECT"})," コマンドのステーションアドレスで接続先 ECU を切り替える。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"03. CCP の概要"}),`
`,s.jsx(n.p,{children:`CCP は 2000 年代前後の ECU 開発で広く使われた CAN 専用プロトコル。
現在は XCP に置き換わっているが、既存 ECU との通信でまだ遭遇する。`}),`
`,s.jsx(n.h3,{children:"通信モデル"}),`
`,s.jsx(n.p,{children:"CCP はマスター（PC・ツール側）とスレーブ（ECU 側）の 1:1 通信。"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`マスター（CANape / INCA）           スレーブ（ECU）
   │                                    │
   │── CTO（Command Transfer Object）→  │  コマンド送信
   │                                    │  処理
   │←─ CRM（Command Return Message）──   │  応答
   │                                     │
   │←─ DTO（Data Transfer Object）────   │  DAQ データ送信（非同期）
`})}),`
`,s.jsx(n.h3,{children:"CAN ID の割り当て"}),`
`,s.jsxs(n.p,{children:["CCP では ",s.jsx(n.strong,{children:"コマンド用とレスポンス用に別々の CAN ID"}),` を使用する。
接続時に `,s.jsx(n.code,{children:"CONNECT"})," コマンドでスレーブアドレスを指定し、セッションを確立する。"]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"オブジェクト"}),s.jsx(n.th,{children:"方向"}),s.jsx(n.th,{children:"内容"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"CTO"}),s.jsx(n.td,{children:"マスター → スレーブ"}),s.jsx(n.td,{children:"コマンド（最大 8 バイト）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"CRM"}),s.jsx(n.td,{children:"スレーブ → マスター"}),s.jsx(n.td,{children:"コマンドへの応答（最大 8 バイト）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"DTO"}),s.jsx(n.td,{children:"スレーブ → マスター"}),s.jsx(n.td,{children:"DAQ データ（非同期・最大 8 バイト）"})]})]})]}),`
`,s.jsx(n.h3,{children:"CCP のパケット構造"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`Byte 0      Byte 1      Byte 2-7
[CMD/RET]   [CTR]       [データ]
  │           │
  │           └─ カウンタ（リクエスト / レスポンス対応確認用）
  └─────────── コマンドコード または 戻り値
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"04. XCP の概要・パケット構造"}),`
`,s.jsx(n.p,{children:`XCP は CCP の後継として ASAM が策定。
CAN 以外のトランスポートにも対応し、機能も大幅に拡張されている。`}),`
`,s.jsx(n.h3,{children:"XCP の特徴"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"項目"}),s.jsx(n.th,{children:"CCP"}),s.jsx(n.th,{children:"XCP"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"トランスポート"}),s.jsx(n.td,{children:"CAN のみ"}),s.jsx(n.td,{children:"CAN / CAN FD / Ethernet / USB / SPI など"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ペイロード上限"}),s.jsx(n.td,{children:"8 バイト（CAN 制約）"}),s.jsx(n.td,{children:"トランスポート依存（CAN FD なら最大 64 バイト）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"セキュリティ"}),s.jsx(n.td,{children:"Seed & Key"}),s.jsx(n.td,{children:"Seed & Key（アルゴリズム拡張）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"STIM（逆方向注入）"}),s.jsx(n.td,{children:"限定的"}),s.jsx(n.td,{children:"標準サポート"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"タイムスタンプ"}),s.jsx(n.td,{children:"なし"}),s.jsx(n.td,{children:"DAQ パケットに付加可能"})]})]})]}),`
`,s.jsx(n.h3,{children:"XCP パケット構造（XCP on CAN の場合）"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`Byte 0      Byte 1      Byte 2 ～
[PID]       [ERR/CTR]   [データ]
  │
  └─ Packet Identifier
       0x00-0xBF : コマンド / レスポンス
       0xC0-0xFF : DAQ パケット（DAQ リスト番号）
`})}),`
`,s.jsx(n.h3,{children:"レスポンスの種類"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"PID"}),s.jsx(n.th,{children:"種別"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0xFF"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"POSITIVE RESPONSE（RES）"})}),s.jsx(n.td,{children:"コマンド成功"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0xFE"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"ERROR（ERR）"})}),s.jsx(n.td,{children:"コマンド失敗。Byte 1 にエラーコード"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0xFD"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"EVENT（EV）"})}),s.jsx(n.td,{children:"ECU からの非同期イベント通知"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"0xFC"}),s.jsx(n.td,{children:s.jsx(n.strong,{children:"SERVICE REQUEST（SERV）"})}),s.jsx(n.td,{children:"ECU からのサービス要求"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"05. DAQ（データ計測）"}),`
`,s.jsxs(n.p,{children:[`DAQ（Data Acquisition）は XCP の中核機能。
ECU 内部の変数（センサー値・制御量・フラグなど）を`,s.jsx(n.strong,{children:"指定した周期でリアルタイムに読み出す"}),"仕組み。"]}),`
`,s.jsx(n.h3,{children:"ツール・XCP スレーブ・ECU 内部タスクの 3 層構造"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`  ┌─────────────────────┐
  │  CANape / INCA      │  ← 適合ツール（マスター）
  │                     │     A2L で変数名 ↔ アドレスを把握
  └──────────┬──────────┘
             │ XCP on CAN（コマンド / DAQ パケット）
             │
  ┌──────────┴──────────────────────────────────────────┐
  │  XCP スレーブ（ECU 内 XCP ドライバ）                  │
  │                                                     │
  │  CONNECT / GET_SEED / UNLOCK ─→ セッション確立       │
  │  SET_DAQ_PTR / WRITE_DAQ ──────→ DAQ 設定受け付け    │
  │  START_STOP_SYNCH ─────────────→ 計測開始            │
  │  SHORT_DOWNLOAD ───────────────→ パラメータ書換       │
  │                                                      │
  │  ┌──────────────────────────────────────────────┐    │
  │  │  制御タスク（例: 1ms 周期）                    │   │
  │  │                                              │   │
  │  │  ① センサー読み込み                           │   │
  │  │  ② 制御演算                                   │   │
  │  │     └→ XCP が変数値をスナップショット ───────────→ DAQ パケット送信
  │  │  ③ アクチュエータ出力                          │   │
  │  │     ↑ SHORT_DOWNLOAD で書き換えた値が反映      │   │
  │  └──────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────┘
`})}),`
`,s.jsxs(n.p,{children:["XCP スレーブは制御タスクと",s.jsx(n.strong,{children:"非同期に"}),`動作する。
制御タスクが 1ms で回っていても、XCP のコマンド処理は別タスク（低優先度）で動くのが一般的。
DAQ のスナップショットは制御タスクの中でトリガされるため、制御周期に同期した計測が実現できる。`]}),`
`,s.jsx(n.h3,{children:"DAQ の動作イメージ"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`マスター                              スレーブ（ECU）
   │                                      │
   │── DAQ リスト設定（変数・周期）──→      │
   │── START_STOP_SYNCH ─────────────→    │
   │                                      │
   │←─ DAQ パケット（変数値）──────────     │  1ms ごと
   │←─ DAQ パケット（変数値）──────────     │  1ms ごと
   │         ：                            │
`})}),`
`,s.jsxs(n.p,{children:["通常の ",s.jsx(n.code,{children:"UPLOAD"}),` コマンドによる読み出しはポーリング（マスターがリクエストして ECU が応答）だが、
DAQ は ECU が`,s.jsx(n.strong,{children:"自律的にデータを送信"}),`する点が大きく異なる。
制御周期に同期した高頻度計測が可能（CAN FD では数百 Hz も現実的）。`]}),`
`,s.jsx(n.h3,{children:"ポーリングと DAQ の比較"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"方式"}),s.jsx(n.th,{children:"仕組み"}),s.jsx(n.th,{children:"適用場面"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"ポーリング（UPLOAD）"}),s.jsx(n.td,{children:"マスターが都度リクエスト"}),s.jsx(n.td,{children:"単発確認・低頻度読み出し"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"DAQ"}),s.jsx(n.td,{children:"ECU が自律送信"}),s.jsx(n.td,{children:"高頻度・周期的な計測"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"06. ODT と DAQ リスト"}),`
`,s.jsxs(n.p,{children:["DAQ の設定は ",s.jsx(n.strong,{children:"ODT（Object Descriptor Table）"})," と ",s.jsx(n.strong,{children:"DAQ リスト"})," の 2 階層で構成される。"]}),`
`,s.jsx(n.h3,{children:"階層構造"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`DAQ リスト 0（例: 1ms 周期）
  └─ ODT 0
       ├─ Entry 0: 変数 A のアドレス・サイズ
       ├─ Entry 1: 変数 B のアドレス・サイズ
       └─ Entry 2: 変数 C のアドレス・サイズ
  └─ ODT 1
       ├─ Entry 0: 変数 D のアドレス・サイズ
       └─ Entry 1: 変数 E のアドレス・サイズ

DAQ リスト 1（例: 10ms 周期）
  └─ ODT 0
       └─ Entry 0: 変数 F のアドレス・サイズ
`})}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"用語"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"DAQ リスト"})}),s.jsx(n.td,{children:"計測グループ。送信周期・イベントを設定する単位"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ODT"})}),s.jsx(n.td,{children:"CAN フレーム 1 本に対応するデータのまとまり（最大 7 バイト / CAN フレーム）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ODT Entry"})}),s.jsx(n.td,{children:"計測する変数 1 つ。ECU メモリのアドレスとサイズで指定"})]})]})]}),`
`,s.jsx(n.h3,{children:"DAQ 設定のシーケンス"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`FREE_DAQ                        ← 既存 DAQ リストを全解放
ALLOC_DAQ      daqCount         ← DAQ リスト数を確保
ALLOC_ODT      daqNum, odtCount ← ODT 数を確保
ALLOC_ODT_ENTRY daqNum, odtNum, entryCount ← ODT エントリ数を確保

SET_DAQ_PTR    daqNum, odtNum, entryNum     ← 書き込み先を指定
WRITE_DAQ      bitOffset, size, address     ← 変数アドレスを登録
  （WRITE_DAQ を変数の数だけ繰り返す）

SET_DAQ_LIST_MODE  daqNum, eventChannel, prescaler ← 周期を設定
START_STOP_DAQ_LIST  daqNum, mode=START            ← 個別スタート
START_STOP_SYNCH     mode=START_SELECTED           ← 一斉スタート
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"07. キャリブレーション"}),`
`,s.jsxs(n.p,{children:["キャリブレーションは ECU 内部の",s.jsx(n.strong,{children:"パラメータ（マップ・定数）をリアルタイムに書き換える"}),`機能。
制御ゲイン・センサー補正値・マップテーブルなどを走行しながら調整できる。`]}),`
`,s.jsx(n.h3,{children:"MTA（Memory Transfer Address）"}),`
`,s.jsxs(n.p,{children:["XCP のメモリ操作は ",s.jsx(n.strong,{children:"MTA（Memory Transfer Address）"}),` というポインタを経由して行う。
`,s.jsx(n.code,{children:"SET_MTA"})," で書き込み先アドレスを設定してから ",s.jsx(n.code,{children:"DOWNLOAD"})," / ",s.jsx(n.code,{children:"UPLOAD"})," を実行する。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`マスター                        スレーブ
   │── SET_MTA（アドレス A） →  │  ポインタを A にセット
   │── DOWNLOAD（値） ────────→ │  A に値を書き込み
   │   または
   │── UPLOAD（サイズ） ──────→ │
   │←─ RES（読み出しデータ） ──  │  A からサイズバイト読み出し
`})}),`
`,s.jsx(n.h3,{children:"SHORT_UPLOAD / SHORT_DOWNLOAD"}),`
`,s.jsxs(n.p,{children:["4 バイト以下の小さなデータはアドレスをパケット内に直接埋め込む ",s.jsx(n.code,{children:"SHORT_UPLOAD"})," / ",s.jsx(n.code,{children:"SHORT_DOWNLOAD"}),` が使える。
`,s.jsx(n.code,{children:"SET_MTA"})," を省略できるため、スポット的な確認・修正に便利。"]}),`
`,s.jsx(n.h3,{children:"RAM キャリブレーションとフラッシュ書き込みの違い"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"方式"}),s.jsx(n.th,{children:"説明"}),s.jsx(n.th,{children:"特徴"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"RAM キャリブレーション"})}),s.jsx(n.td,{children:"RAM 上のパラメータを直接書き換え"}),s.jsx(n.td,{children:"即時反映・電源 OFF で消える"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"RAM init / Flash"})}),s.jsx(n.td,{children:"RAM で調整後、確定値をフラッシュに焼く"}),s.jsx(n.td,{children:"永続化。リプロと組み合わせる"})]})]})]}),`
`,s.jsx(n.p,{children:"開発フェーズでは RAM キャリブレーションで素早く値を試し、確定後にフラッシュへ書き込む流れが一般的。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"08. A2L ファイル"}),`
`,s.jsxs(n.p,{children:["A2L（ASAM MCD-2 MC）は、",s.jsx(n.strong,{children:"ECU 内部の変数やパラメータのレイアウトを記述したデータベースファイル"}),`。
拡張子は `,s.jsx(n.code,{children:".a2l"}),"。CANape・INCA などのツールはこのファイルを読み込むことで ECU の変数名とメモリアドレスを紐付ける。"]}),`
`,s.jsx(n.h3,{children:"A2L の主要オブジェクト"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"オブジェクト"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"MEASUREMENT"})}),s.jsx(n.td,{children:"計測変数（読み出し専用）。センサー値・計算値など"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CHARACTERISTIC"})}),s.jsx(n.td,{children:"キャリブレーションパラメータ（読み書き可）。マップ・定数など"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"AXIS_PTS"})}),s.jsx(n.td,{children:"マップの軸データ（ブレークポイント）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"COMPU_METHOD"})}),s.jsx(n.td,{children:"生値 ↔ 物理値の変換式（係数・オフセット・単位）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"MEMORY_SEGMENT"})}),s.jsx(n.td,{children:"RAM / Flash などのメモリ領域定義"})]})]})]}),`
`,s.jsx(n.h3,{children:"A2L の記述例（簡略）"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`/begin MEASUREMENT
  engineRpm          /* 変数名 */
  "エンジン回転数"    /* 説明 */
  UWORD              /* データ型 */
  convRpm            /* COMPU_METHOD 参照 */
  0                  /* 下限 */
  8000               /* 上限 */
  ECU_ADDRESS 0x40001234  /* メモリアドレス */
/end MEASUREMENT

/begin COMPU_METHOD convRpm
  "rpm 換算" RAT_FUNC "%6.1" "rpm"
  COEFFS 0 0.125 0 0 0 1  /* 物理値 = 生値 × 0.125 */
/end COMPU_METHOD
`})}),`
`,s.jsx(n.h3,{children:"A2L の生成フロー"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`ECU ソースコード
  │
  ▼
コンパイル・リンク
  │
  ├─→ .elf / .hex（フラッシュ書き込み用）
  │
  └─→ .a2l（シンボル情報 + 手動記述のメタ情報）
        │
        └─→ CANape / INCA に読み込み → 計測・キャリブレーション開始
`})}),`
`,s.jsx(n.p,{children:"AUTOSAR 環境では コード生成ツールが A2L を自動生成するケースも多い。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s9",children:"09. 主要コマンド一覧"}),`
`,s.jsx(n.h3,{children:"接続・セッション管理"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"コマンド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"CONNECT"})}),s.jsx(n.td,{children:"セッション確立。ECU の基本情報（バイトオーダー・アドレス粒度など）を取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"DISCONNECT"})}),s.jsx(n.td,{children:"セッション切断"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"GET_STATUS"})}),s.jsx(n.td,{children:"ECU の現在状態（セッション・DAQ 状態・キャリブレーションモードなど）取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"GET_COMM_MODE_INFO"})}),s.jsx(n.td,{children:"通信モード情報（インタリーブモード・ブロックモード対応など）取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"GET_ID"})}),s.jsx(n.td,{children:"ECU 識別情報取得（A2L ファイル名など）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TIME_CORRELATION"})}),s.jsx(n.td,{children:"マスター / スレーブ間のタイムスタンプ同期"})]})]})]}),`
`,s.jsx(n.h3,{children:"セキュリティ"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"コマンド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"GET_SEED"})}),s.jsx(n.td,{children:"セキュリティ解除用シードを取得"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"UNLOCK"})}),s.jsx(n.td,{children:"キーを送信してセキュリティ解除"})]})]})]}),`
`,s.jsx(n.p,{children:`UDS の SecurityAccess（0x27）と同様の Seed & Key 方式。
キャリブレーション・フラッシュ書き込みなど保護リソースへのアクセス前に実施する。`}),`
`,s.jsx(n.h3,{children:"メモリアクセス"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"コマンド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SET_MTA"})}),s.jsx(n.td,{children:"MTA（メモリ転送ポインタ）を設定"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"UPLOAD"})}),s.jsx(n.td,{children:"MTA から指定バイト数を読み出し"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SHORT_UPLOAD"})}),s.jsx(n.td,{children:"アドレス直指定で 4 バイト以下を読み出し"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"DOWNLOAD"})}),s.jsx(n.td,{children:"MTA へ指定バイト数を書き込み"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SHORT_DOWNLOAD"})}),s.jsx(n.td,{children:"アドレス直指定で 4 バイト以下を書き込み"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"DOWNLOAD_NEXT"})}),s.jsx(n.td,{children:"ブロック転送モードで連続書き込み"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"MODIFY_BITS"})}),s.jsx(n.td,{children:"ビットマスクで部分書き換え"})]})]})]}),`
`,s.jsx(n.h3,{children:"DAQ 設定・制御"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"コマンド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"FREE_DAQ"})}),s.jsx(n.td,{children:"全 DAQ リストを解放"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ALLOC_DAQ"})}),s.jsx(n.td,{children:"DAQ リストを確保"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ALLOC_ODT"})}),s.jsx(n.td,{children:"ODT を確保"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ALLOC_ODT_ENTRY"})}),s.jsx(n.td,{children:"ODT エントリを確保"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SET_DAQ_PTR"})}),s.jsx(n.td,{children:"DAQ 設定の書き込み先を指定"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"WRITE_DAQ"})}),s.jsx(n.td,{children:"ODT エントリに変数を登録"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SET_DAQ_LIST_MODE"})}),s.jsx(n.td,{children:"DAQ リストの周期・イベントを設定"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"START_STOP_DAQ_LIST"})}),s.jsx(n.td,{children:"DAQ リストの個別開始 / 停止"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"START_STOP_SYNCH"})}),s.jsx(n.td,{children:"複数 DAQ リストの一斉開始 / 停止"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"GET_DAQ_CLOCK"})}),s.jsx(n.td,{children:"ECU のタイムスタンプカウンタを取得"})]})]})]}),`
`,s.jsx(n.h3,{children:"フラッシュ書き込み（PGM）"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"コマンド"}),s.jsx(n.th,{children:"説明"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"PROGRAM_START"})}),s.jsx(n.td,{children:"プログラミングモード開始"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"PROGRAM_CLEAR"})}),s.jsx(n.td,{children:"フラッシュ消去"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"PROGRAM"})}),s.jsx(n.td,{children:"フラッシュ書き込み"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"PROGRAM_RESET"})}),s.jsx(n.td,{children:"ECU リセット"})]})]})]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s10",children:"10. 実務での使い方"}),`
`,s.jsx(n.h3,{children:"開発フェーズ別の使い分け"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"フェーズ"}),s.jsx(n.th,{children:"主な用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"制御ロジック開発"})}),s.jsx(n.td,{children:"DAQ で内部変数を観測しながらロジックを検証"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"パラメータ適合"})}),s.jsx(n.td,{children:"CHARACTERISTIC を RAM キャリブレーションでリアルタイム調整"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"HIL / SIL テスト"})}),s.jsx(n.td,{children:"STIM で入力信号を注入し、ECU の応答を DAQ で確認"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"量産前確定"})}),s.jsx(n.td,{children:"調整済みパラメータを PGM コマンドでフラッシュに焼き付け"})]})]})]}),`
`,s.jsx(n.h3,{children:"CANape / INCA での典型的なワークフロー"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`1. A2L ファイルと .hex を CANape に読み込み
   └→ CONNECT → GET_ID で A2L ファイル名確認

2. 計測設定
   └→ 観測したい MEASUREMENT 変数を選択
   └→ FREE_DAQ → ALLOC_DAQ → ... → START_STOP_SYNCH

3. 走行・計測
   └→ DAQ パケットが自動的に届き波形表示

4. キャリブレーション
   └→ GET_SEED / UNLOCK でセキュリティ解除
   └→ CHARACTERISTIC のマップをグリッドで編集
   └→ SHORT_DOWNLOAD で即時書き換え・挙動確認

5. 確定値の保存
   └→ PROGRAM_START → PROGRAM_CLEAR → PROGRAM
   └→ PROGRAM_RESET で ECU リセット・動作確認
`})}),`
`,s.jsx(n.h3,{children:"よくあるトラブルと対処"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"CONNECT 後に ERR_ACCESS_LOCKED"}),`
XCP セッションが前回の切断で正常に終了していない場合がある。
ECU を再起動して再接続するか、`,s.jsx(n.code,{children:"DISCONNECT"})," を先に送って状態をリセットする"]}),`
`]}),`
`,s.jsxs(n.li,{children:[`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"DAQ データが間引かれる / 欠落する"}),`
CAN バスの負荷が高い場合に DAQ パケットがドロップする。
DAQ リストの変数数を減らすか、周期を遅くしてバス負荷を下げる。
CAN FD への切り替えも有効`]}),`
`]}),`
`,s.jsxs(n.li,{children:[`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"SHORT_DOWNLOAD 後に値が戻る"}),`
RAM キャリブレーション中に ECU の初期化処理がパラメータを上書きしている可能性。
書き換えが有効になるセクション（初期化後のタスク起動以降）のタイミングで実施する`]}),`
`]}),`
`,s.jsxs(n.li,{children:[`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"A2L のアドレスがビルドごとにずれる"}),`
最適化オプションやリンカスクリプトの変更でシンボルアドレスが変わる。
A2L は必ずその .elf と同一ビルドのものを使う`]}),`
`]}),`
`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"まとめ"})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"CCP は CAN 専用の旧世代プロトコル。XCP はマルチトランスポート対応の後継"}),`
`,s.jsx(n.li,{children:"XCP のコア機能は DAQ（周期的な変数読み出し）とキャリブレーション（パラメータ書き換え）"}),`
`,s.jsx(n.li,{children:"DAQ は ODT / DAQ リストの 2 階層で変数と送信周期を管理する"}),`
`,s.jsx(n.li,{children:"メモリアクセスは MTA ポインタを経由。SHORT 系コマンドで省略可能"}),`
`,s.jsx(n.li,{children:"A2L ファイルが変数名とメモリアドレスの橋渡しをしており、ツールと ECU を繋ぐ"}),`
`,s.jsx(n.li,{children:"Seed & Key でセキュリティ保護。キャリブレーション前に解除が必要"}),`
`]}),`
`]})]})}function Ss(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(P,{...e})}):P(e)}const Ts=Object.freeze(Object.defineProperty({__proto__:null,default:Ss,frontmatter:Ds},Symbol.toStringTag,{value:"Module"})),Es={title:"FY2025 振り返り — 火消しと昇格と、あとちょっとした隠居宣言",date:"2026-03-31",description:"年中火消し・新規 PJ 参画・チーフエンジニア昇格。色々あった FY2025 の個人的な振り返り。あと後輩への隠居宣言（冗談）。",tags:["雑記"]};function I(e){const n={blockquote:"blockquote",h1:"h1",hr:"hr",p:"p",strong:"strong",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"FY2025 振り返り — 火消しと昇格と、あとちょっとした隠居宣言"}),`
`,s.jsx(g,{items:[{label:"FY2025 を一言で表すと",href:"#s1"},{label:"火消し屋の一年",href:"#s2"},{label:"新規 PJ 参画",href:"#s3"},{label:"チーフエンジニア昇格",href:"#s4"},{label:"後輩よ、頼んだ",href:"#s5"},{label:"FY2026 に向けて",href:"#s6"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"FY2025 を一言で表すと"}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"「常在戦場」"}),"。"]}),`
`,s.jsx(n.p,{children:`これ以外に言葉が見つからない。
気づいたら 4 月で、気づいたら 3 月だった。
その間ずっと何かが燃えていた気がする。`}),`
`,s.jsxs(n.p,{children:["そして気づけば、今の会社に入って",s.jsx(n.strong,{children:"丸 10 年"}),`が経った。
正直、10 年という数字を目の前にすると不思議な感覚がある。
長いようで、振り返るとあっという間だった。
入社当時の自分が今の自分を見たら、何を思うだろうか。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"火消し屋の一年"}),`
`,s.jsxs(n.p,{children:["最初に言っておく。",s.jsx(n.strong,{children:"私は火消し芸人ではない。"})]}),`
`,s.jsxs(n.p,{children:["今年は本当に火消しが多かった。10 年のキャリアで",s.jsx(n.strong,{children:"過去一番"}),`だったと思う。
「これ誰が見るの？」という案件が定期的に降ってきて、気づいたら自分が対応している、というパターンを何度繰り返しただろう。`]}),`
`,s.jsxs(n.p,{children:[`体感としては 2〜3 人分の仕事が同時に回ってきていて、てんやわんやだった。
しんどかったのは事実。でも、ポジティブに捉えると`,s.jsx(n.strong,{children:"それだけ成長する機会をもらえた年"}),"でもあった。"]}),`
`,s.jsxs(n.p,{children:["火消しの現場って、",s.jsx(n.strong,{children:"平時では絶対に見えないものが見える"}),`。
普段は隠れている設計の歪み、誰も触りたくないコード、チームの連携の綻び——そういうものが一気に露出する。
対応しながら「なるほど、ここが弱点だったのか」と学べることは多かった。`]}),`
`,s.jsxs(n.p,{children:[`あと、今年は社内外問わず頼られる場面がさらに増えた。
「困ったときに声をかけてもらえる」というのは、ありがたいと同時に、`,s.jsx(n.strong,{children:"純粋にモチベーションになる"}),`。
結果としてしんどかったのだけど、それでも前向きに動けたのはこれが大きかった気がする。`]}),`
`,s.jsx(n.p,{children:"とはいえ、来年は少し落ち着いた状況で頼られたい。正直に言うと。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"新規 PJ 参画"}),`
`,s.jsx(n.p,{children:`年度の途中から新しいプロジェクトに入った。
これが今年一番の収穫だったかもしれない。`}),`
`,s.jsxs(n.p,{children:["新しい PJ ということは、",s.jsx(n.strong,{children:"新しい人・新しい技術・新しい文化"}),`との出会いでもある。
自分がずっと「当たり前」だと思っていたやり方が、外から見ると全然当たり前じゃなかったりする。
逆に、自分の経験が「それ知らなかった、助かる」と言われる瞬間もあって、それはそれで嬉しかった。`]}),`
`,s.jsx(n.p,{children:`技術面でも新しいドメインに触れる機会があり、知識の幅が広がった。
これまで深さ方向にしか掘っていなかったところに、横の広がりができた感覚がある。`}),`
`,s.jsxs(n.p,{children:["「慣れた環境でうまくやる」のも大事だけど、",s.jsx(n.strong,{children:"慣れない環境に飛び込んで適応する力"}),"が自分には足りていなかったと思っていたので、今年はそこを鍛えられた一年だった。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"チーフエンジニア昇格"}),`
`,s.jsx(n.p,{children:`昇格した。
正直、嬉しさよりも先に「責任が増えた」という実感が来た。`}),`
`,s.jsxs(n.p,{children:["チーフエンジニアという肩書きになって一番変わったのは、",s.jsx(n.strong,{children:"見える範囲"}),`だと思う。
コードや設計を見るのと同じくらい、人やプロセスを見る時間が増えた。
「このタスクどう実装するか」よりも「このチームどう動かすか」を考える場面が格段に多くなった。`]}),`
`,s.jsx(n.p,{children:`最初はそれが少し窮屈だった。
自分で手を動かした方が早いのに、と思うことも正直あった。
でも徐々に「自分が動かなくてもうまく回る状態を作ること」の方が、長期的には価値が高いと気づいてきた。`}),`
`,s.jsxs(n.p,{children:["視座が上がると、",s.jsx(n.strong,{children:"個々の問題ではなく構造が見えてくる"}),`。
「なぜここで毎回詰まるのか」「なぜこのバグが繰り返し発生するのか」——原因が個人のミスではなく仕組みにある、ということが分かると、打てる手も変わってくる。`]}),`
`,s.jsx(n.p,{children:"まだ慣れない部分も多いけど、この視点は持ち続けたい。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"後輩よ、頼んだ"}),`
`,s.jsx(n.p,{children:"さて、冗談の話をしよう。"}),`
`,s.jsxs(n.p,{children:["チーフになって視座が上がって、新 PJ でいろいろ学んで——となると次の自然な流れは",s.jsx(n.strong,{children:"隠居"}),"である（論理の飛躍）。"]}),`
`,s.jsx(n.p,{children:`後輩たちが着実に育っているのを見ていると、「もうこれは任せて大丈夫では？」という気持ちが年々強くなっている。
「困ったら聞いてね」と言いながら、実際には困ってないじゃないか、という。`}),`
`,s.jsx(n.p,{children:"本当に頼もしい。"}),`
`,s.jsxs(n.p,{children:["隠居宣言はさすがに冗談だけど、",s.jsx(n.strong,{children:"自分がいなくても回る組織を作ること"}),`はチーフエンジニアとして真面目に目指したいところ。
いつかちゃんと「任せた」と言える日のために、今年も引き続き人を育てていきたい。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"FY2026 に向けて"}),`
`,s.jsx(n.p,{children:`火消しは減らす。
新しい挑戦は増やす。
後輩の背中を押す。`}),`
`,s.jsxs(n.p,{children:[`あと、今年はインフラ側——特に AWS 周りに本腰を入れたい。
組み込み・アプリときて、クラウドインフラまで触れるようになると、`,s.jsx(n.strong,{children:"システム全体を俯瞰できるエンジニア"}),`に一歩近づける気がしている。
チーフになって「構造を見る目」が育ってきた今が、ちょうどいいタイミングだと思っている。`]}),`
`,s.jsx(n.p,{children:"シンプルにいこう。"}),`
`,s.jsxs(n.p,{children:["そして何より——",s.jsx(n.strong,{children:"健康第一で。"}),`
10 年続けてこられたのも、結局は体があってこそ。
どんなに仕事が面白くても、燃え尽きたら終わりだ。
FY2026 は、無理しすぎない範囲で全力を出す、そんな一年にしたい。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:`お読みいただいた方、ありがとうございます。
技術メモじゃない記事は久しぶりに書いた気がしますが、たまにはこういうのもいいですね。
FY2026 もよろしくお願いします。`}),`
`]})]})}function fs(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(I,{...e})}):I(e)}const ys=Object.freeze(Object.defineProperty({__proto__:null,default:fs,frontmatter:Es},Symbol.toStringTag,{value:"Module"})),Rs={title:"JTAG / RAM 解析入門 — 組み込みデバッグの武器を知る",date:"2026-04-12",description:"組み込み開発で欠かせない JTAG の仕組みと RAM 解析の基礎を入門者向けに解説。TAP コントローラー・デバッグ動作原理から OpenOCD / J-Link / TRACE32 / Renesas E1/E2 のツール比較・実践フローまで。",tags:["組み込み","デバッグ"]};function k(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"JTAG / RAM 解析入門 — 組み込みデバッグの武器を知る"}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:`組み込みソフトウェアのデバッグでは、printf デバッグが通用しないことも多い。
JTAG と RAM 解析は、そんな状況を突破するための代表的な手段。
この記事では仕組みから実践フローまで、入門者向けに整理する。`}),`
`]}),`
`,s.jsx(g,{items:[{label:"JTAG とは",href:"#s1"},{label:"JTAG のアーキテクチャ",href:"#s2"},{label:"バウンダリスキャン",href:"#s3"},{label:"デバッガとしての JTAG",href:"#s4"},{label:"RAM 解析とは",href:"#s5"},{label:"主要ツール紹介",href:"#s6"},{label:"実践フロー",href:"#s7"},{label:"よくある躓きポイント",href:"#s8"}]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s1",children:"01. JTAG とは"}),`
`,s.jsxs(n.p,{children:["JTAG（Joint Test Action Group）は、",s.jsx(n.strong,{children:"IEEE 1149.1"}),` として標準化されたインターフェース規格。
1990 年に策定され、もともとは「プリント基板上の部品が正しく実装されているか検査する」ことを目的に作られた。`]}),`
`,s.jsxs(n.p,{children:["現在では転用が進み、",s.jsx(n.strong,{children:"マイコン・SoC のデバッグインターフェース"}),`として広く使われている。
ARM Cortex-M / Cortex-R / Cortex-A、RISC-V、MIPS など主要なプロセッサアーキテクチャのほぼすべてが JTAG をサポートしている。`]}),`
`,s.jsx(n.h3,{children:"なぜ JTAG が必要か"}),`
`,s.jsxs(n.p,{children:["組み込みソフトのデバッグが難しい理由は、",s.jsx(n.strong,{children:"実行環境が閉じている"}),"から。"]}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"UART が使えないほど初期化前の問題（ブート直後のクラッシュなど）"}),`
`,s.jsx(n.li,{children:"リアルタイム性が求められ、ログ出力すると動作が変わってしまう"}),`
`,s.jsx(n.li,{children:"ハードウェアの問題なのかソフトウェアの問題なのか切り分けが必要"}),`
`]}),`
`,s.jsxs(n.p,{children:["こういった状況で、",s.jsx(n.strong,{children:"CPU を外から止めて・レジスタやメモリを読む"}),"ことができるのが JTAG の強み。"]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s2",children:"02. JTAG のアーキテクチャ"}),`
`,s.jsx(n.h3,{children:"信号線"}),`
`,s.jsx(n.p,{children:"JTAG は最小 4 本の信号線で構成される。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"信号名"}),s.jsx(n.th,{children:"方向"}),s.jsx(n.th,{children:"役割"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TCK"})}),s.jsx(n.td,{children:"ホスト → デバイス"}),s.jsx(n.td,{children:"クロック。この立ち上がり / 立ち下がりに同期してデータが動く"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TMS"})}),s.jsx(n.td,{children:"ホスト → デバイス"}),s.jsx(n.td,{children:"TAP ステートマシンの制御。1/0 の入力でステートを遷移させる"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TDI"})}),s.jsx(n.td,{children:"ホスト → デバイス"}),s.jsx(n.td,{children:"データ入力（シリアル）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TDO"})}),s.jsx(n.td,{children:"デバイス → ホスト"}),s.jsx(n.td,{children:"データ出力（シリアル）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"TRST"})}),s.jsx(n.td,{children:"ホスト → デバイス"}),s.jsx(n.td,{children:"（オプション）TAP リセット"})]})]})]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`ホスト（デバッガ）                 ターゲット（マイコン）
        │                                 │
   TCK ─┼────────────────────────────────→│
   TMS ─┼────────────────────────────────→│
   TDI ─┼────────────────────────────────→│
   TDO ─┼←───────────────────────────────│
        │                                 │
`})}),`
`,s.jsx(n.h3,{children:"TAP コントローラー"}),`
`,s.jsxs(n.p,{children:["ターゲット内部には ",s.jsx(n.strong,{children:"TAP（Test Access Port）コントローラー"}),` と呼ばれるステートマシンが存在する。
TMS の値を TCK に同期して入力することで、状態が遷移する。`]}),`
`,s.jsx(n.p,{children:"主要なステートを抜粋すると："}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`         ┌────────────────────────────────────────┐
         │          Test-Logic-Reset              │ ← リセット状態（TMS=1 を 5 クロック）
         └────────────────┬───────────────────────┘
                  TMS=0   │
         ┌────────────────▼───────────────────────┐
         │               Run-Test/Idle            │ ← 通常の待機状態
         └────┬───────────────────────────────────┘
         TMS=1│
    ┌─────────▼─────────┐     ┌──────────────────┐
    │  Select-DR-Scan   │     │  Select-IR-Scan  │
    │  （データレジスタ）│     │ （命令レジスタ） │
    └─────────┬─────────┘     └──────────────────┘
              │
    ┌─────────▼─────────┐
    │   Capture-DR      │ ← DR にデータをキャプチャ
    │   Shift-DR        │ ← TDI→シフトレジスタ→TDO でデータ転送
    │   Update-DR       │ ← シフト結果を実際のレジスタに反映
    └───────────────────┘
`})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"IR（Instruction Register）"}),": 次に何をするかの命令を書き込む"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"DR（Data Register）"}),": 命令に応じたデータを読み書きする"]}),`
`]}),`
`,s.jsx(n.p,{children:"JTAG 通信は常に「IR に命令 → DR にデータ」の繰り返しで成り立っている。"}),`
`,s.jsx(n.h3,{children:"デイジーチェーン接続"}),`
`,s.jsx(n.p,{children:`複数のデバイスを直列につなぐことができる（デイジーチェーン）。
前段の TDO が後段の TDI に接続され、ホストから見ると 1 本のシフトレジスタとして扱える。`}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`ホスト → [デバイス A] → [デバイス B] → [デバイス C] → ホスト
  TDI      TDI  TDO       TDI  TDO       TDI  TDO      TDO
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s3",children:"03. バウンダリスキャン"}),`
`,s.jsxs(n.p,{children:["JTAG の本来の用途は",s.jsx(n.strong,{children:"基板実装検査"}),"（バウンダリスキャン）。"]}),`
`,s.jsxs(n.p,{children:["各 IC の I/O ピンに「バウンダリスキャンセル」と呼ばれる小さなラッチ回路が挿入されており、JTAG 経由でこれらを直接操作することで、",s.jsx(n.strong,{children:"CPU を動かさずにピンの状態を読み書き"}),"できる。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`                IC 内部ロジック
                      │
      ピン ─── [BSセル] ── 内部信号
                      │
                  TDI / TDO シフトレジスタ
`})}),`
`,s.jsx(n.p,{children:"これにより："}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"はんだ不良（オープン / ショート）の検出"}),`
`,s.jsx(n.li,{children:"隣接するデバイス間の配線導通確認"}),`
`]}),`
`,s.jsx(n.p,{children:`といった検査が基板に電源を入れるだけで行える。
開発フェーズでは使う機会は少ないが、量産ラインや基板評価で活躍する。`}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s4",children:"04. デバッガとしての JTAG"}),`
`,s.jsxs(n.p,{children:["ARM アーキテクチャでは、JTAG 経由で ",s.jsx(n.strong,{children:"DAP（Debug Access Port）"})," にアクセスすることで CPU のデバッグ機能を利用できる。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`デバッガ（PC）
    │
    │ JTAG / SWD
    ▼
  DAP（Debug Access Port）
    ├── AHB-AP（AHB Access Port） → メモリ・ペリフェラルへのアクセス
    └── JTAG-DP / SW-DP          → CoreSight デバッグ機能へのアクセス
         └── CPU コア内
              ├── DWT（Data Watchpoint and Trace）
              ├── ITM（Instrumentation Trace Macrocell）
              └── ETM（Embedded Trace Macrocell）
`})}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"SWD（Serial Wire Debug）について"}),`
ARM Cortex-M では JTAG の代替として `,s.jsx(n.strong,{children:"SWD"}),` という 2 線式プロトコルも使える。
SWDIO（データ）+ SWDCLK（クロック）の 2 本だけで動作し、ピン数が少ない小型マイコンで多用される。
J-Link・OpenOCD など主要ツールはどちらもサポートしている。`]}),`
`]}),`
`,s.jsx(n.h3,{children:"halt / resume / step"}),`
`,s.jsxs(n.p,{children:["デバッガが「一時停止」を指示すると、CPU は現在の命令を完了した後に ",s.jsx(n.strong,{children:"Halted 状態"}),`に入る。
この状態でレジスタ・メモリを自由に読み書きできる。`]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`デバッガ操作         CPU の状態
─────────────────────────────────────────
halt 指示      →   実行中 → Halted（停止）
read register  →   レジスタ値をそのまま取得
write memory   →   任意のアドレスに値を書き込み
step           →   1 命令だけ実行して再び Halted
resume         →   実行再開
`})}),`
`,s.jsx(n.h3,{children:"ブレークポイントの仕組み"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"種別"}),s.jsx(n.th,{children:"仕組み"}),s.jsx(n.th,{children:"用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ハードウェアブレーク"})}),s.jsx(n.td,{children:"CPU 内の比較回路（BP ユニット）が PC と一致したら halt"}),s.jsx(n.td,{children:"Flash 上のコード、高頻度の箇所"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ソフトウェアブレーク"})}),s.jsxs(n.td,{children:["対象アドレスの命令を ",s.jsx(n.code,{children:"BKPT"})," 命令で上書き"]}),s.jsx(n.td,{children:"RAM 上のコードのみ（Flash は書き換えコストが高い）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ウォッチポイント"})}),s.jsx(n.td,{children:"DWT が特定アドレスへの読み書きを検出して halt"}),s.jsx(n.td,{children:"変数が書き換わる瞬間を捉える"})]})]})]}),`
`,s.jsx(n.p,{children:"ARM Cortex-M では通常 4〜8 個のハードウェアブレークポイントが使える。"}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s5",children:"05. RAM 解析とは"}),`
`,s.jsxs(n.p,{children:["CPU を halt した状態で、",s.jsx(n.strong,{children:"RAM の内容をまとめて読み出す"}),"のが RAM ダンプ（メモリダンプ）。"]}),`
`,s.jsx(n.h3,{children:"何がわかるか"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"取得できる情報"}),s.jsx(n.th,{children:"活用例"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"スタックの内容"})}),s.jsx(n.td,{children:"クラッシュ直前の関数呼び出し履歴（コールスタック）を復元"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"変数の値"})}),s.jsx(n.td,{children:"異常発生時のシステム状態を再現"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ヒープの状態"})}),s.jsx(n.td,{children:"メモリリークやヒープ破壊の痕跡"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"コード（RAM 配置の場合）"})}),s.jsx(n.td,{children:"動的に書き換えられたコードの確認"})]})]})]}),`
`,s.jsx(n.h3,{children:"ダンプのタイミング"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"タイミング"}),s.jsx(n.th,{children:"方法"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"任意のタイミング"})}),s.jsx(n.td,{children:"デバッガで halt して手動ダンプ"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"クラッシュ直後"})}),s.jsx(n.td,{children:"HardFault ハンドラから RAM を UART 等で出力"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"特定条件成立時"})}),s.jsx(n.td,{children:"ウォッチポイントで自動 halt してダンプ"})]})]})]}),`
`,s.jsxs(n.p,{children:["車載 ECU 開発では、",s.jsx(n.strong,{children:"RAM ダンプを NVM（不揮発メモリ）に保存"}),"して後から解析する手法もある（フリーズフレームの拡張版のような使い方）。"]}),`
`,s.jsx(n.h3,{children:"アドレスマップの把握が前提"}),`
`,s.jsx(n.p,{children:`ダンプの解析には**リンカマップファイル（.map）**が必要。
どの変数がどのアドレスに配置されているかがわかって初めて、16 進数の羅列が意味を持つ。`}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`// リンカマップファイルの例（抜粋）
.bss            0x20000000  0x400
  g_systemState 0x20000000  0x20   system_ctrl.o
  g_errorCount  0x20000020  0x04   error_manager.o
`})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s6",children:"06. 主要ツール紹介"}),`
`,s.jsx(n.h3,{children:"ツール比較"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"ツール"}),s.jsx(n.th,{children:"種別"}),s.jsx(n.th,{children:"価格帯"}),s.jsx(n.th,{children:"特徴"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"OpenOCD"})}),s.jsx(n.td,{children:"OSS"}),s.jsx(n.td,{children:"無料（ハードウェアアダプタは別途）"}),s.jsx(n.td,{children:"対応アーキテクチャが広い・カスタマイズ性が高い"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"SEGGER J-Link"})}),s.jsx(n.td,{children:"商用"}),s.jsx(n.td,{children:"アダプタ数万円〜・ソフト無料"}),s.jsx(n.td,{children:"安定性が高く普及率 No.1・J-Link GDB Server で GDB と連携"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Lauterbach TRACE32"})}),s.jsx(n.td,{children:"商用"}),s.jsx(n.td,{children:"数十〜数百万円"}),s.jsx(n.td,{children:"自動車業界標準・トレース機能が強力・AUTOSAR 対応"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"Renesas E1 / E2 / E2 Lite"})}),s.jsx(n.td,{children:"商用"}),s.jsx(n.td,{children:"E2 Lite は数千円〜・ソフト無料"}),s.jsx(n.td,{children:"Renesas MCU 専用・e² studio / CS+ と統合"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"pyOCD"})}),s.jsx(n.td,{children:"OSS"}),s.jsx(n.td,{children:"無料"}),s.jsx(n.td,{children:"Python ベース・ARM Cortex-M 特化・スクリプト自動化に向く"})]})]})]}),`
`,s.jsx(n.h3,{children:"OpenOCD"}),`
`,s.jsx(n.p,{children:`オープンソースの JTAG / SWD デバッグサーバー。
設定ファイル（.cfg）でターゲットとアダプタを指定し、GDB から接続して使う。`}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[s.jsx(n.span,{className:"hljs-comment",children:"# OpenOCD 起動例（STM32F4 + ST-LINK の場合）"}),`
openocd \\
  -f interface/stlink.cfg \\
  -f target/stm32f4x.cfg

`,s.jsx(n.span,{className:"hljs-comment",children:"# 別ターミナルから GDB で接続"}),`
arm-none-eabi-gdb firmware.elf
(gdb) target remote :3333
(gdb) monitor halt
(gdb) info registers
`]})}),`
`,s.jsx(n.p,{children:"コスト最優先の評価環境や OSS プロジェクトで重宝する。"}),`
`,s.jsx(n.h3,{children:"SEGGER J-Link"}),`
`,s.jsxs(n.p,{children:[`産業・車載を問わず最も普及しているデバッグプローブ。
専用の `,s.jsx(n.strong,{children:"J-Link GDB Server"})," を経由して GDB や IDE（IAR / Keil / VS Code + Cortex-Debug）と接続できる。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[s.jsx(n.span,{className:"hljs-comment",children:"# J-Link GDB Server 起動例"}),`
JLinkGDBServer -device Cortex-M4 -`,s.jsx(n.span,{className:"hljs-keyword",children:"if"}),` SWD -speed 4000

`,s.jsx(n.span,{className:"hljs-comment",children:"# RAM ダンプ（J-Link Commander から直接実行）"}),`
J-Link> halt
J-Link> savebin dump.bin 0x20000000 0x10000   `,s.jsx(n.span,{className:"hljs-comment",children:"# 64KB ダンプ"}),`
`]})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.strong,{children:"J-Link RTT（Real-Time Transfer）"}),` という機能も便利で、halt せずに printf 相当のログをリアルタイムで取得できる。
UART を使えない状況での軽量ログ手段として有用。`]}),`
`,s.jsx(n.h3,{children:"Lauterbach TRACE32"}),`
`,s.jsxs(n.p,{children:[`自動車業界では事実上の標準デバッガ。
単なる halt / step デバッグにとどまらず、`,s.jsx(n.strong,{children:"CPU の命令トレースをリアルタイムで記録"}),"できる。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`TRACE32 の主な機能
├── JTAG / SWD / NEXUS / Aurora など多数対応
├── ETM / PTM トレース → プログラムフローの完全記録
├── AUTOSAR OS・RunTime対応（タスクスイッチの可視化）
├── FlashProgrammer → ECU へのフラッシュ書き込み
└── PRACTICE スクリプト → 解析自動化
`})}),`
`,s.jsxs(n.p,{children:["TRACE32 では ",s.jsx(n.code,{children:".elf"}),` ファイルを読み込んでシンボル情報を解決するのが標準的な使い方。
アドレスに対して変数名・関数名・ソースコード行が対応づけられ、RAM の内容を人間が読める形で表示できる。`]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`; PRACTICE スクリプト例（起動〜シンボルロードまで）
SYStem.CPU CortexM4          ; ターゲット CPU を指定
SYStem.Up                    ; JTAG 接続・CPU リセット
Break.direct                 ; halt

; .elf を読み込んでシンボルテーブルを構築
; /NoCODE → コードの転送はしない（デバッグ情報だけ取得）
Data.LOAD.Elf firmware.elf /NoCODE

; シンボル名でメモリを表示
Var.View g_errorCount        ; 変数の値を表示
Var.View %address g_systemState ; アドレス付きで表示
`})}),`
`,s.jsxs(n.p,{children:[s.jsx(n.code,{children:"/NoCODE"})," オプションをつけないと ",s.jsx(n.code,{children:".elf"}),` 内のバイナリをそのままターゲットに書き込もうとするため注意。
シンボル解決だけしたい場合は必ず `,s.jsx(n.code,{children:"/NoCODE"})," を指定する。"]}),`
`,s.jsxs(n.p,{children:["価格は高いが、",s.jsx(n.strong,{children:"「クラッシュ前の数秒間の実行ログを遡って見る」"}),` ようなことができるのはトレース機能を持つツールだけ。
複雑な割り込み絡みのバグ追跡に強い。`]}),`
`,s.jsx(n.h3,{children:"Renesas E1 / E2 / E2 Lite"}),`
`,s.jsxs(n.p,{children:["Renesas マイコンを使う場合は、専用エミュレータの ",s.jsx(n.strong,{children:"E1 / E2 / E2 Lite"}),` が標準の選択肢。
J-Link が ARM 向けの汎用ツールであるのに対し、E シリーズは Renesas アーキテクチャに最適化されている。`]}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"エミュレータ"}),s.jsx(n.th,{children:"位置づけ"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"E2 Lite"})}),s.jsx(n.td,{children:"評価・個人開発向け。低コストで基本機能を提供"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"E2"})}),s.jsx(n.td,{children:"量産開発向けの標準モデル。フラッシュ書き込み・デバッグ両対応"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"E1"})}),s.jsx(n.td,{children:"旧世代。現在は E2 に置き換わりつつある"})]})]})]}),`
`,s.jsx(n.p,{children:"Renesas MCU はデバッグインターフェースがアーキテクチャごとに異なる点が特徴。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"MCU ファミリ"}),s.jsx(n.th,{children:"デバッグ I/F"}),s.jsx(n.th,{children:"信号線数"}),s.jsx(n.th,{children:"主な用途"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsxs(n.td,{children:[s.jsx(n.strong,{children:"RH850"}),"（車載向け）"]}),s.jsx(n.td,{children:"JTAG / cJTAG"}),s.jsx(n.td,{children:"4 本 / 2 本"}),s.jsx(n.td,{children:"車載 ECU のメイン CPU"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"RX"})}),s.jsx(n.td,{children:"JTAG / FINE"}),s.jsx(n.td,{children:"4 本 / 1 本"}),s.jsx(n.td,{children:"産業機器・家電"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"RL78"})}),s.jsx(n.td,{children:"TOOL0（FINE）"}),s.jsx(n.td,{children:"1 本"}),s.jsx(n.td,{children:"小型マイコン・センサー系"})]}),s.jsxs(n.tr,{children:[s.jsxs(n.td,{children:[s.jsx(n.strong,{children:"RA"}),"（ARM Cortex-M）"]}),s.jsx(n.td,{children:"SWD / JTAG"}),s.jsx(n.td,{children:"2〜4 本"}),s.jsx(n.td,{children:"比較的新しいシリーズ"})]})]})]}),`
`,s.jsxs(n.p,{children:["車載開発では ",s.jsx(n.strong,{children:"RH850"})," が多く、JTAG の他に ",s.jsx(n.strong,{children:"cJTAG（IEEE 1149.7）"}),` という 2 線式の省ピン版も使われる。
cJTAG は TCK と TMS の 2 本だけで通信でき、ピンが少ない ECU コネクタ設計に有利。`]}),`
`,s.jsxs(n.p,{children:["統合開発環境は Renesas 純正の ",s.jsx(n.strong,{children:"e² studio"}),"（Eclipse ベース）または ",s.jsx(n.strong,{children:"CS+"})," を使うのが一般的で、エミュレータのドライバも IDE に内包されているため、別途サーバーを立てる必要がない。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`; e² studio でのデバッグ起動フロー（GUI 操作）
1. プロジェクト → デバッグ構成 → Renesas GDB Hardware Debugging
2. デバッグハードウェア: E2 を選択
3. ターゲット MCU: R7F701xxx（RH850）を指定
4. [デバッグ] ボタン → 自動で halt 状態で停止
`})}),`
`,s.jsxs(n.p,{children:["J-Link は Renesas MCU にも対応しているが、",s.jsx(n.strong,{children:"FINE / cJTAG は非対応のことが多い"}),`。
Renesas 製品を触るなら E2 エミュレータを手元に置いておくのが無難。`]}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s7",children:"07. 実践フロー"}),`
`,s.jsx(n.h3,{children:"基本的な RAM ダンプ取得フロー"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`1. ハードウェア接続
   └── JTAG / SWD ケーブルでプローブとターゲット基板を接続
       電圧レベルを確認（3.3V / 5V / 1.8V）

2. デバッグサーバー起動
   └── OpenOCD または J-Link GDB Server を起動

3. GDB 接続・halt
   $ arm-none-eabi-gdb firmware.elf
   (gdb) target remote :3333
   (gdb) monitor halt          # CPU を停止

4. レジスタ確認
   (gdb) info registers        # PC・SP・LR などを確認

5. RAM ダンプ取得
   (gdb) dump binary memory dump.bin 0x20000000 0x20010000

6. 解析
   └── バイナリエディタ / Python / addr2line でシンボル解決
`})}),`
`,s.jsx(n.h3,{children:"ダンプの解析例（Python）"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-python",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"}),` struct

`,s.jsx(n.span,{className:"hljs-comment",children:"# .map ファイルから変数のアドレスを取得している前提"}),`
DUMP_BASE   = `,s.jsx(n.span,{className:"hljs-number",children:"0x20000000"}),`
VAR_ADDRESS = `,s.jsx(n.span,{className:"hljs-number",children:"0x20000020"}),"  ",s.jsx(n.span,{className:"hljs-comment",children:"# g_errorCount のアドレス"}),`
VAR_OFFSET  = VAR_ADDRESS - DUMP_BASE

`,s.jsx(n.span,{className:"hljs-keyword",children:"with"})," ",s.jsx(n.span,{className:"hljs-built_in",children:"open"}),"(",s.jsx(n.span,{className:"hljs-string",children:'"dump.bin"'}),", ",s.jsx(n.span,{className:"hljs-string",children:'"rb"'}),") ",s.jsx(n.span,{className:"hljs-keyword",children:"as"}),` f:
    data = f.read()

`,s.jsx(n.span,{className:"hljs-comment",children:"# uint32_t として読み出し（リトルエンディアン）"}),`
value = struct.unpack_from(`,s.jsx(n.span,{className:"hljs-string",children:'"<I"'}),", data, VAR_OFFSET)[",s.jsx(n.span,{className:"hljs-number",children:"0"}),`]
`,s.jsx(n.span,{className:"hljs-built_in",children:"print"}),"(",s.jsxs(n.span,{className:"hljs-string",children:['f"g_errorCount = ',s.jsx(n.span,{className:"hljs-subst",children:"{value}"}),'"']}),`)
`]})}),`
`,s.jsx(n.h3,{children:"クラッシュ解析の定石"}),`
`,s.jsxs(n.p,{children:["HardFault が発生したとき、まず確認するのはスタック上の ",s.jsx(n.strong,{children:"例外フレーム"}),`。
ARM Cortex-M では例外発生時に自動的に以下のレジスタがスタックに積まれる。`]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`スタック（SP が指す位置から）
┌─────────┬────────────────────────────┐
│ +0x00   │ R0                         │
│ +0x04   │ R1                         │
│ +0x08   │ R2                         │
│ +0x0C   │ R3                         │
│ +0x10   │ R12                        │
│ +0x14   │ LR（リターンアドレス）      │
│ +0x18   │ PC（クラッシュした命令）    │ ← ここが最重要
│ +0x1C   │ xPSR                       │
└─────────┴────────────────────────────┘
`})}),`
`,s.jsxs(n.p,{children:["ダンプから SP の値を読み、その位置から 0x18 バイト後のアドレスを ",s.jsx(n.code,{children:"addr2line"})," に通せば、",s.jsx(n.strong,{children:"何行目でクラッシュしたか"}),"がわかる。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[`arm-none-eabi-addr2line -e firmware.elf 0x08012345
`,s.jsx(n.span,{className:"hljs-comment",children:"# → src/motor_ctrl.c:87"}),`
`]})}),`
`,s.jsx(n.hr,{}),`
`,s.jsx("h2",{id:"s8",children:"08. よくある躓きポイント"}),`
`,s.jsx(n.h3,{children:"電圧レベルの不一致"}),`
`,s.jsx(n.p,{children:"プローブの I/O 電圧とターゲットの電源電圧が合っていないと接続できない（最悪、基板を破損）。"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"ターゲット電源"}),s.jsx(n.th,{children:"プローブ設定"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"3.3V"}),s.jsx(n.td,{children:"3.3V（多くのプローブで自動検出）"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"1.8V"}),s.jsx(n.td,{children:"1.8V に手動設定が必要なことが多い"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:"5V"}),s.jsx(n.td,{children:"現代のマイコンでは稀だが古い製品に存在"})]})]})]}),`
`,s.jsxs(n.p,{children:["J-Link は ",s.jsx(n.strong,{children:"Vtref ピン"}),"でターゲット電圧を自動検出して追従するものが多いが、確認は必須。"]}),`
`,s.jsx(n.h3,{children:"クロック（TCK/SWCLK）速度"}),`
`,s.jsxs(n.p,{children:[`高速すぎると通信エラーになる。
`,s.jsx(n.strong,{children:"基板のパターン長・容量によって上限が変わる"}),"ため、まず低速（400kHz 程度）で接続を確認してから上げていく。"]}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[s.jsx(n.span,{className:"hljs-comment",children:"# OpenOCD でのクロック設定"}),`
adapter speed 400      `,s.jsx(n.span,{className:"hljs-comment",children:"# 400kHz から試す"}),`
`]})}),`
`,s.jsx(n.h3,{children:"フラッシュ読み出し保護（RDP / Secure Boot）"}),`
`,s.jsx(n.p,{children:`MCU によってはフラッシュ読み出し保護が有効になっており、JTAG 経由のアクセスが制限・無効化されていることがある。
開発中は保護が無効な開発用ビルドを使うこと。
量産設定を誤って開発機に書き込むと復元できなくなるケースもあるため注意。`}),`
`,s.jsx(n.h3,{children:"フラッシュの書き換え寿命"}),`
`,s.jsxs(n.p,{children:["JTAG デバッグ中に",s.jsx(n.strong,{children:"フラッシュの寿命を知らず知らず消費している"}),`ことがある。
NOR フラッシュの書き換え保証回数は一般的に `,s.jsx(n.strong,{children:"10,000〜100,000 回"}),"程度で、超えると書き込み不良や読み出し化けが発生しうる。"]}),`
`,s.jsxs(n.p,{children:["寿命を縮める主な原因は",s.jsx(n.strong,{children:"ソフトウェアブレークポイント"}),`。
ソフトウェアブレークは対象アドレスの命令を `,s.jsx(n.code,{children:"BKPT"})," 命令で上書きする仕組みのため、ブレークのセット・解除のたびにフラッシュの消去 → 書き込みが発生する。"]}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`ソフトウェアブレーク 1 回の操作
  1. 対象セクタを消去（フラッシュ消去 1 回）
  2. BKPT 命令を書き込み（フラッシュ書き込み 1 回）
  ↕ デバッグ中...
  3. 元の命令に戻すため再度消去 → 書き込み（さらに 1 サイクル消費）
`})}),`
`,s.jsx(n.p,{children:"開発中に何百回もブレークポイントを付け替えると、特定セクタへの書き込みが集中して局所的に寿命が縮む。"}),`
`,s.jsx(n.h4,{children:"対策"}),`
`,s.jsxs(n.table,{children:[s.jsx(n.thead,{children:s.jsxs(n.tr,{children:[s.jsx(n.th,{children:"対策"}),s.jsx(n.th,{children:"内容"})]})}),s.jsxs(n.tbody,{children:[s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"ハードウェアブレークを優先する"})}),s.jsx(n.td,{children:"CPU 内の比較回路で halt するためフラッシュに一切触れない。残数（4〜8 個）の範囲で積極的に使う"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"RAM にコードを配置してデバッグ"})}),s.jsx(n.td,{children:"集中的にデバッグしたい関数を RAM 上で動かせば、ソフトウェアブレークを使っても寿命に影響しない"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"不要なブレークを残さない"})}),s.jsx(n.td,{children:"セッション終了時にブレークポイントをすべて解除してから切断する"})]}),s.jsxs(n.tr,{children:[s.jsx(n.td,{children:s.jsx(n.strong,{children:"書き換えが頻繁な評価基板は使い捨て前提で管理"})}),s.jsx(n.td,{children:"開発後期の評価基板と、デイリーのデバッグ用基板を分けておくと安心"})]})]})]}),`
`,s.jsxs(n.p,{children:["フラッシュ寿命の問題は",s.jsx(n.strong,{children:"症状が出るまで気づきにくい"}),`。
特定の条件下でだけ動作が不安定になり、フラッシュ劣化が原因だと判明するまで時間がかかるケースもある。
ハードウェアブレークを基本とする習慣をつけておくのが無難。`]}),`
`,s.jsx(n.h3,{children:"GDB が「No remote」と返す"}),`
`,s.jsx(n.p,{children:"デバッグサーバー（OpenOCD / J-Link GDB Server）が起動しているか、ポート番号が合っているかを確認。"}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-bash",children:[s.jsx(n.span,{className:"hljs-comment",children:"# よくある原因"}),`
`,s.jsx(n.span,{className:"hljs-comment",children:"# 1. サーバーが起動前に GDB を起動した → サーバーを先に起動する"}),`
`,s.jsx(n.span,{className:"hljs-comment",children:"# 2. ファイアウォールがポートをブロック → ローカル接続なら基本問題ない"}),`
`,s.jsx(n.span,{className:"hljs-comment",children:"# 3. ターゲットへの電源が入っていない → 当然だが意外と多い"}),`
`]})}),`
`,s.jsx(n.hr,{}),`
`,s.jsxs(n.blockquote,{children:[`
`,s.jsx(n.p,{children:s.jsx(n.strong,{children:"まとめ"})}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"JTAG は IEEE 1149.1 の規格で、TAP コントローラーを通じて CPU のデバッグ機能にアクセスできる"}),`
`,s.jsx(n.li,{children:"ARM では DAP 経由で halt / step / ブレークポイント / メモリ読み書きが可能"}),`
`,s.jsx(n.li,{children:"RAM ダンプとリンカマップを組み合わせることで、クラッシュ時の変数状態やスタックを解析できる"}),`
`,s.jsx(n.li,{children:"ツールは用途と予算で選ぶ：OSS なら OpenOCD / pyOCD、安定性重視なら J-Link、トレース重視なら TRACE32"}),`
`,s.jsx(n.li,{children:"接続時は電圧レベル・クロック速度・読み出し保護を必ず確認する"}),`
`]}),`
`]})]})}function Os(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(k,{...e})}):k(e)}const _s=Object.freeze(Object.defineProperty({__proto__:null,default:Os,frontmatter:Rs},Symbol.toStringTag,{value:"Module"})),Ms={title:"はじめまして。",date:"2026-03-21",description:"ブログ的な何か。技術的なメモや開発日記（不定期）を書いていきます。",tags:["雑記"]};function F(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"これ is 何?"}),`
`,s.jsx(n.p,{children:"将来的に組み込み開発・趣味開発の知見メモなどを書いていく予定です。"}),`
`,s.jsx(n.h2,{children:"コードサンプル"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{className:"hljs language-mryl",children:`fn main() -> void {
    println("Hello, world!");
}
`})})]})}function Ps(e={}){const{wrapper:n}=e.components||{};return n?s.jsx(n,{...e,children:s.jsx(F,{...e})}):F(e)}const Is=Object.freeze(Object.defineProperty({__proto__:null,default:Ps,frontmatter:Ms},Symbol.toStringTag,{value:"Module"}));function ks(e){const[n,r]=l.useState(""),c=e.join(",");return l.useEffect(()=>{const t=c.split(",").map(h=>document.getElementById(h)).filter(Boolean);function i(){if(window.scrollY+window.innerHeight>=document.body.scrollHeight-60&&t.length>0){r(t[t.length-1].id);return}let j="";for(const a of t)window.scrollY>=a.offsetTop-120&&(j=a.id);r(j)}return window.addEventListener("scroll",i,{passive:!0}),i(),()=>window.removeEventListener("scroll",i)},[c]),n}const v="ぽーとふぉりおっぽいもの",G=Object.assign({"../content/blog/20260325-portfolio-renewal.mdx":hs,"../content/blog/20260326-react-router-v7-ssg-github-pages.mdx":xs,"../content/blog/20260326-threejs-particle-bg.mdx":ms,"../content/blog/20260328-can-canfd-protocol.mdx":Cs,"../content/blog/20260328-uds-dtc-vehicle-diagnostics.mdx":bs,"../content/blog/20260331-ccp-xcp-calibration.mdx":Ts,"../content/blog/20260331-fy2025-retrospective.mdx":ys,"../content/blog/20260412-jtag-ram-analysis-tools.mdx":_s,"../content/blog/hello-world.mdx":Is}),b=Object.keys(G).length,U=Object.values(G).map(e=>e.frontmatter?.date??"").sort((e,n)=>n.localeCompare(e))[0]??null;function Us(){const[e,n]=l.useState(""),[r,c]=l.useState(!1),[o,t]=l.useState(!1),i=ks(["about","work","blog","contact"]),h=z(),j=h.pathname==="/",a=h.pathname.startsWith("/blog"),d=x=>j?`#${x}`:`/#${x}`;l.useEffect(()=>{let x=null;const D=setTimeout(()=>{let N=0;x=setInterval(()=>{n(v.slice(0,N+1)),N++,N>=v.length&&clearInterval(x)},90)},200);return()=>{clearTimeout(D),x&&clearInterval(x)}},[]),l.useEffect(()=>{const x=()=>t(window.scrollY>40);return window.addEventListener("scroll",x,{passive:!0}),()=>window.removeEventListener("scroll",x)},[]);const m=()=>c(!1);return s.jsxs(s.Fragment,{children:[s.jsxs("header",{className:`header${o?" scrolled":""}`,id:"header",children:[s.jsxs("a",{href:j?"#about":"/",className:"header-name",children:[s.jsx("span",{className:"header-prompt",children:"›"}),s.jsx("span",{children:e}),s.jsx("span",{className:"header-cursor"})]}),s.jsxs("nav",{className:"header-nav",children:[s.jsxs("a",{href:d("about"),className:i==="about"?"active":"",children:[s.jsx("span",{className:"nav-num",children:"01."}),"About"]}),s.jsxs("a",{href:d("work"),className:i==="work"?"active":"",children:[s.jsx("span",{className:"nav-num",children:"02."}),"Work"]}),s.jsxs("a",{href:d("blog"),className:i==="blog"||a?"active":"",children:[s.jsx("span",{className:"nav-num",children:"03."}),"Blog",b>0&&s.jsx("span",{className:"nav-blog-badge",children:b}),U&&s.jsx("span",{className:"nav-blog-date",children:U})]}),s.jsxs("a",{href:d("contact"),className:i==="contact"?"active":"",children:[s.jsx("span",{className:"nav-num",children:"04."}),"Contact"]})]}),s.jsxs("button",{className:"menu-toggle","aria-label":"メニュー",onClick:()=>c(x=>!x),children:[s.jsx("span",{}),s.jsx("span",{})]})]}),r&&s.jsx("div",{className:"mobile-menu-veil",onClick:m}),s.jsx("div",{className:`mobile-menu${r?" open":""}`,children:s.jsxs("nav",{children:[s.jsxs("a",{href:d("about"),className:"mobile-link",onClick:m,children:[s.jsx("span",{className:"nav-num",children:"01."}),"About"]}),s.jsxs("a",{href:d("work"),className:"mobile-link",onClick:m,children:[s.jsx("span",{className:"nav-num",children:"02."}),"Work"]}),s.jsxs("a",{href:d("blog"),className:"mobile-link",onClick:m,children:[s.jsx("span",{className:"nav-num",children:"03."}),"Blog",b>0&&s.jsx("span",{className:"nav-blog-badge",children:b})]}),s.jsxs("a",{href:d("contact"),className:"mobile-link",onClick:m,children:[s.jsx("span",{className:"nav-num",children:"04."}),"Contact"]})]})})]})}function ws(){const[e,n]=l.useState(!1);return l.useEffect(()=>{const r=()=>n(window.scrollY>400);return window.addEventListener("scroll",r,{passive:!0}),()=>window.removeEventListener("scroll",r)},[]),s.jsx("button",{className:`back-to-top${e?" visible":""}`,"aria-label":"トップに戻る",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:"[ ↑ top ]"})}function Ls({isHome:e=!1}){const n=r=>e?`#${r}`:`/#${r}`;return s.jsxs("footer",{className:"footer",children:[s.jsx("span",{className:"footer-copy",children:"© 2018–2026 Asteriskx"}),s.jsxs("nav",{className:"footer-nav","aria-label":"Footer navigation",children:[s.jsx("a",{href:n("about"),children:"about"}),s.jsx("a",{href:n("work"),children:"work"}),s.jsx("a",{href:"/blog",children:"blog"}),s.jsx("a",{href:n("contact"),children:"contact"})]})]})}export{ws as B,Ls as F,Us as H,Is as _,_s as a,ys as b,Ts as c,bs as d,Cs as e,ms as f,xs as g,hs as h,ls as i};
