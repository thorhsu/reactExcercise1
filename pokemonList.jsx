//code here :)
var todoListData = [
    {id:1, pokemonNm: "picachu", pokemonCv: "4"}
    ];


var PokemonInput = React.createClass({
  getInitialState: function(){
    return{
       pokemonNm: '',
       pokemonCv:''
    }  
  },
  onChangeItem: function(e){
      this.setState({
          pokemonNm: e.target.value
      });
  },
  onChangePrice: function(e){
      this.setState({
          pokemonCv: e.target.value
      });
  },    
  onSubmit: function(e){
     e.preventDefault();
     if(this.state.pokemonNm !== '' && this.state.pokemonCv !== '')
        this.props.addPokemon(this.state.pokemonNm, this.state.pokemonCv);
     {/*設定pokemon*/}
     this.setState({pokemonNm: '', pokemonCv: ''});
  },
  render:function(){
    return (
        <form className="item-input">
           <input type="text" className="pokemonNm" onChange={this.onChangeItem} value={this.state.pokemonNm} />      
           <input type="text" className="pokemonCv" onChange={this.onChangePrice} value={this.state.pokemonCv} />
           <button onClick={this.onSubmit}>增加</button>       
        </form>
    );
  }
});

var Pokemon = React.createClass({
  onSubmit: function(e){
     e.preventDefault();
     this.props.deletePokemon(this.props.id);    
  },
  render:function(){
    return (
      <tr>
            <td className="pokemonNm">{this.props.name}</td><td className="pokemonCv">{this.props.cv}</td>
            <td className="delete"><button onClick={this.onSubmit}>刪除</button></td>   
      </tr>
    );
  }
});


var PokemonList = React.createClass({
  getInitialState: function(){
     return {
        directionIcon: "fa fa-sort-desc fa-lg"
     }
  },
  deletePokemon: function(id){
      this.props.deletePokemon(id);    
  },
  sortPokemon: function(){
      var directionIcon = this.state.directionIcon;
      if(directionIcon === "fa fa-sort-desc fa-lg")
          directionIcon = "fa fa-sort-asc fa-lg";
      else
          directionIcon = "fa fa-sort-desc fa-lg";
      this.state.directionIcon = directionIcon;    
      this.props.sortPokemon();
  },
  render:function(){
     if(this.props.data.length > 0){
        var outClass = this;
        return (
            <div>
               <table className="todo-list">
                 <tr className="head">
                     <th className="pokemonNm">Pokemon</th><th className="pokemonCv" onClick={this.sortPokemon} >CV&nbsp;<i className={this.state.directionIcon} aria-hidden="true"></i></th><th className="delete">Delete</th>
                 </tr>
                   {
                     this.props.data.map(function(pokemon){
                         return(
                            <Pokemon key={pokemon.id} name={pokemon.pokemonNm} id={pokemon.id} cv={pokemon.pokemonCv} deletePokemon={outClass.deletePokemon} />                    
                         );
                     })      
                   }
               </table>
           </div>
        );
     }else
         return (         <ul className="todo-list"></ul>);
   }
});


var AllPokemons = React.createClass({
  getInitialState: function(){
      return{
          data: this.props.initialData,
          sortdir: "desc"
      }
  },
  deletePokemon: function(id){
     var data = this.state.data;
     for(var i in data){
          var item = data[i];
          if(item.id === id){
              data.splice(i,1);
              break;
          }
      }
      data = this.sortFunction(data);
      this.state.data = data;
      this.forceUpdate();
  },
  sortFunction: function(data){
      var dir = this.state.sortdir;
      if(dir === "desc"){
         data.sort(function(a, b){
             return parseInt(b.pokemonCv) - parseInt(a.pokemonCv)
         });
      }else{
         data.sort(function(a, b){
             return parseInt(a.pokemonCv) - parseInt(b.pokemonCv)
         });
      }
      return data;
  },
  sortPokemon: function(){
      var dir = this.state.sortdir;
      var data = this.state.data;
      if(dir === "desc"){
          dir = "asc";
      }else{
          dir = "desc";
      }
      this.state.sortdir = dir;
      data = this.sortFunction(data);
      this.state.data = data;
      this.forceUpdate();
  },
  addPokemon: function(pokemonNm, pokemonCv){
      var data= this.state.data.concat({
          id: Date.now(),
          pokemonNm: pokemonNm,
          pokemonCv: pokemonCv
      });
      data = this.sortFunction(data);
      this.state.data = data;
      this.forceUpdate();
  },
  render:function(){
    return (
      <div className="todo">
        <h1>寶可夢CV排行榜</h1>
        <PokemonInput addPokemon={this.addPokemon}/>
        <PokemonList data={this.state.data} deletePokemon={this.deletePokemon} sortPokemon={this.sortPokemon} />
        
      </div>
    );
  }
});


ReactDOM.render(
  <AllPokemons initialData={todoListData} />,
  document.getElementById('content')
);
