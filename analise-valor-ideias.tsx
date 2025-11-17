import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, CheckCircle, XCircle, Target } from 'lucide-react';

export default function AnaliseSWOT() {
  const [ideia, setIdeia] = useState('');
  const [swot, setSwot] = useState({
    forcas: ['', '', ''],
    fraquezas: ['', '', ''],
    oportunidades: ['', '', ''],
    ameacas: ['', '', '']
  });
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleChange = (categoria, index, valor) => {
    setSwot(prev => ({
      ...prev,
      [categoria]: prev[categoria].map((item, i) => i === index ? valor : item)
    }));
  };

  const adicionarItem = (categoria) => {
    setSwot(prev => ({
      ...prev,
      [categoria]: [...prev[categoria], '']
    }));
  };

  const removerItem = (categoria, index) => {
    if (swot[categoria].length > 1) {
      setSwot(prev => ({
        ...prev,
        [categoria]: prev[categoria].filter((_, i) => i !== index)
      }));
    }
  };

  const analisar = () => {
    if (!ideia.trim()) {
      alert('Por favor, descreva a ideia antes de analisar');
      return;
    }

    const temConteudo = Object.values(swot).some(arr => 
      arr.some(item => item.trim() !== '')
    );

    if (!temConteudo) {
      alert('Preencha pelo menos um item em cada categoria da matriz SWOT');
      return;
    }

    setMostrarResultado(true);
  };

  const resetar = () => {
    setIdeia('');
    setSwot({
      forcas: ['', '', ''],
      fraquezas: ['', '', ''],
      oportunidades: ['', '', ''],
      ameacas: ['', '', '']
    });
    setMostrarResultado(false);
  };

  const contarPreenchidos = (arr) => arr.filter(item => item.trim() !== '').length;

  const calcularScore = () => {
    const forcasScore = contarPreenchidos(swot.forcas) * 10;
    const oportunidadesScore = contarPreenchidos(swot.oportunidades) * 10;
    const fraquezasScore = contarPreenchidos(swot.fraquezas) * 7;
    const ameacasScore = contarPreenchidos(swot.ameacas) * 8;

    const positivos = forcasScore + oportunidadesScore;
    const negativos = fraquezasScore + ameacasScore;

    const maxPositivos = (swot.forcas.length * 10) + (swot.oportunidades.length * 10);
    const maxNegativos = (swot.fraquezas.length * 7) + (swot.ameacas.length * 8);

    if (maxPositivos + maxNegativos === 0) return 50;

    const scorePositivo = maxPositivos > 0 ? (positivos / maxPositivos) * 60 : 0;
    const scoreNegativo = maxNegativos > 0 ? ((maxNegativos - negativos) / maxNegativos) * 40 : 40;

    return scorePositivo + scoreNegativo;
  };

  const getRecomendacao = (score) => {
    if (score >= 75) {
      return {
        texto: 'IDEIA EXCELENTE',
        cor: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-300',
        icon: CheckCircle,
        detalhe: 'Muitas forças e oportunidades! Alta viabilidade.',
        acao: 'Priorize a execução e planeje os próximos passos.'
      };
    } else if (score >= 60) {
      return {
        texto: 'IDEIA PROMISSORA',
        cor: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        icon: TrendingUp,
        detalhe: 'Bom potencial com alguns desafios gerenciáveis.',
        acao: 'Mitigue as fraquezas e capitalize as oportunidades.'
      };
    } else if (score >= 45) {
      return {
        texto: 'IDEIA COM RESSALVAS',
        cor: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        icon: AlertTriangle,
        detalhe: 'Requer melhorias significativas antes de prosseguir.',
        acao: 'Fortaleça os pontos fracos e prepare-se para ameaças.'
      };
    } else {
      return {
        texto: 'IDEIA DE ALTO RISCO',
        cor: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-300',
        icon: XCircle,
        detalhe: 'Muitas vulnerabilidades e ameaças identificadas.',
        acao: 'Reconsidere ou reformule completamente a ideia.'
      };
    }
  };

  const categorias = [
    {
      titulo: 'Forças',
      chave: 'forcas',
      icon: TrendingUp,
      cor: 'green',
      placeholder: 'Ex: Equipe experiente, tecnologia diferenciada...',
      pergunta: 'O que sua ideia faz bem? Quais vantagens você tem?'
    },
    {
      titulo: 'Fraquezas',
      chave: 'fraquezas',
      icon: TrendingDown,
      cor: 'red',
      placeholder: 'Ex: Orçamento limitado, falta de experiência...',
      pergunta: 'Quais são as limitações? O que pode melhorar?'
    },
    {
      titulo: 'Oportunidades',
      chave: 'oportunidades',
      icon: Lightbulb,
      cor: 'blue',
      placeholder: 'Ex: Mercado em crescimento, novas tecnologias...',
      pergunta: 'Que fatores externos podem ajudar? Tendências favoráveis?'
    },
    {
      titulo: 'Ameaças',
      chave: 'ameacas',
      icon: AlertTriangle,
      cor: 'orange',
      placeholder: 'Ex: Concorrentes fortes, mudanças regulatórias...',
      pergunta: 'Que riscos externos existem? O que pode dar errado?'
    }
  ];

  const getCoresCategoria = (cor) => {
    const cores = {
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', icon: 'text-green-600' },
      red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', icon: 'text-red-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', icon: 'text-blue-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', icon: 'text-orange-600' }
    };
    return cores[cor];
  };

  const score = calcularScore();
  const recomendacao = getRecomendacao(score);
  const IconRecomendacao = recomendacao.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <Target className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Análise SWOT de Ideias
              </h1>
              <p className="text-slate-600">
                Avalie Forças, Fraquezas, Oportunidades e Ameaças para validar sua ideia
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descreva sua ideia:
            </label>
            <textarea
              value={ideia}
              onChange={(e) => setIdeia(e.target.value)}
              placeholder="Ex: Criar uma plataforma de cursos online focada em habilidades práticas..."
              className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              rows="3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {categorias.map((cat) => {
              const Icon = cat.icon;
              const cores = getCoresCategoria(cat.cor);

              return (
                <div key={cat.chave} className={`${cores.bg} border-2 ${cores.border} rounded-xl p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${cores.icon}`} />
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${cores.text}`}>
                        {cat.titulo}
                      </h3>
                      <p className="text-sm text-slate-600">{cat.pergunta}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {swot[cat.chave].map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleChange(cat.chave, index, e.target.value)}
                          placeholder={cat.placeholder}
                          className="flex-1 p-3 bg-white border-2 border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none text-sm"
                        />
                        {swot[cat.chave].length > 1 && (
                          <button
                            onClick={() => removerItem(cat.chave, index)}
                            className="px-3 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-600 font-bold transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => adicionarItem(cat.chave)}
                      className="w-full py-2 bg-white hover:bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 text-sm font-semibold transition-colors"
                    >
                      + Adicionar item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={analisar}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              Analisar SWOT
            </button>
            <button
              onClick={resetar}
              className="px-8 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-4 rounded-xl transition-colors"
            >
              Resetar
            </button>
          </div>
        </div>

        {mostrarResultado && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Resultado da Análise SWOT</h2>
              
              <div className={`${recomendacao.bg} border-2 ${recomendacao.border} rounded-xl p-6 mb-6`}>
                <div className="flex items-start gap-4">
                  <IconRecomendacao className={`w-12 h-12 ${recomendacao.cor} flex-shrink-0`} />
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${recomendacao.cor} mb-2`}>
                      {recomendacao.texto}
                    </h3>
                    <p className={`text-lg ${recomendacao.cor} mb-3`}>
                      {recomendacao.detalhe}
                    </p>
                    <p className={`font-semibold ${recomendacao.cor}`}>
                      📋 Próximos passos: {recomendacao.acao}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${recomendacao.cor}`}>Viabilidade Geral:</span>
                    <span className={`text-2xl font-bold ${recomendacao.cor}`}>
                      {score.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-4 overflow-hidden border-2 border-current">
                    <div
                      className={`h-full ${recomendacao.cor.replace('text-', 'bg-')} transition-all duration-1000`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>

              {ideia && (
                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl mb-6">
                  <p className="font-semibold text-slate-700 mb-2">💡 Ideia Analisada:</p>
                  <p className="text-slate-800">{ideia}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {categorias.map((cat) => {
                  const Icon = cat.icon;
                  const cores = getCoresCategoria(cat.cor);
                  const itensPreenchidos = swot[cat.chave].filter(item => item.trim() !== '');

                  if (itensPreenchidos.length === 0) return null;

                  return (
                    <div key={cat.chave} className={`${cores.bg} border-2 ${cores.border} rounded-xl p-5`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-5 h-5 ${cores.icon}`} />
                        <h4 className={`font-bold ${cores.text}`}>
                          {cat.titulo} ({itensPreenchidos.length})
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {itensPreenchidos.map((item, index) => (
                          <li key={index} className="flex gap-2 text-sm text-slate-700">
                            <span className={`${cores.text} font-bold`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">💡 Estratégias Recomendadas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">📈 Crescimento (Forças + Oportunidades)</h4>
                  <p className="text-sm text-green-700">
                    Use suas forças para aproveitar as oportunidades do mercado
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">🛡️ Defesa (Forças + Ameaças)</h4>
                  <p className="text-sm text-blue-700">
                    Use suas forças para minimizar as ameaças externas
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">🔧 Desenvolvimento (Fraquezas + Oportunidades)</h4>
                  <p className="text-sm text-yellow-700">
                    Corrija fraquezas para poder aproveitar oportunidades
                  </p>
                </div>
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">⚠️ Sobrevivência (Fraquezas + Ameaças)</h4>
                  <p className="text-sm text-red-700">
                    Minimize fraquezas e proteja-se de ameaças - área crítica
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}