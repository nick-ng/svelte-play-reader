var Hr=Object.defineProperty;var Xr=(y,w,p)=>w in y?Hr(y,w,{enumerable:!0,configurable:!0,writable:!0,value:p}):y[w]=p;var Q=(y,w,p)=>Xr(y,typeof w!="symbol"?w+"":w,p);import{w as Qe}from"./Dtb5cXmJ.js";var ie=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Jr(y){return y&&y.__esModule&&Object.prototype.hasOwnProperty.call(y,"default")?y.default:y}function se(y){throw new Error('Could not dynamically require "'+y+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ge={exports:{}};/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/(function(y,w){(function(p){y.exports=p()})(function(){return function p(m,F,g){function O(x,D){if(!F[x]){if(!m[x]){var l=typeof se=="function"&&se;if(!D&&l)return l(x,!0);if(E)return E(x,!0);var h=new Error("Cannot find module '"+x+"'");throw h.code="MODULE_NOT_FOUND",h}var T=F[x]={exports:{}};m[x][0].call(T.exports,function(C){var M=m[x][1][C];return O(M||C)},T,T.exports,p,m,F,g)}return F[x].exports}for(var E=typeof se=="function"&&se,b=0;b<g.length;b++)O(g[b]);return O}({1:[function(p,m,F){(function(g){var O=g.MutationObserver||g.WebKitMutationObserver,E;if(O){var b=0,x=new O(C),D=g.document.createTextNode("");x.observe(D,{characterData:!0}),E=function(){D.data=b=++b%2}}else if(!g.setImmediate&&typeof g.MessageChannel<"u"){var l=new g.MessageChannel;l.port1.onmessage=C,E=function(){l.port2.postMessage(0)}}else"document"in g&&"onreadystatechange"in g.document.createElement("script")?E=function(){var B=g.document.createElement("script");B.onreadystatechange=function(){C(),B.onreadystatechange=null,B.parentNode.removeChild(B),B=null},g.document.documentElement.appendChild(B)}:E=function(){setTimeout(C,0)};var h,T=[];function C(){h=!0;for(var B,Y,L=T.length;L;){for(Y=T,T=[],B=-1;++B<L;)Y[B]();L=T.length}h=!1}m.exports=M;function M(B){T.push(B)===1&&!h&&E()}}).call(this,typeof ie<"u"?ie:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(p,m,F){var g=p(1);function O(){}var E={},b=["REJECTED"],x=["FULFILLED"],D=["PENDING"];m.exports=l;function l(d){if(typeof d!="function")throw new TypeError("resolver must be a function");this.state=D,this.queue=[],this.outcome=void 0,d!==O&&M(this,d)}l.prototype.catch=function(d){return this.then(null,d)},l.prototype.then=function(d,I){if(typeof d!="function"&&this.state===x||typeof I!="function"&&this.state===b)return this;var S=new this.constructor(O);if(this.state!==D){var A=this.state===x?d:I;T(S,A,this.outcome)}else this.queue.push(new h(S,d,I));return S};function h(d,I,S){this.promise=d,typeof I=="function"&&(this.onFulfilled=I,this.callFulfilled=this.otherCallFulfilled),typeof S=="function"&&(this.onRejected=S,this.callRejected=this.otherCallRejected)}h.prototype.callFulfilled=function(d){E.resolve(this.promise,d)},h.prototype.otherCallFulfilled=function(d){T(this.promise,this.onFulfilled,d)},h.prototype.callRejected=function(d){E.reject(this.promise,d)},h.prototype.otherCallRejected=function(d){T(this.promise,this.onRejected,d)};function T(d,I,S){g(function(){var A;try{A=I(S)}catch(U){return E.reject(d,U)}A===d?E.reject(d,new TypeError("Cannot resolve promise with itself")):E.resolve(d,A)})}E.resolve=function(d,I){var S=B(C,I);if(S.status==="error")return E.reject(d,S.value);var A=S.value;if(A)M(d,A);else{d.state=x,d.outcome=I;for(var U=-1,z=d.queue.length;++U<z;)d.queue[U].callFulfilled(I)}return d},E.reject=function(d,I){d.state=b,d.outcome=I;for(var S=-1,A=d.queue.length;++S<A;)d.queue[S].callRejected(I);return d};function C(d){var I=d&&d.then;if(d&&(typeof d=="object"||typeof d=="function")&&typeof I=="function")return function(){I.apply(d,arguments)}}function M(d,I){var S=!1;function A(j){S||(S=!0,E.reject(d,j))}function U(j){S||(S=!0,E.resolve(d,j))}function z(){I(U,A)}var W=B(z);W.status==="error"&&A(W.value)}function B(d,I){var S={};try{S.value=d(I),S.status="success"}catch(A){S.status="error",S.value=A}return S}l.resolve=Y;function Y(d){return d instanceof this?d:E.resolve(new this(O),d)}l.reject=L;function L(d){var I=new this(O);return E.reject(I,d)}l.all=fe;function fe(d){var I=this;if(Object.prototype.toString.call(d)!=="[object Array]")return this.reject(new TypeError("must be an array"));var S=d.length,A=!1;if(!S)return this.resolve([]);for(var U=new Array(S),z=0,W=-1,j=new this(O);++W<S;)G(d[W],W);return j;function G(ee,ne){I.resolve(ee).then(ce,function(V){A||(A=!0,E.reject(j,V))});function ce(V){U[ne]=V,++z===S&&!A&&(A=!0,E.resolve(j,U))}}}l.race=Z;function Z(d){var I=this;if(Object.prototype.toString.call(d)!=="[object Array]")return this.reject(new TypeError("must be an array"));var S=d.length,A=!1;if(!S)return this.resolve([]);for(var U=-1,z=new this(O);++U<S;)W(d[U]);return z;function W(j){I.resolve(j).then(function(G){A||(A=!0,E.resolve(z,G))},function(G){A||(A=!0,E.reject(z,G))})}}},{1:1}],3:[function(p,m,F){(function(g){typeof g.Promise!="function"&&(g.Promise=p(2))}).call(this,typeof ie<"u"?ie:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(p,m,F){var g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function O(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var b=E();function x(){try{if(!b||!b.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||t)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function D(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if(n.name!=="TypeError")throw n;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(t.type)}}typeof Promise>"u"&&p(3);var l=Promise;function h(e,t){t&&e.then(function(r){t(null,r)},function(r){t(r)})}function T(e,t,r){typeof t=="function"&&e.then(t),typeof r=="function"&&e.catch(r)}function C(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function M(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var B="local-forage-detect-blob-support",Y=void 0,L={},fe=Object.prototype.toString,Z="readonly",d="readwrite";function I(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),a=0;a<t;a++)o[a]=e.charCodeAt(a);return r}function S(e){return new l(function(t){var r=e.transaction(B,d),o=D([""]);r.objectStore(B).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),t(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function A(e){return typeof Y=="boolean"?l.resolve(Y):S(e).then(function(t){return Y=t,Y})}function U(e){var t=L[e.name],r={};r.promise=new l(function(o,a){r.resolve=o,r.reject=a}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function z(e){var t=L[e.name],r=t.deferredOperations.pop();if(r)return r.resolve(),r.promise}function W(e,t){var r=L[e.name],o=r.deferredOperations.pop();if(o)return o.reject(t),o.promise}function j(e,t){return new l(function(r,o){if(L[e.name]=L[e.name]||Se(),e.db)if(t)U(e),e.db.close();else return r(e.db);var a=[e.name];t&&a.push(e.version);var n=b.open.apply(b,a);t&&(n.onupgradeneeded=function(i){var s=n.result;try{s.createObjectStore(e.storeName),i.oldVersion<=1&&s.createObjectStore(B)}catch(f){if(f.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw f}}),n.onerror=function(i){i.preventDefault(),o(n.error)},n.onsuccess=function(){var i=n.result;i.onversionchange=function(s){s.target.close()},r(i),z(e)}})}function G(e){return j(e,!1)}function ee(e){return j(e,!0)}function ne(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==t&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function ce(e){return new l(function(t,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var n=btoa(a.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function V(e){var t=I(atob(e.data));return D([t],{type:e.type})}function _e(e){return e&&e.__local_forage_encoded_blob}function Xe(e){var t=this,r=t._initReady().then(function(){var o=L[t._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return T(r,e,e),r}function Je(e){U(e);for(var t=L[e.name],r=t.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,G(e).then(function(n){return e.db=n,ne(e)?ee(e):n}).then(function(n){e.db=t.db=n;for(var i=0;i<r.length;i++)r[i]._dbInfo.db=n}).catch(function(n){throw W(e,n),n})}function H(e,t,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return l.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),ee(e)}).then(function(){return Je(e).then(function(){H(e,t,r,o-1)})}).catch(r);r(n)}}function Se(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function Ze(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=L[r.name];a||(a=Se(),L[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=Xe);var n=[];function i(){return l.resolve()}for(var s=0;s<a.forages.length;s++){var f=a.forages[s];f!==t&&n.push(f._initReady().catch(i))}var c=a.forages.slice(0);return l.all(n).then(function(){return r.db=a.db,G(r)}).then(function(u){return r.db=u,ne(r,t._defaultConfig.version)?ee(r):u}).then(function(u){r.db=a.db=u,t._dbInfo=r;for(var v=0;v<c.length;v++){var _=c[v];_!==t&&(_._dbInfo.db=r.db,_._dbInfo.version=r.version)}})}function qe(e,t){var r=this;e=C(e);var o=new l(function(a,n){r.ready().then(function(){H(r._dbInfo,Z,function(i,s){if(i)return n(i);try{var f=s.objectStore(r._dbInfo.storeName),c=f.get(e);c.onsuccess=function(){var u=c.result;u===void 0&&(u=null),_e(u)&&(u=V(u)),a(u)},c.onerror=function(){n(c.error)}}catch(u){n(u)}})}).catch(n)});return h(o,t),o}function Ve(e,t){var r=this,o=new l(function(a,n){r.ready().then(function(){H(r._dbInfo,Z,function(i,s){if(i)return n(i);try{var f=s.objectStore(r._dbInfo.storeName),c=f.openCursor(),u=1;c.onsuccess=function(){var v=c.result;if(v){var _=v.value;_e(_)&&(_=V(_));var R=e(_,v.key,u++);R!==void 0?a(R):v.continue()}else a()},c.onerror=function(){n(c.error)}}catch(v){n(v)}})}).catch(n)});return h(o,t),o}function ke(e,t,r){var o=this;e=C(e);var a=new l(function(n,i){var s;o.ready().then(function(){return s=o._dbInfo,fe.call(t)==="[object Blob]"?A(s.db).then(function(f){return f?t:ce(t)}):t}).then(function(f){H(o._dbInfo,d,function(c,u){if(c)return i(c);try{var v=u.objectStore(o._dbInfo.storeName);f===null&&(f=void 0);var _=v.put(f,e);u.oncomplete=function(){f===void 0&&(f=null),n(f)},u.onabort=u.onerror=function(){var R=_.error?_.error:_.transaction.error;i(R)}}catch(R){i(R)}})}).catch(i)});return h(a,r),a}function er(e,t){var r=this;e=C(e);var o=new l(function(a,n){r.ready().then(function(){H(r._dbInfo,d,function(i,s){if(i)return n(i);try{var f=s.objectStore(r._dbInfo.storeName),c=f.delete(e);s.oncomplete=function(){a()},s.onerror=function(){n(c.error)},s.onabort=function(){var u=c.error?c.error:c.transaction.error;n(u)}}catch(u){n(u)}})}).catch(n)});return h(o,t),o}function rr(e){var t=this,r=new l(function(o,a){t.ready().then(function(){H(t._dbInfo,d,function(n,i){if(n)return a(n);try{var s=i.objectStore(t._dbInfo.storeName),f=s.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var c=f.error?f.error:f.transaction.error;a(c)}}catch(c){a(c)}})}).catch(a)});return h(r,e),r}function tr(e){var t=this,r=new l(function(o,a){t.ready().then(function(){H(t._dbInfo,Z,function(n,i){if(n)return a(n);try{var s=i.objectStore(t._dbInfo.storeName),f=s.count();f.onsuccess=function(){o(f.result)},f.onerror=function(){a(f.error)}}catch(c){a(c)}})}).catch(a)});return h(r,e),r}function nr(e,t){var r=this,o=new l(function(a,n){if(e<0){a(null);return}r.ready().then(function(){H(r._dbInfo,Z,function(i,s){if(i)return n(i);try{var f=s.objectStore(r._dbInfo.storeName),c=!1,u=f.openKeyCursor();u.onsuccess=function(){var v=u.result;if(!v){a(null);return}e===0||c?a(v.key):(c=!0,v.advance(e))},u.onerror=function(){n(u.error)}}catch(v){n(v)}})}).catch(n)});return h(o,t),o}function or(e){var t=this,r=new l(function(o,a){t.ready().then(function(){H(t._dbInfo,Z,function(n,i){if(n)return a(n);try{var s=i.objectStore(t._dbInfo.storeName),f=s.openKeyCursor(),c=[];f.onsuccess=function(){var u=f.result;if(!u){o(c);return}c.push(u.key),u.continue()},f.onerror=function(){a(f.error)}}catch(u){a(u)}})}).catch(a)});return h(r,e),r}function ar(e,t){t=M.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=l.reject("Invalid arguments");else{var n=e.name===r.name&&o._dbInfo.db,i=n?l.resolve(o._dbInfo.db):G(e).then(function(s){var f=L[e.name],c=f.forages;f.db=s;for(var u=0;u<c.length;u++)c[u]._dbInfo.db=s;return s});e.storeName?a=i.then(function(s){if(s.objectStoreNames.contains(e.storeName)){var f=s.version+1;U(e);var c=L[e.name],u=c.forages;s.close();for(var v=0;v<u.length;v++){var _=u[v];_._dbInfo.db=null,_._dbInfo.version=f}var R=new l(function(N,$){var P=b.open(e.name,f);P.onerror=function(K){var te=P.result;te.close(),$(K)},P.onupgradeneeded=function(){var K=P.result;K.deleteObjectStore(e.storeName)},P.onsuccess=function(){var K=P.result;K.close(),N(K)}});return R.then(function(N){c.db=N;for(var $=0;$<u.length;$++){var P=u[$];P._dbInfo.db=N,z(P._dbInfo)}}).catch(function(N){throw(W(e,N)||l.resolve()).catch(function(){}),N})}}):a=i.then(function(s){U(e);var f=L[e.name],c=f.forages;s.close();for(var u=0;u<c.length;u++){var v=c[u];v._dbInfo.db=null}var _=new l(function(R,N){var $=b.deleteDatabase(e.name);$.onerror=function(){var P=$.result;P&&P.close(),N($.error)},$.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},$.onsuccess=function(){var P=$.result;P&&P.close(),R(P)}});return _.then(function(R){f.db=R;for(var N=0;N<c.length;N++){var $=c[N];z($._dbInfo)}}).catch(function(R){throw(W(e,R)||l.resolve()).catch(function(){}),R})})}return h(a,t),a}var ir={_driver:"asyncStorage",_initStorage:Ze,_support:x(),iterate:Ve,getItem:qe,setItem:ke,removeItem:er,clear:rr,length:tr,key:nr,keys:or,dropInstance:ar};function sr(){return typeof openDatabase=="function"}var X="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fr="~~local_forage_type~",Ee=/^~~local_forage_type~([^~]+)~/,oe="__lfsc__:",ue=oe.length,le="arbf",de="blob",we="si08",Ie="ui08",Re="uic8",Ne="si16",De="si32",Te="ur16",Ae="ui32",xe="fl32",Oe="fl64",Ce=ue+le.length,Be=Object.prototype.toString;function Le(e){var t=e.length*.75,r=e.length,o,a=0,n,i,s,f;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);var c=new ArrayBuffer(t),u=new Uint8Array(c);for(o=0;o<r;o+=4)n=X.indexOf(e[o]),i=X.indexOf(e[o+1]),s=X.indexOf(e[o+2]),f=X.indexOf(e[o+3]),u[a++]=n<<2|i>>4,u[a++]=(i&15)<<4|s>>2,u[a++]=(s&3)<<6|f&63;return c}function he(e){var t=new Uint8Array(e),r="",o;for(o=0;o<t.length;o+=3)r+=X[t[o]>>2],r+=X[(t[o]&3)<<4|t[o+1]>>4],r+=X[(t[o+1]&15)<<2|t[o+2]>>6],r+=X[t[o+2]&63];return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function cr(e,t){var r="";if(e&&(r=Be.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&Be.call(e.buffer)==="[object ArrayBuffer]")){var o,a=oe;e instanceof ArrayBuffer?(o=e,a+=le):(o=e.buffer,r==="[object Int8Array]"?a+=we:r==="[object Uint8Array]"?a+=Ie:r==="[object Uint8ClampedArray]"?a+=Re:r==="[object Int16Array]"?a+=Ne:r==="[object Uint16Array]"?a+=Te:r==="[object Int32Array]"?a+=De:r==="[object Uint32Array]"?a+=Ae:r==="[object Float32Array]"?a+=xe:r==="[object Float64Array]"?a+=Oe:t(new Error("Failed to get type for BinaryArray"))),t(a+he(o))}else if(r==="[object Blob]"){var n=new FileReader;n.onload=function(){var i=fr+e.type+"~"+he(this.result);t(oe+de+i)},n.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),t(null,i)}}function ur(e){if(e.substring(0,ue)!==oe)return JSON.parse(e);var t=e.substring(Ce),r=e.substring(ue,Ce),o;if(r===de&&Ee.test(t)){var a=t.match(Ee);o=a[1],t=t.substring(a[0].length)}var n=Le(t);switch(r){case le:return n;case de:return D([n],{type:o});case we:return new Int8Array(n);case Ie:return new Uint8Array(n);case Re:return new Uint8ClampedArray(n);case Ne:return new Int16Array(n);case Te:return new Uint16Array(n);case De:return new Int32Array(n);case Ae:return new Uint32Array(n);case xe:return new Float32Array(n);case Oe:return new Float64Array(n);default:throw new Error("Unkown type: "+r)}}var ve={serialize:cr,deserialize:ur,stringToBuffer:Le,bufferToString:he};function Pe(e,t,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function lr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new l(function(n,i){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(s){return i(s)}r.db.transaction(function(s){Pe(s,r,function(){t._dbInfo=r,n()},function(f,c){i(c)})},i)});return r.serializer=ve,a}function J(e,t,r,o,a,n){e.executeSql(r,o,a,function(i,s){s.code===s.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(f,c){c.rows.length?n(f,s):Pe(f,t,function(){f.executeSql(r,o,a,n)},n)},n):n(i,s)},n)}function dr(e,t){var r=this;e=C(e);var o=new l(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(s){J(s,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(f,c){var u=c.rows.length?c.rows.item(0).value:null;u&&(u=i.serializer.deserialize(u)),a(u)},function(f,c){n(c)})})}).catch(n)});return h(o,t),o}function hr(e,t){var r=this,o=new l(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(s){J(s,i,"SELECT * FROM "+i.storeName,[],function(f,c){for(var u=c.rows,v=u.length,_=0;_<v;_++){var R=u.item(_),N=R.value;if(N&&(N=i.serializer.deserialize(N)),N=e(N,R.key,_+1),N!==void 0){a(N);return}}a()},function(f,c){n(c)})})}).catch(n)});return h(o,t),o}function Fe(e,t,r,o){var a=this;e=C(e);var n=new l(function(i,s){a.ready().then(function(){t===void 0&&(t=null);var f=t,c=a._dbInfo;c.serializer.serialize(t,function(u,v){v?s(v):c.db.transaction(function(_){J(_,c,"INSERT OR REPLACE INTO "+c.storeName+" (key, value) VALUES (?, ?)",[e,u],function(){i(f)},function(R,N){s(N)})},function(_){if(_.code===_.QUOTA_ERR){if(o>0){i(Fe.apply(a,[e,f,r,o-1]));return}s(_)}})})}).catch(s)});return h(n,r),n}function vr(e,t,r){return Fe.apply(this,[e,t,r,1])}function mr(e,t){var r=this;e=C(e);var o=new l(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(s){J(s,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(f,c){n(c)})})}).catch(n)});return h(o,t),o}function pr(e){var t=this,r=new l(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"DELETE FROM "+n.storeName,[],function(){o()},function(s,f){a(f)})})}).catch(a)});return h(r,e),r}function gr(e){var t=this,r=new l(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(s,f){var c=f.rows.item(0).c;o(c)},function(s,f){a(f)})})}).catch(a)});return h(r,e),r}function yr(e,t){var r=this,o=new l(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(s){J(s,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(f,c){var u=c.rows.length?c.rows.item(0).key:null;a(u)},function(f,c){n(c)})})}).catch(n)});return h(o,t),o}function br(e){var t=this,r=new l(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"SELECT key FROM "+n.storeName,[],function(s,f){for(var c=[],u=0;u<f.rows.length;u++)c.push(f.rows.item(u).key);o(c)},function(s,f){a(f)})})}).catch(a)});return h(r,e),r}function _r(e){return new l(function(t,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var i=[],s=0;s<n.rows.length;s++)i.push(n.rows.item(s).name);t({db:e,storeNames:i})},function(a,n){r(n)})},function(o){r(o)})})}function Sr(e,t){t=M.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new l(function(n){var i;e.name===r.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?n({db:i,storeNames:[e.storeName]}):n(_r(i))}).then(function(n){return new l(function(i,s){n.db.transaction(function(f){function c(R){return new l(function(N,$){f.executeSql("DROP TABLE IF EXISTS "+R,[],function(){N()},function(P,K){$(K)})})}for(var u=[],v=0,_=n.storeNames.length;v<_;v++)u.push(c(n.storeNames[v]));l.all(u).then(function(){i()}).catch(function(R){s(R)})},function(f){s(f)})})}):a=l.reject("Invalid arguments"),h(a,t),a}var Er={_driver:"webSQLStorage",_initStorage:lr,_support:sr(),iterate:hr,getItem:dr,setItem:vr,removeItem:mr,clear:pr,length:gr,key:yr,keys:br,dropInstance:Sr};function wr(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function $e(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function Ir(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}function Rr(){return!Ir()||localStorage.length>0}function Nr(e){var t=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=$e(e,t._defaultConfig),Rr()?(t._dbInfo=r,r.serializer=ve,l.resolve()):l.reject()}function Dr(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return h(r,e),r}function Tr(e,t){var r=this;e=C(e);var o=r.ready().then(function(){var a=r._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return h(o,t),o}function Ar(e,t){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,n=a.keyPrefix,i=n.length,s=localStorage.length,f=1,c=0;c<s;c++){var u=localStorage.key(c);if(u.indexOf(n)===0){var v=localStorage.getItem(u);if(v&&(v=a.serializer.deserialize(v)),v=e(v,u.substring(i),f++),v!==void 0)return v}}});return h(o,t),o}function xr(e,t){var r=this,o=r.ready().then(function(){var a=r._dbInfo,n;try{n=localStorage.key(e)}catch{n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return h(o,t),o}function Or(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo,a=localStorage.length,n=[],i=0;i<a;i++){var s=localStorage.key(i);s.indexOf(o.keyPrefix)===0&&n.push(s.substring(o.keyPrefix.length))}return n});return h(r,e),r}function Cr(e){var t=this,r=t.keys().then(function(o){return o.length});return h(r,e),r}function Br(e,t){var r=this;e=C(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return h(o,t),o}function Lr(e,t,r){var o=this;e=C(e);var a=o.ready().then(function(){t===void 0&&(t=null);var n=t;return new l(function(i,s){var f=o._dbInfo;f.serializer.serialize(t,function(c,u){if(u)s(u);else try{localStorage.setItem(f.keyPrefix+e,c),i(n)}catch(v){(v.name==="QuotaExceededError"||v.name==="NS_ERROR_DOM_QUOTA_REACHED")&&s(v),s(v)}})})});return h(a,r),a}function Pr(e,t){if(t=M.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new l(function(n){e.storeName?n($e(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var i=localStorage.length-1;i>=0;i--){var s=localStorage.key(i);s.indexOf(n)===0&&localStorage.removeItem(s)}}):a=l.reject("Invalid arguments"),h(a,t),a}var Fr={_driver:"localStorageWrapper",_initStorage:Nr,_support:wr(),iterate:Ar,getItem:Tr,setItem:Lr,removeItem:Br,clear:Dr,length:Cr,key:xr,keys:Or,dropInstance:Pr},$r=function(t,r){return t===r||typeof t=="number"&&typeof r=="number"&&isNaN(t)&&isNaN(r)},Mr=function(t,r){for(var o=t.length,a=0;a<o;){if($r(t[a],r))return!0;a++}return!1},Me=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},re={},Ue={},k={INDEXEDDB:ir,WEBSQL:Er,LOCALSTORAGE:Fr},Ur=[k.INDEXEDDB._driver,k.WEBSQL._driver,k.LOCALSTORAGE._driver],ae=["dropInstance"],me=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ae),Yr={description:"",driver:Ur.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function zr(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function pe(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(Me(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var Wr=function(){function e(t){O(this,e);for(var r in k)if(k.hasOwnProperty(r)){var o=k[r],a=o._driver;this[r]=a,re[a]||this.defineDriver(o)}this._defaultConfig=pe({},Yr),this._config=pe({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":g(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var n=new l(function(i,s){try{var f=r._driver,c=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){s(c);return}for(var u=me.concat("_initStorage"),v=0,_=u.length;v<_;v++){var R=u[v],N=!Mr(ae,R);if((N||r[R])&&typeof r[R]!="function"){s(c);return}}var $=function(){for(var te=function(Qr){return function(){var Gr=new Error("Method "+Qr+" is not implemented by the current driver"),Ye=l.reject(Gr);return h(Ye,arguments[arguments.length-1]),Ye}},ge=0,Kr=ae.length;ge<Kr;ge++){var ye=ae[ge];r[ye]||(r[ye]=te(ye))}};$();var P=function(te){re[f]&&console.info("Redefining LocalForage driver: "+f),re[f]=r,Ue[f]=te,i()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(P,s):P(!!r._support):P(!0)}catch(K){s(K)}});return T(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var n=re[r]?l.resolve(re[r]):l.reject(new Error("Driver not found."));return T(n,o,a),n},e.prototype.getSerializer=function(r){var o=l.resolve(ve);return T(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return T(a,r,r),a},e.prototype.setDriver=function(r,o,a){var n=this;Me(r)||(r=[r]);var i=this._getSupportedDrivers(r);function s(){n._config.driver=n.driver()}function f(v){return n._extend(v),s(),n._ready=n._initStorage(n._config),n._ready}function c(v){return function(){var _=0;function R(){for(;_<v.length;){var N=v[_];return _++,n._dbInfo=null,n._ready=null,n.getDriver(N).then(f).catch(R)}s();var $=new Error("No available storage method found.");return n._driverSet=l.reject($),n._driverSet}return R()}}var u=this._driverSet!==null?this._driverSet.catch(function(){return l.resolve()}):l.resolve();return this._driverSet=u.then(function(){var v=i[0];return n._dbInfo=null,n._ready=null,n.getDriver(v).then(function(_){n._driver=_._driver,s(),n._wrapLibraryMethodsWithReady(),n._initDriver=c(i)})}).catch(function(){s();var v=new Error("No available storage method found.");return n._driverSet=l.reject(v),n._driverSet}),T(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!Ue[r]},e.prototype._extend=function(r){pe(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,n=r.length;a<n;a++){var i=r[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=me.length;r<o;r++)zr(this,me[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),jr=new Wr;m.exports=jr},{3:3}]},{},[4])(4)})})(Ge);var Zr=Ge.exports;const qr=Jr(Zr),be="NICK_PRODUCTIONS",Vr=qr.createInstance({name:be});let He={cast:[],direction:[],name:"",sourceText:"",updatedTimestamp:Date.now()};try{const y=localStorage.getItem(be);typeof y=="string"&&(He=JSON.parse(y))}catch(y){console.error("error loading productions",y)}const kr=Qe(He);kr.subscribe(y=>{localStorage.setItem(be,JSON.stringify(y))});const et=Qe({list:[]}),rt=async()=>{try{const y=[];await Vr.iterate((w,p)=>{w!=null&&w.name&&y.push({id:p,name:w.name,updatedTimestamp:w.updatedTimestamp})}),et.update(w=>({...w,list:y}))}catch(y){console.error("error updating productions",y)}};rt();const ze=y=>{const w=y.replace(/^\[/,"").replace(/\]$/,"");return w?{type:"stage-direction",value:w}:null},We=(y,w,p,m)=>{var E;const F=y.match(/(Enter)|(Exit)|(Exeunt)/),g=[],[O]=y.split("but");if(w.forEach(b=>{O.includes(b.name)&&g.push(b.name)}),F){const b=F[0].toLowerCase(),x=[...p.charactersOnStage];let D=[];if(g.length>0)D=g;else if(b==="enter"){const h=y.match(/Enter (?<character>\w+)./);if((E=h==null?void 0:h.groups)!=null&&E.character)D.push(h.groups.character);else throw new Error(`Error when parsing stage direction. No characters entered. Source stage direction: "${y}". "tokenNumber": ${m}`)}else if(!y.match(/(Exit)|(Exeunt)\.?/))throw new Error(`Error when parsing stage direction. Unknown character to leave the stage. Source stage direction: "${y}". "tokenNumber": ${m}`);const l=y.match(/(first)|(then)/i)?"sequential":"simultaneous";if(b==="enter"){if(D.some(h=>p.charactersOnStage.includes(h)))throw new Error(`Character already on stage. Already on stage: ${p.charactersOnStage.join(", ")}, Entering stage: ${D}`);p.charactersOnStage.push(...D),D.forEach(h=>{w.map(T=>T.name).includes(h)||w.push({name:h,words:0})})}else if(D.length>0){if(!D.every(h=>p.charactersOnStage.includes(h)))throw new Error(`Character not on stage. On stage: ${p.charactersOnStage.join(", ")}, Exiting stage: ${D}. Source stage direction: "${y}" "tokenNumber": ${m}`);p.charactersOnStage=p.charactersOnStage.filter(h=>!D.includes(h))}else b==="exit"?(D.push(p.lastSpeaker),p.charactersOnStage=p.charactersOnStage.filter(h=>h!==p.lastSpeaker)):(D=[...p.charactersOnStage],p.charactersOnStage=[]);p.currentScene.steps.push({type:"stage-direction",subType:"movement",direction:b,characterNames:D,timing:l,stageBefore:x})}},je=(y={})=>({act:"",scene:-1,settings:[],steps:[],...y}),q=class q{constructor(w){Q(this,"rawScript");Q(this,"tokens");Q(this,"dramatisPersonae");Q(this,"scenes");Q(this,"error");Q(this,"stage1",()=>{let w=!1,p=0;return this.rawScript.replaceAll(/next scene ./g,"").split(/\/\*.*\*\//).join("").split(q.DELIMITER_0).map(m=>m.split("//")[0].match(/^\s+$/)?"":m.split("//")[0]).join(q.DELIMITER_0).split(q.DELIMITER_1).forEach(m=>{var b,x,D,l;const F=m.trim(),g=m.match(/Act (?<actRoman>[IVXLCDM\d]+), Scene (?<sceneNumber>\d+)/i);if(g){this.tokens.push({tokenNumber:p++,type:"act-scene",raw:m,actScene:{act:((b=g==null?void 0:g.groups)==null?void 0:b.actRoman)||"",scene:parseInt(((x=g==null?void 0:g.groups)==null?void 0:x.sceneNumber)||"",10)}}),w=!0;return}if(m==="---"){w=!1,this.tokens.push({tokenNumber:p++,type:"scene-description-complete",raw:m});return}if(w){this.tokens.push({tokenNumber:p++,type:"scene-description-item",value:m.trim(),raw:m});return}const O=m.match(/^ +(?<characterName>\w[\w'' ]*)\./i);if(!w&&O){const h=(D=O.groups)==null?void 0:D.characterName,T=[],C=(l=F.replace(`${h}.`,"").replace(/\s?Exit\.$/,""))==null?void 0:l.split(`
`).map((M,B)=>{const Y=M.trim().replace(/\d+$/,"").trim().replaceAll(/ +/g," ");if(Y.match(/\[.*\]/)){const L=ze(Y);return L&&T.push({...L,afterFeet:B-T.length}),""}return Y}).filter(M=>M);if(h&&C.length>0){const M={tokenNumber:p++,type:"character-lines",raw:m,character:h,feets:C};T.length>0&&(M.stageDirections=T),this.tokens.push(M),F.match(/\s?Exit\.$/)&&this.tokens.push({tokenNumber:p++,type:"stage-direction",value:"Exit."});return}}if(ze(F)){this.tokens.push({tokenNumber:p++,type:"stage-direction",raw:m,value:F});return}m&&this.tokens.push({tokenNumber:p++,type:"unknown",raw:m})}),this});Q(this,"stage2",()=>{const w=new Set;this.tokens.forEach(m=>{m.type==="character-lines"&&m!=null&&m.character&&w.add(m==null?void 0:m.character)}),this.dramatisPersonae=[...w].map(m=>({name:m,words:0}));const p={charactersOnStage:[],lastSpeaker:"",currentScene:je()};return this.tokens.forEach((m,F)=>{switch(m.type){case"act-scene":{const{actScene:g}=m;p.currentScene=je({act:g==null?void 0:g.act,scene:g==null?void 0:g.scene});break}case"scene-description-item":{const{value:g}=m;g&&p.currentScene.settings.push(g);break}case"stage-direction":{const{value:g}=m;m.stageBefore=[...p.charactersOnStage],g&&We(g,this.dramatisPersonae,p,F),m.stageAfter=[...p.charactersOnStage];break}case"character-lines":{let g=0,O=0;if(m.stageDirections)for(const b of m.stageDirections){const x=m.feets.slice(g,b.afterFeet);g=b.afterFeet,O+=x.join(" ").split(/\s+/).length,p.currentScene.steps.push({type:"character-lines",character:m.character,feets:x}),p.lastSpeaker=m.character,b.stageBefore=[...p.charactersOnStage],We(b.value,this.dramatisPersonae,p,F),b.stageAfter=[...p.charactersOnStage]}if(g<m.feets.length){const b=m.feets.slice(g,m.feets.length);O+=b.join(" ").split(/\s+/).length,p.currentScene.steps.push({type:"character-lines",character:m.character,feets:b}),p.lastSpeaker=m.character}const E=this.dramatisPersonae.find(b=>b.name===m.character);E&&(E.words+=O);break}}}),this.scenes.push(p.currentScene),this});this.rawScript=w,this.tokens=[],this.dramatisPersonae=[],this.scenes=[];try{this.stage1(),this.stage2()}catch(p){p instanceof Error&&(this.error=p.message)}}};Q(q,"DELIMITER_0",`
`),Q(q,"DELIMITER_1",/\n\n+/);let Ke=q;export{Ke as C,kr as c};
