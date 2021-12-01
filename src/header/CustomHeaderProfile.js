import React, {Component} from 'react';
import { View, TouchableOpacity, Image , StyleSheet } from 'react-native';
import { Block, Text, theme, Button } from "galio-framework";
import Icon from 'react-native-vector-icons/FontAwesome';
import { argonTheme } from "../../constants";
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';

const menu= require("../../assets/nucleo icons/svg/menu-8.svg");

export class CustomHeaderProfile extends Component {
    render(){
        let{title,navigation}= this.props;

        return(
            <View style={{ width:"100%", height:40, flexDirection: "row", justifyContent:"space-between", alignItems: "center", backgroundColor:"#182227"}}>
                {/* <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: "row", justifyContent:"flex-start", alignItems: "center"}}>
                    <Image style={{resizeMode: 'contain', width:25, marginRight:5}} source={require("../images/menu.png")}  />
                </TouchableOpacity>*/}
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileSettings', {userid:2})} style={{width:"33%",flexDirection: "row", justifyContent:"flex-start", alignItems: "center",  padding: 12, position: 'relative'}}>
                    <Iconm name={'settings-outline'} size={20} color="#fff"/>
                </TouchableOpacity>
                <Text size={16}  color={"white"} bold>{title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Bildirimler')} style={{width:"33%",flexDirection: "row", justifyContent:"flex-end", alignItems: "center",  padding: 12, position: 'relative',}}>
                    <Icon name="bell" size={20} color={"white"} />
                    {/*<Block middle style={styles.notify} />*/}
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


