export const labels = {f:'爸爸',m:'妈妈',h:'丈夫',w:'妻子',ob:'哥哥',lb:'弟弟',os:'姐姐',ls:'妹妹',s:'儿子',d:'女儿'};
const names = {
'':'自己', f:'爸爸',m:'妈妈',h:'丈夫',w:'妻子',ob:'哥哥',lb:'弟弟',os:'姐姐',ls:'妹妹',s:'儿子',d:'女儿',
'f.f':'爷爷','f.m':'奶奶','m.f':'外公','m.m':'外婆',
'f.ob':'伯父','f.lb':'叔叔','f.os':'姑妈','f.ls':'姑妈','m.ob':'舅舅','m.lb':'舅舅','m.os':'姨妈','m.ls':'姨妈',
'f.ob.w':'伯母','f.lb.w':'婶婶','f.os.h':'姑父','f.ls.h':'姑父','m.ob.w':'舅妈','m.lb.w':'舅妈','m.os.h':'姨父','m.ls.h':'姨父',
'ob.w':'嫂子','lb.w':'弟媳','os.h':'姐夫','ls.h':'妹夫',
'h.f':'公公','h.m':'婆婆','w.f':'岳父','w.m':'岳母',
's.w':'儿媳','d.h':'女婿','s.s':'孙子','s.d':'孙女','d.s':'外孙','d.d':'外孙女',
'ob.s':'侄子','lb.s':'侄子','ob.d':'侄女','lb.d':'侄女','os.s':'外甥','ls.s':'外甥','os.d':'外甥女','ls.d':'外甥女',
'f.f.f':'曾祖父','f.f.m':'曾祖母','m.f.f':'外曾祖父','m.f.m':'外曾祖母',
'h.ob':'大伯子','h.lb':'小叔子','h.os':'大姑子','h.ls':'小姑子','w.ob':'大舅子','w.lb':'小舅子','w.os':'大姨子','w.ls':'小姨子'
};
export function calculate(path, gender='m') {
 const p=[...path];
 // The spouse of a parent is assumed to be the other parent.
 for(let i=0;i<p.length-1;i++) {
  if(p[i]==='f'&&p[i+1]==='w') {p.splice(i,2,'m');i=-1;}
  else if(p[i]==='m'&&p[i+1]==='h') {p.splice(i,2,'f');i=-1;}
 }
 if(p.length===2&&['ob','lb','os','ls'].includes(p[0])&&['f','m'].includes(p[1])) return labels[p[1]];
 if(p.length===2&&((p[0]==='h'&&p[1]==='w')||(p[0]==='w'&&p[1]==='h'))) return '自己';
 if(p.length===2&&['s','d'].includes(p[0])&&p[1]===(gender==='m'?'f':'m')) return '自己';
 const key=p.join('.');
 if(names[key]) return names[key];
 if(p.length===3&&['s','d'].includes(p[2])) {
  const paternal=p[0]==='f'&&['ob','lb'].includes(p[1]);
  const maternal=(p[0]==='m'&&['ob','lb','os','ls'].includes(p[1]))||(p[0]==='f'&&['os','ls'].includes(p[1]));
  if(paternal||maternal) return (paternal?'堂':'表')+(p[2]==='s'?'兄弟（年长称哥，年幼称弟）':'姐妹（年长称姐，年幼称妹）');
 }
 return null;
}
