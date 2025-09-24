# Indus Electric - Website

Website oficial da Indus Electric, especialistas em soluções industriais, elétricas e mecânicas em Luanda, Angola.

## 🚀 Características

- **SEO Otimizado**: Meta tags, Open Graph, Schema markup e estrutura semântica
- **Design Responsivo**: Compatível com todos os dispositivos
- **Formulário Funcional**: Validação JavaScript e integração com serviços de email
- **Botão WhatsApp Flutuante**: Contato direto via WhatsApp
- **Performance Otimizada**: Lazy loading, minificação e otimização de imagens
- **Acessibilidade**: ARIA labels e navegação por teclado

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/induselectric/website.git
cd website
```

2. Instale as dependências:
```bash
npm install
```

3. Para desenvolvimento local:
```bash
npm run dev
```

4. Para produção (minificação e otimização):
```bash
npm run build
```

## 📁 Estrutura do Projeto

```
indus-electric/
├── index.html              # Página principal
├── contactos.html          # Página de contatos
├── portfolio.html          # Página de portfólio
├── serviços.html           # Página de serviços
├── sobre-nós.html          # Página sobre nós
├── css/
│   ├── style.css           # Estilos principais
│   ├── portfolio.css       # Estilos do portfólio
│   └── servicos.css        # Estilos dos serviços
├── js/
│   ├── global.js           # JavaScript global
│   ├── portfolio.js        # JavaScript do portfólio
│   └── contact-form.js     # Validação do formulário
├── Imagens/                # Imagens do projeto
└── package.json            # Configurações do projeto
```

## 🔧 Configuração do Formulário

O formulário de contato está configurado para integração com EmailJS. Para configurar:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Configure um template de email
3. Substitua as configurações no arquivo `js/contact-form.js`:

```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',      // Seu Service ID
    'YOUR_TEMPLATE_ID',     // Seu Template ID
    {
        from_name: formData.get('nome'),
        from_email: formData.get('email'),
        from_phone: formData.get('telefone'),
        company: formData.get('empresa'),
        service_type: formData.get('tipo-servico'),
        appointment_date: formData.get('data-agendamento'),
        message: formData.get('mensagem')
    },
    'YOUR_USER_ID'          // Seu User ID
);
```

## 📱 Informações de Contato

- **Telefone**: (+244) 976 342 442 | 976 342 443
- **WhatsApp**: (+244) 938 355 079
- **Email**: Geralinduselectric@gmail.com
- **Endereço**: Maianga, Rua Dr. Egaz Moniz, Luanda, Angola

## 🎯 Serviços Oferecidos

1. **Diagnóstico e Recondicionamento de Motores**
   - Motores Marítimos (MTU, CATERPILLAR, CUMMINS, PERKINS)
   - Motores Industriais
   - Recondicionamento Completo

2. **Manutenção Eletromecânica**
   - Prensas Hidráulicas
   - Sistemas Industriais
   - Reparos Eletrônicos

3. **Automação e Controlo Industrial**
   - Programação de CLPs
   - Sistemas SCADA
   - Painéis de Controle

4. **Serviços Especiais**
   - Instalação Elétrica
   - Comissionamento
   - Otimização Energética

## 🔍 SEO

O website está otimizado para as seguintes keywords:
- manutenção industrial luanda
- motores marítimos angola
- automação industrial
- eletricidade industrial
- reparação motores MTU
- CATERPILLAR
- CUMMINS
- PERKINS
- sistemas SCADA
- CLPs

## 🚀 Deploy

Para fazer deploy do website:

1. Execute o build de produção:
```bash
npm run build
```

2. Faça upload dos arquivos para seu servidor web

3. Configure o servidor para servir os arquivos estáticos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o website, entre em contacto:

- **Email**: Geralinduselectric@gmail.com
- **WhatsApp**: (+244) 938 355 079

---

© 2025 Indus Electric. Todos os direitos reservados. 