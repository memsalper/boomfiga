import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import {argonTheme} from '../../constants';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';

const menu = require('../../assets/nucleo icons/svg/menu-8.svg');

const profileMe = require('../images/pp.jpg');

export class CustomHeaderAddProcess extends Component {
    render() {
        let {title, navigation, poster, tur} = this.props;
        return (
            <Block middle row style={{
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: '#182227',
                flexWrap: 'wrap',
            }}>
                <Block middle row style={{padding: 12}}>
                    <Image
                        source={profileMe}
                        style={styles.avatar}
                    />
                </Block>
                <Block middle style={{width: '50%', justifyContent: 'flex-start', padding: 5}}>
                    <Text size={16} color={'white'} style={{textAlign: 'center'}} bold>{title}</Text>
                </Block>

                <Block middle row
                       style={{justifyContent: 'flex-end', alignItems: 'center', padding: 12, position: 'relative'}}>
                    <Image style={styles.image} source={{uri: poster }}/>
                </Block>
            </Block>
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 62,
        borderWidth: 0,
    },
    image: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 10,
    },
});


