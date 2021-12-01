import React, {Component} from 'react';
import { View, TouchableOpacity, Image , StyleSheet } from 'react-native';
import { Block, Text, theme, Button } from "galio-framework";
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/Ionicons';
import { argonTheme } from "../../constants";

const menu= require("../../assets/nucleo icons/svg/menu-8.svg");

export class CustomHeader2 extends Component {
    render(){
        let{title,navigation}= this.props;

        return(
            <View style={{ width:"100%", height:40, flexDirection: "row", justifyContent:"space-between", alignItems: "center", backgroundColor:"#182227"}}>
                {/* <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: "row", justifyContent:"flex-start", alignItems: "center"}}>
                    <Image style={{resizeMode: 'contain', width:25, marginRight:5}} source={require("../images/menu.png")}  />
                </TouchableOpacity>*/}

                <TouchableOpacity style={{width:"10%",  padding: 12}} onPress={() => navigation.goBack() }><Iconi name="ios-arrow-back" size={20} color={"white"} /></TouchableOpacity>
                <Text size={16}  color={"white"} style={{width:"75%", textAlign:"center",  padding: 2}} bold>{title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Bildirimler')} style={{width:"15%",flexDirection: "row", justifyContent:"flex-end", alignItems: "center",  padding: 12, position: 'relative',}}>

                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    notify: {
        backgroundColor: argonTheme.COLORS.LABEL,
        borderRadius: 4,
        height: theme.SIZES.BASE / 2,
        width: theme.SIZES.BASE / 2,
        position: 'absolute',
        top: 9,
        right: 12,
    },
});


