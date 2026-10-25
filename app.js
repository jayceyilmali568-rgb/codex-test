import {labels,calculate} from './relations.js';
let path=[];
const $=id=>document.getElementById(id);
function render(){
 $('path').textContent=['我',...path.map(k=>labels[k])].join(' → ');
 $('result').textContent=calculate(path,$('gender').value)??'暂未收录这个关系';
 $('back').disabled=path.length===0;
}
for(const [key,label] of Object.entries(labels)){
 const button=document.createElement('button');button.textContent=label;
 button.addEventListener('click',()=>{path.push(key);render();});$('keys').append(button);
}
$('back').onclick=()=>{path.pop();render();};
$('reset').onclick=()=>{path=[];render();};
$('gender').onchange=render;
document.querySelectorAll('[data-example]').forEach(button=>button.onclick=()=>{path=button.dataset.example.split(',');render();});
render();
