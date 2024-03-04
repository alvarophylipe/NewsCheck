<div style="display: flex; justify-content: center;">
    <img src="https://i.postimg.cc/sgRDc3m3/newscheck-icon.png" alt='newscheck-icon' style='width: 80%'>
</div>

---

<div style="display: flex; justify-content: center;">
    <h3>Sobre o Projeto</h3>
</div>

<p>
NewsCheck é uma ferramenta que utiliza o fine-tuning de um modelo BERT em português, o <a href="https://github.com/neuralmind-ai/portuguese-bert">BERTIMBAU</a>. O foco da afinação foi treinar o modelo para discernir a linguagem usada para transmitir informações incorretas, a fim de induzir o leitor ao erro. Mais informações do treinamento, <a href="https://colab.research.google.com/drive/1WGOjSBWCPqWHxidmdi_dIrohjYNgyQyL?usp=sharing">acesse aqui.</a>
</p>
<p>
O Modelo foi treinado usando dados coletados de portais de notícias, mas precisamente o <a href="https://github.com/jpchav98/FakeTrue.Br">faketrue.br</a>. Mais informações sobre o como foi coletado e tratado os dados, <a href="https://sol.sbc.org.br/index.php/erbd/article/view/24352"> acesse o artigo.</a>
</p>

---

<div style="display: flex; justify-content: center;">
    <h3>Funcionalidades</h3>
</div>

- <b>Checagem de Textos:</b> Insira o trecho da notícia para ser analisado, é preferível usar este modo.
- <b>Checagem de Sites:</b> Ao inserir um link da notícia, o servidor irá extrair apenas os parágrafos do site e verificar nesses parágrafos.
<p>&nbsp;</p>

---
<div style="display: flex; justify-content: center;">
    <h3>Como Funciona?</h3>
</div>

<p>
O NewsCheck aproveita um modelo BERT já afinado para o português, dispensando a necessidade de treinamento adicional. Ao inserir o texto, o algoritmo analisa as nuances da linguagem do texto para determinar a probabilidade de a notícia ser verdadeira ou falsa. 
</p>
<p>&nbsp;</p>

---

<div style="display: flex; justify-content: center;">
    <h3>Como Usar</h3>
</div>

1. Acesse o site <a href="https://newscheck.vercel.app">NewsCheck.</a>
2. Cole o link da notícia que você deseja checar na caixa de texto fornecida.
3. Ou, insira um texto relacionado à notícia que você deseja checar.
4. Clique em 'enviar' para iniciar a análise.
5. NewsCheck irá então retornar o resultado, indicando se a notícia é provavelmente verdadeira ou falsa.
<p>&nbsp;</p>

---
<div style="display: flex; justify-content: center;">
    <h3>Licença</h3>
</div>


Distribuído sob a licença MIT. Veja <a href="https://github.com/alvarophylipe/NewsCheck-front/blob/main/LICENSE">LICENSE</a> para mais informações.
