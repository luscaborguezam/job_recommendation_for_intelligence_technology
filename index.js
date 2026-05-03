import tf from '@tensorflow/tfjs';

// 1. Dados normalizados
// 3. Criar metodo de treinamentio.
// 4. Criar metodo de predicao..
// 5. testar com dados difertente dos dados de treinamento.


async function trainModel(inpputXs, outputYs) {
    // Criar o modelo sequencial
    const model = tf.sequential(); 
    
    //Entrada de 10 posicoes e cacmada oculata de 80 neuronios
    model.add(tf.layers.dense({ inputShape: [10], units: 80, activation: 'relu' }));

    // Camada de saída com 5 neurônios (correspondente às 5 categorias) e função de ativação softmax
    model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));

    //compilar o modelo com otimizador Adam e função de perda categoricalCrossentropy
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    await model.fit(
        inpputXs, // Dados de entrada
        outputYs,  // Dados de saída (categorias)
        { 
          verbose: 0, // Não exibir logs de treinamento
          epochs: 100, // Número de épocas para treinamento
          shuffle: true, // Embaralhar os dados a cada época
            callbacks: {
                // onEpochEnd: (epoch, logs) => { console.log(
                //     `Epoch ${epoch}: loss = ${logs.loss}`
                // );
                // }
            }
        }
    
    )

    return model;
}

async function predict(model, inputData) {
    // Converter os dados de entrada para tensor
    const inputDataTensor = tf.tensor2d(inputData);
    
    // Fazer a previsão usando o modelo treinado
    const prediction = await model.predict(inputDataTensor);
    // Converter a previsão para um array
    const predArray = await prediction.array()
    //retornar resultados da previsão
    return predArray[0].map((probabilidae, index) => ({probabilidae,index}));
}


// Características (Inputs)
const tensor_clientes = [
  [ 0.635, 0.722, 1, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0.815, 0.452, 0, 1, 0, 0, 0, 0, 0, 1 ],
  [ 0.540, 0.338, 0, 0, 1, 0, 0, 1, 0, 0 ],
  [ 0.980, 0.870, 0, 0, 0, 1, 0, 0, 1, 0 ],
  [ 0.680, 0.775, 0, 0, 0, 0, 1, 1, 0, 0 ]
];

// Categorias correspondentes (Outputs/Targets)
const labelsPerfis = ["Bronze", "Investidor", "Iniciante", "Black", "Bronze"]; // Ordem dos labels
const tensor_perfis = [
  [1, 0, 0, 0, 0], // Referente ao cliente de 1500
  [0, 1, 0, 0, 0], // Referente ao cliente de 12000
  [0, 0, 1, 0, 0], // Referente ao cliente de 500
  [0, 0, 0, 1, 0], // Referente ao cliente de 80000
  [0, 0, 0, 0, 1]  // Referente ao cliente de 2500
];


// Criar tensores
const inpputXs = tf.tensor2d(tensor_clientes);
const outputYs = tf.tensor2d(tensor_perfis);

// Treinar o modelo
const model = await trainModel(inpputXs, outputYs);

const invstidorTeste = [[0.750, 0.600, 0, 1, 0, 0, 0, 0, 0, 1]]; // Cliente com perfil de investidor

// Fazer a previsão
const prediction = await predict(model, invstidorTeste);
const results = prediction
    .sort((a, b) => b.probabilidae - a .probabilidae) // Ordenar por probabilidade decrescente
    .map(p => `${labelsPerfis[p.index]}: ${(p.probabilidae * 100).toFixed(2)}%`) // Mapear para rótulos legíveis)
    .join('\n');
console.log(results);

