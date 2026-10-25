import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from './relations.js';
test('直系及姻亲称呼',()=>{
 for(const [path,expected] of [['f.f','爷爷'],['m.m','外婆'],['f.lb.w','婶婶'],['h.m','婆婆'],['os.s','外甥'],['d.d','外孙女']]) assert.equal(calculate(path.split('.')),expected);
});
test('堂表亲保留年龄不确定性',()=>{
 assert.equal(calculate(['f','ob','s']),'堂兄弟（年长称哥，年幼称弟）');
 assert.equal(calculate(['m','os','d']),'表姐妹（年长称姐，年幼称妹）');
});
test('关系简化和性别',()=>{
 assert.equal(calculate(['f','w','f']),'外公');
 assert.equal(calculate(['s','m'],'f'),'自己');
 assert.equal(calculate(['d','f'],'m'),'自己');
 assert.equal(calculate(['ob','m']),'妈妈');
});
test('空关系与未收录关系',()=>{
 assert.equal(calculate([]),'自己');
 assert.equal(calculate(['f','f','f','f']),null);
});
