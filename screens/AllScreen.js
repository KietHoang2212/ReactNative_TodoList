import React from 'react';
import { ScrollView, TextInput, StyleSheet, View, Text, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';

import {TODOS} from '../utils/data.js';
import TodoItem from '../components/TodoItem';

export default class AllScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList: TODOS,
      todoBody: '',
    }
  };

  onToggleTodo = id => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = this.state.todoList.findIndex(todo => todo.id == id);
    const newTodoList = [...this.state.todoList]
    newTodoList[foundIndex] = todo;
    this.setState({
      todoList: newTodoList,
    })
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      })
    }, 500);
  };

  onDeleteTodo = id => {
    const newTodoList = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({
      todoList: newTodoList,
    })
  };

  onChangeTextTodo = (todoBody) => {
    this.setState({
      todoBody,
    })
  };

  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.todoBody,
      status: 'Active',
      id: this.state.todoList[this.state.todoList.length - 1].id + 1,
    };
    const newTodoList = [...this.state.todoList, newTodo];
    this.setState({
      todoList: newTodoList,
      todoBody: '',
    })
  };

  render(){
    return (
      <ImageBackground 
        style={styles.container}
        source={{
          uri:
            "https://images.pexels.com/photos/1227648/pexels-photo-1227648.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://mondrian.mashable.com/wp-content%252Fgallery%252Fiphone-6-wallpaper%252Ftumblr_nglh5niidy1tqjbpqo2_1280.jpg%252Ffit-in__850x850.jpg?signature=lE0RDwtRFUlnumotMRH6JRutz-g=&source=https%3A%2F%2Fmashable.com"
        }}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView style={{flex:1}} contentContainerStyle={styles.contentContainer}>
            {this.state.todoList.map((todo, idx) => {
              return <TodoItem 
              key={todo.body} 
              todo={todo} idx={idx} 
              onToggleTodo={this.onToggleTodo}
              onDeleteTodo={this.onDeleteTodo} />
            })}
            <View style={styles.inputContainer}>
              <TextInput 
                value={this.state.todoBody}
                style={styles.todoInput}
                onChangeText={text => this.onChangeTextTodo(text)}
              />
              <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  };
}

AllScreen.navigationOptions = {
  title: 'All Todos',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(120,213,250)',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});