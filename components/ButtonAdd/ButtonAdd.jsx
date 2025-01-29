import { TouchableOpacity, Text } from "react-native";
import { styles } from "./ButtonAdd.style";

export function ButtonAdd({onPress}) {
    return <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.txt}>+ New Todo</Text>
    </TouchableOpacity>
}