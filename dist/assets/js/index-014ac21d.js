import{d as v,a as V,U as C,r,o as u,f,j as t,w as a,l as i,Q as F,R as w,c as D,k as N,V as R}from"./index-be918a25.js";import{_ as U}from"./_plugin-vue_export-helper-361d09b5.js";const B={class:"card content-box"},$=v({name:"dynamicForm"}),q=v({...$,setup(E){const d=V(),l=C({domains:[{key:1,value:""}],email:""}),y=()=>{l.domains.push({key:Date.now(),value:""})},b=o=>{const e=l.domains.indexOf(o);e!==-1&&l.domains.splice(e,1)},g=o=>{!o||o.validate(e=>{if(e)console.log("submit!"),R({title:"\u6570\u636E",message:JSON.stringify(l),type:"success"});else return console.log("error submit"),!1})},k=o=>{!o||o.resetFields()};return(o,e)=>{const s=r("el-button"),c=r("el-input"),m=r("el-form-item"),x=r("el-form");return u(),f("div",B,[t(s,{class:"add",type:"primary",onClick:y,plain:""},{default:a(()=>[i("Add Input")]),_:1}),t(x,{ref_key:"formRef",ref:d,model:l,"label-width":"100px",class:"demo-dynamic"},{default:a(()=>[t(m,{prop:"email",label:"Email",rules:[{required:!0,message:"Please input email address",trigger:"blur"},{type:"email",message:"Please input correct email address",trigger:["blur","change"]}]},{default:a(()=>[t(c,{modelValue:l.email,"onUpdate:modelValue":e[0]||(e[0]=n=>l.email=n)},null,8,["modelValue"])]),_:1}),(u(!0),f(F,null,w(l.domains,(n,p)=>(u(),D(m,{key:n.key,label:"Domain"+p,prop:"domains."+p+".value",rules:{required:!0,message:"domain can not be null",trigger:"blur"}},{default:a(()=>[t(c,{modelValue:n.value,"onUpdate:modelValue":_=>n.value=_},{append:a(()=>[t(s,{type:"danger",plain:"",class:"mt-2",onClick:N(_=>b(n),["prevent"])},{default:a(()=>[i("Delete")]),_:2},1032,["onClick"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label","prop"]))),128)),t(m,null,{default:a(()=>[t(s,{type:"primary",onClick:e[1]||(e[1]=n=>g(d.value))},{default:a(()=>[i("Submit")]),_:1}),t(s,{onClick:e[2]||(e[2]=n=>k(d.value))},{default:a(()=>[i("Reset")]),_:1})]),_:1})]),_:1},8,["model"])])}}});const P=U(q,[["__scopeId","data-v-eb264601"]]);export{P as default};