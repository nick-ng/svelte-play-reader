import{S as m,an as E,ao as M,ae as v,ap as A,b as o,U as d,g as h,a as w,k as K,aq as L,ar as q,ag as B,n as Y,as as j,am as Z,at as $}from"./B4Ye32uY.js";import{s as k,g as z}from"./Dtb5cXmJ.js";function _(e,u=null,c){if(typeof e!="object"||e===null||m in e)return e;const l=q(e);if(l!==E&&l!==M)return e;var f=new Map,g=B(e),O=v(0);g&&f.set("length",v(e.length));var y;return new Proxy(e,{defineProperty(s,n,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&A();var r=f.get(n);return r===void 0?(r=v(t.value),f.set(n,r)):o(r,_(t.value,y)),!0},deleteProperty(s,n){var t=f.get(n);if(t===void 0)n in s&&f.set(n,v(d));else{if(g&&typeof n=="string"){var r=f.get("length"),i=Number(n);Number.isInteger(i)&&i<r.v&&o(r,i)}o(t,d),T(O)}return!0},get(s,n,t){var b;if(n===m)return e;var r=f.get(n),i=n in s;if(r===void 0&&(!i||(b=h(s,n))!=null&&b.writable)&&(r=v(_(i?s[n]:d,y)),f.set(n,r)),r!==void 0){var a=w(r);return a===d?void 0:a}return Reflect.get(s,n,t)},getOwnPropertyDescriptor(s,n){var t=Reflect.getOwnPropertyDescriptor(s,n);if(t&&"value"in t){var r=f.get(n);r&&(t.value=w(r))}else if(t===void 0){var i=f.get(n),a=i==null?void 0:i.v;if(i!==void 0&&a!==d)return{enumerable:!0,configurable:!0,value:a,writable:!0}}return t},has(s,n){var a;if(n===m)return!0;var t=f.get(n),r=t!==void 0&&t.v!==d||Reflect.has(s,n);if(t!==void 0||K!==null&&(!r||(a=h(s,n))!=null&&a.writable)){t===void 0&&(t=v(r?_(s[n],y):d),f.set(n,t));var i=w(t);if(i===d)return!1}return r},set(s,n,t,r){var S;var i=f.get(n),a=n in s;if(g&&n==="length")for(var b=t;b<i.v;b+=1){var x=f.get(b+"");x!==void 0?o(x,d):b in s&&(x=v(d),f.set(b+"",x))}i===void 0?(!a||(S=h(s,n))!=null&&S.writable)&&(i=v(void 0),o(i,_(t,y)),f.set(n,i)):(a=i.v!==d,o(i,_(t,y)));var N=Reflect.getOwnPropertyDescriptor(s,n);if(N!=null&&N.set&&N.set.call(r,t),!a){if(g&&typeof n=="string"){var R=f.get("length"),P=Number(n);Number.isInteger(P)&&P>=R.v&&o(R,P+1)}T(O)}return!0},ownKeys(s){w(O);var n=Reflect.ownKeys(s).filter(i=>{var a=f.get(i);return a===void 0||a.v!==d});for(var[t,r]of f)r.v!==d&&!(t in s)&&n.push(t);return n},setPrototypeOf(){L()}})}function T(e,u=1){o(e,e.v+u)}function U(e){return e!==null&&typeof e=="object"&&m in e?e[m]:e}function G(e,u){return Object.is(U(e),U(u))}let I=!1,D=Symbol();function H(e,u,c){const l=c[u]??(c[u]={store:null,source:Y(void 0),unsubscribe:j});if(l.store!==e&&!(D in c))if(l.unsubscribe(),l.store=e??null,e==null)l.source.v=void 0,l.unsubscribe=j;else{var f=!0;l.unsubscribe=k(e,g=>{f?l.source.v=g:o(l.source,g)}),f=!1}return e&&D in c?z(e):w(l.source)}function J(e,u){return e.set(u),u}function Q(){const e={};function u(){Z(()=>{for(var c in e)e[c].unsubscribe();$(e,D,{enumerable:!1,value:!0})})}return[e,u]}function V(e,u,c){return e.set(c),u}function W(e){var u=I;try{return I=!1,[e(),I]}finally{I=u}}export{V as a,H as b,W as c,J as d,G as i,_ as p,Q as s};
