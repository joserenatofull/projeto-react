import React, { useEffect, useState } from 'react';
//Hooks:Funções para acessar a api do react e usar uma funcionalidade especifica
// hook para acesar estado
import './ListaJogos.css';
import instanciaAxios from './ajax/instanciaAxios';
// criado o componente instancia axios.
// o axios facilita a comunicação com ajax 
import moment from 'moment';


const ListaJogos = () => {
  // criadas as variaveis com estado/setEstado inicializando com uma lista vazia
  const [listaCampeonatos, setListaCampeonatos] = useState([]);
  const [listaAdversariosLibertadores, setListaAdversarioLibertadores] = useState([]);
  const [listaAdversariosPaulista, setListaAdversarioPaulista] = useState([]);
  const [listaJogos, setListaJogos] = useState([]);
  const [listaDias, setListaDias] = useState([]);

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
    pegarJogos();
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
// recebe a função setListacampeonatos(const.dados.objeto)
      setListaCampeonatos(resposta.data.campeonatos);
      

    } catch (error) {
      console.log(error.message);
      // erro
    }

  };

  const pegarJogos = async () => {

    try {
      const resposta = await instanciaAxios.get('../json/jogos.json');
      setListaJogos(resposta.data.jogos);
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
        const listaDiasJSX = listaDias.map( ( item ) => {
          return (
        
           <div  key={item.id}>
             
  <input type='radio' name='dia' value={ item.id } id={`dia-${item.valor}`}
  onChange={ (evento) => setDiaNovoItem(evento.target.value) }  
   checked={item.id === diaNovoItem} />
  <label htmlFor={`dia-${item.valor}`}>{item.rotulo}</label> 
           </div>
          );
        } );
    
        return listaDiasJSX;
      }else{return null}};
      
  // componente com as opçoes de campeonatos:

 

  const OpcoesCampeonatosComponente = () => {
//Map? Vai percorrer os dados/valores Percorrer cada item da lista
    const listaCampeonatosJSX = listaCampeonatos.map( ( item ) => {
      return (
        <option value={item.id} 
        key={item.id}>
        
          { item.descricao }
        </option>
      );
    } );

    return listaCampeonatosJSX;
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
          return (
        
            <option value={item.id} 
            key={item.id}>
            
              { item.descricao}
            </option>
          );
        } );
    
        return listaResultadosJSX;
      };

    
      const AlertaIconeComponente = () => {
        return(
          <img src='/images/images.jpg'           className="alerta" id="alerta-goleada"
          /> 
        )
      }
      
  const CorpoTabelaComponente = () => {
if(listaJogos.length > 0){
    return (
      <tbody>
        { listaJogos.map( (item) => {
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
    // find para achar a campeonato
    
      return item.id === props.idCampeonato;
    } );

    const _adversarioL = listaAdversariosLibertadores.find( item => {
      
      
        return item.id === props.idAdversarioL;
      } );

      const _adversarioP = listaAdversariosPaulista.find( item => {
      
        
          return item.id === props.idAdversarioP;
        } );

   

    const _dia = listaDias.find( item => {
 
      
        return item.id === props.idDia;
      } );
   
  

    const _resultado = listaResultados.find( item => {
  
      
        return item.id === props.idResultado;
      } );

      const _alerta = props.alerta === 'ligado'? <AlertaIconeComponente /> : null;

 
    // 
    return (
      <tr>
      
        <td data-label="Campeonato:">{ _campeonato ? _campeonato.descricao : null}</td>
        <td data-label="Adversario:">{ _adversarioL ? _adversarioL.clube : null} 
        { _adversarioP ? _adversarioP.clube : null} </td>
        <td data-label="Data:">{props.data}</td>
        <td data-label="Hora:">{props.hora}</td>

        <td data-label="Dia:">{_dia ? _dia.rotulo : null}</td>
        <td data-label="Resultado:">{_resultado ? _resultado.descricao : null}</td>
        <td data-label="Placar:">{ props.descricao }
      { _alerta}
        </td>
        <td data-label="Excluir:">
          <img src='/images/images2.png'
          className="alerta" id="alerta-remove-pointer"
           onClick={ () =>  {removerItem( props.id ) } }/>
        </td>
      </tr>
    );
  };

  


const incluirItem = () => {
if(campeonatoNovoItem > 0 && campeonatoNovoItem){
// posições
 const indiceUltimoElemento = listaJogos.length - 1;

 const ultimoElemento = listaJogos[ indiceUltimoElemento ];

 const idUltimoElemento = ultimoElemento.id;
 //indiceUE recebe ultimo elemento puxando o id DO OBJ
 const idNovoItem = parseInt( idUltimoElemento ) +1;
 
 let data = moment(dataNovoItem);


 


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
setListaJogos([...listaJogos, novoItem])
}else{
  alert('Preencha direito')
}
};

const removerItem = ( idSelecionado ) => {

  const _listaJogos = listaJogos.filter ((item) => {
    return item.id !== idSelecionado;
  } );
setListaJogos ( _listaJogos );
};




  return (
    <> {/* ReactFragment */}
<div id="textLogo">
<h1> <img src='/images/ll.png' id="t1" className="logo" /> CAMPANHA PALMEIRAS 2020/2021 <img src='/images/ll.png' className="logo" /></h1>

</div>
   <div id="container">

      <div id="boxe-novo-item">

      <h3>#Adicionar Jogos: </h3>

 <div className='novo-item-campo-input-select'>
      <label className="NomeCampos">Campeonato: </label>
      <select 
      value={campeonatoNovoItem}
      onChange={(event)=>
             setCampeonatoNovoItem(event.target.value)}>
               <option value={-1}>Selecione um campeonato</option>
        <OpcoesCampeonatosComponente />
      </select>
       
      </div>
      <div className='novo-item-campo-input-select'>

      <label className="NomeCampos">Adversario: </label>
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
 
          <label className="NomeCampos">Data:  </label>
   
 

          <input type="date"  
          value={dataNovoItem}
      onChange={(event)=> {setDataNovoItem(event.target.value)}}/>

</div>
<div className='novo-item-campo-input-select'>
          <label className="NomeCampos">Hora:  </label>
   
 
        
          <input type="time" 
                    value={horaNovoItem}
                    onChange={(event)=> {setHoraNovoItem(event.target.value)}}/>

      

</div>
<div id='colunas-dias'>
<div className='novo-item-campo'>


<label className="NomeCampos">Dia:</label>

  <OpcoesDiasComponente />
</div>
</div>

<div className='novo-item-campo-input-select'>
     

      <label className="NomeCampos">Resultado: </label>
      <select 
      value={resultadoNovoItem}
      onChange={(event)=>
             setResultadoNovoItem(event.target.value)}>
               <option value={-1}>Selecione uma Resultado</option>
        <OpcoesResultadosComponente />
      </select>
      </div>

      <div className='novo-item-campo-input-select'>

      <label className="NomeCampos">Placar:</label>
      <input type="text" 
      onChange={(event)=> setDescricaoNovoItem(event.target.value)}/>
     </div>

     <div className='novo-item-campo'>
<p className="NomeCampos">Goleada?          <img src='/images/images.jpg'           className="alerta" 

></img></p>
<input type='checkbox' name='campo-alerta'  id='campo-alerta'
  onChange={ () => { setAlertaNovoItem( alertaNovoItem === 'ligado' ? 
  'desligado' : 'ligado') } } />

</div>



<button onClick={() => incluirItem()}>Adicionar Jogo</button>

</div>
<div id="boxe-lista-jogos">
  
      <table >

        <thead>
          <tr>
          
            <th scope="col">Campeonato</th>
            <th scope="col">Adversario</th>
            <th scope="col">Data</th>
            <th scope="col">Hora</th>

            <th scope="col">Dia</th>

            <th scope="col">Resultado</th>
            <th scope="col">Placar</th>

            <th scope="col">Excluir</th>

          </tr>
        </thead>

        <CorpoTabelaComponente />

        <tfoot>
          <tr>
            
            <td colSpan='8'>
            Total de Jogos: { listaJogos.length } 


            
            </td>
         
          </tr>
        </tfoot>

      </table>
      </div>
</div>
    </>
  );

}

export default ListaJogos;
