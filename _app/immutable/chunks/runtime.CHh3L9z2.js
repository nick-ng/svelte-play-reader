var Hn=Array.isArray,Yn=Array.from,jn=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,en=Object.getOwnPropertyDescriptors,Bn=Object.prototype,Un=Array.prototype,sn=Object.getPrototypeOf;const Vn=()=>{};function Gn(t){return t()}function At(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,gt=4,U=8,ft=16,m=32,X=64,et=128,x=256,$=512,h=1024,k=2048,q=4096,N=8192,P=16384,ln=32768,kt=65536,an=1<<17,un=1<<19,It=1<<20,yt=Symbol("$state"),Kn=Symbol("legacy props"),$n=Symbol("");function St(t){return t===this.v}function on(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Rt(t){return!on(t,this.v)}function fn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function _n(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function cn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function vn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Zn(){throw new Error("https://svelte.dev/e/hydration_failed")}function zn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Jn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Wn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function pn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function hn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function Xn(){Q=!0}const Qn=1,tr=2,nr=4,rr=8,er=16,sr=1,lr=2,ar=4,ur=8,or=16,ir=1,fr=2,dn="[",En="[!",yn="]",xt={},_r=Symbol();function _t(t,n){var r={f:0,v:t,reactions:null,equals:St,version:0};return r}function cr(t){return Dt(_t(t))}function wn(t,n=!1){var e;const r=_t(t);return n||(r.equals=Rt),Q&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function vr(t,n=!1){return Dt(wn(t,n))}function Dt(t){return o!==null&&o.f&y&&(T===null?On([t]):T.push(t)),t}function pr(t,n){return Ot(t,rt(()=>rn(t))),n}function Ot(t,n){return o!==null&&ht()&&o.f&(y|ft)&&(T===null||!T.includes(t))&&hn(),st(t,n)}function st(t,n){return t.equals(n)||(t.v=n,t.version=Jt(),Ct(t,k),ht()&&u!==null&&u.f&h&&!(u.f&m)&&(v!==null&&v.includes(t)?(w(u,k),nt(u)):g===null?Cn([t]):g.push(t))),n}function Ct(t,n){var r=t.reactions;if(r!==null)for(var e=ht(),s=r.length,l=0;l<s;l++){var a=r[l],f=a.f;f&k||!e&&a===u||(w(a,n),f&(h|x)&&(f&y?Ct(a,q):nt(a)))}}function Nt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let b=!1;function hr(t){b=t}let A;function H(t){if(t===null)throw Nt(),xt;return A=t}function dr(){return H(F(A))}function Er(t){if(b){if(F(A)!==null)throw Nt(),xt;A=t}}function yr(){for(var t=0,n=A;;){if(n.nodeType===8){var r=n.data;if(r===yn){if(t===0)return n;t-=1}else(r===dn||r===En)&&(t+=1)}var e=F(n);n.remove(),n=e}}var wt,bt,qt;function wr(){if(wt===void 0){wt=window;var t=Element.prototype,n=Node.prototype;bt=Et(n,"firstChild").get,qt=Et(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function lt(t=""){return document.createTextNode(t)}function at(t){return bt.call(t)}function F(t){return qt.call(t)}function Tr(t,n){if(!b)return at(t);var r=at(A);if(r===null)r=A.appendChild(lt());else if(n&&r.nodeType!==3){var e=lt();return r==null||r.before(e),H(e),e}return H(r),r}function mr(t,n){if(!b){var r=at(t);return r instanceof Comment&&r.data===""?F(r):r}return A}function Ar(t,n=1,r=!1){let e=b?A:t;for(var s;n--;)s=e,e=F(e);if(!b)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=lt();return e===null?s==null||s.after(a):e.before(a),H(a),a}return H(e),e}function gr(t){t.textContent=""}function Tn(t){var n=y|k;u===null?n|=x:u.f|=It;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:i,deps:null,equals:St,f:n,fn:t,reactions:null,v:null,version:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function kr(t){const n=Tn(t);return n.equals=Rt,n}function Pt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ct(e):R(e)}}}function mn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ft(t){var n,r=u;W(mn(t));try{Pt(t),n=Wt(t)}finally{W(r)}return n}function Lt(t){var n=Ft(t),r=(D||t.f&x)&&t.deps!==null?q:h;w(t,r),t.equals(n)||(t.v=n,t.version=Jt())}function ct(t){Pt(t),B(t,0),w(t,P),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Mt(t){u===null&&o===null&&cn(),o!==null&&o.f&x&&_n(),pt&&fn()}function An(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function L(t,n,r,e=!0){var s=(t&X)!==0,l=u,a={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var f=O;try{Tt(!0),V(a),a.f|=ln}catch(_){throw R(a),_}finally{Tt(f)}}else n!==null&&nt(a);var p=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&It)===0;if(!p&&!s&&e&&(l!==null&&An(a,l),o!==null&&o.f&y)){var d=o;(d.children??(d.children=[])).push(a)}return a}function Ir(t){const n=L(U,null,!1);return w(n,h),n.teardown=t,n}function Sr(t){Mt();var n=u!==null&&(u.f&m)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Ht(t);return e}}function Rr(t){return Mt(),vt(t)}function xr(t){const n=L(X,t,!0);return(r={})=>new Promise(e=>{r.outro?In(n,()=>{R(n),e(void 0)}):(R(n),e(void 0))})}function Ht(t){return L(gt,t,!1)}function Dr(t,n){var r=i,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=vt(()=>{t(),!e.ran&&(e.ran=!0,Ot(r.l.r2,!0),rt(n))})}function Or(){var t=i;vt(()=>{if(rn(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&h&&w(r,q),M(r)&&V(r),n.ran=!1}t.l.r2.v=!1}})}function vt(t){return L(U,t,!0)}function Cr(t){return gn(t)}function gn(t,n=0){return L(U|ft|n,t,!0)}function Nr(t,n=!0){return L(U|m,t,!0,n)}function Yt(t){var n=t.teardown;if(n!==null){const r=pt,e=o;mt(!0),J(null);try{n.call(null)}finally{mt(r),J(e)}}}function jt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ct(n[r])}}function Bt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;R(r,n),r=e}}function kn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&m||R(n),n=r}}function R(t,n=!0){var r=!1;if((n||t.f&un)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:F(e);e.remove(),e=l}r=!0}Bt(t,n&&!r),jt(t),B(t,0),w(t,P);var a=t.transitions;if(a!==null)for(const p of a)p.stop();Yt(t);var f=t.parent;f!==null&&f.first!==null&&Ut(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Ut(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function In(t,n){var r=[];Vt(t,r,!0),Sn(r,()=>{R(t),n&&n()})}function Sn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Vt(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&kt)!==0||(e.f&m)!==0;Vt(e,n,l?r:!1),e=s}}}function br(t){Gt(t,!0)}function Gt(t,n){if(t.f&N){M(t)&&V(t),t.f^=N;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&kt)!==0||(r.f&m)!==0;Gt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const Rn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Z=!1,z=!1,ut=[],ot=[];function Kt(){Z=!1;const t=ut.slice();ut=[],At(t)}function $t(){z=!1;const t=ot.slice();ot=[],At(t)}function qr(t){Z||(Z=!0,queueMicrotask(Kt)),ut.push(t)}function Pr(t){z||(z=!0,Rn($t)),ot.push(t)}function xn(){Z&&Kt(),z&&$t()}const Zt=0,Dn=1;let G=!1,K=Zt,Y=!1,j=null,O=!1,pt=!1;function Tt(t){O=t}function mt(t){pt=t}let S=[],C=0;let o=null;function J(t){o=t}let u=null;function W(t){u=t}let T=null;function On(t){T=t}let v=null,E=0,g=null;function Cn(t){g=t}let zt=0,D=!1,I=null,i=null;function Jt(){return++zt}function ht(){return!Q||i!==null&&i.l===null}function M(t){var a,f;var n=t.f;if(n&k)return!0;if(n&q){var r=t.deps,e=(n&x)!==0;if(r!==null){var s;if(n&$){for(s=0;s<r.length;s++)((a=r[s]).reactions??(a.reactions=[])).push(t);t.f^=$}for(s=0;s<r.length;s++){var l=r[s];if(M(l)&&Lt(l),e&&u!==null&&!D&&!((f=l==null?void 0:l.reactions)!=null&&f.includes(t))&&(l.reactions??(l.reactions=[])).push(t),l.version>t.version)return!0}}e||w(t,h)}return!1}function Nn(t,n){for(var r=n;r!==null;){if(r.f&et)try{r.fn(t);return}catch{r.f^=et}r=r.parent}throw G=!1,t}function bn(t){return(t.f&P)===0&&(t.parent===null||(t.parent.f&et)===0)}function tt(t,n,r,e){if(G){if(r===null&&(G=!1),bn(n))throw t;return}r!==null&&(G=!0);{Nn(t,n);return}}function Wt(t){var dt;var n=v,r=E,e=g,s=o,l=D,a=T,f=i,p=t.f;v=null,E=0,g=null,o=p&(m|X)?null:t,D=!O&&(p&x)!==0,T=null,i=t.ctx;try{var d=(0,t.fn)(),_=t.deps;if(v!==null){var c;if(B(t,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else t.deps=_=v;if(!D)for(c=E;c<_.length;c++)((dt=_[c]).reactions??(dt.reactions=[])).push(t)}else _!==null&&E<_.length&&(B(t,E),_.length=E);return d}finally{v=n,E=r,g=e,o=s,D=l,T=a,i=f}}function qn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(w(n,q),n.f&(x|$)||(n.f^=$),B(n,0))}function B(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)qn(t,r[e])}function V(t){var n=t.f;if(!(n&P)){w(t,h);var r=u,e=i;u=t;try{n&ft?kn(t):Bt(t),jt(t),Yt(t);var s=Wt(t);t.teardown=typeof s=="function"?s:null,t.version=zt}catch(l){tt(l,t,r,e||t.ctx)}finally{u=r}}}function Xt(){if(C>1e3){C=0;try{vn()}catch(t){if(j!==null)tt(t,j,null);else throw t}}C++}function Qt(t){var n=t.length;if(n!==0){Xt();var r=O;O=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&h||(s.f^=h);var l=[];tn(s,l),Pn(l)}}finally{O=r}}}function Pn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(P|N)))try{M(e)&&(V(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ut(e):e.fn=null))}catch(s){tt(s,e,null,e.ctx)}}}function Fn(){if(Y=!1,C>1001)return;const t=S;S=[],Qt(t),Y||(C=0,j=null)}function nt(t){K===Zt&&(Y||(Y=!0,queueMicrotask(Fn))),j=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(X|m)){if(!(r&h))return;n.f^=h}}S.push(n)}function tn(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&m)!==0,a=l&&(s&h)!==0,f=r.next;if(!a&&!(s&N))if(s&U){if(l)r.f^=h;else try{M(r)&&V(r)}catch(c){tt(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else s&gt&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var d=c.next;if(d!==null){r=d;continue t}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],n.push(p),tn(p,n)}function nn(t){var n=K,r=S;try{Xt();const s=[];K=Dn,S=s,Y=!1,Qt(r);var e=t==null?void 0:t();return xn(),(S.length>0||s.length>0)&&nn(),C=0,j=null,e}finally{K=n,S=r}}async function Fr(){await Promise.resolve(),nn()}function rn(t){var _;var n=t.f,r=(n&y)!==0;if(r&&n&P){var e=Ft(t);return ct(t),e}if(I!==null&&I.add(t),o!==null){T!==null&&T.includes(t)&&pn();var s=o.deps;v===null&&s!==null&&s[E]===t?E++:v===null?v=[t]:v.push(t),g!==null&&u!==null&&u.f&h&&!(u.f&m)&&g.includes(t)&&(w(u,k),nt(u))}else if(r&&t.deps===null)for(var l=t,a=l.parent,f=l;a!==null;)if(a.f&y){var p=a;f=p,a=p.parent}else{var d=a;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(l=t,M(l)&&Lt(l)),t.v}function Ln(t){var n=I;I=new Set;var r=I,e;try{if(rt(t),n!==null)for(e of I)n.add(e)}finally{I=n}return r}function Lr(t){var n=Ln(()=>rt(t));for(var r of n)if(r.f&an)for(const e of r.deps||[])e.f&y||st(e,e.v);else st(r,r.v)}function rt(t){const n=o;try{return o=null,t()}finally{o=n}}const Mn=~(k|q|h);function w(t,n){t.f=t.f&Mn|n}function Mr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(i.l={s:null,u:null,r1:[],r2:_t(!1)})}function Hr(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];W(l.effect),J(l.reaction),Ht(l.fn)}}finally{W(r),J(e)}}i=n.p,n.m=!0}return{}}function Yr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(yt in t)it(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&yt in r&&it(r)}}}function it(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{it(t[e],n)}catch{}const r=sn(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=en(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{mr as $,In as A,m as B,A as C,Bn as D,kt as E,Un as F,_t as G,En as H,Jn as I,Wn as J,sn as K,an as L,Hn as M,Rr as N,Sr as O,ar as P,i as Q,X as R,yt as S,Gn as T,_r as U,At as V,Yr as W,Vn as X,on as Y,Xn as Z,Mr as _,rn as a,Cr as a0,Hr as a1,Ar as a2,Tr as a3,Er as a4,pr as a5,Dr as a6,Or as a7,vr as a8,lt as a9,Lr as aA,J as aB,jn as aC,wr as aD,dn as aE,xt as aF,Nt as aG,Zn as aH,xr as aI,nn as aJ,Fr as aK,cr as aL,Yn as aa,N as ab,st as ac,Vt as ad,gr as ae,Sn as af,R as ag,at as ah,yn as ai,o as aj,qr as ak,Qn as al,tr as am,nr as an,rr as ao,er as ap,F as aq,ht as ar,vt as as,Ir as at,$n as au,en as av,Pr as aw,ir as ax,fr as ay,Ht as az,Ot as b,W as c,sr as d,lr as e,ur as f,Et as g,Kn as h,Tn as i,kr as j,u as k,Q as l,or as m,wn as n,I as o,zn as p,gn as q,b as r,Rt as s,dr as t,rt as u,yr as v,H as w,hr as x,br as y,Nr as z};