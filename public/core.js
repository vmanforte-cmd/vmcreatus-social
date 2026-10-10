'use strict';
window.Social = (() => {
  const KEY = 'vmcreatus-social-v2';
  const NETWORKS = ['Instagram', 'TikTok', 'Kwai'];
  const FORMATS = ['Vídeo vertical', 'Imagem', 'Carrossel'];
  const STEPS = [
    ['identidade', 'Identidade pronta', 'Defina foto, bio, proposta e link do perfil.'],
    ['seguranca', 'Segurança revisada', 'Confira recuperação de acesso e autenticação em dois fatores na rede.'],
    ['publico', 'Público e nicho definidos', 'Registre para quem a conta cria conteúdo e qual problema resolve.'],
    ['acervo', 'Conteúdos originais preparados', 'Prepare materiais próprios e confira as autorizações de uso.'],
    ['rotina', 'Rotina editorial definida', 'Escolha uma frequência sustentável para sua produção.'],
    ['revisao', 'Primeiros resultados revisados', 'Registre aprendizados e ajuste o próximo ciclo de conteúdo.']
  ];
  const blank = () => ({version:2, posts:[], profiles:[], accounts:[], ideas:[], results:[], brand:{name:'VMCreatus',niche:'',audience:'',tone:'Direto e acolhedor',goal:'Gerar contatos',offer:'',cta:'',region:'Brasil'}, replyTemplate:''});
  const uid = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2);
  function str(v,max=5000){if(typeof v !== 'string'||v.length>max)throw Error('Texto inválido ou acima do limite no backup.');return v;}
  function req(v,max){const t=str(v,max).trim();if(!t)throw Error('Há campos obrigatórios vazios.');return t;}
  function choice(v,options){if(!options.includes(v))throw Error('Opção inválida no backup.');return v;}
  function list(v,max=10000){if(!Array.isArray(v)||v.length>max)throw Error('Lista inválida ou acima do limite.');return v;}
  function validDate(value,time=false){if(!value)return '';str(value,30);const re=time?/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/:/^\d{4}-\d{2}-\d{2}$/;if(!re.test(value)||isNaN(Date.parse(value)))throw Error('Data inválida.');const d=new Date(value.slice(0,10)+'T12:00:00');if(d.getFullYear()!==Number(value.slice(0,4))||d.getMonth()+1!==Number(value.slice(5,7))||d.getDate()!==Number(value.slice(8,10)))throw Error('Data inválida.');return value;}
  function safeURL(v){str(v,2000);if(!v)return '';let u;try{u=new URL(v)}catch{throw Error('Informe um link completo começando com https://.')}if(u.protocol!=='https:'||u.username||u.password)throw Error('Use um link HTTPS sem credenciais.');return u.href;}
  function normalize(raw){
    if(!raw||![1,2].includes(raw.version))throw Error('Versão de backup não reconhecida.');
    const s=blank(),seen=new Set();
    const identity=v=>{const n=typeof v==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(v)?v:uid();if(seen.has(n))throw Error('Identificadores duplicados no backup.');seen.add(n);return n};
    s.posts=list(raw.posts).map(p=>({id:identity(p.id),title:req(p.title,160),caption:str(p.caption),network:choice(p.network,NETWORKS),format:choice(p.format,FORMATS),date:validDate(p.date,true),accountId:typeof p.accountId==='string'?p.accountId:'',pillar:choice(p.pillar||'Educativo',['Educativo','Demonstração','Relacionamento','Oferta']),status:choice(p.status||'Rascunho',['Rascunho','Em revisão','Aprovado'])}));
    s.profiles=list(raw.profiles,1000).map(p=>({id:identity(p.id),name:req(p.name,100),bio:str(p.bio,1000),network:choice(p.network,NETWORKS)}));
    if(raw.version===1)return s;
    const b=raw.brand||{};for(const k of Object.keys(s.brand))s.brand[k]=str(b[k]??s.brand[k],k==='offer'?2000:500);
    s.replyTemplate=str(raw.replyTemplate||'',2000);
    s.accounts=list(raw.accounts,500).map(a=>({id:identity(a.id),name:req(a.name,100),handle:req(a.handle,100),network:choice(a.network,NETWORKS),niche:str(a.niche,300),goal:str(a.goal,300),start:validDate(a.start),weekly:Math.max(1,Math.min(14,Number(a.weekly)||3)),paused:!!a.paused,notes:str(a.notes,2000),checks:STEPS.filter(([k])=>Array.isArray(a.checks)&&a.checks.includes(k)).map(([k])=>k)}));
    s.ideas=list(raw.ideas,2000).map(i=>({id:identity(i.id),title:req(i.title,160),network:choice(i.network,NETWORKS),url:safeURL(i.url),niche:str(i.niche,300),hook:str(i.hook,1000),notes:str(i.notes,2000),stage:choice(i.stage,['Referência','Sinal observado','Sempre relevante']),observed:validDate(i.observed),created:str(i.created||'',50)}));
    s.results=list(raw.results).map(r=>{const metrics={};for(const k of ['views','likes','comments','shares','clicks','leads','sales']){const n=Number(r[k]);if(!Number.isSafeInteger(n)||n<0)throw Error('Métrica inválida.');metrics[k]=n}return{id:identity(r.id),title:req(r.title,160),network:choice(r.network,NETWORKS),accountId:str(r.accountId||'',100),date:validDate(r.date),...metrics}});
    const accounts=new Map(s.accounts.map(a=>[a.id,a]));for(const p of [...s.posts,...s.results])if(p.accountId&&accounts.get(p.accountId)?.network!==p.network)p.accountId='';
    return s;
  }
  let state=blank(),error='';
  try{const raw=localStorage.getItem(KEY);const legacy=localStorage.getItem('vmcreatus-social-v1');if(raw)state=normalize(JSON.parse(raw));else if(legacy){state=normalize({version:1,...JSON.parse(legacy)});localStorage.setItem(KEY,JSON.stringify(state));}}catch{error='Não foi possível carregar seus dados. O armazenamento original foi preservado. Exporte-o em Configurações antes de continuar.';}
  function persist(next){const clean=normalize(next);localStorage.setItem(KEY,JSON.stringify(clean));state=clean;return state;}
  function progress(a){return Math.round(a.checks.length/STEPS.length*100)}
  function phase(a){if(a.paused)return 'Pausada';const n=a.checks.length;return n===STEPS.length?'Ciclo revisado':n>=4?'Publicação e análise':n>=2?'Preparação de conteúdo':'Configuração do perfil'}
  return {KEY,NETWORKS,FORMATS,STEPS,blank,uid,normalize,safeURL,validDate,progress,phase,get:()=>state,persist,get loadError(){return error},clearLoadError:()=>{error=''}};
})();
