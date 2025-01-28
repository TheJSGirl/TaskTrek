import React from "react";
import {styles} from './Header.style';
import logoImg from '../../assets/logo.png'
import { Text, Image } from "react-native";

export default function Header() {
    return <>
    <Image source={logoImg}  style={styles.img} resizeMode="contain"/>
    <Text style={styles.subtitle}>You probably have something to do</Text>
    </>
}