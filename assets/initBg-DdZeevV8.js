const re={FLYING:120,GATHERING:300,FORMED:300},Ct=["FLYING","GATHERING","FORMED"];function Fe(ie,n,Pt,le){let f=window.innerWidth,M=window.innerHeight;const I=Math.min(window.devicePixelRatio,2),V=Math.min(f,M)*.7,q=f*.28,lt=t=>(t/360-.5)*V+q,ct=t=>-(t/360-.5)*V,u=new n.WebGLRenderer({canvas:ie,antialias:!1});u.setPixelRatio(I),u.setSize(f,M),u.autoClear=!1;function bt(){return new n.WebGLRenderTarget(f*I,M*I,{minFilter:n.LinearFilter,magFilter:n.LinearFilter,format:n.RGBAFormat})}let w=bt(),C=bt();const dt=new n.OrthographicCamera(-1,1,1,-1,0,1),ht=new n.PlaneGeometry(2,2),Lt=new n.MeshBasicMaterial({map:C.texture,depthTest:!1}),Nt=new n.Scene;Nt.add(new n.Mesh(ht,Lt));const Ft=new n.MeshBasicMaterial({color:1580074,transparent:!0,opacity:.12,depthTest:!1,depthWrite:!1}),Gt=new n.Scene;Gt.add(new n.Mesh(ht,Ft));const zt=new n.MeshBasicMaterial({map:w.texture,depthTest:!1}),Ot=new n.Scene;Ot.add(new n.Mesh(ht,zt));const Tt=new n.Color(1580074);u.setClearColor(Tt,1),u.setRenderTarget(w),u.clear(),u.setRenderTarget(C),u.clear(),u.setRenderTarget(null),u.clear();const x=new n.OrthographicCamera(-f/2,f/2,M/2,-M/2,.1,2e3);x.position.set(0,0,500);const Y=new n.Scene,Bt=new n.Scene;let K=0,J=0;const Dt=t=>{K=t.clientX/f-.5,J=-(t.clientY/M-.5)};document.addEventListener("mousemove",Dt,{passive:!0});let ut=0,ft=0,z=[],Ut=0,y=[];const R=[[],[],[],[]];let k=0;function Q(){const t=[],a=V/2;for(let s=-a;s<=a;s+=5)for(let i=-a;i<=a;i+=5)i*i+s*s<=a*a&&t.push({x:i+q,y:s});return t}function Mt(){y.length&&At.forEach((t,a)=>{const s=y[a%y.length];t.tx=s.x,t.ty=s.y,t.tz=0})}function ce(t){const a=document.createElement("canvas");a.width=a.height=360;const s=a.getContext("2d");s.drawImage(t,0,0,360,360);let i=[];try{const{data:h}=s.getImageData(0,0,360,360),r=360,e=(l,c)=>h[(c*r+l)*4+3],o=(l,c)=>{const A=(c*r+l)*4;return h[A+3]<30?-1:h[A]*.299+h[A+1]*.587+h[A+2]*.114},d=new Float32Array(r*r),m=new Float32Array(r*r),g=new Float32Array(r*r);for(let l=1;l<r-1;l++)for(let c=1;c<r-1;c++){if(e(c,l)<30)continue;const A=[o(c-1,l-1),o(c,l-1),o(c+1,l-1),o(c-1,l),o(c+1,l),o(c-1,l+1),o(c,l+1),o(c+1,l+1)];if(A.some(it=>it<0))continue;const O=-A[0]-2*A[3]-A[5]+A[2]+2*A[4]+A[7],U=-A[0]-2*A[1]-A[2]+A[5]+2*A[6]+A[7],rt=Math.sqrt(O*O+U*U);d[l*r+c]=rt,m[l*r+c]=O,g[l*r+c]=U}for(let l=1;l<r-1;l++)for(let c=1;c<r-1;c++){if(e(c,l)>=30&&(e(c-1,l)<30||e(c+1,l)<30||e(c,l-1)<30||e(c,l+1)<30)){i.push({x:lt(c),y:ct(l)}),i.push({x:lt(c),y:ct(l)});continue}const O=d[l*r+c];if(O<26)continue;const U=Math.sqrt(m[l*r+c]**2+g[l*r+c]**2)||1,rt=m[l*r+c]/U,it=g[l*r+c]/U,It=Math.round(c+rt),wt=Math.round(l+it),St=Math.round(c-rt),_t=Math.round(l-it),be=It>=0&&It<r&&wt>=0&&wt<r?d[wt*r+It]:0,Le=St>=0&&St<r&&_t>=0&&_t<r?d[_t*r+St]:0;O>=be&&O>=Le&&i.push({x:lt(c),y:ct(l)})}}catch{return Q()}if(i.length<80)return Q();for(let h=i.length-1;h>0;h--){const r=Math.floor(Math.random()*(h+1));[i[h],i[r]]=[i[r],i[h]]}return i}const de=["/assets/image/logo-v4.png","/assets/image/logo-v3.png","/assets/image/logo-v2.png","/assets/image/logo-v5.png"];(Pt.length>0?Pt:de).forEach((t,a)=>{const s=new Image;s.onload=()=>{R[a]=ce(s),a===0&&y.length===0&&(y=R[0],k=1,Mt())},s.onerror=()=>{R[a]=Q()},s.src=t});function he(){const t=Math.random()*Math.PI*2,a=.15+Math.random()*.35,s=y.length?y[Math.floor(Math.random()*y.length)]:{x:0,y:0};return{x:(Math.random()-.5)*f,y:(Math.random()-.5)*M,z:(Math.random()-.5)*300,vx:Math.cos(t)*a,vy:Math.sin(t)*a,vz:(Math.random()-.5)*.3,tx:s.x,ty:s.y,tz:0,spd:5+Math.random()*6,sz:.35+Math.random()*.25}}const At=Array.from({length:2800},he),vt=Array.from({length:80},()=>{const t=(Math.random()-.5)*f*1.3,a=(Math.random()-.5)*M*1.3;return{x:t,y:a,ox:t,oy:a,vx:0,vy:0,z:-300+Math.random()*200,radius:1+Math.random()*1.5,alpha:.3+Math.random()*.45,phase:Math.random()*Math.PI*2}}),$=new Float32Array(2800*3),Yt=new Float32Array(2800),T=new n.BufferGeometry;T.setAttribute("position",new n.BufferAttribute($,3)),T.setAttribute("aSize",new n.BufferAttribute(Yt,1));const X=new n.ShaderMaterial({uniforms:{uPhaseT:{value:0},uMouseX:{value:0},uMouseY:{value:0},uDPR:{value:I}},vertexShader:`
      attribute float aSize;
      uniform float uMouseX;
      uniform float uMouseY;
      uniform float uDPR;

      void main() {
        vec3 pos = position;
        // Z 深度に応じてマウス視差を適用
        pos.x += pos.z * uMouseX * 0.25;
        pos.y += pos.z * uMouseY * 0.25;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

        // 奥行きによるサイズ補正（HiDPI 対応）
        float depth = 1.0 + pos.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
      }
    `,fragmentShader:`
      uniform float uPhaseT;

      void main() {
        // FLYING フェーズは uPhaseT=-1 で渡される → パーティクル不可視
        if (uPhaseT < 0.0) discard;

        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        // フェーズ別カラー定義（サイトのアクセントカラー #00e5ff に調和する碧・翠系）
        vec3 cyan    = vec3(0.00, 0.90, 1.00); // FLYING：シアン #00e5ff
        vec3 jade    = vec3(0.20, 1.00, 0.65); // GATHERING：翠 #33ffa6
        vec3 emerald = vec3(0.00, 1.00, 0.55); // FORMED センター：エメラルド #00ff8c

        vec3  col;
        float alpha;

        if (uPhaseT >= 2.0) {
          // FORMED：エメラルドセンター、翠エッジ
          col   = r < 0.22 ? emerald : jade;
          alpha = r < 0.22 ? 0.95 : 0.90;
        } else {
          // GATHERING：色変化を避けるため jade で統一（FORMED と同じ色味を維持）
          col   = jade;
          alpha = 0.90;
        }

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1}),ue=new n.Points(T,X);Y.add(ue);const P=new Float32Array(2800*6),b=new Float32Array(2800*6),W=new Float32Array(2800*2),L=new n.BufferGeometry;L.setAttribute("position",new n.BufferAttribute(P,3)),L.setAttribute("aColor",new n.BufferAttribute(b,3)),L.setAttribute("aAlpha",new n.BufferAttribute(W,1));const Rt=new n.ShaderMaterial({vertexShader:`
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
    `,transparent:!0,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1}),fe=new n.LineSegments(L,Rt);Y.add(fe);const E=new Float32Array(240),kt=new Float32Array(80),Xt=new Float32Array(80),N=new n.BufferGeometry;N.setAttribute("position",new n.BufferAttribute(E,3)),N.setAttribute("aSize",new n.BufferAttribute(kt,1)),N.setAttribute("aAlpha",new n.BufferAttribute(Xt,1));const H=new n.ShaderMaterial({uniforms:{uMouseX:{value:0},uMouseY:{value:0},uDPR:{value:I}},vertexShader:`
      attribute float aSize;
      attribute float aAlpha;
      uniform   float uMouseX;
      uniform   float uMouseY;
      uniform   float uDPR;
      varying   float vAlpha;

      void main() {
        vec3 pos = position;
        pos.x += pos.z * uMouseX * 0.6;
        pos.y += pos.z * uMouseY * 0.6;
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
    `,transparent:!0,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1}),Me=new n.Points(N,H);Y.add(Me);const mt=48,Ae=8,tt=new Float32Array(mt*3);for(let t=0;t<mt;t++){const a=t/mt*Math.PI*2;tt[t*3]=Math.cos(a),tt[t*3+1]=Math.sin(a),tt[t*3+2]=0}const gt=Array.from({length:Ae},()=>{const t=new n.BufferGeometry;t.setAttribute("position",new n.BufferAttribute(tt.slice(),3));const a=new n.LineBasicMaterial({color:new n.Color(3407782),transparent:!0,opacity:0,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1}),s=new n.LineLoop(t,a);return s.visible=!1,Y.add(s),{mesh:s,mat:a,r:0,maxR:100,active:!1}});function ve(t,a){const s=gt.find(i=>!i.active);s&&(s.r=0,s.maxR=60+Math.random()*80,s.mesh.position.set(t,a,20),s.mesh.visible=!0,s.active=!0)}const Wt=t=>{const a=t.clientX-f/2,s=M/2-t.clientY;ve(a,s)};window.addEventListener("click",Wt,{passive:!0});const F=Math.round(Math.min(f,M)/28),S=Math.ceil(f/F)+1,p=Math.ceil(M/F)+1,_=S*p,G=Math.max(3,Math.floor(Math.min(S,p)*.12));let Zt=Math.floor(S/2),jt=Math.floor(p/2),yt=0;const Z=new Float32Array(_),Vt=new Float32Array(_),et=new Float32Array(_),qt=new Float32Array(_),Kt=new Float32Array(_);for(let t=0;t<_;t++)Kt[t]=t;function Jt(t,a){Zt=Math.max(G,Math.min(S-1-G,t)),jt=Math.max(G,Math.min(p-1-G,a));const s=Math.sqrt(S**2+p**2);for(let i=0;i<p;i++)for(let h=0;h<S;h++){const r=i*S+h,e=h-Zt,o=i-jt,d=Math.max(Math.abs(e),Math.abs(o))<=G&&(o===0||e===0||Math.abs(e)===Math.abs(o));et[r]=d?1:0,Vt[r]=Math.sqrt(e*e+o*o)/s,qt[r]=.5}Et.needsUpdate=!0,Ht.needsUpdate=!0}const B=new n.PlaneGeometry(F-2,F-2),Qt=new n.ShaderMaterial({vertexShader:`
      attribute float aFlipAngle;
      attribute float aIsAsterisk;
      attribute float aAlpha;
      attribute float aTileIdx;
      varying   float vIsAsterisk;
      varying   float vAlpha;
      varying   float vCosA;    // fragment でフェード計算するために渡す
      varying   float vTileIdx;

      void main() {
        // ローカル Y 軸周りにフリップ（PlaneGeometry の x 方向を回転）
        float cosA   = cos(aFlipAngle);
        float sinA   = sin(aFlipAngle);
        vec3  pos    = vec3(position.x * cosA, position.y, -position.x * sinA);
        gl_Position  = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
        vIsAsterisk  = aIsAsterisk;
        vAlpha       = aAlpha;
        vCosA        = cosA;
        vTileIdx     = aTileIdx;
      }
    `,fragmentShader:`
      varying float vIsAsterisk;
      varying float vAlpha;
      varying float vCosA;
      varying float vTileIdx;

      void main() {
        // cosA > 0 → 表面。1 - smoothstep(lo, hi, x) で 90° 付近をなめらかにフェード。
        // edge0 < edge1 を守らないと GLSL 未定義動作でちらつきの原因になる。
        float faceMask = 1.0 - smoothstep(-0.12, 0.0, vCosA); // cosA<-0.12→1, cosA>0→0
        if (faceMask < 0.01) discard;

        float alpha;
        vec3  col;
        if (vIsAsterisk > 0.5) {
          // アスタリスクタイル：明るいシアン白で発光感を演出（AdditiveBlending で自然にグロー）
          col   = vec3(0.75, 0.97, 1.0);
          alpha = 0.55 * vAlpha * faceMask;
        } else {
          // バイナリ風：インデックスをハッシュして 0/1 の濃淡（jade グリーン）
          col         = vec3(0.20, 1.00, 0.65);
          float h     = fract(sin(vTileIdx * 127.1 + 43.0) * 43758.5);
          alpha       = (h > 0.5 ? 0.20 : 0.08) * vAlpha * faceMask;
        }
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1,side:n.DoubleSide}),xt=new n.InstancedMesh(B,Qt,_),$t=new n.Matrix4;for(let t=0;t<p;t++)for(let a=0;a<S;a++){const s=t*S+a,i=(a+.5)*F-f/2,h=M/2-(t+.5)*F;$t.setPosition(i,h,-80),xt.setMatrixAt(s,$t)}xt.instanceMatrix.needsUpdate=!0,Bt.add(xt);const at=new n.InstancedBufferAttribute(Z,1),Et=new n.InstancedBufferAttribute(et,1),Ht=new n.InstancedBufferAttribute(qt,1),me=new n.InstancedBufferAttribute(Kt,1);B.setAttribute("aFlipAngle",at),B.setAttribute("aIsAsterisk",Et),B.setAttribute("aAlpha",Ht),B.setAttribute("aTileIdx",me);const ge=q-V*.5,te=Math.max(G+1,Math.floor((ge-F*(G+2)+f/2)/F)),ee=G+1,ae=(te+ee)/2,ye=(te-ee)/2;Jt(Math.floor(ae),Math.floor(p/2)),Z.fill(Math.PI),at.needsUpdate=!0;let ot="HOLD",D=0;const oe=70,ne=18,xe=150;let nt=0,st=0,v="FLYING";function pe(){if(v==="FLYING"&&y.length===0&&(y=Q(),k=0,Mt()),v==="FORMED"?(nt=Ct.indexOf("GATHERING"),z=[]):nt=(nt+1)%Ct.length,v=Ct[nt],st=0,v==="GATHERING"){const t=R[k];t&&t.length>0&&(y=t,k=(k+1)%R.length,Mt())}v==="FLYING"&&At.forEach(t=>{const a=Math.random()*Math.PI*2,s=.1+Math.random()*.3;t.vx=Math.cos(a)*s,t.vy=Math.sin(a)*s,t.x=(Math.random()-.5)*f,t.y=(Math.random()-.5)*M,t.z=(Math.random()-.5)*300,t.vz=(Math.random()-.5)*.3})}function Ie(t){t.x+=(t.tx-t.x)*.06,t.y+=(t.ty-t.y)*.06,t.z+=(0-t.z)*.06}function we(t,a){const s=.04+a*.08,i=t.x,h=t.y,r=t.tx-t.x,e=t.ty-t.y,o=Math.hypot(r,e)||1,d=Math.max(0,1-a*1.5)*.12,m=-e/o,g=r/o;t.x+=(t.tx-t.x)*s+m*Math.min(o,80)*d,t.y+=(t.ty-t.y)*s+g*Math.min(o,80)*d,t.z+=(t.tz-t.z)*s,t.vx=t.x-i,t.vy=t.y-h}function Se(t,a){const s=t.tx-t.x,i=t.ty-t.y,h=t.tz-t.z,r=Math.hypot(s,i,h)||1,e=Math.min(r*.22,4),o=(t.tx*.07+t.ty*.05)%(Math.PI*2),d=Math.sin(a*.04+o)*.8,m=a*.008+o,g=Math.cos(m)*.02,l=Math.sin(m)*.02;t.vx+=(s/r*(e+d)-t.vx)*.18+g,t.vy+=(i/r*(e+d)-t.vy)*.18+l,t.vz+=(h/r*e-t.vz)*.18,t.vx+=(Math.random()-.5)*.5,t.vy+=(Math.random()-.5)*.5,t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function _e(t,a){if(a<.18){const i=Math.pow(a/.18,2)*7;t.vx+=(Math.random()-.5)*i,t.vy+=(Math.random()-.5)*i,t.vz+=(Math.random()-.5)*i*.3,t.vx*=.84,t.vy*=.84,t.vz*=.84}else{const i=(a-.18)/.8200000000000001,h=t.tx-q,r=t.ty,e=Math.atan2(r,h)+(Math.random()-.5)*1.1,o=t.spd*(1.4+i*2),d=.09*(1+i*3);t.vx+=(Math.cos(e)*o-t.vx)*d,t.vy+=(Math.sin(e)*o-t.vy)*d,t.vz+=((Math.random()-.5)*t.spd*.5-t.vz)*.07}t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function Ce(t,a,s,i){const e=Math.min(s*2.2,36),o=s||1,d=t.vx/o,m=t.vy/o,g=t.vz/o,l=.2*i,c=.9+.1*i,A=1-.35*i;P[a*6]=t.x-d*e,P[a*6+1]=t.y-m*e,P[a*6+2]=t.z-g*e,b[a*6]=l,b[a*6+1]=c,b[a*6+2]=A,W[a*2]=0,P[a*6+3]=t.x,P[a*6+4]=t.y,P[a*6+5]=t.z,b[a*6+3]=1,b[a*6+4]=1,b[a*6+5]=1,W[a*2+1]=.75}function Pe(t){for(let a=0;a<6;a++)P[t*6+a]=0,b[t*6+a]=0;W[t*2]=0,W[t*2+1]=0}let j=0,pt=0;(function t(){pt=requestAnimationFrame(t),le(pt),j++,st++,st>=re[v]&&pe();const a=st/re[v];Ft.opacity=.12,ut+=(K*22-ut)*.04,ft+=(J*22-ft)*.04,x.position.x=ut,x.position.y=ft;const s=v==="FORMED"?2:v==="GATHERING"?a:v==="DISPERSING"?2-a:-1;X.uniforms.uPhaseT.value=s,X.uniforms.uMouseX.value=K,X.uniforms.uMouseY.value=J,H.uniforms.uMouseX.value=K,H.uniforms.uMouseY.value=J,vt.forEach((e,o)=>{e.vx+=(e.ox-e.x)*.02,e.vy+=(e.oy-e.y)*.02,e.vx*=.88,e.vy*=.88,e.x+=e.vx,e.y+=e.vy;const d=e.alpha*(.5+.5*Math.sin(j*.016+e.phase));E[o*3]=e.x,E[o*3+1]=e.y,E[o*3+2]=e.z,kt[o]=e.radius*2,Xt[o]=d}),N.attributes.position.needsUpdate=!0,N.attributes.aSize.needsUpdate=!0,N.attributes.aAlpha.needsUpdate=!0,gt.forEach(e=>{if(!e.active)return;e.r+=.9;const o=e.r/e.maxR;e.mat.opacity=.55*Math.pow(1-o,1.5),e.mesh.scale.setScalar(e.r),e.r>=e.maxR&&(e.active=!1,e.mesh.visible=!1,e.mat.opacity=0)}),D++;const i=ot;if(i==="HOLD"&&D>xe){yt+=.8;const e=Math.floor(ae+Math.sin(yt)*ye),o=Math.floor(p/2+Math.cos(yt*.7)*p*.3);Jt(e,o);for(let d=0;d<_;d++)Z[d]=et[d]>.5?0:Math.PI;at.needsUpdate=!0,ot="WAVE_IN",D=0}else i==="WAVE_IN"&&D>oe+ne&&(ot="HOLD",D=0);if(ot==="WAVE_IN"){let e=!1;for(let o=0;o<_;o++)if(et[o]>.5&&Z[o]<Math.PI){const d=Math.max(0,Math.min(1,(D-Vt[o]*oe)/ne));Z[o]=d*Math.PI,e=!0}e&&(at.needsUpdate=!0)}v==="FORMED"&&j>=Ut&&z.length<5&&(z.push({x:(Math.random()-.5)*f,y:(Math.random()-.5)*M,strength:.8+Math.random()*.7}),Ut=j+18+Math.floor(Math.random()*18)),z.length>0&&(vt.forEach(e=>{z.forEach(o=>{const d=e.x-o.x,m=e.y-o.y,g=Math.hypot(d,m)||1,l=Math.min(o.strength*40/(g*.03+1),5);e.vx+=d/g*l,e.vy+=m/g*l})}),z=z.filter(e=>(e.strength*=.97,e.strength>.05)));const h=v==="GATHERING"||v==="DISPERSING",r=1.5;At.forEach((e,o)=>{v==="FLYING"?Ie(e):v==="GATHERING"?we(e,a):v==="FORMED"?Se(e,j):_e(e,a);const d=Math.hypot(e.vx,e.vy);$[o*3]=e.x,$[o*3+1]=e.y,$[o*3+2]=e.z,Yt[o]=e.sz*4;const m=v==="GATHERING"?a:v==="DISPERSING"?1-a:0;h&&d>r?Ce(e,o,d,m):Pe(o)}),T.attributes.position.needsUpdate=!0,T.attributes.aSize.needsUpdate=!0,L.attributes.position.needsUpdate=!0,L.attributes.aColor.needsUpdate=!0,L.attributes.aAlpha.needsUpdate=!0,u.setRenderTarget(w),u.clear(),Lt.map=C.texture,u.render(Nt,dt),u.render(Gt,dt),u.render(Y,x),u.setRenderTarget(null),u.clear(),zt.map=w.texture,u.render(Ot,dt),u.render(Bt,x),[w,C]=[C,w]})();const se=()=>{f=window.innerWidth,M=window.innerHeight,u.setSize(f,M),x.left=-f/2,x.right=f/2,x.top=M/2,x.bottom=-M/2,x.updateProjectionMatrix(),w.setSize(f*I,M*I),C.setSize(f*I,M*I),u.setClearColor(Tt,1),u.setRenderTarget(w),u.clear(),u.setRenderTarget(C),u.clear(),u.setRenderTarget(null),vt.forEach(t=>{t.x=(Math.random()-.5)*f*1.3,t.y=(Math.random()-.5)*M*1.3})};return window.addEventListener("resize",se,{passive:!0}),()=>{cancelAnimationFrame(pt),window.removeEventListener("resize",se),document.removeEventListener("mousemove",Dt),window.removeEventListener("click",Wt),B.dispose(),Qt.dispose(),gt.forEach(t=>{t.mesh.geometry.dispose(),t.mat.dispose()}),u.dispose(),w.dispose(),C.dispose(),T.dispose(),X.dispose(),L.dispose(),Rt.dispose(),N.dispose(),H.dispose()}}export{Fe as initBg};
