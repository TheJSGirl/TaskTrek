import { TouchableOpacity, Text, Image } from "react-native";
import checkImg from "../../assets/check.png";
import { styles } from "./CardTodo.style";

export function CardTodo({todo, onPress, onLongPress}) {
    return <TouchableOpacity style={styles.card} onLongPress={() => onLongPress(todo)} onPress={() => onPress(todo)}>
        <Text style={[styles.title, todo.isCompleted && {textDecorationLine : 'line-through'}]}>{todo.title}</Text>
        {todo.isCompleted && <Image source={checkImg}  style={styles.img}/>}
    </TouchableOpacity>
}