---
title: "N8N: A plataforma de automação para todos"
description: "O N8N é uma plataforma de automação de fluxo de trabalho que permite conectar aplicativos e serviços que contam com uma API pública, sem necessidade de código."
pubDate: 2023-10-18
category: "Automação e Integração"
tags: ["ciencias de dados","cloud computing","dados","etl","Integração","maker","N8N","transformação digital","Zapier"]
---

<p>Olá seja bem vindo a mais um super post, trazendo um pouco de informação e conhecimento em torno do mundo da tecnologia e suas ferramentas, nesse post de hoje vamos falar sobre o N8N, uma plataforma de automação de fluxos de trabalho fantástica, Open Source e que não deixa nada a desejar em relação aos seus primos <s>ricos</s> pagos Zapier e Maker.</p>

<h2><br>O que é o N8N?</h2>

<p>O N8N é uma plataforma de automação de fluxo de trabalho que permite conectar aplicativos e serviços que contam com uma API pública, sem necessidade de configurar linhas e mais linhas de código.</p>

<p>N8N é uma ferramenta de código aberto, ou seja, é um software que pode ser usado e modificado por qualquer pessoa, inicialmente livre de aquisição de licenças ou mensalidades. Sendo assim, é possível utilizar o N8N sem estar preso a uma outra empresa impondo limitações para o seu uso.</p>

<p>A plataforma é baseada em nós (nodes), que são blocos de construção que podem ser combinados para criar fluxos de trabalho personalizados. Cada nó representa uma ação ou operação, como capturar um e-mail de um formulário, criar um registro em um banco de dados, integrar com o MailChimp ou publicar um tweet.</p>

<p>N8N (pronuncia-se n-eight-n) ajuda você a conectar qualquer aplicativo com qualquer API e manipular seus dados com pouco ou nenhum código.</p>

<p><em>Referente ao licenciamento é importante esclarecer que embora N8N seja um software Open Source (código aberto), sua licença não é livre, N8N é distribuído por um tipo de licenciamento que se chama <a href="https://faircode.io/" target="_blank" rel="noopener nofollow">Fair-Code</a>, o que eles chamam de código justo, você pode saber mais sobre essa licença no link <a href="https://faircode.io/" target="_blank" rel="noopener nofollow">www.techblues.com.br//faircode.io/</a>, mas basicamente significa que é uma licença grátis porém sustentável, que se sua empresa obtém lucros a partir do uso de uma ferramenta aberta, é justo que ela adquira uma licença paga para contribuir com o projeto.</em></p>

<h2>N8N como ETL</h2>

<p>Além de uma excelente ferramenta de automação de fluxo de trabalho, o N8N também pode ser usado como uma plataforma ETL (Extração, Transformação, Loading), que em tradução seria uma ferramenta de extração, carregamento e transformação de dados.</p>

<p>Aqui na Tech Blues, usamos e abusamos dessa característica do N8N para integrar sistemas e dados. Projetos que antes demoravam semanas ou até meses para serem concluídos, com o N8N conseguimos fazer em dias.</p>

<p><strong>Algumas vantagens do N8N como plataforma ETL:</strong></p>

<ul>
<li><strong>Flexibilidade:</strong>&nbsp;O N8N oferece uma ampla variedade de nós que podem ser usados para extrair, transformar e carregar dados de diferentes fontes e formatos.</li>

<li><strong>Escalabilidade:</strong>&nbsp;O N8N é uma plataforma escalável que pode ser usada para lidar com grandes volumes de dados.</li>

<li><strong>Segurança:</strong>&nbsp;O N8N oferece recursos de segurança integrados que ajudam a proteger seus dados.</li>
</ul>

<h2>Como usar o N8N?</h2>

<p>Existem 2 formas de usar o N8N, no formato self-hosted (Você mesmo hospeda a plataforma no seu servidor) ou assinando um plano do N8N cloud, que é um serviço disponibilizado pela empresa que mantem o N8N. Como aqui gostamos da ideia do &#8220;Faça você mesmo&#8221;, vamos considerar a opção self-hosted.<br><br>Para começar com o N8N, você precisará primeiro instalar a plataforma. N8N é escrito em TypeScript e roda sob a plataforma NodeJS, então uma das formas de insta-lo é usando o NPM (npm install -g n8n &amp;&amp; n8n start), outras opções de instalação são:</p>

<ul>
<li>Via Docker.</li>

<li>Via build (&#8220;compilação&#8221;) do código fonte que está disponível no github.</li>

<li>Ou via One Click Install que possibilita instalar o N8N nas nuvens públicas como Digital Ocean, AWS, Heroku e etc&#8230;</li>
</ul>

<p>Você pode saber mais detalhes de instalação na <a href="https://docs.n8n.io/choose-n8n/" target="_blank" rel="noopener nofollow" title="">documentação oficial </a>da plataforma ou caso queira ajuda especializada para configurar seu próprio servidor N8N, fale com a Tech Blues que podemos ajuda-lo.</p>

<p>Depois de instalar a plataforma, você irá acessar a url local ou do seu servidor e o primeiro passo será cadastrar uma conta de administrador da plataforma.</p>

<p>Com uma conta, você poderá começar a criar fluxos de trabalho. Para criar um fluxo de trabalho, você precisará arrastar e soltar nós na interface do usuário.</p>

<p>Quando terminar de criar um fluxo de trabalho, você poderá testá-lo. Para testar um fluxo de trabalho, você precisará clicar no botão &#8220;Executar&#8221;. Não esqueça de sempre salvar seu fluxo.</p>

<h2>O que posso integrar com N8N?</h2>

<p>O N8N possui mais de 350 integrações em Nodes já pré definidos, onde você vai basicamente preencher os formulários para configura-los,  além dos nós que já são nativos você pode fazer muito mais instalando nós da comunidade, criando seus próprios nós, usando as chamadas HTTPs para integrar outras APIs, criar seus blocos de código JavaScript ou Python, manipular arquivos, criar condicionais, loops, mapeamentos e uma série de recursos.</p>

<h2><strong>Exemplos de fluxos de trabalho</strong> em N8N</h2>

<p>Aqui estão alguns exemplos de fluxos de trabalho que podem ser criados usando o N8N:</p>

<ul>
<li><strong>Enviar e-mail de confirmação de pedido:</strong>&nbsp;Este fluxo de trabalho pode ser usado para enviar um e-mail de confirmação de pedido para um cliente após a compra.</li>

<li><strong>Automatizar uma campanha de marketing por e-mail:</strong>&nbsp;Este fluxo de trabalho pode ser usado para enviar e-mails de marketing para clientes com base em suas interações com um site ou aplicativo.</li>

<li><strong>Automatizar o processo de controle de qualidade:</strong>&nbsp;Este fluxo de trabalho pode ser usado para verificar a qualidade de produtos ou serviços antes de serem lançados.</li>
</ul>

<p><strong>Conclusão</strong></p>

<p>O N8N é uma plataforma de automação poderosa e versátil que pode ser usada por qualquer pessoa que deseja automatizar tarefas. Com uma interface intuitiva e uma ampla variedade de recursos, o N8N é uma ótima opção para pessoas que procuram uma solução de automação flexível e fácil de usar.</p>
