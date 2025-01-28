import { Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Text, View, ScrollView} from 'react-native';
import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import {CardTodo} from '../../components/CardTodo/CardTodo';
import {TableBottomMenu} from '../../components/TabBottomMenu/TabBottomMenu';



export default function HomeScreen() {
  const [todoList, setTodoList] = useState(
    [
      {id: 1, title: 'Walk the dog', isCompleted: true},
      {id: 2, title: 'Go to the dentist', isCompleted: true},
      {id: 3, title: 'Learn React Native', isCompleted: false},
      {id: 4, title: 'Learn React Native', isCompleted: false},
      {id: 5, title: 'Learn React Native', isCompleted: false},
      {id: 6, title: 'Learn React Native', isCompleted: false},
    
    ]
  );

  const [selectedTab, setSelectedTab] = useState('all')

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
    const updateTodoList = [...todoList]
    const index = updateTodoList.findIndex(t => t.id === updatedTodo.id);

    updateTodoList[index] = updatedTodo;
    setTodoList(updateTodoList);

  }

  function renderTodoList() {
    return todoList.map((todo , i) => <View style={styles.cardItem}  key={todo.id}>
      <CardTodo todo={todo} onPress={updateTodo}/>
    </View>)
  }
  return <><SafeAreaProvider >
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <ScrollView>
          {renderTodoList()}
        </ScrollView>
        {/* {todoList.map((todo, i) => <CardTodo todo={todoList}  key={i}/>)} */}
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
   <View style={styles.footer}>
   <TableBottomMenu selectedTab={selectedTab} onPress={setSelectedTab} todoList={todoList}/>
 </View></>
}

const styles = StyleSheet.create({
root: {
  flex: 1,
 },
 text: {
  fontSize: 15

 },
 app: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
 },
 header:{
  flex: 1,
  // backgroundColor: 'red'
 },
 body: {
  flex: 5,
 },
 footer: {
  height: 70,
 },
 cardItem: {
  marginBottom: 15
 }
});
