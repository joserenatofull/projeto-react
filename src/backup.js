// React
import React, { useEffect, useState } from 'react';
//Hooks:Funções para acessar a api do react e usar uma funcionalidade especifica
// hook para acesar estado
import './ListaTarefas.css';
import instanciaAxios from './ajax/instanciaAxios';
// criado o componente instancia axios.
// o axios facilita a comunicação com ajax 
import moment from 'moment';


const ListaTarefas = () => {
  // criadas as variaveis com estado/setEstado inicializando com uma lista vazia
  const [listaCampeonatos, setListaCampeonatos] = useState([]);
  const [listaAdversariosLibertadores, setListaAdversarioLibertadores] = useState([]);
  const [listaAdversariosPaulista, setListaAdversarioPaulista] = useState([]);
  const [listaTarefas, setListaTarefas] = useState([]);
  const [listaDias, setListaDias] = useState([]);

  const [listaDatas, setListaDatas] = useState([]);
  const [listaHoras, setListaHoras] = useState([]);

  const [listaResultados, setListaResultados] = useState([]);
  const [descricaoNovoItem, setDescricaoNovoItem] = useState('');
  const [campeonatoNovoItem, setCampeonatoNovoItem] = useState('');
  const [diaNovoItem, setDiaNovoItem] = useState('');
  const [dataNovoItem, setDataNovoItem] = useState('');
  const [horaNovoItem, setHoraNovoItem] = useState('');

  const [adversarioLNovoItem, setAdversarioLNovoItem] = useState('');
  const [adversarioPNovoItem, setAdversarioPNovoItem] = useState('');

  const [resultadoNovoItem, setResultadoNovoItem] = useState('');
  const [alertaNovoItem, setAlertaNovoItem] = useState('desligado');
  
  
  //você diz ao React que o componente 
  //precisa fazer algo apenas depois da renderização
  useEffect(() => {
    pegarCampeonatos();
    pegarTarefas();
    pegarDias();
    pegarResultados();
    pegarAdversarioL();
    pegarAdversarioP();

  }, []);

  const pegarCampeonatos = async () => {
  // criada função para para pegar as campeonatos no formato json

    try {
//cria resposta, aguarda tradução ajax/axios / pega o caminho e joga na const
      const resposta = await instanciaAxios.get('../json/campeonatos.json');
      console.log(`Resultado: ${ JSON.stringify( resposta.data ) }`);
// pegarCat também recebe a função setListacampeonatos(const.dados.objetos)
      setListaCampeonatos(resposta.data.campeonatos);
      

    } catch (error) {
      console.log(error.message);
      // erro
    }

  };

  const pegarTarefas = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/tarefas.json');
      setListaTarefas(resposta.data.tarefas);
    } catch (error) {
      console.log(error.message);
    }

  };
  const pegarDias = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/dias.json');
      setListaDias(resposta.data.dias);
    } catch (error) {
      console.log(error.message);
    }

  };




  const pegarResultados = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/resultado.json');
      setListaResultados(resposta.data.resultado);
    } catch (error) {
      console.log(error.message);
    }

  };


  //Adversarios 


  const pegarAdversarioL = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/adversariosLibertadores.json');
      setListaAdversarioLibertadores(resposta.data.adversariosLibertadores);
    } catch (error) {
      console.log(error.message);
    }

  };
  const pegarAdversarioP = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/adversariosPaulista.json');
      setListaAdversarioPaulista(resposta.data.adversariosPaulista);
    } catch (error) {
      console.log(error.message);
    }

  };

  const OpcoesDiasComponente = () => {
    if(listaDias.length > 0){
    //Map? Vai percorrer os dados/valores Percorrer cada item da lista
        const listaDiasJSX = listaDias.map( ( item ) => {
        //criada a função listacampeonatosJSX recebe cada item listacampeonatos
          return (
            //joga no option a lista com a descrição das campeonatos 
            //key ? faz preencher automaticamento o id?
           <div  key={item.id}>
             
  <input type='radio' name='dia' value={ item.id } id={`dia-${item.valor}`}
  onChange={ (evento) => setDiaNovoItem(evento.target.value) }  
   checked={item.id === diaNovoItem} />
  <label htmlFor={`dia-${item.valor}`}>{item.rotulo}</label> 
           </div>
          );
        } );
    
        return listaDiasJSX;
        //retornar a lista com as campeonatos para OpcoesCat....
      }else{return null}};
  // componente com as opçoes de campeonatos:

 

  const OpcoesCampeonatosComponente = () => {
//Map? Vai percorrer os dados/valores Percorrer cada item da lista
    const listaCampeonatosJSX = listaCampeonatos.map( ( item ) => {
    //criada a função listacampeonatosJSX recebe cada item listacampeonatos
      return (
        //joga no option a lista com a descrição das campeonatos 
        //key ? faz preencher automaticamento o id?
        <option value={item.id} 
        key={item.id}>
        
          { item.descricao }
        </option>
      );
    } );

    return listaCampeonatosJSX;
    //retornar a lista com as campeonatos para OpcoesCat....
  };




      
      const OpcoesAdversarioComponente = () => {
        let arquivojson = [];
           if (campeonatoNovoItem == '1') {
            arquivojson = listaAdversariosLibertadores
           }else if(campeonatoNovoItem == '2') {
             arquivojson = listaAdversariosPaulista
           }
            const listaAdversariosJSX = arquivojson.map( ( item ) => {
              return (
                <option value={item.id} 
                key={item.id}>
                
                  { item.clube }
                </option>
              );
            } );
        
            return listaAdversariosJSX;
          
          };
          
  const OpcoesResultadosComponente = () => {
    //Map? Vai percorrer os dados/valores Percorrer cada item da lista
        const listaResultadosJSX = listaResultados.map( ( item ) => {
        //criada a função listacampeonatosJSX recebe cada item listacampeonatos
          return (
            //joga no option a lista com a descrição das campeonatos 
            //key ? faz preencher automaticamento o id?
            <option value={item.id} 
            key={item.id}>
            
              { item.descricao}
            </option>
          );
        } );
    
        return listaResultadosJSX;
        //retornar a lista com as campeonatos para OpcoesCat....
      };

    
      const AlertaIconeComponente = () => {
        return(
          <img src='/images/images.jpg'           className="alerta" id="alerta-margin"
          /> 
        )
      }
      
  const CorpoTabelaComponente = () => {
//criada a função com o nome das colunas
if(listaTarefas.length > 0){
    return (
      <tbody>
        { listaTarefas.map( (item) => {
              return (
                <LinhaTabelaComponente
                  key={item.id}
                  id={item.id}
                  descricao={ item.descricao } 
                  idCampeonato={ item.idCampeonato }
                 
                  idAdversarioL={ item.idAdversarioL} 
                  idAdversarioP={ item.idAdversarioP}

                  idDia={item.idDia} 

                  data={item.data} 
                  hora={item.hora}
                  alerta={item.alerta}
                  idResultado={item.idResultado}
                  />
              );
            } 
          
          ) 
        }
      </tbody>
    );

  }else{
    return null
  }
};

  const LinhaTabelaComponente = ( props ) => {
   
    const _campeonato = listaCampeonatos.find( item => {
    // return onde o item id da campeonatos for exatamente igual o id em idCat 
    // da api tarefas...
    // find para achar a campeonato
    
      return item.id === props.idCampeonato;
    } );

    const _adversarioL = listaAdversariosLibertadores.find( item => {
      // return onde o item id da campeonatos for exatamente igual o id em idCat 
      // da api tarefas...
      // find para achar a campeonato
      
        return item.id === props.idAdversarioL;
      } );

      const _adversarioP = listaAdversariosPaulista.find( item => {
        // return onde o item id da campeonatos for exatamente igual o id em idCat 
        // da api tarefas...
        // find para achar a campeonato
        
          return item.id === props.idAdversarioP;
        } );

   

    const _dia = listaDias.find( item => {
      // return onde o item id da campeonatos for exatamente igual o id em idCat 
      // da api tarefas...
      // find para achar a campeonato
      
        return item.id === props.idDia;
      } );
   
  

    const _resultado = listaResultados.find( item => {
  
      
        return item.id === props.idResultado;
      } );

      const _alerta = props.alerta === 'ligado'? <AlertaIconeComponente /> : null;

    // Preenche a linhaTabela com  
    // coluna 1 props.descrição tarefa
    // coluna 2 campeonato.nome da campeonato de acordo com id batendo nas 2 apis
    // 
    return (
      <tr>
      
        <td>{ _campeonato ? _campeonato.descricao : null}</td>
        <td>{ _adversarioL ? _adversarioL.clube : null} 
        { _adversarioP ? _adversarioP.clube : null} </td>
        <td>{props.data}</td>
        <td>{props.hora}</td>

        <td>{_dia ? _dia.rotulo : null}</td>
        <td>{_resultado ? _resultado.descricao : null}</td>
        <td>{ props.descricao }
      { _alerta}
        </td>
        <td>
          <img src='/images/images2.png'
          className="alerta" 
           onClick={ () =>  {removerItem( props.id ) } }/>
        </td>
      </tr>
    );
  };

  // return para ListaTarefas 
  // static - campeonatos:  ComponenteOpcoescampeonatos
  //static 1 linhas das colunas
  // Preenchimento das linhas componente corpoTabela


const incluirItem = () => {
if(campeonatoNovoItem > 0 && campeonatoNovoItem){
// posições
 const indiceUltimoElemento = listaTarefas.length - 1;
 // indiciUE recebe ultimo indice da lista 
 // lenght -1 para excluir pos 0 
 const ultimoElemento = listaTarefas[ indiceUltimoElemento ];
 //ultimoE recebe listaTarefas[ pos do UltimoE ]
 // ultimo elemento recebe o ultimo indice do array

// indiceUltimo elemento ja esta configurado para inserir no fim do array

 //valores
 // indiceUltimoElemento recebe o Ultimo id da api
 const idUltimoElemento = ultimoElemento.id;
 //indiceUE recebe ultimo elemento puxando o id DO OBJ
 const idNovoItem = parseInt( idUltimoElemento ) +1;
 // idNovoItem recebe convertido para int porque na api esta string
 // recebe IdUltimoelemento somando mais 1 para ficar ordenado 
 let data = moment(dataNovoItem);
 let hora = moment(horaNovoItem);


 


 let adv = {};
 if (campeonatoNovoItem == '1') {
   adv = adversarioLNovoItem
 } else {
  console.log('erro')
 }

 let adv2 = {};
 if (campeonatoNovoItem == '2') {
   adv2 = adversarioPNovoItem
 } else {
  console.log('erro')
 }


const novoItem = {
  "id": idNovoItem,
  "descricao": descricaoNovoItem,
  "idCampeonato": campeonatoNovoItem,

  //if?
  
  "idAdversarioL": adv, //adversarioLNovoItem
  "idAdversarioP": adv2, //adversarioPNovoItem

  "idDia": diaNovoItem,
  "data": data.format('DD/MM/YYYY'),
  "hora": horaNovoItem,
  "alerta":alertaNovoItem,
  "idResultado":resultadoNovoItem

};
setListaTarefas([...listaTarefas, novoItem])
}else{
  alert('Preencha direito')
}
};

const removerItem = ( idSelecionado ) => {

  const _listaTarefas = listaTarefas.filter ((item) => {
    return item.id !== idSelecionado;
  } );
setListaTarefas ( _listaTarefas );
};



  return (
    <> {/* ReactFragment */}

<h1>MEU PALMEIRAS</h1>
   <div id="container">

      <div id="boxe-novo-item">

      <h3>INCLUIR PARTIDA</h3>

 <div className='novo-item-campo-input-select'>
      <label>Campeonato: </label>
      <select 
      value={campeonatoNovoItem}
      onChange={(event)=>
             setCampeonatoNovoItem(event.target.value)}>
               <option value={-1}>Selecione um campeonato</option>
        <OpcoesCampeonatosComponente />
      </select>
       
      </div>
      <div className='novo-item-campo-input-select'>

      <label>Adversario: </label>
      {campeonatoNovoItem === '1' ? 
         <select 
         value={adversarioLNovoItem}
         onChange={(event)=>
                setAdversarioLNovoItem(event.target.value)}>
                  <option value={-1}>Selecione um Adversario</option>
         
           <OpcoesAdversarioComponente /> 
         </select>
      : <select 
      
      value={adversarioPNovoItem}
      onChange={(event)=>
             setAdversarioPNovoItem(event.target.value)}>
               <option value={-2}>Selecione um Adversario</option>
  
        <OpcoesAdversarioComponente /> 
      </select> }
      </div>
      <div className='novo-item-campo-input-select'>
 
          <label>Data:  </label>
   
 

          <input type="date"  
          value={dataNovoItem}
      onChange={(event)=> {setDataNovoItem(event.target.value)}}/>

</div>
<div className='novo-item-campo-input-select'>
          <label>Hora:  </label>
   
 
        
          <input type="time" 
                    value={horaNovoItem}
                    onChange={(event)=> {setHoraNovoItem(event.target.value)}}/>

      

</div>
<div id='colunas-dias-turnos'>
<div className='novo-item-campo'>


<label>Dia:</label>

  <OpcoesDiasComponente />
</div>
</div>

<div className='novo-item-campo-input-select'>
     

      <label>Resultado: </label>
      <select 
      value={resultadoNovoItem}
      onChange={(event)=>
             setResultadoNovoItem(event.target.value)}>
               <option value={-1}>Selecione uma Resultado</option>
        <OpcoesResultadosComponente />
      </select>
      </div>

      <div className='novo-item-campo-input-select'>

      <label>Descrição:</label>
      <input type="text" 
      onChange={(event)=> setDescricaoNovoItem(event.target.value)}/>
     </div>

     <div className='novo-item-campo'>
<p>Goleada?          <img src='/images/images.jpg'           className="alerta" 

></img></p>
<input type='checkbox' name='campo-alerta'  id='campo-alerta'
  onChange={ () => { setAlertaNovoItem( alertaNovoItem === 'ligado' ? 
  'desligado' : 'ligado') } } />

</div>



<button onClick={() => incluirItem()}>Incluir</button>

</div>
<div id="boxe-lista-tarefas">
  
      <table >

        <thead>
          <tr>
          
            <th>Campeonato:</th>
            <th>Adversario:</th>
            <th>Data:</th>
            <th>Hora:</th>

            <th>Dia:</th>

            <th>Resultado:</th>
            <th>Descrição:</th>

            <th>Ações:</th>

          </tr>
        </thead>

        <CorpoTabelaComponente />

        <tfoot>
          <tr>
            
            <td colSpan='8'>
            <img src='/images/images.jpg'        
               className="alerta" id="alerta-menor"/>  Goleada 

  
   <img src='/images/images2.png'
          className="alerta" id="alerta-menor2"/> Excluir Jogo 

<h4 id="left">
            Total de Jogos: { listaTarefas.length } 
          </h4>
            
            </td>
         
          </tr>
        </tfoot>

      </table>
      </div>
</div>
    </>
  );

}

export default ListaTarefas;