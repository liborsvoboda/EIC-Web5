import{r as lt,A as R,a as at,W as L,k as st,X as ut,D as Le,U as ct,v as ft,N as me,t as dt,V as Ve,M as pt,d as I,b as mt,L as vt,T as j,c as ht,J as gt,e as yt,C as ve,f as Fe,u as Ie,g as Ue,h as wt,p as bt,K as xt,F as Tt,i as G,j as Ct,Z as At,l as ne,m as St,n as he,o as Et,q as Ot,s as Rt,w as Lt}from"./zenuml-definition-ddfc84a5.DaHbGPkq.js";const _e=["top","right","bottom","left"],Be=["start","end"],De=_e.reduce((e,t)=>e.concat(t,t+"-"+Be[0],t+"-"+Be[1]),[]),ee=Math.min,Z=Math.max,se=Math.round,ae=Math.floor,q=e=>({x:e,y:e}),Ft={left:"right",right:"left",bottom:"top",top:"bottom"},Bt={start:"end",end:"start"};function we(e,t,n){return Z(e,ee(t,n))}function Y(e,t){return typeof e=="function"?e(t):e}function U(e){return e.split("-")[0]}function H(e){return e.split("-")[1]}function qe(e){return e==="x"?"y":"x"}function xe(e){return e==="y"?"height":"width"}function de(e){return["top","bottom"].includes(U(e))?"y":"x"}function Te(e){return qe(de(e))}function Xe(e,t,n){n===void 0&&(n=!1);const o=H(e),i=Te(e),r=xe(i);let l=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(l=ce(l)),[l,ce(l)]}function Dt(e){const t=ce(e);return[ue(e),t,ue(t)]}function ue(e){return e.replace(/start|end/g,t=>Bt[t])}function Pt(e,t,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],l=["bottom","top"];switch(e){case"top":case"bottom":return n?t?i:o:t?o:i;case"left":case"right":return t?r:l;default:return[]}}function kt(e,t,n,o){const i=H(e);let r=Pt(U(e),n==="start",o);return i&&(r=r.map(l=>l+"-"+i),t&&(r=r.concat(r.map(ue)))),r}function ce(e){return e.replace(/left|right|bottom|top/g,t=>Ft[t])}function jt(e){return{top:0,right:0,bottom:0,left:0,...e}}function Ze(e){return typeof e!="number"?jt(e):{top:e,right:e,bottom:e,left:e}}function fe(e){const{x:t,y:n,width:o,height:i}=e;return{width:o,height:i,top:n,left:t,right:t+o,bottom:n+i,x:t,y:n}}function Pe(e,t,n){let{reference:o,floating:i}=e;const r=de(t),l=Te(t),a=xe(l),u=U(t),c=r==="y",f=o.x+o.width/2-i.width/2,p=o.y+o.height/2-i.height/2,g=o[a]/2-i[a]/2;let d;switch(u){case"top":d={x:f,y:o.y-i.height};break;case"bottom":d={x:f,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:p};break;case"left":d={x:o.x-i.width,y:p};break;default:d={x:o.x,y:o.y}}switch(H(t)){case"start":d[l]-=g*(n&&c?-1:1);break;case"end":d[l]+=g*(n&&c?-1:1);break}return d}const Nt=async(e,t,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,a=r.filter(Boolean),u=await(l.isRTL==null?void 0:l.isRTL(t));let c=await l.getElementRects({reference:e,floating:t,strategy:i}),{x:f,y:p}=Pe(c,o,u),g=o,d={},s=0;for(let v=0;v<a.length;v++){const{name:h,fn:y}=a[v],{x:w,y:b,data:x,reset:T}=await y({x:f,y:p,initialPlacement:o,placement:g,strategy:i,middlewareData:d,rects:c,platform:l,elements:{reference:e,floating:t}});f=w??f,p=b??p,d={...d,[h]:{...d[h],...x}},T&&s<=50&&(s++,typeof T=="object"&&(T.placement&&(g=T.placement),T.rects&&(c=T.rects===!0?await l.getElementRects({reference:e,floating:t,strategy:i}):T.rects),{x:f,y:p}=Pe(c,g,u)),v=-1)}return{x:f,y:p,placement:g,strategy:i,middlewareData:d}};async function oe(e,t){var n;t===void 0&&(t={});const{x:o,y:i,platform:r,rects:l,elements:a,strategy:u}=e,{boundary:c="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:g=!1,padding:d=0}=Y(t,e),s=Ze(d),v=a[g?p==="floating"?"reference":"floating":p],h=fe(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(v)))==null||n?v:v.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:f,strategy:u})),y=p==="floating"?{x:o,y:i,width:l.floating.width,height:l.floating.height}:l.reference,w=await(r.getOffsetParent==null?void 0:r.getOffsetParent(a.floating)),b=await(r.isElement==null?void 0:r.isElement(w))?await(r.getScale==null?void 0:r.getScale(w))||{x:1,y:1}:{x:1,y:1},x=fe(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:w,strategy:u}):y);return{top:(h.top-x.top+s.top)/b.y,bottom:(x.bottom-h.bottom+s.bottom)/b.y,left:(h.left-x.left+s.left)/b.x,right:(x.right-h.right+s.right)/b.x}}const $t=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:o,placement:i,rects:r,platform:l,elements:a,middlewareData:u}=t,{element:c,padding:f=0}=Y(e,t)||{};if(c==null)return{};const p=Ze(f),g={x:n,y:o},d=Te(i),s=xe(d),v=await l.getDimensions(c),h=d==="y",y=h?"top":"left",w=h?"bottom":"right",b=h?"clientHeight":"clientWidth",x=r.reference[s]+r.reference[d]-g[d]-r.floating[s],T=g[d]-r.reference[d],S=await(l.getOffsetParent==null?void 0:l.getOffsetParent(c));let m=S?S[b]:0;(!m||!await(l.isElement==null?void 0:l.isElement(S)))&&(m=a.floating[b]||r.floating[s]);const C=x/2-T/2,E=m/2-v[s]/2-1,F=ee(p[y],E),$=ee(p[w],E),O=F,P=m-v[s]-$,B=m/2-v[s]/2+C,k=we(O,B,P),W=!u.arrow&&H(i)!=null&&B!==k&&r.reference[s]/2-(B<O?F:$)-v[s]/2<0,V=W?B<O?B-O:B-P:0;return{[d]:g[d]+V,data:{[d]:k,centerOffset:B-k-V,...W&&{alignmentOffset:V}},reset:W}}});function Wt(e,t,n){return(e?[...n.filter(o=>H(o)===e),...n.filter(o=>H(o)!==e)]:n.filter(o=>U(o)===o)).filter(o=>e?H(o)===e||(t?ue(o)!==o:!1):!0)}const Ht=function(e){return e===void 0&&(e={}),{name:"autoPlacement",options:e,async fn(t){var n,o,i;const{rects:r,middlewareData:l,placement:a,platform:u,elements:c}=t,{crossAxis:f=!1,alignment:p,allowedPlacements:g=De,autoAlignment:d=!0,...s}=Y(e,t),v=p!==void 0||g===De?Wt(p||null,d,g):g,h=await oe(t,s),y=((n=l.autoPlacement)==null?void 0:n.index)||0,w=v[y];if(w==null)return{};const b=Xe(w,r,await(u.isRTL==null?void 0:u.isRTL(c.floating)));if(a!==w)return{reset:{placement:v[0]}};const x=[h[U(w)],h[b[0]],h[b[1]]],T=[...((o=l.autoPlacement)==null?void 0:o.overflows)||[],{placement:w,overflows:x}],S=v[y+1];if(S)return{data:{index:y+1,overflows:T},reset:{placement:S}};const m=T.map(E=>{const F=H(E.placement);return[E.placement,F&&f?E.overflows.slice(0,2).reduce(($,O)=>$+O,0):E.overflows[0],E.overflows]}).sort((E,F)=>E[1]-F[1]),C=((i=m.filter(E=>E[2].slice(0,H(E[0])?2:3).every(F=>F<=0))[0])==null?void 0:i[0])||m[0][0];return C!==a?{data:{index:y+1,overflows:T},reset:{placement:C}}:{}}}},Mt=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,o;const{placement:i,middlewareData:r,rects:l,initialPlacement:a,platform:u,elements:c}=t,{mainAxis:f=!0,crossAxis:p=!0,fallbackPlacements:g,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:s="none",flipAlignment:v=!0,...h}=Y(e,t);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const y=U(i),w=U(a)===a,b=await(u.isRTL==null?void 0:u.isRTL(c.floating)),x=g||(w||!v?[ce(a)]:Dt(a));!g&&s!=="none"&&x.push(...kt(a,v,s,b));const T=[a,...x],S=await oe(t,h),m=[];let C=((o=r.flip)==null?void 0:o.overflows)||[];if(f&&m.push(S[y]),p){const O=Xe(i,l,b);m.push(S[O[0]],S[O[1]])}if(C=[...C,{placement:i,overflows:m}],!m.every(O=>O<=0)){var E,F;const O=(((E=r.flip)==null?void 0:E.index)||0)+1,P=T[O];if(P)return{data:{index:O,overflows:C},reset:{placement:P}};let B=(F=C.filter(k=>k.overflows[0]<=0).sort((k,W)=>k.overflows[1]-W.overflows[1])[0])==null?void 0:F.placement;if(!B)switch(d){case"bestFit":{var $;const k=($=C.map(W=>[W.placement,W.overflows.filter(V=>V>0).reduce((V,rt)=>V+rt,0)]).sort((W,V)=>W[1]-V[1])[0])==null?void 0:$[0];k&&(B=k);break}case"initialPlacement":B=a;break}if(i!==B)return{reset:{placement:B}}}return{}}}};function ke(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function je(e){return _e.some(t=>e[t]>=0)}const zt=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n}=t,{strategy:o="referenceHidden",...i}=Y(e,t);switch(o){case"referenceHidden":{const r=await oe(t,{...i,elementContext:"reference"}),l=ke(r,n.reference);return{data:{referenceHiddenOffsets:l,referenceHidden:je(l)}}}case"escaped":{const r=await oe(t,{...i,altBoundary:!0}),l=ke(r,n.floating);return{data:{escapedOffsets:l,escaped:je(l)}}}default:return{}}}}};async function Vt(e,t){const{placement:n,platform:o,elements:i}=e,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),l=U(n),a=H(n),u=de(n)==="y",c=["left","top"].includes(l)?-1:1,f=r&&u?-1:1,p=Y(t,e);let{mainAxis:g,crossAxis:d,alignmentAxis:s}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...p};return a&&typeof s=="number"&&(d=a==="end"?s*-1:s),u?{x:d*f,y:g*c}:{x:g*c,y:d*f}}const It=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,o;const{x:i,y:r,placement:l,middlewareData:a}=t,u=await Vt(t,e);return l===((n=a.offset)==null?void 0:n.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:i+u.x,y:r+u.y,data:{...u,placement:l}}}}},Ut=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:o,placement:i}=t,{mainAxis:r=!0,crossAxis:l=!1,limiter:a={fn:h=>{let{x:y,y:w}=h;return{x:y,y:w}}},...u}=Y(e,t),c={x:n,y:o},f=await oe(t,u),p=de(U(i)),g=qe(p);let d=c[g],s=c[p];if(r){const h=g==="y"?"top":"left",y=g==="y"?"bottom":"right",w=d+f[h],b=d-f[y];d=we(w,d,b)}if(l){const h=p==="y"?"top":"left",y=p==="y"?"bottom":"right",w=s+f[h],b=s-f[y];s=we(w,s,b)}const v=a.fn({...t,[g]:d,[p]:s});return{...v,data:{x:v.x-n,y:v.y-o}}}}};function J(e){return Ce(e)?(e.nodeName||"").toLowerCase():"#document"}function D(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function _(e){var t;return(t=(Ce(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Ce(e){return e instanceof Node||e instanceof D(e).Node}function M(e){return e instanceof Element||e instanceof D(e).Element}function z(e){return e instanceof HTMLElement||e instanceof D(e).HTMLElement}function Ne(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof D(e).ShadowRoot}function le(e){const{overflow:t,overflowX:n,overflowY:o,display:i}=N(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+n)&&!["inline","contents"].includes(i)}function _t(e){return["table","td","th"].includes(J(e))}function Ae(e){const t=Se(),n=N(e);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function qt(e){let t=X(e);for(;z(t)&&!te(t);){if(Ae(t))return t;t=X(t)}return null}function Se(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function te(e){return["html","body","#document"].includes(J(e))}function N(e){return D(e).getComputedStyle(e)}function pe(e){return M(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function X(e){if(J(e)==="html")return e;const t=e.assignedSlot||e.parentNode||Ne(e)&&e.host||_(e);return Ne(t)?t.host:t}function Ke(e){const t=X(e);return te(t)?e.ownerDocument?e.ownerDocument.body:e.body:z(t)&&le(t)?t:Ke(t)}function ie(e,t,n){var o;t===void 0&&(t=[]),n===void 0&&(n=!0);const i=Ke(e),r=i===((o=e.ownerDocument)==null?void 0:o.body),l=D(i);return r?t.concat(l,l.visualViewport||[],le(i)?i:[],l.frameElement&&n?ie(l.frameElement):[]):t.concat(i,ie(i,[],n))}function Ye(e){const t=N(e);let n=parseFloat(t.width)||0,o=parseFloat(t.height)||0;const i=z(e),r=i?e.offsetWidth:n,l=i?e.offsetHeight:o,a=se(n)!==r||se(o)!==l;return a&&(n=r,o=l),{width:n,height:o,$:a}}function Ee(e){return M(e)?e:e.contextElement}function Q(e){const t=Ee(e);if(!z(t))return q(1);const n=t.getBoundingClientRect(),{width:o,height:i,$:r}=Ye(t);let l=(r?se(n.width):n.width)/o,a=(r?se(n.height):n.height)/i;return(!l||!Number.isFinite(l))&&(l=1),(!a||!Number.isFinite(a))&&(a=1),{x:l,y:a}}const Xt=q(0);function Je(e){const t=D(e);return!Se()||!t.visualViewport?Xt:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Zt(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==D(e)?!1:t}function K(e,t,n,o){t===void 0&&(t=!1),n===void 0&&(n=!1);const i=e.getBoundingClientRect(),r=Ee(e);let l=q(1);t&&(o?M(o)&&(l=Q(o)):l=Q(e));const a=Zt(r,n,o)?Je(r):q(0);let u=(i.left+a.x)/l.x,c=(i.top+a.y)/l.y,f=i.width/l.x,p=i.height/l.y;if(r){const g=D(r),d=o&&M(o)?D(o):o;let s=g,v=s.frameElement;for(;v&&o&&d!==s;){const h=Q(v),y=v.getBoundingClientRect(),w=N(v),b=y.left+(v.clientLeft+parseFloat(w.paddingLeft))*h.x,x=y.top+(v.clientTop+parseFloat(w.paddingTop))*h.y;u*=h.x,c*=h.y,f*=h.x,p*=h.y,u+=b,c+=x,s=D(v),v=s.frameElement}}return fe({width:f,height:p,x:u,y:c})}const Kt=[":popover-open",":modal"];function Oe(e){return Kt.some(t=>{try{return e.matches(t)}catch{return!1}})}function Yt(e){let{elements:t,rect:n,offsetParent:o,strategy:i}=e;const r=i==="fixed",l=_(o),a=t?Oe(t.floating):!1;if(o===l||a&&r)return n;let u={scrollLeft:0,scrollTop:0},c=q(1);const f=q(0),p=z(o);if((p||!p&&!r)&&((J(o)!=="body"||le(l))&&(u=pe(o)),z(o))){const g=K(o);c=Q(o),f.x=g.x+o.clientLeft,f.y=g.y+o.clientTop}return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-u.scrollLeft*c.x+f.x,y:n.y*c.y-u.scrollTop*c.y+f.y}}function Jt(e){return Array.from(e.getClientRects())}function Ge(e){return K(_(e)).left+pe(e).scrollLeft}function Gt(e){const t=_(e),n=pe(e),o=e.ownerDocument.body,i=Z(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),r=Z(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let l=-n.scrollLeft+Ge(e);const a=-n.scrollTop;return N(o).direction==="rtl"&&(l+=Z(t.clientWidth,o.clientWidth)-i),{width:i,height:r,x:l,y:a}}function Qt(e,t){const n=D(e),o=_(e),i=n.visualViewport;let r=o.clientWidth,l=o.clientHeight,a=0,u=0;if(i){r=i.width,l=i.height;const c=Se();(!c||c&&t==="fixed")&&(a=i.offsetLeft,u=i.offsetTop)}return{width:r,height:l,x:a,y:u}}function en(e,t){const n=K(e,!0,t==="fixed"),o=n.top+e.clientTop,i=n.left+e.clientLeft,r=z(e)?Q(e):q(1),l=e.clientWidth*r.x,a=e.clientHeight*r.y,u=i*r.x,c=o*r.y;return{width:l,height:a,x:u,y:c}}function $e(e,t,n){let o;if(t==="viewport")o=Qt(e,n);else if(t==="document")o=Gt(_(e));else if(M(t))o=en(t,n);else{const i=Je(e);o={...t,x:t.x-i.x,y:t.y-i.y}}return fe(o)}function Qe(e,t){const n=X(e);return n===t||!M(n)||te(n)?!1:N(n).position==="fixed"||Qe(n,t)}function tn(e,t){const n=t.get(e);if(n)return n;let o=ie(e,[],!1).filter(a=>M(a)&&J(a)!=="body"),i=null;const r=N(e).position==="fixed";let l=r?X(e):e;for(;M(l)&&!te(l);){const a=N(l),u=Ae(l);!u&&a.position==="fixed"&&(i=null),(r?!u&&!i:!u&&a.position==="static"&&i&&["absolute","fixed"].includes(i.position)||le(l)&&!u&&Qe(e,l))?o=o.filter(c=>c!==l):i=a,l=X(l)}return t.set(e,o),o}function nn(e){let{element:t,boundary:n,rootBoundary:o,strategy:i}=e;const r=[...n==="clippingAncestors"?Oe(t)?[]:tn(t,this._c):[].concat(n),o],l=r[0],a=r.reduce((u,c)=>{const f=$e(t,c,i);return u.top=Z(f.top,u.top),u.right=ee(f.right,u.right),u.bottom=ee(f.bottom,u.bottom),u.left=Z(f.left,u.left),u},$e(t,l,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function on(e){const{width:t,height:n}=Ye(e);return{width:t,height:n}}function rn(e,t,n){const o=z(t),i=_(t),r=n==="fixed",l=K(e,!0,r,t);let a={scrollLeft:0,scrollTop:0};const u=q(0);if(o||!o&&!r)if((J(t)!=="body"||le(i))&&(a=pe(t)),o){const p=K(t,!0,r,t);u.x=p.x+t.clientLeft,u.y=p.y+t.clientTop}else i&&(u.x=Ge(i));const c=l.left+a.scrollLeft-u.x,f=l.top+a.scrollTop-u.y;return{x:c,y:f,width:l.width,height:l.height}}function ge(e){return N(e).position==="static"}function We(e,t){return!z(e)||N(e).position==="fixed"?null:t?t(e):e.offsetParent}function et(e,t){const n=D(e);if(Oe(e))return n;if(!z(e)){let i=X(e);for(;i&&!te(i);){if(M(i)&&!ge(i))return i;i=X(i)}return n}let o=We(e,t);for(;o&&_t(o)&&ge(o);)o=We(o,t);return o&&te(o)&&ge(o)&&!Ae(o)?n:o||qt(e)||n}const ln=async function(e){const t=this.getOffsetParent||et,n=this.getDimensions,o=await n(e.floating);return{reference:rn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function an(e){return N(e).direction==="rtl"}const sn={convertOffsetParentRelativeRectToViewportRelativeRect:Yt,getDocumentElement:_,getClippingRect:nn,getOffsetParent:et,getElementRects:ln,getClientRects:Jt,getDimensions:on,getScale:Q,isElement:M,isRTL:an};function un(e,t){let n=null,o;const i=_(e);function r(){var a;clearTimeout(o),(a=n)==null||a.disconnect(),n=null}function l(a,u){a===void 0&&(a=!1),u===void 0&&(u=1),r();const{left:c,top:f,width:p,height:g}=e.getBoundingClientRect();if(a||t(),!p||!g)return;const d=ae(f),s=ae(i.clientWidth-(c+p)),v=ae(i.clientHeight-(f+g)),h=ae(c),y={rootMargin:-d+"px "+-s+"px "+-v+"px "+-h+"px",threshold:Z(0,ee(1,u))||1};let w=!0;function b(x){const T=x[0].intersectionRatio;if(T!==u){if(!w)return l();T?l(!1,T):o=setTimeout(()=>{l(!1,1e-7)},1e3)}w=!1}try{n=new IntersectionObserver(b,{...y,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,y)}n.observe(e)}return l(!0),r}function cn(e,t,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:u=!1}=o,c=Ee(e),f=i||r?[...c?ie(c):[],...ie(t)]:[];f.forEach(y=>{i&&y.addEventListener("scroll",n,{passive:!0}),r&&y.addEventListener("resize",n)});const p=c&&a?un(c,n):null;let g=-1,d=null;l&&(d=new ResizeObserver(y=>{let[w]=y;w&&w.target===c&&d&&(d.unobserve(t),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var b;(b=d)==null||b.observe(t)})),n()}),c&&!u&&d.observe(c),d.observe(t));let s,v=u?K(e):null;u&&h();function h(){const y=K(e);v&&(y.x!==v.x||y.y!==v.y||y.width!==v.width||y.height!==v.height)&&n(),v=y,s=requestAnimationFrame(h)}return n(),()=>{var y;f.forEach(w=>{i&&w.removeEventListener("scroll",n),r&&w.removeEventListener("resize",n)}),p==null||p(),(y=d)==null||y.disconnect(),d=null,u&&cancelAnimationFrame(s)}}const fn=It,dn=Ht,pn=Ut,mn=Mt,vn=zt,hn=$t,gn=(e,t,n)=>{const o=new Map,i={platform:sn,...n},r={...i.platform,_c:o};return Nt(e,t,{...i,platform:r})};function yn(e){return e!=null&&typeof e=="object"&&"$el"in e}function be(e){if(yn(e)){const t=e.$el;return Ce(t)&&J(t)==="#comment"?null:t}return e}function wn(e){return{name:"arrow",options:e,fn(t){const n=be(I(e.element));return n==null?{}:hn({element:n,padding:e.padding}).fn(t)}}}function tt(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function He(e,t){const n=tt(e);return Math.round(t*n)/n}function bn(e,t,n){n===void 0&&(n={});const o=n.whileElementsMounted,i=L(()=>{var m;return(m=I(n.open))!=null?m:!0}),r=L(()=>I(n.middleware)),l=L(()=>{var m;return(m=I(n.placement))!=null?m:"bottom"}),a=L(()=>{var m;return(m=I(n.strategy))!=null?m:"absolute"}),u=L(()=>{var m;return(m=I(n.transform))!=null?m:!0}),c=L(()=>be(e.value)),f=L(()=>be(t.value)),p=R(0),g=R(0),d=R(a.value),s=R(l.value),v=Ie({}),h=R(!1),y=L(()=>{const m={position:d.value,left:"0",top:"0"};if(!f.value)return m;const C=He(f.value,p.value),E=He(f.value,g.value);return u.value?{...m,transform:"translate("+C+"px, "+E+"px)",...tt(f.value)>=1.5&&{willChange:"transform"}}:{position:d.value,left:C+"px",top:E+"px"}});let w;function b(){c.value==null||f.value==null||gn(c.value,f.value,{middleware:r.value,placement:l.value,strategy:a.value}).then(m=>{p.value=m.x,g.value=m.y,d.value=m.strategy,s.value=m.placement,v.value=m.middlewareData,h.value=!0})}function x(){typeof w=="function"&&(w(),w=void 0)}function T(){if(x(),o===void 0){b();return}if(c.value!=null&&f.value!=null){w=o(c.value,f.value,b);return}}function S(){i.value||(h.value=!1)}return j([r,l,a],b,{flush:"sync"}),j([c,f],T,{flush:"sync"}),j(i,S,{flush:"sync"}),xt()&&Tt(x),{x:G(p),y:G(g),strategy:G(d),placement:G(s),middlewareData:G(v),isPositioned:G(h),floatingStyles:y,update:b}}var xn=Object.defineProperty,Tn=(e,t,n)=>t in e?xn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Cn=(e,t,n)=>(Tn(e,t+"",n),n);function re(e){return e==null||e.value==null?null:e.value instanceof Node?e.value:"$el"in e.value&&e.value.$el?re(R(e.value.$el)):"getBoundingClientRect"in e.value?e.value:null}function nt(e){return e.reduce((t,n)=>n.type===Ve?t.concat(nt(n.children)):t.concat(n),[])}function An(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}function Me(e){return e=I(e),e&&(e==null?void 0:e.nodeType)!==Node.COMMENT_NODE}class Sn{constructor(){Cn(this,"current",this.detect())}set(t){this.current!==t&&(this.current=t)}reset(){this.set(this.detect())}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}}const Re=new Sn;function En(e){if(Re.isServer)return null;if(e instanceof Node)return e.ownerDocument;if(Object.prototype.hasOwnProperty.call(e,"value")){const t=re(e);if(t)return t.ownerDocument}return document}function On(e,t){!t.vueTransition&&(t.transitionName||t.transitionType)&&console.warn(`[headlessui-float]: <${e} /> pass "transition-name" or "transition-type" prop, must be set "vue-transition" prop.`)}function Rn(e,t,n,o,i){j([()=>i.offset,()=>i.flip,()=>i.shift,()=>i.autoPlacement,()=>i.arrow,()=>i.hide,()=>i.middleware],()=>{const r=[];(typeof i.offset=="number"||typeof i.offset=="object"||typeof i.offset=="function")&&r.push(fn(i.offset)),(i.flip===!0||typeof i.flip=="number"||typeof i.flip=="object")&&r.push(mn({padding:typeof i.flip=="number"?i.flip:void 0,...typeof i.flip=="object"?i.flip:{}})),(i.shift===!0||typeof i.shift=="number"||typeof i.shift=="object")&&r.push(pn({padding:typeof i.shift=="number"?i.shift:void 0,...typeof i.shift=="object"?i.shift:{}})),(i.autoPlacement===!0||typeof i.autoPlacement=="object")&&r.push(dn(typeof i.autoPlacement=="object"?i.autoPlacement:void 0)),r.push(...typeof i.middleware=="function"?i.middleware({referenceEl:t,floatingEl:n}):i.middleware||[]),(i.arrow===!0||typeof i.arrow=="number")&&r.push(wn({element:o,padding:i.arrow===!0?0:i.arrow})),(i.hide===!0||typeof i.hide=="object"||Array.isArray(i.hide))&&(Array.isArray(i.hide)?i.hide:[i.hide]).forEach(l=>{r.push(vn(typeof l=="object"?l:void 0))}),e.value=r},{immediate:!0})}function Ln(e,t,n){let o=()=>{};Ue(()=>{if(e&&Re.isClient&&typeof ResizeObserver<"u"&&t.value&&t.value instanceof Element){const i=new ResizeObserver(([r])=>{n.value=r.borderBoxSize.reduce((l,{inlineSize:a})=>l+a,0)});i.observe(t.value),o=()=>{i.disconnect(),n.value=null}}}),Ct(()=>{o()})}const Fn=e=>{switch(e){case"top":return"origin-bottom";case"bottom":return"origin-top";case"left":return"origin-right";case"right":return"origin-left";case"top-start":case"right-end":return"origin-bottom-left";case"top-end":case"left-end":return"origin-bottom-right";case"right-start":case"bottom-start":return"origin-top-left";case"left-start":case"bottom-end":return"origin-top-right";default:return"origin-center"}};function Bn(e,t){const n=L(()=>{if(typeof e.originClass=="function")return e.originClass(t.value);if(typeof e.originClass=="string")return e.originClass;if(e.tailwindcssOriginClass)return Fn(t.value)}),o=L(()=>e.enter||n.value?`${e.enter||""} ${n.value||""}`:void 0),i=L(()=>e.leave||n.value?`${e.leave||""} ${n.value||""}`:void 0);return{originClassRef:n,enterActiveClassRef:o,leaveActiveClassRef:i}}function ot(e,t,...n){if(e in t){const i=t[e];return typeof i=="function"?i(...n):i}const o=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i=>`"${i}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,ot),o}const ze=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var it=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(it||{});function Dn(e,t=0){var n;return e===((n=En(e))==null?void 0:n.body)?!1:ot(t,{0(){return e.matches(ze)},1(){let o=e;for(;o!==null;){if(o.matches(ze))return!0;o=o.parentElement}return!1}})}function ye(e,t,n){Re.isServer||At(o=>{document.addEventListener(e,t,n),o(()=>document.removeEventListener(e,t,n))})}function Pn(e,t,n=L(()=>!0)){function o(r,l){if(!n.value||r.defaultPrevented)return;const a=l(r);if(a===null||!a.getRootNode().contains(a))return;const u=function c(f){return typeof f=="function"?c(f()):Array.isArray(f)||f instanceof Set?f:[f]}(e);for(const c of u){if(c===null)continue;const f=c instanceof HTMLElement?c:re(c);if(f!=null&&f.contains(a)||r.composed&&r.composedPath().includes(f))return}return!Dn(a,it.Loose)&&a.tabIndex!==-1&&r.preventDefault(),t(r,a)}const i=R(null);ye("mousedown",r=>{var l,a;n.value&&(i.value=((a=(l=r.composedPath)==null?void 0:l.call(r))==null?void 0:a[0])||r.target)},!0),ye("click",r=>{i.value&&(o(r,()=>i.value),i.value=null)},!0),ye("blur",r=>o(r,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}const kn=Symbol("ArrowContext"),A={as:{type:[String,Function],default:"template"},floatingAs:{type:[String,Function],default:"div"},show:{type:Boolean,default:null},placement:{type:String,default:"bottom-start"},strategy:{type:String,default:"absolute"},offset:[Number,Function,Object],shift:{type:[Boolean,Number,Object],default:!1},flip:{type:[Boolean,Number,Object],default:!1},arrow:{type:[Boolean,Number],default:!1},autoPlacement:{type:[Boolean,Object],default:!1},hide:{type:[Boolean,Object,Array],default:!1},referenceHiddenClass:String,escapedClass:String,autoUpdate:{type:[Boolean,Object],default:!0},zIndex:{type:[Number,String],default:9999},vueTransition:{type:Boolean,default:!1},transitionName:String,transitionType:String,enter:String,enterFrom:String,enterTo:String,leave:String,leaveFrom:String,leaveTo:String,originClass:[String,Function],tailwindcssOriginClass:{type:Boolean,default:!1},portal:{type:Boolean,default:!1},transform:{type:Boolean,default:!1},adaptiveWidth:{type:[Boolean,Object],default:!1},composable:{type:Boolean,default:!1},dialog:{type:Boolean,default:!1},middleware:{type:[Array,Function],default:()=>[]}};function jn(e,t,n,o){const{floatingRef:i,props:r,mounted:l,show:a,referenceHidden:u,escaped:c,placement:f,floatingStyles:p,referenceElWidth:g,updateFloating:d}=o,s=ve({...r,as:r.floatingAs},t),{enterActiveClassRef:v,leaveActiveClassRef:h}=Bn(s,f),y={show:l.value?s.show:!1,enter:v.value,enterFrom:s.enterFrom,enterTo:s.enterTo,leave:h.value,leaveFrom:s.leaveFrom,leaveTo:s.leaveTo,onBeforeEnter(){a.value=!0},onAfterLeave(){a.value=!1}},w={name:s.transitionName,type:s.transitionType,appear:!0,...s.transitionName?{}:{enterActiveClass:v.value,enterFromClass:s.enterFrom,enterToClass:s.enterTo,leaveActiveClass:h.value,leaveFromClass:s.leaveFrom,leaveToClass:s.leaveTo},onBeforeEnter(){a.value=!0},onAfterLeave(){a.value=!1}},b={class:[u.value?s.referenceHiddenClass:void 0,c.value?s.escapedClass:void 0].filter(m=>!!m).join(" "),style:{...p.value,zIndex:s.zIndex}};if(s.adaptiveWidth&&typeof g.value=="number"){const m={attribute:"width",...typeof s.adaptiveWidth=="object"?s.adaptiveWidth:{}};b.style[m.attribute]=`${g.value}px`}function x(m){return s.portal?l.value?ne(St,()=>m):he():m}function T(m){const C=ve(b,n,s.dialog?{}:{ref:i});return s.as==="template"?m:typeof s.as=="string"?ne(s.as,C,m):ne(s.as,C,()=>m)}function S(){function m(){var C;const E=s.as==="template"?ve(b,n,s.dialog?{}:{ref:i}):null,F=Lt(e,E);return((C=e.props)==null?void 0:C.unmount)===!1?(d(),F):s.vueTransition&&s.show===!1?he():F}return l.value?s.vueTransition?ne(Et,{...s.dialog?{ref:i}:{},...w},m):ne(s.transitionChild?Ot:Rt,{key:`placement-${f.value}`,...s.dialog?{ref:i}:{},as:"template",...y},m):he()}return x(T(S()))}function Nn(e,t,n,o,i){const r=R(!1),l=Fe(o,"placement"),a=Fe(o,"strategy"),u=Ie({}),c=R(void 0),f=R(void 0),p=R(null),g=R(void 0),d=R(void 0),s=L(()=>re(t)),v=L(()=>re(n)),h=L(()=>Me(s)&&Me(v)),{placement:y,middlewareData:w,isPositioned:b,floatingStyles:x,update:T}=bn(s,v,{placement:l,strategy:a,middleware:u,transform:o.dialog?!1:o.transform,whileElementsMounted:o.dialog?()=>()=>{}:void 0}),S=R(null);Ue(()=>{r.value=!0}),j(e,(O,P)=>{O&&!P?i("show"):!O&&P&&i("hide")},{immediate:!0});function m(){h.value&&(T(),i("update"))}j([l,a,u],m,{flush:"sync"}),Rn(u,s,v,p,o),j([w,()=>o.hide,b],()=>{var O,P;(o.hide===!0||typeof o.hide=="object"||Array.isArray(o.hide))&&(c.value=((O=w.value.hide)==null?void 0:O.referenceHidden)||!b.value,f.value=(P=w.value.hide)==null?void 0:P.escaped)}),j(w,()=>{const O=w.value.arrow;g.value=O==null?void 0:O.x,d.value=O==null?void 0:O.y}),Ln(!!o.adaptiveWidth,s,S),j([e,h],async(O,P,B)=>{if(await wt(),e.value&&h.value&&o.autoUpdate){const k=cn(s.value,v.value,m,typeof o.autoUpdate=="object"?o.autoUpdate:void 0);B(k)}},{flush:"post",immediate:!0});const C=R(!0);j(s,()=>{!(s.value instanceof Element)&&h.value&&C.value&&(C.value=!1,window.requestAnimationFrame(()=>{C.value=!0,m()}))},{flush:"sync"});const E={referenceRef:t,placement:y},F={floatingRef:n,props:o,mounted:r,show:e,referenceHidden:c,escaped:f,placement:y,floatingStyles:x,referenceElWidth:S,updateFloating:m},$={ref:p,placement:y,x:g,y:d};return bt(kn,$),{referenceApi:E,floatingApi:F,arrowApi:$,placement:y,referenceEl:s,floatingEl:v,middlewareData:w,update:m}}({...A.as});const $n={as:A.as,show:A.show,placement:A.placement,strategy:A.strategy,offset:A.offset,shift:A.shift,flip:A.flip,arrow:A.arrow,autoPlacement:A.autoPlacement,autoUpdate:A.autoUpdate,zIndex:A.zIndex,vueTransition:A.vueTransition,transitionName:A.transitionName,transitionType:A.transitionType,enter:A.enter,enterFrom:A.enterFrom,enterTo:A.enterTo,leave:A.leave,leaveFrom:A.leaveFrom,leaveTo:A.leaveTo,originClass:A.originClass,tailwindcssOriginClass:A.tailwindcssOriginClass,portal:A.portal,transform:A.transform,middleware:A.middleware},Wn={name:"FloatVirtual",inheritAttrs:!1,props:$n,emits:["initial","show","hide","update"],setup(e,{emit:t,slots:n,attrs:o}){var i;On("FloatVirtual",e);const r=R((i=e.show)!=null?i:!1),l=R({getBoundingClientRect(){return{x:0,y:0,top:0,left:0,bottom:0,right:0,width:0,height:0}}}),a=R(null),{floatingApi:u,placement:c}=Nn(r,l,a,e,t);j(()=>e.show,()=>{var p;r.value=(p=e.show)!=null?p:!1});function f(){r.value=!1}return t("initial",{show:r,placement:c,reference:l,floating:a}),()=>{if(!n.default)return;const p={placement:c.value,close:f},[g]=nt(n.default(p)).filter(An);return jn(g,{as:e.as,show:r.value},o,u)}}};({...A.flip});const Hn={class:"flex bg-white shadow-md z-10 rounded-md p-1"},Mn=["onClick"],Vn=lt({__name:"StylePanel",setup(e){const t=R({value:null}),n=at(),o=L(()=>n.getters.onContentChange||(()=>{})),i=L(()=>st(n.getters.diagramElement)+ut),r=L(()=>n.getters.code),l=p=>{n.dispatch("updateCode",{code:p}),o.value(p)},a=R([]);let u;const c=({show:p,reference:g,floating:d})=>{let s,v,h,y,w,b;n.commit("onMessageClick",(x,T)=>{var S;if(s=x.value.start.start,v=ht(r.value,s),h=gt(r.value,s),y=((S=r.value.slice(v).match(/^\s*/))==null?void 0:S[0])||"",w=h.trim().startsWith("//"),w){const m=h.trimStart().slice(2).trimStart(),C=m.indexOf("["),E=m.indexOf("]");b=!!(C===0&&E),b?a.value=m.slice(C+1,E).split(",").map(F=>F.trim()):a.value=[]}g.value={getBoundingClientRect:()=>T.getBoundingClientRect()},t.value=x,p.value=!0}),Pn(d,()=>{p.value=!1,a.value=[]},L(()=>p.value)),u=x=>{var T;if(p.value=!1,!!t.value.value)if(w){let S="";if(b){let m;a.value.includes(x)?m=a.value.filter(C=>C!==x):m=[...a.value,x],S=`${y}// [${m.filter(Boolean).join(", ")}] ${h.slice(h.indexOf("]")+1).trimStart()}`}else S=`${y}// [${x}] ${h.slice((((T=h.match(/\/\/*/))==null?void 0:T.index)||-2)+2).trimStart()}`;S.endsWith(`
`)||(S+=`
`),l(r.value.slice(0,yt(r.value,s))+S+r.value.slice(v))}else l(r.value.slice(0,v)+`${y}// [${x}]
`+r.value.slice(v))}},f=[{name:"bold",content:"B",class:"font-bold"},{name:"italic",content:"I",class:"italic"},{name:"underline",content:"U",class:"underline"},{name:"strikethrough",content:"S",class:"line-through"}];return(p,g)=>(Le(),ct(I(Wn),{key:"tool",onInitial:c,placement:"top",offset:5,flip:{padding:i.value},shift:"",zIndex:"30"},{default:ft(()=>[me("div",Hn,[(Le(),dt(Ve,null,pt(f,d=>me("div",{onClick:()=>I(u)(d.class),key:d.name},[me("div",{class:mt(["w-6 mx-1 py-1 rounded-md text-black text-center cursor-pointer hover:bg-gray-200",[d.class,{"bg-gray-100":a.value.includes(d.class)}]])},vt(d.content),3)],8,Mn)),64))])],void 0,!0),_:1},8,["flip"]))}});export{Vn as default};