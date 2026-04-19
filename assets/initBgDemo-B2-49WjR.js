const ne={FLYING:120,GATHERING:300,FORMED:300,DISPERSING:100},dt=["FLYING","GATHERING","FORMED","DISPERSING"];function Ce(et,X,o,oe){let M=X.clientWidth,m=X.clientHeight;const P=Math.min(window.devicePixelRatio,2),p=Math.min(M,m)*.55,R=0,ft=t=>(t/360-.5)*p+R,ut=t=>-(t/360-.5)*p,h=new o.WebGLRenderer({canvas:et,antialias:!1});h.outputColorSpace="srgb-linear",h.setClearColor(new o.Color(1580074),1),h.clear(),h.setPixelRatio(P),h.setSize(M,m),h.autoClear=!1;function Pt(){return new o.WebGLRenderTarget(M*P,m*P,{minFilter:o.LinearFilter,magFilter:o.LinearFilter,format:o.RGBAFormat})}let y=Pt(),S=Pt();const At=new o.OrthographicCamera(-1,1,1,-1,0,1),at=new o.PlaneGeometry(2,2),Mt=new o.MeshBasicMaterial({map:S.texture,depthTest:!1}),Nt=new o.Scene;Nt.add(new o.Mesh(at,Mt));const mt=new o.MeshBasicMaterial({color:1580074,transparent:!0,opacity:.12,depthTest:!1,depthWrite:!1}),Gt=new o.Scene;Gt.add(new o.Mesh(at,mt));const vt=new o.MeshBasicMaterial({map:y.texture,depthTest:!1}),Lt=new o.Scene;Lt.add(new o.Mesh(at,vt));const Ft=new o.Color(1580074);h.setClearColor(Ft,1),h.setRenderTarget(y),h.clear(),h.setRenderTarget(S),h.clear(),h.setRenderTarget(null),h.clear();const w=new o.OrthographicCamera(-M/2,M/2,m/2,-m/2,.1,2e3);w.position.set(0,0,500);const W=new o.Scene,zt=new o.Scene;let D=[],Ot=0,I=[];const j=[[],[],[],[]];let k=0;function K(){const t=[],a=p/2;for(let s=-a;s<=a;s+=5)for(let i=-a;i<=a;i+=5)i*i+s*s<=a*a&&t.push({x:i+R,y:s});return t}function nt(){I.length&&gt.forEach((t,a)=>{const s=I[a%I.length];t.tx=s.x,t.ty=s.y,t.tz=0})}function se(t){const a=document.createElement("canvas");a.width=a.height=360;const s=a.getContext("2d");s.drawImage(t,0,0,360,360);let i=[];try{const{data:f}=s.getImageData(0,0,360,360),l=360,e=(r,c)=>f[(c*l+r)*4+3],n=(r,c)=>{const A=(c*l+r)*4;return f[A+3]<30?-1:f[A]*.299+f[A+1]*.587+f[A+2]*.114},d=new Float32Array(l*l),v=new Float32Array(l*l),g=new Float32Array(l*l);for(let r=1;r<l-1;r++)for(let c=1;c<l-1;c++){if(e(c,r)<30)continue;const A=[n(c-1,r-1),n(c,r-1),n(c+1,r-1),n(c-1,r),n(c+1,r),n(c-1,r+1),n(c,r+1),n(c+1,r+1)];if(A.some(q=>q<0))continue;const x=-A[0]-2*A[3]-A[5]+A[2]+2*A[4]+A[7],b=-A[0]-2*A[1]-A[2]+A[5]+2*A[6]+A[7],G=Math.sqrt(x*x+b*b);d[r*l+c]=G,v[r*l+c]=x,g[r*l+c]=b}for(let r=1;r<l-1;r++)for(let c=1;c<l-1;c++){if(e(c,r)>=30&&(e(c-1,r)<30||e(c+1,r)<30||e(c,r-1)<30||e(c,r+1)<30)){i.push({x:ft(c),y:ut(r)}),i.push({x:ft(c),y:ut(r)});continue}const x=d[r*l+c];if(x<26)continue;const b=Math.sqrt(v[r*l+c]**2+g[r*l+c]**2)||1,G=v[r*l+c]/b,q=g[r*l+c]/b,H=Math.round(c+G),tt=Math.round(r+q),_t=Math.round(c-G),bt=Math.round(r-q),pe=H>=0&&H<l&&tt>=0&&tt<l?d[tt*l+H]:0,Se=_t>=0&&_t<l&&bt>=0&&bt<l?d[bt*l+_t]:0;x>=pe&&x>=Se&&i.push({x:ft(c),y:ut(r)})}}catch{return K()}if(i.length<80)return K();for(let f=i.length-1;f>0;f--){const l=Math.floor(Math.random()*(f+1));[i[f],i[l]]=[i[l],i[f]]}return i}["/assets/image/logo-v4.png","/assets/image/logo-v3.png","/assets/image/logo-v2.png","/assets/image/logo-v5.png"].forEach((t,a)=>{const s=new Image;s.onload=()=>{j[a]=se(s),a===0&&(I=j[0],k=1,nt())},s.onerror=()=>{j[a]=K()},s.src=t});function re(){const t=Math.random()*Math.PI*2,a=.15+Math.random()*.35,s=I.length?I[Math.floor(Math.random()*I.length)]:{x:0,y:0};return{x:(Math.random()-.5)*M,y:(Math.random()-.5)*m,z:(Math.random()-.5)*300,vx:Math.cos(t)*a,vy:Math.sin(t)*a,vz:(Math.random()-.5)*.3,tx:s.x,ty:s.y,tz:0,spd:5+Math.random()*6,sz:.35+Math.random()*.25}}I=K(),k=0;const gt=Array.from({length:1e3},re);nt();const xt=Array.from({length:40},()=>{const t=(Math.random()-.5)*M*1.3,a=(Math.random()-.5)*m*1.3;return{x:t,y:a,ox:t,oy:a,vx:0,vy:0,z:-300+Math.random()*200,radius:1+Math.random()*1.5,alpha:.3+Math.random()*.45,phase:Math.random()*Math.PI*2}}),ot=new Float32Array(1e3*3),Tt=new Float32Array(1e3),L=new Float32Array(1e3).fill(1),F=new o.BufferGeometry;F.setAttribute("position",new o.BufferAttribute(ot,3)),F.setAttribute("aSize",new o.BufferAttribute(Tt,1)),F.setAttribute("aAlpha",new o.BufferAttribute(L,1));const yt=new o.ShaderMaterial({uniforms:{uPhaseT:{value:0},uDPR:{value:P}},vertexShader:`
      attribute float aSize;
      attribute float aAlpha;
      uniform float uDPR;
      varying float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        float depth = 1.0 + position.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
        vAlpha = aAlpha;
      }
    `,fragmentShader:`
      uniform float uPhaseT;
      varying float vAlpha;

      void main() {
        if (uPhaseT < 0.0) discard;
        if (vAlpha < 0.01) discard;

        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        vec3 jade    = vec3(0.20, 1.00, 0.65);
        vec3 emerald = vec3(0.00, 1.00, 0.55);

        vec3  col;
        float alpha;

        if (uPhaseT >= 2.0) {
          col   = r < 0.22 ? emerald : jade;
          alpha = r < 0.22 ? 1.00 : 0.95;
        } else {
          col   = jade;
          alpha = 0.95;
        }

        gl_FragColor = vec4(col, alpha * vAlpha);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),ie=new o.Points(F,yt);W.add(ie);const z=new Float32Array(1e3*6),O=new Float32Array(1e3*6),J=new Float32Array(1e3*2),T=new o.BufferGeometry;T.setAttribute("position",new o.BufferAttribute(z,3)),T.setAttribute("aColor",new o.BufferAttribute(O,3)),T.setAttribute("aAlpha",new o.BufferAttribute(J,1));const Bt=new o.ShaderMaterial({vertexShader:`
      attribute vec3  aColor;
      attribute float aAlpha;
      varying   vec3  vColor;
      varying   float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vColor = aColor;
        vAlpha = aAlpha;
      }
    `,fragmentShader:`
      varying vec3  vColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),le=new o.LineSegments(T,Bt);W.add(le);const st=new Float32Array(120),Dt=new Float32Array(40),Ut=new Float32Array(40),B=new o.BufferGeometry;B.setAttribute("position",new o.BufferAttribute(st,3)),B.setAttribute("aSize",new o.BufferAttribute(Dt,1)),B.setAttribute("aAlpha",new o.BufferAttribute(Ut,1));const Rt=new o.ShaderMaterial({uniforms:{uDPR:{value:P}},vertexShader:`
      attribute float aSize;
      attribute float aAlpha;
      uniform   float uDPR;
      varying   float vAlpha;

      void main() {
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uDPR;
        vAlpha       = aAlpha;
      }
    `,fragmentShader:`
      varying float vAlpha;

      void main() {
        vec2  uv = gl_PointCoord - 0.5;
        float r  = length(uv);
        if (r > 0.5) discard;
        float glow = 1.0 - r * 2.0;
        gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha * glow * glow);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),ce=new o.Points(B,Rt);W.add(ce);const It=48,he=8,rt=new Float32Array(It*3);for(let t=0;t<It;t++){const a=t/It*Math.PI*2;rt[t*3]=Math.cos(a),rt[t*3+1]=Math.sin(a),rt[t*3+2]=0}const pt=Array.from({length:he},()=>{const t=new o.BufferGeometry;t.setAttribute("position",new o.BufferAttribute(rt.slice(),3));const a=new o.LineBasicMaterial({color:new o.Color(3407782),transparent:!0,opacity:0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),s=new o.LineLoop(t,a);return s.visible=!1,W.add(s),{mesh:s,mat:a,r:0,maxR:100,active:!1}});function de(t,a){const s=pt.find(i=>!i.active);s&&(s.r=0,s.maxR=60+Math.random()*80,s.mesh.position.set(t,a,20),s.mesh.visible=!0,s.active=!0)}const Wt=t=>{const a=et.getBoundingClientRect(),s=t.clientX-a.left-M/2,i=m/2-(t.clientY-a.top);de(s,i)};et.addEventListener("click",Wt,{passive:!0});const Y=Math.round(Math.min(M,m)/28),C=Math.ceil(M/Y)+1,_=Math.ceil(m/Y)+1,N=C*_,U=Math.max(3,Math.floor(Math.min(C,_)*.12));let kt=Math.floor(C/2),Yt=Math.floor(_/2),St=0;const Q=new Float32Array(N),Vt=new Float32Array(N),it=new Float32Array(N),Zt=new Float32Array(N),qt=new Float32Array(N);for(let t=0;t<N;t++)qt[t]=t;function Xt(t,a){kt=Math.max(U,Math.min(C-1-U,t)),Yt=Math.max(U,Math.min(_-1-U,a));const s=Math.sqrt(C**2+_**2);for(let i=0;i<_;i++)for(let f=0;f<C;f++){const l=i*C+f,e=f-kt,n=i-Yt,d=Math.max(Math.abs(e),Math.abs(n))<=U&&(n===0||e===0||Math.abs(e)===Math.abs(n));it[l]=d?1:0,Vt[l]=Math.sqrt(e*e+n*n)/s,Zt[l]=.56}Jt.needsUpdate=!0,Qt.needsUpdate=!0}const V=new o.PlaneGeometry(Y-2,Y-2),jt=new o.ShaderMaterial({vertexShader:`
      attribute float aFlipAngle;
      attribute float aIsAsterisk;
      attribute float aAlpha;
      attribute float aTileIdx;
      varying   float vIsAsterisk;
      varying   float vAlpha;
      varying   float vHash;

      void main() {
        // Y 軸でフリップ（カードめくり）
        float c  = cos(aFlipAngle);
        float s  = sin(aFlipAngle);
        vec3  pos = vec3(position.x * c, position.y, position.z + abs(position.x) * s * 0.5);

        gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vIsAsterisk  = aIsAsterisk;
        vAlpha       = aAlpha;
        vHash        = mod(aTileIdx * 1.61803, 1.0);
      }
    `,fragmentShader:`
      varying float vIsAsterisk;
      varying float vAlpha;
      varying float vHash;

      void main() {
        // 裏面（flip 中）はバイナリ風のノイズを表示
        float cell = step(0.5, fract(vHash * 7.3 + gl_FragCoord.x * 0.11 + gl_FragCoord.y * 0.17));
        vec3  binColor = mix(
          vec3(0.04, 0.10, 0.12),  // 暗: 背景に近い色
          vec3(0.05, 0.22, 0.26),  // 明: うっすらシアン
          cell
        );

        vec3 astColor = vec3(0.0, 0.85, 1.0); // アスタリスク: シアン

        vec3  col   = vIsAsterisk > 0.5 ? astColor : binColor;
        float alpha = vAlpha;
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:o.NormalBlending,depthTest:!1,depthWrite:!1,side:o.DoubleSide}),wt=new o.InstancedMesh(V,jt,N),Kt=new o.Matrix4;for(let t=0;t<_;t++)for(let a=0;a<C;a++){const s=t*C+a,i=(a+.5)*Y-M/2,f=m/2-(t+.5)*Y;Kt.setPosition(i,f,-80),wt.setMatrixAt(s,Kt)}wt.instanceMatrix.needsUpdate=!0,zt.add(wt);const lt=new o.InstancedBufferAttribute(Q,1),Jt=new o.InstancedBufferAttribute(it,1),Qt=new o.InstancedBufferAttribute(Zt,1),fe=new o.InstancedBufferAttribute(qt,1);V.setAttribute("aFlipAngle",lt),V.setAttribute("aIsAsterisk",Jt),V.setAttribute("aAlpha",Qt),V.setAttribute("aTileIdx",fe);const $t=U+1,Et=C-U-2,Ht=(Et+$t)/2,ue=(Et-$t)/2;Xt(Math.floor(Ht),Math.floor(_/2)),Q.fill(Math.PI),lt.needsUpdate=!0;let ct="HOLD",Z=0;const te=70,ee=18,Ae=150;let ht=dt.indexOf("GATHERING"),$=0,u="GATHERING";function Me(){if(u==="FLYING"&&I.length===0&&(I=K(),k=0,nt()),u==="DISPERSING"?ht=dt.indexOf("GATHERING"):ht=(ht+1)%dt.length,u==="FORMED"&&(D=[]),u=dt[ht],$=0,u==="GATHERING"){const t=j[k];t&&t.length>0&&(I=t,k=(k+1)%j.length,nt())}u==="FLYING"&&gt.forEach(t=>{const a=Math.random()*Math.PI*2,s=.1+Math.random()*.3;t.vx=Math.cos(a)*s,t.vy=Math.sin(a)*s,t.x=(Math.random()-.5)*M,t.y=(Math.random()-.5)*m,t.z=(Math.random()-.5)*300,t.vz=(Math.random()-.5)*.3})}function me(t){t.x+=(t.tx-t.x)*.06,t.y+=(t.ty-t.y)*.06,t.z+=(0-t.z)*.06}function ve(t,a){const s=.04+a*.08,i=t.x,f=t.y,l=t.tx-t.x,e=t.ty-t.y,n=Math.hypot(l,e)||1,d=Math.max(0,1-a*1.5)*.12,v=-e/n,g=l/n;t.x+=(t.tx-t.x)*s+v*Math.min(n,80)*d,t.y+=(t.ty-t.y)*s+g*Math.min(n,80)*d,t.z+=(t.tz-t.z)*s,t.vx=t.x-i,t.vy=t.y-f}function ge(t,a){const s=t.tx-t.x,i=t.ty-t.y,f=t.tz-t.z,l=Math.hypot(s,i,f)||1,e=Math.min(l*.22,4),n=(t.tx*.07+t.ty*.05)%(Math.PI*2),d=Math.sin(a*.04+n)*.8,v=a*.008+n,g=Math.cos(v)*.02,r=Math.sin(v)*.02;t.vx+=(s/l*(e+d)-t.vx)*.18+g,t.vy+=(i/l*(e+d)-t.vy)*.18+r,t.vz+=(f/l*e-t.vz)*.18,t.vx+=(Math.random()-.5)*.5,t.vy+=(Math.random()-.5)*.5,t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function xe(t,a){if(a<.18){const i=Math.pow(a/.18,2)*7;t.vx+=(Math.random()-.5)*i,t.vy+=(Math.random()-.5)*i,t.vz+=(Math.random()-.5)*i*.3,t.vx*=.84,t.vy*=.84,t.vz*=.84}else{const i=(a-.18)/.8200000000000001,f=t.tx-R,l=t.ty,e=Math.atan2(l,f)+(Math.random()-.5)*1.1,n=t.spd*(1.4+i*2),d=.09*(1+i*3);t.vx+=(Math.cos(e)*n-t.vx)*d,t.vy+=(Math.sin(e)*n-t.vy)*d,t.vz+=((Math.random()-.5)*t.spd*.5-t.vz)*.07}t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function ye(t,a,s,i){const e=Math.min(s*2.2,36),n=s||1,d=t.vx/n,v=t.vy/n,g=t.vz/n,r=.2*i,c=.9+.1*i,A=1-.35*i;z[a*6]=t.x-d*e,z[a*6+1]=t.y-v*e,z[a*6+2]=t.z-g*e,O[a*6]=r,O[a*6+1]=c,O[a*6+2]=A,J[a*2]=0,z[a*6+3]=t.x,z[a*6+4]=t.y,z[a*6+5]=t.z,O[a*6+3]=1,O[a*6+4]=1,O[a*6+5]=1,J[a*2+1]=.82}function Ie(t){for(let a=0;a<6;a++)z[t*6+a]=0,O[t*6+a]=0;J[t*2]=0,J[t*2+1]=0}let E=0,Ct=0;(function t(){Ct=requestAnimationFrame(t),oe(Ct),E++,$++,$>=ne[u]&&Me();const a=$/ne[u];(u==="FORMED"||u==="DISPERSING")&&$===0&&(h.setRenderTarget(y),h.clear(),h.setRenderTarget(S),h.clear(),h.setRenderTarget(null)),mt.opacity=u==="GATHERING"?.28:u==="DISPERSING"?.22:.12,w.position.x=0,w.position.y=0;const s=u==="FORMED"?2:u==="GATHERING"?a:u==="DISPERSING"?2-a:-1;yt.uniforms.uPhaseT.value=s,xt.forEach((e,n)=>{e.vx+=(e.ox-e.x)*.02,e.vy+=(e.oy-e.y)*.02,e.vx*=.88,e.vy*=.88,e.x+=e.vx,e.y+=e.vy;const d=e.alpha*(.5+.5*Math.sin(E*.016+e.phase));st[n*3]=e.x,st[n*3+1]=e.y,st[n*3+2]=e.z,Dt[n]=e.radius*2,Ut[n]=d}),B.attributes.position.needsUpdate=!0,B.attributes.aSize.needsUpdate=!0,B.attributes.aAlpha.needsUpdate=!0,pt.forEach(e=>{if(!e.active)return;e.r+=.9;const n=e.r/e.maxR;e.mat.opacity=.55*Math.pow(1-n,1.5),e.mesh.scale.setScalar(e.r),e.r>=e.maxR&&(e.active=!1,e.mesh.visible=!1,e.mat.opacity=0)}),Z++;const i=ct;if(i==="HOLD"&&Z>Ae){St+=.8;const e=Math.floor(Ht+Math.sin(St)*ue),n=Math.floor(_/2+Math.cos(St*.7)*_*.3);Xt(e,n);for(let d=0;d<N;d++)Q[d]=it[d]>.5?0:Math.PI;lt.needsUpdate=!0,ct="WAVE_IN",Z=0}else i==="WAVE_IN"&&Z>te+ee&&(ct="HOLD",Z=0);if(ct==="WAVE_IN"){let e=!1;for(let n=0;n<N;n++)if(it[n]>.5&&Q[n]<Math.PI){const d=Math.max(0,Math.min(1,(Z-Vt[n]*te)/ee));Q[n]=d*Math.PI,e=!0}e&&(lt.needsUpdate=!0)}u==="FORMED"&&E>=Ot&&D.length<5&&(D.push({x:(Math.random()-.5)*M,y:(Math.random()-.5)*m,strength:.8+Math.random()*.7}),Ot=E+18+Math.floor(Math.random()*18)),D.length>0&&(xt.forEach(e=>{D.forEach(n=>{const d=e.x-n.x,v=e.y-n.y,g=Math.hypot(d,v)||1,r=Math.min(n.strength*40/(g*.03+1),5);e.vx+=d/g*r,e.vy+=v/g*r})}),D=D.filter(e=>(e.strength*=.97,e.strength>.05)));const f=u==="GATHERING"||u==="DISPERSING",l=1.5;gt.forEach((e,n)=>{u==="FLYING"?me(e):u==="GATHERING"?ve(e,a):u==="FORMED"?ge(e,E):xe(e,a),ot[n*3]=e.x,ot[n*3+1]=e.y,ot[n*3+2]=e.z,Tt[n]=e.sz*4.3;const d=Math.hypot(e.vx,e.vy);let v=!0;if(u==="GATHERING"){const r=e.x-e.tx,c=e.y-e.ty,A=Math.sqrt(r*r+c*c),x=Math.max(0,1-a*1.5),b=Math.min(1,Math.max(0,1-A/(p*.2)))*x,G=e.x-R,q=Math.sqrt(G*G+e.y*e.y),H=p*.48*a,tt=Math.min(1,Math.max(0,(H-q)/(p*.06)));L[n]=Math.max(b,tt),v=L[n]>.01}else if(u==="FORMED"){const r=e.x-R,c=Math.sqrt(r*r+e.y*e.y);L[n]=Math.min(1,Math.max(0,(p*.48-c)/(p*.06))),v=L[n]>.01}else if(u==="DISPERSING"){const r=e.x-R,c=Math.sqrt(r*r+e.y*e.y),A=Math.min(1,Math.max(0,(p*.48-c)/(p*.06))),x=Math.max(0,1-a*5),b=Math.max(A*x,1-x),G=a<.7?1:Math.max(0,1-(a-.7)/.3);L[n]=b*G,v=L[n]>.01}else L[n]=1;const g=u==="GATHERING"?a:u==="DISPERSING"?1-a:0;f&&d>l&&v?ye(e,n,d,g):Ie(n)}),F.attributes.position.needsUpdate=!0,F.attributes.aSize.needsUpdate=!0,F.attributes.aAlpha.needsUpdate=!0,T.attributes.position.needsUpdate=!0,T.attributes.aColor.needsUpdate=!0,T.attributes.aAlpha.needsUpdate=!0,h.setRenderTarget(y),h.clear(),Mt.map=S.texture,h.render(Nt,At),h.render(Gt,At),h.render(W,w),h.setRenderTarget(null),h.clear(),vt.map=y.texture,h.render(Lt,At),h.render(zt,w),[y,S]=[S,y]})();const ae=new ResizeObserver(()=>{M=X.clientWidth,m=X.clientHeight,h.setSize(M,m),w.left=-M/2,w.right=M/2,w.top=m/2,w.bottom=-m/2,w.updateProjectionMatrix(),y.setSize(M*P,m*P),S.setSize(M*P,m*P),h.setClearColor(Ft,1),h.setRenderTarget(y),h.clear(),h.setRenderTarget(S),h.clear(),h.setRenderTarget(null),xt.forEach(t=>{t.x=(Math.random()-.5)*M*1.3,t.y=(Math.random()-.5)*m*1.3})});return ae.observe(X),()=>{cancelAnimationFrame(Ct),ae.disconnect(),et.removeEventListener("click",Wt),pt.forEach(t=>{W.remove(t.mesh),t.mesh.geometry.dispose(),t.mat.dispose()}),V.dispose(),jt.dispose(),at.dispose(),Mt.dispose(),mt.dispose(),vt.dispose(),y.texture.dispose(),S.texture.dispose(),y.dispose(),S.dispose(),h.dispose(),F.dispose(),yt.dispose(),T.dispose(),Bt.dispose(),B.dispose(),Rt.dispose()}}export{Ce as initBgDemo};
