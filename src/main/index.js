function createBoard(t){const e=document.querySelector("table"),a=Array(t).fill(1).map((t,e)=>t+e);a.forEach(c=>{const d=document.createElement("tr");e.append(d),a.forEach(t=>{var e=document.createElement("td"),t=(e.setAttribute("id",c.toString()+t.toString()),e.classList.add((c+t)%2?"blackBoard":"whiteBoard"),document.createElement("div")),a=(t.setAttribute("class","text"),document.createElement("div"));a.classList.add("touch","hideEle"),a.textContent="O",d.append(e),e.append(t,a)})})}
function applyFullscreen(){var e=document.querySelector("#full");const l=document.querySelector("#fullscreen");null!=e&&e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen&&(null!==l&&void 0!==l&&l.setAttribute("src","../imgs/fullscreen.png"),document.exitFullscreen()):(null!==l&&void 0!==l&&l.setAttribute("src","../imgs/exit-fullscreen.png"),document.documentElement.requestFullscreen())})}
class Game{constructor(e){this.bs=e,this.board=[p("w","k",8,5),p("w","q",8,4),p("w","b",8,3),p("w","b",8,6),p("w","n",8,2),p("w","n",8,7),p("w","r",8,1),p("w","r",8,8),p("b","k",1,5),p("b","q",1,4),p("b","b",1,3),p("b","b",1,6),p("b","n",1,2),p("b","n",1,7),p("b","r",1,1),p("b","r",1,8)],createBoard(e);for(let e=1;e<=8;e++)this.board.push(p("w","p",7,e)),this.board.push(p("b","p",2,e))}showPieces(e=[]){showPiecesFN(this.board,this.bs,e)}async willMoveListener(o,e=[]){console.log(e);let t={vert:-1,hori:-1};function a(e){return()=>{t=e}}this.board.forEach(e=>{var t;e.side===o&&(null!=(t=document.getElementById(byString(e.location)))&&t.classList.add(["choosableWhite","choosableBlack"][Array.from(t.id).map(e=>parseInt(e)).reduce((e,t)=>e+t,0)%2]),null!=t)&&t.addEventListener("click",a(e.location))});for(var l of e){var r=document.getElementById(byString(l));null!=r&&r.classList.add(["choosableWhite","choosableBlack"][Array.from(r.id).map(e=>parseInt(e)).reduce((e,t)=>e+t,0)%2]),null!=r&&r.addEventListener("click",a(l))}await waitUntil(()=>-1!==t.hori),this.board.forEach(e=>{var t=document.getElementById(byString(e.location));null!=t&&t.classList.remove("choosableBlack","choosableWhite"),null!=t&&t.removeEventListener("click",a(e.location))});for(var s of e){var n=document.getElementById(byString(s));null!=n&&n.classList.remove("choosableBlack","choosableWhite"),null!=n&&n.removeEventListener("click",a(s))}return t}movableLocationsOf(e){var e=this.board[e];let t=Object.values(ml)[e.piece];return null!=(e=(t="wPawn"===t.name?e.side===Side.White?ml.wPawn:ml.bPawn:t)(e,this.board,this.bs))?e:[]}}
const foo=[];function getPieceWhoseLocationIs(e,r,i){const o={vert:e,hori:r};let t=-1;return i.forEach((e,r)=>{byString(e.location)===byString(o)&&(t=r)}),-1===t?new PieceStruct(Side.null,Piece.null,{vert:0,hori:0}):i[t]}function king(r,i,o){return[{vert:r.vert+1,hori:r.hori+1},{vert:r.vert+1,hori:r.hori-1},{vert:r.vert-1,hori:r.hori+1},{vert:r.vert-1,hori:r.hori-1},{vert:r.vert+1,hori:r.hori},{vert:r.vert-1,hori:r.hori},{vert:r.vert,hori:r.hori+1},{vert:r.vert,hori:r.hori-1}].filter(e=>Object.values(e).every(e=>1<=e&&e<=o)).filter(e=>{return getPieceWhoseLocationIs(e.vert,e.hori,i).side!==r.side})}function queen(e,r,i){return[...bishop(e,r,i),...rook(e,r,i)]}function bishop(o,t,h){let v=[];function i(e,r){var i;return[e,r].some(e=>e<0||h<e)||((i=getPieceWhoseLocationIs(e,r,t)).piece!==Piece.null?(i.side===o.side||v.push({vert:e,hori:r}),1):void v.push({vert:e,hori:r}))}for(let[e,r]=[o.vert,o.hori];e++,r++,!i(e,r););for(let[e,r]=[o.vert,o.hori];e++,r--,!i(e,r););for(let[e,r]=[o.vert,o.hori];e--,r++,!i(e,r););for(let[e,r]=[o.vert,o.hori];e--,r--,!i(e,r););return v=v.filter(e=>{return getPieceWhoseLocationIs(e.vert,e.hori,t).side!==o.side})}function night(r,i,o){return[{vert:r.vert+2,hori:r.hori+1},{vert:r.vert+2,hori:r.hori-1},{vert:r.vert-2,hori:r.hori+1},{vert:r.vert-2,hori:r.hori-1},{vert:r.vert+1,hori:r.hori+2},{vert:r.vert-1,hori:r.hori+2},{vert:r.vert+1,hori:r.hori-2},{vert:r.vert-1,hori:r.hori-2}].filter(e=>Object.values(e).every(e=>1<=e&&e<=o)).filter(e=>{return getPieceWhoseLocationIs(e.vert,e.hori,i).side!==r.side})}function rook(o,t,r){const h=[];function i(e,r){var i=getPieceWhoseLocationIs(e,r,t);if(i.side!==Side.null&&i.piece!==Piece.null)return i.side!==o.side&&h.push({vert:e,hori:r}),1;h.push({vert:e,hori:r})}for(let e=o.vert+1;e<=r&&!i(e,o.hori);e++);for(let e=o.vert-1;1<=e&&!i(e,o.hori);e--);for(let e=o.hori+1;e<=r&&!i(o.vert,e);e++);for(let e=o.hori-1;1<=e&&!i(o.vert,e);e--);return h}function wPawn(r,i,e){var o=[],t=r.haveMoved?1:2;for(let e=r.vert-1;0<=e&&e>=r.vert-t;e--){const h=getPieceWhoseLocationIs(e,r.hori,i);if(h.piece!==Piece.null){if(h.side===r.side)break;o.push({vert:e,hori:r.hori});break}o.push({vert:e,hori:r.hori})}var h=getPieceWhoseLocationIs(r.vert-1,r.hori+1,i),h=(h.side!==r.side&&h.side!==Side.null&&o.push({vert:r.vert-1,hori:r.hori+1}),getPieceWhoseLocationIs(r.vert-1,r.hori-1,i));return h.side!==r.side&&h.side!==Side.null&&o.push({vert:r.vert-1,hori:r.hori-1}),o}function bPawn(r,i,o){var t=[],h=r.haveMoved?1:2;for(let e=r.vert+1;e<=o&&e<=r.vert+h;e++){const v=getPieceWhoseLocationIs(e,r.hori,i);if(v.piece!==Piece.null){if(v.side===r.side)break;t.push({vert:e,hori:r.hori});break}t.push({vert:e,hori:r.hori})}var v=getPieceWhoseLocationIs(r.vert+1,r.hori+1,i),v=(v.side!==r.side&&v.side!==Side.null&&t.push({vert:r.vert+1,hori:r.hori+1}),getPieceWhoseLocationIs(r.vert+1,r.hori-1,i));return v.side!==r.side&&v.side!==Side.null&&t.push({vert:r.vert+1,hori:r.hori-1}),t}const ml={king:king,queen:queen,bishop:bishop,night:night,rook:rook,wPawn:wPawn,bPawn:bPawn};
class PieceStruct{constructor(t,e,i){this.side=t,this.piece=e,this.location=i,this.haveMoved=null,this.piece===Piece.Pawn&&(this.haveMoved=!1)}get vert(){return this.location.vert}get hori(){return this.location.hori}}
function p(e,r,n,t){return new PieceStruct(parseInt(Object.keys(Side)[Array.from("wb").indexOf(e)]),parseInt(Object.keys(Piece)[Array.from("kqbnrp").indexOf(r)]),{vert:n,hori:t})}
function showPiecesFN(e,t,l=[]){var o,i;for(o of e){var n=null==(n=document.getElementById(byString(o.location)))?void 0:n.querySelector(".text");n.classList.remove("whitePiece","blackPiece"),n.classList.add(["whitePiece","blackPiece"][o.side]),n.textContent=["왕","여왕","비숍","말","룩","폰"][o.piece]}for(let e=11;e<=10*t+1;e+=10){var r=null==(r=document.getElementById(e.toString()))?void 0:r.querySelector(".text");r.innerHTML||(r.innerHTML="&nbsp;")}for(i of l){var c=null==(c=document.getElementById(byString(i)))?void 0:c.querySelector(".touch");null!=c&&c.classList.remove("hideEle","showEle"),null!=c&&c.classList.add("showEle")}}function initBoard(l){for(let t=1;t<=l;t++)for(let e=1;e<=l;e++){var o=null==(o=document.getElementById(byString({vert:t,hori:e})))?void 0:o.querySelector(".touch");null!=o&&o.classList.remove("hideEle","showEle"),null!=o&&o.classList.add("hideEle")}}
var Piece,Side,Mode;function byString(e){return Object.values(e).join("")}!function(e){e[e.King=0]="King",e[e.Queen=1]="Queen",e[e.Bishop=2]="Bishop",e[e.Night=3]="Night",e[e.Rook=4]="Rook",e[e.Pawn=5]="Pawn",e[e.null=-1]="null"}(Piece=Piece||{}),function(e){e[e.White=0]="White",e[e.Black=1]="Black",e[e.null=-1]="null"}(Side=Side||{}),function(e){e[e.classic=0]="classic",e[e.customizable=1]="customizable",e[e.tenXten=2]="tenXten",e[e.null=-1]="null"}(Mode=Mode||{});
function checkURL(c){c=new URL(c).searchParams.get("mode");return"classic"===c?Mode.classic:Mode.null}
function waitUntil(e){return new Promise(n=>{const t=setInterval(()=>{e()&&(n(null),clearInterval(t))},100)})}
applyFullscreen();const body=document.querySelector("body"),o=document.querySelector("#o"),x=document.querySelector("#x"),whiteSide=document.querySelector("#whiteSide"),blackSide=document.querySelector("#blackSide");async function playGame(){var e=Side.White,o=new Game(8);let i=[],d={vert:-1,hori:-1};for(o.showPieces([]);;){switch(e){case Side.White:null!==blackSide&&void 0!==blackSide&&blackSide.classList.add("opacityDown");break;case Side.Black:null!==whiteSide&&void 0!==whiteSide&&whiteSide.classList.add("opacityDown")}var l=getIndexWhoseLocationIs(await o.willMoveListener(e,i),o.board),t=o.board[l];i=o.movableLocationsOf(l),initBoard(8),d=d===t.location?(o.showPieces(),{vert:-1,hori:-1}):(o.showPieces(i),t.location)}}function getIndexWhoseLocationIs(i,e){let d=-1;return e.forEach((e,o)=>{byString(e.location)===byString(i)&&(d=o)}),d}checkURL(window.location.href)===Mode.null?(null!==body&&void 0!==body&&body.classList.add("impossibleURL"),null!==o&&void 0!==o&&o.classList.add("hideEle")):(null!==body&&void 0!==body&&body.classList.add("possibleURL"),null!==x&&void 0!==x&&x.classList.add("hideEle"),playGame());