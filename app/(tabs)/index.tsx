import { Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Text, View, ScrollView, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import {CardTodo} from '../../components/CardTodo/CardTodo';
import {TableBottomMenu} from '../../components/TabBottomMenu/TabBottomMenu';
import {ButtonAdd} from '../../components/ButtonAdd/ButtonAdd';
import Dialog from "react-native-dialog";
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  const [todoList, setTodoList] = useState<any>(
    [
    ]
  );
  const [inputValue, setInputValue] = useState('');

  const [selectedTab, setSelectedTab] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  let isFirstRender = true

  useEffect(() => {
    loadData()
  },[])
  useEffect(() => {
    if(!isFirstRender) {
      saveData()

    }else {
      isFirstRender = false
    }
  }, [todoList])

  async function loadData() {
    try{
      const todoListString = await AsyncStorage.getItem('@todoList');
      if(todoListString) {
        const parseString = JSON.parse(todoListString);
        setTodoList(parseString)

      }
    }catch(err) {
      console.log(err)
    }
  }

  async function saveData() {

    try{
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList))
    }catch(err) {
      console.log(err)
    }
  }

  function updateTodo(todo : any) {
    if(!todo.length) return
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
    const updateTodoList:any = [...todoList] 
    const index = updateTodoList.findIndex((t:any) => t?.id === updatedTodo?.id);

    updateTodoList[index] = updatedTodo;
    setTodoList(updateTodoList);

  }

  function getFilteredList() {
    
    switch(selectedTab) {
      case 'all':
        return todoList;
      case 'inProgress':
        return todoList.filter((todo:any) => !todo?.isCompleted );
      
      case 'done':
        return todoList.filter((todo:any) => todo?.isCompleted)
      
    }
  }

  function onLongPress(todo: any) {

    Alert.alert('Delete todo', 'Are you sure you want to delete this todo ?', [
      {text: 'Delete',
        style: 'destructive',
        onPress: () => {
          console.log('Delete this todo', todo);
          let filtered = todoList.filter((el: any) => el.id !== todo.id);
          setTodoList(filtered)
        },

      },
      {text: 'Cancel', style: 'cancel'}
    ])

  }

  function renderTodoList() {
    return getFilteredList()?.map((todo:any , i:any) =>  <View style={styles.cardItem}  key={todo.id}>
       <CardTodo todo={todo} onPress={updateTodo} onLongPress={onLongPress} /> 
    </View>)
  }

  function showDialog() {
    return setShowAddDialog(true)
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false
    }
    setTodoList([...todoList, newTodo])
    setShowAddDialog(false)
    setInputValue("");
  }

  function renderAddDialog() {
    return ( <Dialog.Container visible={showAddDialog} onBackdropPress={() => setShowAddDialog(false)}>
      <Dialog.Title>Add todo</Dialog.Title>
      <Dialog.Description>
       Choose a name for your todo
      </Dialog.Description>
      <Dialog.Input onChangeText={setInputValue} placeholder='Ex: Go to the dentis'/>
      <Dialog.Button label="Cancel" onPress={() =>{}} />
      <Dialog.Button label="Save" onPress={() =>addTodo()} disabled={inputValue.length ===0} />
    </Dialog.Container>
    )
  }
  return <><SafeAreaProvider >
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <ScrollView>
          {   renderTodoList()}
        </ScrollView>
        {/* {todoList.map((todo, i) => <CardTodo todo={todoList}  key={i}/>)} */}
      </View>
      <ButtonAdd onPress={showDialog} />
    </SafeAreaView>
  </SafeAreaProvider>
   <View style={styles.footer}>
   <TableBottomMenu selectedTab={selectedTab} onPress={setSelectedTab} todoList={todoList}/>
 </View>
 {renderAddDialog()}
 </>
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
