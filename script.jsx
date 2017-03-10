//code here :)
var todoListData = [
    {id:1, done: false, text: "買一瓶醬油"},
    {id:2, done: true, text: "買六個雞蛋"}
];


var TodoInput = React.createClass({
  getInitialState: function(){
    return{
       text: ''
    }  
  },
  onChange: function(e){
      this.setState({
          text: e.target.value
      });
  },
    
  onSubmit: function(e){
     e.preventDefault();
     this.props.addItem(this.state.text);
     this.setState({text: ''});
  },
  render:function(){
    return (
        <form className="todo-input" onSubmit={this.onSubmit}>
           <input type="text" onChange={this.onChange} value={this.state.text} />
           
        </form>
    );
  }
});

var TodoItem = React.createClass({
  toogleDone: function(){
     var id = this.props.id;
     var done = !this.props.done;
     this.props.setItemDone(id, done);
  },
  render:function(){
    var cn = "todo-item";
    if(this.props.done)
        cn += " done";
    return (
      <li className={cn} onClick={this.toogleDone} >
        {this.props.children}
      </li>
    );
  }
});

var TodoList = React.createClass({
  render:function(){
    var setItemDone = this.props.setItemDone;
    return (
      <ul className="todo-list">
            {/*            <TodoItem done={false} >買一瓶醬油</TodoItem>}
                      <TodoItem done={true} >買六個雞蛋</TodoItem>*/}
          {
            this.props.data.map(function(item){
                return(
                   <TodoItem key={item.id} done={item.done} id={item.id} setItemDone={setItemDone}>
                      {item.text}
                   </TodoItem>
                );
            })      
          }
      </ul>
    );
  }
});


var Todo = React.createClass({
  getInitialState: function(){
      return{
          data: this.props.initialData
      }
  },
  addToDoItem: function(text){
      var data= this.state.data.concat({
          id: Date.now(),
          done: false,
          text: text
      });
      this.setState({data: data});
  },
  setItemDone: function(id, done){
      for(var i in this.state.data){
          var item = this.state.data[i];
          if(item.id === id){
              item.done = done;
              break;
          }
      }
      this.forceUpdate();
  },
  render:function(){
    return (
      <div className="todo">
        <h1>這是一個待辦項目</h1>
        <TodoInput addItem={this.addToDoItem}/>
        <TodoList data={this.state.data} setItemDone={this.setItemDone} />
        
      </div>
    );
  }
});


ReactDOM.render(
  <Todo initialData={todoListData} />,
  document.getElementById('content')
);
