import{d as y,a as i,a8 as _,y as V,r as m,o as k,f as p,t as w,C as B,j as s,w as E,u as F,aF as N,p as T}from"./index-a53015c3.js";import{_ as D}from"./_plugin-vue_export-helper-361d09b5.js";const q={class:"card filter"},A={key:0,class:"title sle"},R=y({name:"TreeFilter"}),S=y({...R,props:{requestApi:null,data:null,title:null,id:{default:"id"},label:{default:"label"},multiple:{type:Boolean,default:!1},defaultValue:null},emits:["change"],setup(l,{emit:f}){const t=l,v={children:"children",label:t.label},d=i(""),r=i(),o=i([]);_(async()=>{var a;if((a=t.data)!=null&&a.length)return o.value=t.data;const{data:e}=await t.requestApi();if(t.multiple)return o.value=e;o.value=[{id:"",[t.label]:"\u5168\u90E8"},...e]}),V(d,e=>{r.value.filter(e)});const x=(e,a,n)=>{if(!e)return!0;let c=n.parent,u=[n.label],h=1;for(;h<n.level;)u=[...u,c.label],c=c.parent,h++;return u.some(C=>C.indexOf(e)!==-1)},b=e=>{t.multiple||f("change",e[t.id])},g=()=>{var e;f("change",(e=r.value)==null?void 0:e.getCheckedKeys())};return(e,a)=>{const n=m("el-input"),c=m("el-scrollbar");return k(),p("div",q,[l.title?(k(),p("h4",A,w(l.title),1)):B("",!0),s(n,{modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=u=>d.value=u),placeholder:"\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4",clearable:""},null,8,["modelValue"]),s(c,{style:T({height:l.title?"calc(100% - 95px)":"calc(100% - 56px)"})},{default:E(()=>[s(F(N),{ref_key:"treeRef",ref:r,"default-expand-all":"","node-key":l.id,data:o.value,"show-checkbox":l.multiple,"check-strictly":!1,"current-node-key":l.multiple?"":l.defaultValue,"highlight-current":!l.multiple,"expand-on-click-node":!1,"check-on-click-node":l.multiple,props:v,"filter-node-method":x,"default-checked-keys":l.multiple?l.defaultValue:[],onNodeClick:b,onCheck:g},null,8,["node-key","data","show-checkbox","current-node-key","highlight-current","check-on-click-node","default-checked-keys"])]),_:1},8,["style"])])}}});const I=D(S,[["__scopeId","data-v-395f0a57"]]);export{I as T};
