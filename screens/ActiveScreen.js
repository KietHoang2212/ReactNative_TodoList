import React from 'react';
import { ScrollView, StyleSheet, ImageBackground} from 'react-native';

import {TODOS} from '../utils/data.js';
import TodoItem from '../components/TodoItem';

export default function ActiveScreen() {
  return (
    <ImageBackground 
      style={styles.container}
      source={{
        uri:
          "https://images.pexels.com/photos/1227648/pexels-photo-1227648.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://mondrian.mashable.com/wp-content%252Fgallery%252Fiphone-6-wallpaper%252Ftumblr_nglh5niidy1tqjbpqo2_1280.jpg%252Ffit-in__850x850.jpg?signature=lE0RDwtRFUlnumotMRH6JRutz-g=&source=https%3A%2F%2Fmashable.com"
      }}>
      <ScrollView style={{flex:1}} contentContainerStyle={styles.contentContainer}>
        {(TODOS.filter(todo => todo.status === 'Active')).map((todo, idx) => {
          return <TodoItem 
          key={todo.body} 
          todo={todo} idx={idx}
          onToggleTodo={() => {}}
          onDeleteTodo={() => {}}/>
        })}
      </ScrollView>
    </ImageBackground>
  );
}

ActiveScreen.navigationOptions = {
  title: 'Active Todos',
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
});