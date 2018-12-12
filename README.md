# Liqcalc #

## Descrição ##
App que calcula o salário líquido de acordo com os descontos de impostos, feito em Ionic.

## Arquitetura ##

### Páginas ###

    Inicial (calculo.page)
        Entrada de dados, botão para calcular, exibição do resultado, botão para visualizar detalhes e menu com as opções "Histórico", "Tabela de Alíquotas" e "Sair".
            -> Botão detalhes abre um modal com percentual aplicado, valores dos impostos, salário liquido e bruto;

    Histórico (historico.page)
        Lista em ordem cronológica dos cálculos e resultados obtidos pelo app.
            (Ficará dentro de seu próprio módulo, a fim de carregar somente se solicitado)
            https://blog.ionicframework.com/ionic-and-lazy-loading-pt-1/
        Criar lazy loading para conteúdo extenso

    Tabela de Alíquotas (aliquotas.page)
        Tabela com os valores praticados nos cálculos para fins de consulta.

### Serviços ###

    salvar dados dos calculos feitos (BD - insert) --\_  (HistoricoService)
    buscar historico de calculos     (BD - select) --/
    realização do cálculo            (CalculadoraService)
    Carregar tabela de contribuição  (TabelaAliquotasService)

### Módulos ###

    AppModule (src/app/app.module.ts)
    src/
      |- app/
          |- app.component.ts
      |    
      |- pages/
          |- calculo/
                |- calculo.page.ts
          |
          |- aliquotas/
                |- aliquotas.page.ts
      |    
      |- providers/
          |- calculadora/
                |- calculadora.service.ts
          |
          |- tabela-aliquotas/
                |- tabela-aliquotas.service.ts

    HistoricoModule (src/app/historico.module.ts)
    src/
      |- pages/
          |- historico/
                |- historico.page.ts
      |
      |- providers/
          |- historico/
                |- historico.service.ts

### Assets ###

    Tabelas de contribuição
        |- tabela-inss.json (data, faixas salariais, aliquotas)
        |- tabela-ir.json   (data, faixas salariais, aliquotas)