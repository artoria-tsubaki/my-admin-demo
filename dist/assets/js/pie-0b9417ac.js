import{i as c,u as f}from"./useEcharts-91eba740.js";import{d as n,a,o as u,f as p}from"./index-be918a25.js";import{_}from"./_plugin-vue_export-helper-361d09b5.js";const y=n({name:"pie"}),h=n({...y,setup(x,{expose:s}){const i=a();return s({initChart:e=>{const l=c(i.value);f(l,{title:{text:"Gitee / GitHub",subtext:"\u8BBF\u95EE\u5360\u6BD4",left:"56%",top:"45%",textAlign:"center",textStyle:{fontSize:18,color:"#767676"},subtextStyle:{fontSize:15,color:"#a1a1a1"}},tooltip:{trigger:"item"},legend:{top:"4%",left:"2%",orient:"vertical",icon:"circle",align:"left",itemGap:20,textStyle:{fontSize:13,color:"#a1a1a1",fontWeight:500},formatter:function(o){let r="";for(let t=0;t<e.length;t++){if(e[t].name==o&&e[t].value>=1e4)return r=(e[t].value/1e4).toFixed(2),o+"      "+r+"w";if(e[t].name==o)return r=e[t].value,o+"      "+r}return""}},series:[{type:"pie",radius:["70%","40%"],center:["57%","52%"],silent:!0,clockwise:!0,startAngle:150,data:e,labelLine:{length:80,length2:30,lineStyle:{width:1}},label:{position:"outside",show:!0,formatter:"{d}%",fontWeight:400,fontSize:19,color:"#a1a1a1"},color:[{type:"linear",x:0,y:0,x2:.5,y2:1,colorStops:[{offset:0,color:"#feb791"},{offset:1,color:"#fe8b4c"}]},{type:"linear",x:0,y:0,x2:1,y2:.5,colorStops:[{offset:0,color:"#b898fd"},{offset:1,color:"#8347fd"}]}]}]})}}),(e,l)=>(u(),p("div",{ref_key:"echartsRef",ref:i,class:"echarts"},null,512))}});const b=_(h,[["__scopeId","data-v-cf734134"]]);export{b as default};
