import{d as Q,r as ut,o as ft,L as ht,v as g,_ as E,t as _,C as T,D as k,x as d,B as I,G as q,M as vt,c as pt,N as mt,O as V,P as D,Q as L,R as B,S as z,i as _t,z as w,A}from"./BpHI5cVm.js";function gt(){return K().__VUE_DEVTOOLS_GLOBAL_HOOK__}function K(){return typeof navigator<"u"&&typeof window<"u"?window:typeof globalThis<"u"?globalThis:{}}const bt=typeof Proxy=="function",yt="devtools-plugin:setup",wt="plugin:settings:set";let O,F;function Ot(){var e;return O!==void 0||(typeof window<"u"&&window.performance?(O=!0,F=window.performance):typeof globalThis<"u"&&(!((e=globalThis.perf_hooks)===null||e===void 0)&&e.performance)?(O=!0,F=globalThis.perf_hooks.performance):O=!1),O}function St(){return Ot()?F.now():Date.now()}class Ct{constructor(t,i){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=t,this.hook=i;const n={};if(t.settings)for(const a in t.settings){const s=t.settings[a];n[a]=s.defaultValue}const o=`__vue-devtools-plugin-settings__${t.id}`;let r=Object.assign({},n);try{const a=localStorage.getItem(o),s=JSON.parse(a);Object.assign(r,s)}catch{}this.fallbacks={getSettings(){return r},setSettings(a){try{localStorage.setItem(o,JSON.stringify(a))}catch{}r=a},now(){return St()}},i&&i.on(wt,(a,s)=>{a===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(a,s)=>this.target?this.target.on[s]:(...c)=>{this.onQueue.push({method:s,args:c})}}),this.proxiedTarget=new Proxy({},{get:(a,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...c)=>(this.targetQueue.push({method:s,args:c,resolve:()=>{}}),this.fallbacks[s](...c)):(...c)=>new Promise(f=>{this.targetQueue.push({method:s,args:c,resolve:f})})})}async setRealTarget(t){this.target=t;for(const i of this.onQueue)this.target.on[i.method](...i.args);for(const i of this.targetQueue)i.resolve(await this.target[i.method](...i.args))}}function xt(e,t){const i=e,n=K(),o=gt(),r=bt&&i.enableEarlyProxy;if(o&&(n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!r))o.emit(yt,e,t);else{const a=r?new Ct(i,o):null;(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:i,setupFn:t,proxy:a}),a&&t(a.proxiedTarget)}}const Et=Symbol.for("nuxt:client-only"),Lt=Q({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(e,{slots:t,attrs:i}){const n=ut(!1);return ft(()=>{n.value=!0}),ht(Et,!0),o=>{var c;if(n.value)return(c=t.default)==null?void 0:c.call(t);const r=t.fallback||t.placeholder;if(r)return r();const a=o.fallback||o.placeholder||"",s=o.fallbackTag||o.placeholderTag||"span";return g(s,i,a)}}}),It={},W=e=>(T("data-v-7f1eb679"),e=e(),k(),e),$t=W(()=>d("div",{class:"copyright"}," ООО “Свайп Ап” ",-1)),Tt=W(()=>d("div",{class:"navigation"},[d("button",{class:"buttons-navi",onclick:"window.location.href='#'"}," Информация о проекте "),d("button",{class:"buttons-navi",onclick:"window.location.href='#'"}," Правила сервиса "),d("button",{class:"buttons-navi",onclick:"window.location.href='#'"}," Обратная связь "),d("button",{class:"buttons-navi",onclick:"window.location.href='#'"}," Конфиденциальность ")],-1)),kt=[$t,Tt];function Rt(e,t){return _(),g("footer",null,kt)}const At=E(It,[["render",Rt],["__scopeId","data-v-7f1eb679"]]),Z="data:image/svg+xml,%3csvg%20width='46'%20height='46'%20viewBox='0%200%2046%2046'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.2666%2035.0898L10.9102%2033.7334L21.6435%2023L10.9102%2012.2667L12.2666%2010.9103L22.9999%2021.6436L33.7332%2010.9103L35.0897%2012.2667L24.3563%2023L35.0897%2033.7334L33.7332%2035.0898L22.9999%2024.3565L12.2666%2035.0898Z'%20fill='black'/%3e%3c/svg%3e",Nt={methods:{emitCloseEvent(){this.$emit("closeForm")},emitOpenEvent(){this.$emit("openButtonReg")}}},C=e=>(T("data-v-0c9d06a3"),e=e(),k(),e),Ft={action:"#",method:"GET",class:"container"},jt={class:"close-button"},Mt=C(()=>d("div",{id:"login"},[d("h1",null," Войти ")],-1)),Gt=C(()=>d("input",{id:"numberAndEmail",name:"username",type:"text",placeholder:"Телефон или почта",pattern:"^[+]?[0-9]{9,}$|.*[^@]+@[^@]+.*",title:"Введите существующий ваш адрес электронной почты или номер телефона",oninvalid:"this.setCustomValidity('Введите существующий адрес электронной почты')",oninput:"this.setCustomValidity('')",required:""},null,-1)),Pt=C(()=>d("input",{id:"password",name:"password",type:"text",placeholder:"Пароль",pattern:"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*",title:"Пароль должен состоять как минимум из 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру или специальный символ (?![.\\n]). Используйте только латинские буквы, цифры или специальные символы",required:""},null,-1)),Vt=C(()=>d("div",{id:"registration"}," Нет аккаунта? ",-1)),Dt={id:"regAndLog"},Bt=C(()=>d("button",{id:"ButtonLog"}," Войти ",-1)),Ut=C(()=>d("div",{id:"privacyPolicy"},[I(" При регистрации и входе вы соглашаетесь "),d("a",{href:"#",class:"link"},"с условиями использования Swipe Up"),d("br"),I(" и "),d("a",{href:"#",class:"link"},"политикой конфиденциальности")],-1));function Ht(e,t,i,n,o,r){return _(),g("form",Ft,[d("div",jt,[d("img",{src:Z,alt:"close",onClick:t[0]||(t[0]=(...a)=>r.emitCloseEvent&&r.emitCloseEvent(...a))})]),Mt,Gt,Pt,Vt,d("div",Dt,[d("button",{id:"ButtonReg",onClick:t[1]||(t[1]=(...a)=>r.emitOpenEvent&&r.emitOpenEvent(...a))}," Регистрация "),Bt]),Ut])}const J=E(Nt,[["render",Ht],["__scopeId","data-v-0c9d06a3"]]);/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */var Qt="store";function x(e,t){Object.keys(e).forEach(function(i){return t(e[i],i)})}function Y(e){return e!==null&&typeof e=="object"}function qt(e){return e&&typeof e.then=="function"}function zt(e,t){return function(){return e(t)}}function X(e,t,i){return t.indexOf(e)<0&&(i&&i.prepend?t.unshift(e):t.push(e)),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function tt(e,t){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var i=e.state;R(e,i,[],e._modules.root,!0),M(e,i,t)}function M(e,t,i){var n=e._state,o=e._scope;e.getters={},e._makeLocalGettersCache=Object.create(null);var r=e._wrappedGetters,a={},s={},c=vt(!0);c.run(function(){x(r,function(f,l){a[l]=zt(f,e),s[l]=pt(function(){return a[l]()}),Object.defineProperty(e.getters,l,{get:function(){return s[l].value},enumerable:!0})})}),e._state=mt({data:t}),e._scope=c,e.strict&&Yt(e),n&&i&&e._withCommit(function(){n.data=null}),o&&o.stop()}function R(e,t,i,n,o){var r=!i.length,a=e._modules.getNamespace(i);if(n.namespaced&&(e._modulesNamespaceMap[a],e._modulesNamespaceMap[a]=n),!r&&!o){var s=G(t,i.slice(0,-1)),c=i[i.length-1];e._withCommit(function(){s[c]=n.state})}var f=n.context=Kt(e,a,i);n.forEachMutation(function(l,u){var v=a+u;Wt(e,v,l,f)}),n.forEachAction(function(l,u){var v=l.root?u:a+u,h=l.handler||l;Zt(e,v,h,f)}),n.forEachGetter(function(l,u){var v=a+u;Jt(e,v,l,f)}),n.forEachChild(function(l,u){R(e,t,i.concat(u),l,o)})}function Kt(e,t,i){var n=t==="",o={dispatch:n?e.dispatch:function(r,a,s){var c=$(r,a,s),f=c.payload,l=c.options,u=c.type;return(!l||!l.root)&&(u=t+u),e.dispatch(u,f)},commit:n?e.commit:function(r,a,s){var c=$(r,a,s),f=c.payload,l=c.options,u=c.type;(!l||!l.root)&&(u=t+u),e.commit(u,f,l)}};return Object.defineProperties(o,{getters:{get:n?function(){return e.getters}:function(){return et(e,t)}},state:{get:function(){return G(e.state,i)}}}),o}function et(e,t){if(!e._makeLocalGettersCache[t]){var i={},n=t.length;Object.keys(e.getters).forEach(function(o){if(o.slice(0,n)===t){var r=o.slice(n);Object.defineProperty(i,r,{get:function(){return e.getters[o]},enumerable:!0})}}),e._makeLocalGettersCache[t]=i}return e._makeLocalGettersCache[t]}function Wt(e,t,i,n){var o=e._mutations[t]||(e._mutations[t]=[]);o.push(function(a){i.call(e,n.state,a)})}function Zt(e,t,i,n){var o=e._actions[t]||(e._actions[t]=[]);o.push(function(a){var s=i.call(e,{dispatch:n.dispatch,commit:n.commit,getters:n.getters,state:n.state,rootGetters:e.getters,rootState:e.state},a);return qt(s)||(s=Promise.resolve(s)),e._devtoolHook?s.catch(function(c){throw e._devtoolHook.emit("vuex:error",c),c}):s})}function Jt(e,t,i,n){e._wrappedGetters[t]||(e._wrappedGetters[t]=function(r){return i(n.state,n.getters,r.state,r.getters)})}function Yt(e){q(function(){return e._state.data},function(){},{deep:!0,flush:"sync"})}function G(e,t){return t.reduce(function(i,n){return i[n]},e)}function $(e,t,i){return Y(e)&&e.type&&(i=t,t=e,e=e.type),{type:e,payload:t,options:i}}var Xt="vuex bindings",U="vuex:mutations",N="vuex:actions",S="vuex",te=0;function ee(e,t){xt({id:"org.vuejs.vuex",app:e,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:[Xt]},function(i){i.addTimelineLayer({id:U,label:"Vuex Mutations",color:H}),i.addTimelineLayer({id:N,label:"Vuex Actions",color:H}),i.addInspector({id:S,label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),i.on.getInspectorTree(function(n){if(n.app===e&&n.inspectorId===S)if(n.filter){var o=[];rt(o,t._modules.root,n.filter,""),n.rootNodes=o}else n.rootNodes=[ot(t._modules.root,"")]}),i.on.getInspectorState(function(n){if(n.app===e&&n.inspectorId===S){var o=n.nodeId;et(t,o),n.state=oe(ae(t._modules,o),o==="root"?t.getters:t._makeLocalGettersCache,o)}}),i.on.editInspectorState(function(n){if(n.app===e&&n.inspectorId===S){var o=n.nodeId,r=n.path;o!=="root"&&(r=o.split("/").filter(Boolean).concat(r)),t._withCommit(function(){n.set(t._state.data,r,n.state.value)})}}),t.subscribe(function(n,o){var r={};n.payload&&(r.payload=n.payload),r.state=o,i.notifyComponentUpdate(),i.sendInspectorTree(S),i.sendInspectorState(S),i.addTimelineEvent({layerId:U,event:{time:Date.now(),title:n.type,data:r}})}),t.subscribeAction({before:function(n,o){var r={};n.payload&&(r.payload=n.payload),n._id=te++,n._time=Date.now(),r.state=o,i.addTimelineEvent({layerId:N,event:{time:n._time,title:n.type,groupId:n._id,subtitle:"start",data:r}})},after:function(n,o){var r={},a=Date.now()-n._time;r.duration={_custom:{type:"duration",display:a+"ms",tooltip:"Action duration",value:a}},n.payload&&(r.payload=n.payload),r.state=o,i.addTimelineEvent({layerId:N,event:{time:Date.now(),title:n.type,groupId:n._id,subtitle:"end",data:r}})}})})}var H=8702998,ne=6710886,ie=16777215,nt={label:"namespaced",textColor:ie,backgroundColor:ne};function it(e){return e&&e!=="root"?e.split("/").slice(-2,-1)[0]:"Root"}function ot(e,t){return{id:t||"root",label:it(t),tags:e.namespaced?[nt]:[],children:Object.keys(e._children).map(function(i){return ot(e._children[i],t+i+"/")})}}function rt(e,t,i,n){n.includes(i)&&e.push({id:n||"root",label:n.endsWith("/")?n.slice(0,n.length-1):n||"Root",tags:t.namespaced?[nt]:[]}),Object.keys(t._children).forEach(function(o){rt(e,t._children[o],i,n+o+"/")})}function oe(e,t,i){t=i==="root"?t:t[i];var n=Object.keys(t),o={state:Object.keys(e.state).map(function(a){return{key:a,editable:!0,value:e.state[a]}})};if(n.length){var r=re(t);o.getters=Object.keys(r).map(function(a){return{key:a.endsWith("/")?it(a):a,editable:!1,value:j(function(){return r[a]})}})}return o}function re(e){var t={};return Object.keys(e).forEach(function(i){var n=i.split("/");if(n.length>1){var o=t,r=n.pop();n.forEach(function(a){o[a]||(o[a]={_custom:{value:{},display:a,tooltip:"Module",abstract:!0}}),o=o[a]._custom.value}),o[r]=j(function(){return e[i]})}else t[i]=j(function(){return e[i]})}),t}function ae(e,t){var i=t.split("/").filter(function(n){return n});return i.reduce(function(n,o,r){var a=n[o];if(!a)throw new Error('Missing module "'+o+'" for path "'+t+'".');return r===i.length-1?a:a._children},t==="root"?e:e.root._children)}function j(e){try{return e()}catch(t){return t}}var m=function(t,i){this.runtime=i,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=(typeof n=="function"?n():n)||{}},at={namespaced:{configurable:!0}};at.namespaced.get=function(){return!!this._rawModule.namespaced};m.prototype.addChild=function(t,i){this._children[t]=i};m.prototype.removeChild=function(t){delete this._children[t]};m.prototype.getChild=function(t){return this._children[t]};m.prototype.hasChild=function(t){return t in this._children};m.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)};m.prototype.forEachChild=function(t){x(this._children,t)};m.prototype.forEachGetter=function(t){this._rawModule.getters&&x(this._rawModule.getters,t)};m.prototype.forEachAction=function(t){this._rawModule.actions&&x(this._rawModule.actions,t)};m.prototype.forEachMutation=function(t){this._rawModule.mutations&&x(this._rawModule.mutations,t)};Object.defineProperties(m.prototype,at);var b=function(t){this.register([],t,!1)};b.prototype.get=function(t){return t.reduce(function(i,n){return i.getChild(n)},this.root)};b.prototype.getNamespace=function(t){var i=this.root;return t.reduce(function(n,o){return i=i.getChild(o),n+(i.namespaced?o+"/":"")},"")};b.prototype.update=function(t){st([],this.root,t)};b.prototype.register=function(t,i,n){var o=this;n===void 0&&(n=!0);var r=new m(i,n);if(t.length===0)this.root=r;else{var a=this.get(t.slice(0,-1));a.addChild(t[t.length-1],r)}i.modules&&x(i.modules,function(s,c){o.register(t.concat(c),s,n)})};b.prototype.unregister=function(t){var i=this.get(t.slice(0,-1)),n=t[t.length-1],o=i.getChild(n);o&&o.runtime&&i.removeChild(n)};b.prototype.isRegistered=function(t){var i=this.get(t.slice(0,-1)),n=t[t.length-1];return i?i.hasChild(n):!1};function st(e,t,i){if(t.update(i),i.modules)for(var n in i.modules){if(!t.getChild(n))return;st(e.concat(n),t.getChild(n),i.modules[n])}}var p=function(t){var i=this;t===void 0&&(t={});var n=t.plugins;n===void 0&&(n=[]);var o=t.strict;o===void 0&&(o=!1);var r=t.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new b(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._scope=null,this._devtools=r;var a=this,s=this,c=s.dispatch,f=s.commit;this.dispatch=function(v,h){return c.call(a,v,h)},this.commit=function(v,h,lt){return f.call(a,v,h,lt)},this.strict=o;var l=this._modules.root.state;R(this,l,[],this._modules.root),M(this,l),n.forEach(function(u){return u(i)})},P={state:{configurable:!0}};p.prototype.install=function(t,i){t.provide(i||Qt,this),t.config.globalProperties.$store=this;var n=this._devtools!==void 0?this._devtools:!1;n&&ee(t,this)};P.state.get=function(){return this._state.data};P.state.set=function(e){};p.prototype.commit=function(t,i,n){var o=this,r=$(t,i,n),a=r.type,s=r.payload,c={type:a,payload:s},f=this._mutations[a];f&&(this._withCommit(function(){f.forEach(function(u){u(s)})}),this._subscribers.slice().forEach(function(l){return l(c,o.state)}))};p.prototype.dispatch=function(t,i){var n=this,o=$(t,i),r=o.type,a=o.payload,s={type:r,payload:a},c=this._actions[r];if(c){try{this._actionSubscribers.slice().filter(function(l){return l.before}).forEach(function(l){return l.before(s,n.state)})}catch{}var f=c.length>1?Promise.all(c.map(function(l){return l(a)})):c[0](a);return new Promise(function(l,u){f.then(function(v){try{n._actionSubscribers.filter(function(h){return h.after}).forEach(function(h){return h.after(s,n.state)})}catch{}l(v)},function(v){try{n._actionSubscribers.filter(function(h){return h.error}).forEach(function(h){return h.error(s,n.state,v)})}catch{}u(v)})})}};p.prototype.subscribe=function(t,i){return X(t,this._subscribers,i)};p.prototype.subscribeAction=function(t,i){var n=typeof t=="function"?{before:t}:t;return X(n,this._actionSubscribers,i)};p.prototype.watch=function(t,i,n){var o=this;return q(function(){return t(o.state,o.getters)},i,Object.assign({},n))};p.prototype.replaceState=function(t){var i=this;this._withCommit(function(){i._state.data=t})};p.prototype.registerModule=function(t,i,n){n===void 0&&(n={}),typeof t=="string"&&(t=[t]),this._modules.register(t,i),R(this,this.state,t,this._modules.get(t),n.preserveState),M(this,this.state)};p.prototype.unregisterModule=function(t){var i=this;typeof t=="string"&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=G(i.state,t.slice(0,-1));delete n[t[t.length-1]]}),tt(this)};p.prototype.hasModule=function(t){return typeof t=="string"&&(t=[t]),this._modules.isRegistered(t)};p.prototype.hotUpdate=function(t){this._modules.update(t),tt(this,!0)};p.prototype._withCommit=function(t){var i=this._committing;this._committing=!0,t(),this._committing=i};Object.defineProperties(p.prototype,P);var se=le(function(e,t){var i={};return ce(t).forEach(function(n){var o=n.key,r=n.val;i[o]=function(){var s=this.$store.state,c=this.$store.getters;if(e){var f=ue(this.$store,"mapState",e);if(!f)return;s=f.context.state,c=f.context.getters}return typeof r=="function"?r.call(this,s,c):s[r]},i[o].vuex=!0}),i});function ce(e){return de(e)?Array.isArray(e)?e.map(function(t){return{key:t,val:t}}):Object.keys(e).map(function(t){return{key:t,val:e[t]}}):[]}function de(e){return Array.isArray(e)||Y(e)}function le(e){return function(t,i){return typeof t!="string"?(i=t,t=""):t.charAt(t.length-1)!=="/"&&(t+="/"),e(t,i)}}function ue(e,t,i){var n=e._modulesNamespaceMap[i];return n}const fe={components:{...se({firstName:e=>e.user.firstName,phoneNumber:e=>e.user.phoneNumber,email:e=>e.user.email,password:e=>e.user.password})},methods:{emitCloseEventReg(){this.$emit("closeFormRegistration")},emitOpenEvent(){this.$emit("openButtonLog")}}},y=e=>(T("data-v-3ab4baf4"),e=e(),k(),e),he={action:"#",class:"container"},ve={class:"close-button"},pe=y(()=>d("div",{id:"registration"},[d("h1",null," Регистрация ")],-1)),me=y(()=>d("input",{class:"inputs",id:"email",name:"email",type:"text",placeholder:"Почта",pattern:".*[^@]+@[^@]+.*",title:"Введите существующий ваш адрес электронной почты",oninvalid:"this.setCustomValidity('Введите существующий адрес электронной почты')",oninput:"this.setCustomValidity('')"},null,-1)),_e=y(()=>d("input",{class:"inputs",id:"password",name:"password",type:"text",placeholder:"Пароль*",pattern:"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*",title:"Пароль должен состоять как минимум из 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру или специальный символ (?![.\\n]). Используйте только латинские буквы, цифры или специальные символы",required:""},null,-1)),ge=y(()=>d("input",{class:"inputs",id:"confirmationPassword",name:"password",type:"text",placeholder:"Подтвердите пароль*",pattern:"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*",title:"Пароль должен состоять как минимум из 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру или специальный символ (?![.\\n]). Используйте только латинские буквы, цифры или специальные символы",required:""},null,-1)),be=y(()=>d("div",{id:"login"}," Уже есть аккаунт? ",-1)),ye={id:"regAndLog"},we=y(()=>d("button",{id:"ButtonCont"}," Продолжить ",-1)),Oe=y(()=>d("div",{id:"privacyPolicy"},[I(" При регистрации и входе вы соглашаетесь "),d("a",{href:"#",class:"link"},"с условиями использования Swipe Up"),d("br"),I(" и "),d("a",{href:"#",class:"link"},"политикой конфиденциальности")],-1));function Se(e,t,i,n,o,r){return _(),g("form",he,[d("div",ve,[d("img",{src:Z,alt:"close",onClick:t[0]||(t[0]=(...a)=>r.emitCloseEventReg&&r.emitCloseEventReg(...a))})]),pe,V(d("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>e.firstName=a),class:"inputs",id:"first_name",name:"first_name",type:"text",placeholder:"Ваше имя*",pattern:"[а-яА-ЯёЁ]{2,}",title:"Используйте только кириллицу",required:""},null,512),[[D,e.firstName]]),V(d("input",{"onUpdate:modelValue":t[2]||(t[2]=a=>e.phoneNumber=a),class:"inputs",id:"number",name:"number",type:"text",placeholder:"Телефон*",pattern:"^[+]?[0-9]{9,}$",title:"Введите ваш номер телефона",required:""},null,512),[[D,e.phoneNumber]]),me,_e,ge,be,d("div",ye,[d("button",{id:"ButtonLog",onClick:t[3]||(t[3]=(...a)=>r.emitOpenEvent&&r.emitOpenEvent(...a))}," Войти "),we]),Oe])}const ct=E(fe,[["render",Se],["__scopeId","data-v-3ab4baf4"]]),Ce={components:{LoginForm:J,RegistrationForm:ct},data(){return{showOverlay:!1,showForm:!1,showOverlayReg:!1,showFormReg:!1}},methods:{toggleLoginForm(){this.showOverlay=!this.showOverlay,this.showForm=!this.showForm},toggleRegForm(){this.showOverlayReg=!this.showOverlayReg,this.showFormReg=!this.showFormReg}}},dt=e=>(T("data-v-15546a74"),e=e(),k(),e),xe={class:"scroll"},Ee=dt(()=>d("a",{href:"./index.html",class:"logo"},"Swipe Up",-1)),Le=dt(()=>d("form",{class:"search"},[d("input",{id:"search_text",type:"text",placeholder:"Найти..."}),d("button",{id:"search_button",type:"submit"})],-1)),Ie={class:"buttons"},$e=z('<div class="dropdown" data-v-15546a74><button class="button-catalog" id="main-category" data-v-15546a74> Категории </button><div class="dropdown-content" id="dropdown-content" data-v-15546a74><div class="dropdown-mini" id="dropdown-mini-4" data-v-15546a74><a href="#" id="chapter-4" data-v-15546a74>Для детей</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Одежда</a><a href="#" id="chapter-min-2" data-v-15546a74>Обувь</a><a href="#" id="chapter-min-3" data-v-15546a74>Мебель</a><a href="#" id="chapter-min-4" data-v-15546a74>Игрушки</a><a href="#" id="chapter-min-5" data-v-15546a74>Коляски</a><a href="#" id="chapter-min-6" data-v-15546a74>Спорт</a><a href="#" id="chapter-min-7" data-v-15546a74>Электроника</a><a href="#" id="chapter-min-8" data-v-15546a74>Автокресла и стульчики</a><a href="#" id="chapter-min-9" data-v-15546a74>Косметика и гигиена</a></div></div><div class="dropdown-mini" id="dropdown-mini-1" data-v-15546a74><a href="#" id="chapter-1" data-v-15546a74>Одежда, обувь, аксессуары</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Скоро</a></div></div><div class="dropdown-mini" id="dropdown-mini-2" data-v-15546a74><a href="#" id="chapter-2" data-v-15546a74>Хобби и отдых</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Скоро</a></div></div><div class="dropdown-mini" id="dropdown-mini-3" data-v-15546a74><a href="#" id="chapter-3" data-v-15546a74>Красота и здоровье</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Скоро</a></div></div><div class="dropdown-mini" id="dropdown-mini-5" data-v-15546a74><a href="#" id="chapter-5" data-v-15546a74>Для дома и дачи</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Скоро</a></div></div><div class="dropdown-mini" id="dropdown-mini-6" data-v-15546a74><a href="#" id="chapter-6" data-v-15546a74>Электроника</a><div class="dropdown-content-mini" id="dropdown-content-mini" data-v-15546a74><a href="#" id="chapter-min-1" data-v-15546a74>Скоро</a></div></div></div></div>',1);function Te(e,t,i,n,o,r){const a=J,s=ct;return _(),g("header",xe,[Ee,Le,d("div",Ie,[$e,d("button",{class:"button-login",onClick:t[0]||(t[0]=(...c)=>r.toggleLoginForm&&r.toggleLoginForm(...c))}," Войти "),o.showOverlay?(_(),g("div",{key:0,class:"overlay",onClick:t[1]||(t[1]=(...c)=>r.toggleLoginForm&&r.toggleLoginForm(...c))})):L("",!0),o.showForm?(_(),B(a,{key:1,onCloseForm:r.toggleLoginForm,onOpenButtonReg:t[2]||(t[2]=()=>{r.toggleLoginForm(),r.toggleRegForm()})},null,8,["onCloseForm"])):L("",!0),d("button",{class:"button-register",onClick:t[3]||(t[3]=(...c)=>r.toggleRegForm&&r.toggleRegForm(...c))}," Регистрация "),o.showOverlayReg?(_(),g("div",{key:2,class:"overlay",onClick:t[4]||(t[4]=(...c)=>r.toggleRegForm&&r.toggleRegForm(...c))})):L("",!0),o.showFormReg?(_(),B(s,{key:3,onCloseFormRegistration:r.toggleRegForm,onOpenButtonLog:t[5]||(t[5]=()=>{r.toggleRegForm(),r.toggleLoginForm()})},null,8,["onCloseFormRegistration"])):L("",!0)])])}const ke=E(Ce,[["render",Te],["__scopeId","data-v-15546a74"]]),Re={},Ae=z('<div class="post" data-v-9d29fc45><div class="content" data-v-9d29fc45><p class="txt1" data-v-9d29fc45> Накопилось много ненужных вещей? </p><p class="txt2" data-v-9d29fc45> Обменяй их на нужные со Swipe Up </p><button class="button-place" data-v-9d29fc45> Разместить объявление </button></div><hr class="hr-line" data-v-9d29fc45></div><div class="how" data-v-9d29fc45><div class="txt" data-v-9d29fc45><p class="txt1" data-v-9d29fc45> Как это работает? </p><button class="button-more" data-v-9d29fc45> Узнать больше → </button></div><div class="guide" data-v-9d29fc45><div class="container" id="container1" data-v-9d29fc45><p class="txt_guide" data-v-9d29fc45> 1. Создайте объявление </p></div><div class="container" id="container2" data-v-9d29fc45><p class="txt_guide" data-v-9d29fc45> 2. Дождитесь, когда вашей вешью заинтересуются </p></div><div class="container" id="container3" data-v-9d29fc45><p class="txt_guide" data-v-9d29fc45> 3. Обменяйтесь </p></div></div></div><hr class="hr-line" data-v-9d29fc45>',3),Ne=[Ae];function Fe(e,t){return _(),g("div",null,Ne)}const je=E(Re,[["render",Fe],["__scopeId","data-v-9d29fc45"]]),Ge=Q({__name:"index",setup(e){return(t,i)=>{const n=Lt,o=_t("server-only");return _(),g("div",null,[w(n,null,{default:A(()=>[w(ke)]),_:1}),w(o,null,{default:A(()=>[w(je)]),_:1}),w(o,null,{default:A(()=>[w(At)]),_:1})])}}});export{Ge as default};
