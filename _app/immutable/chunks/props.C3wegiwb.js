import{g as w,p as F,L as N,P as Y,s as M,a as s,b as U,u as A,B as x,R as y,c as L,d as G,l as $,e as j,f as z,S as H,h as V,i as T,j as Z,k as B,m as J,n as K,o as Q}from"./runtime.CHh3L9z2.js";import{p as W}from"./proxy.Du6FHb9O.js";import{c as X}from"./store.fpDYvEwn.js";function p(r){for(var a=B,n=B;a!==null&&!(a.f&(x|y));)a=a.parent;try{return L(a),r()}finally{L(n)}}function re(r,a,n,v){var h;var I=(n&G)!==0,d=!$||(n&j)!==0,P=(n&z)!==0,C=(n&J)!==0,O=!1,u;P?[u,O]=X(()=>r[a]):u=r[a];var D=H in r||V in r,_=((h=w(r,a))==null?void 0:h.set)??(D&&P&&a in r?e=>r[a]=e:void 0),t=v,S=!0,m=!1,b=()=>(m=!0,S&&(S=!1,C?t=A(v):t=v),t);u===void 0&&v!==void 0&&(_&&d&&F(),u=b(),_&&_(u));var i;if(d)i=()=>{var e=r[a];return e===void 0?b():(S=!0,m=!1,e)};else{var g=p(()=>(I?T:Z)(()=>r[a]));g.f|=N,i=()=>{var e=s(g);return e!==void 0&&(t=void 0),e===void 0?t:e}}if(!(n&Y))return i;if(_){var q=r.$$legacy;return function(e,f){return arguments.length>0?((!d||!f||q||O)&&_(f?i():e),e):i()}}var c=!1,E=!1,o=K(u),l=p(()=>T(()=>{var e=i(),f=s(o);return c?(c=!1,E=!0,f):(E=!1,o.v=e)}));return I||(l.equals=M),function(e,f){if(Q!==null&&(c=E,i(),s(o)),arguments.length>0){const R=f?s(l):d&&P?W(e):e;return l.equals(R)||(c=!0,U(o,R),m&&t!==void 0&&(t=R),A(()=>s(l))),e}return s(l)}}export{re as p};