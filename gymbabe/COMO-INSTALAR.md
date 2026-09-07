# GymBabe no seu celular — sem terminal

São 3 etapas. Uns 10 minutos na primeira vez, e depois nunca mais.

---

## Etapa 1 — Criar o repositório

1. Entre em **github.com** logada na sua conta.
2. Clique no **+** no canto superior direito → **New repository**.
3. Em *Repository name*, escreva: `gymbabe`
4. Deixe marcado **Public**.
   Precisa ser público: o GitHub só hospeda site de graça em repositório público.
   Seus treinos **não** ficam aqui — eles ficam salvos só no seu celular.
   O que fica público é o código do app, não seus dados.
5. **Não** marque "Add a README file".
6. Clique em **Create repository**.

---

## Etapa 2 — Subir os arquivos

Na tela que abrir, clique no link **uploading an existing file**
(ou vá em *Add file* → *Upload files*).

1. Abra a pasta `gymbabe` que você baixou.
2. Selecione **tudo que está dentro dela** e arraste para a área do navegador.
   Importante: arraste o **conteúdo** da pasta, não a pasta em si.
   Devem subir: `index.html`, `manifest.webmanifest`, `sw.js`,
   os três `icon-*.png` e a pasta `svg`.
3. Espere as barras de progresso terminarem.
4. Em *Commit changes*, escreva `GymBabe` e clique em **Commit changes**.

---

## Etapa 3 — Ligar o site

1. No repositório, clique em **Settings** (engrenagem, no menu de cima).
2. No menu da esquerda, clique em **Pages**.
3. Em *Branch*, troque `None` por **main**, deixe a pasta como `/ (root)`.
4. Clique em **Save**.
5. Espere 1 ou 2 minutos e recarregue a página. Vai aparecer:

   `https://SEU-USUARIO.github.io/gymbabe/`

Esse é o endereço do seu app.

---

## Instalar na tela de início

1. Abra esse endereço **no Chrome do seu Android**.
2. Toque no menu de três pontinhos.
3. Toque em **Instalar aplicativo** (ou "Adicionar à tela inicial").
4. Confirme.

Pronto. O GymBabe aparece na sua tela com ícone próprio, abre em tela cheia
sem barra de navegador e funciona sem internet.

---

## Como funcionam as atualizações

Quando eu mudar algo no app, eu te entrego um `index.html` novo. Você:

1. Abre o repositório no GitHub.
2. *Add file* → *Upload files*, arrasta o arquivo novo.
3. *Commit changes*.

Na próxima vez que você abrir o GymBabe, ele já está atualizado. Se não
atualizar na hora, feche e abra de novo — o app baixa a versão nova em segundo
plano e aplica na abertura seguinte.

---

## O que funciona offline

Tudo, menos uma coisa:

- ✅ treinos, séries, carga, descanso, cronômetro, cardio, progresso
- ✅ suas fichas e todo o histórico (salvos no aparelho)
- ✅ ilustrações de execução
- ⚠️ importar ficha **por foto** precisa de IA e não funciona no celular
- ✅ importar ficha **por texto** funciona: escreva um exercício por linha,
  assim → `Agachamento 4x10 30kg desc 90s`

---

## Duas coisas para saber

**Seus dados moram no celular.** Se você limpar os dados do Chrome ou
desinstalar, o histórico vai junto. Não há backup automático.

**O alarme de descanso só toca com o app aberto.** Se você sair do GymBabe e
apagar a tela, o som não dispara. Com a tela ligada no app, funciona normal.
Se isso incomodar no uso real, me avise — aí vale montar a versão nativa.
