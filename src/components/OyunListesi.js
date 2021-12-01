import React, {Component, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
    Button,
    KeyboardAvoidingView,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {argonTheme} from '../../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomAlertComponent from '../components/CustomAlertComponent';
import axios from 'axios';
import PropTypes from 'prop-types';


const {width: WIDTH} = Dimensions.get('window');


function Item({title, poster, navigation, sinif, id, rate, order,countProcess, topList}) {

    let tur = 4;
    let posterChange =  topList ? poster : 'http:' + poster.split('thumb').join('720p');
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            sinif.props.onPressFilmButton(id, title, posterChange, rate, tur);
        }}>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 5}}>
                <Text color={theme.COLORS.SIYAH} size={20} bold>{order}</Text>
            </View>
            <Image style={styles.image} source={{uri: posterChange}}/>
            <Block flex space="between" style={styles.cardDescription}>
                <Text color={theme.COLORS.SIYAH} bold>{title}</Text>
                <Rating
                    type='custom'
                    ratingColor='#B23AFC'
                    ratingCount={5}
                    imageSize={20}
                    startingValue={rate}
                    readonly={true}
                    style={{width: 100}}
                />
                <Block row space="between">
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Detay', {
                            id: id,
                            rate: rate,
                            tur: tur,
                            ProcessName: title,
                        })}>
                        <Text size={12} muted={false} color={false || argonTheme.COLORS.ACTIVE} bold>Detay</Text>
                    </TouchableWithoutFeedback>
                    <Text size={12} muted={false} color={argonTheme.COLORS.GRADIENT_END} bold>Oynanma Sayısı : {countProcess} </Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );


}


const alert = () => {
    Alert.alert(
        'Alert Title',
        'message',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
};


export class OyunListesi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertVisible: false,
            ad: '',
            rate: 0,
        };
    }


    render() {
        let {title, veri, navigation, tercih, zaman, topList} = this.props;
        //console.log(veri);
        return (
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                {tercih ?
                    <View style={{
                        width: '97%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: zaman ? '#676767' : '#FF6666',
                        borderRadius: 5,
                        padding: 5,
                    }}>
                        <Text color={theme.COLORS.WHITE} size={16} bold>{title}</Text>
                    </View>
                    : null}
                {!topList ?
                    <FlatList style={{width: '100%'}}
                              data={veri}
                              renderItem={({item}) => <Item title={item.title ? item.title : item.name}
                                                            poster={item.poster_path ? item.poster_path : item.cover.url}
                                                            navigation={navigation} sinif={this} id={item.id}
                                                            order={item.key} rate={item.rate} countProcess={0} topList={topList}/>}
                              keyExtractor={item => item.id.toString()}
                    />
                    :
                    <FlatList style={{width: '100%'}}
                              data={veri}
                              renderItem={({item, index}) => <Item title={item.ProcessName} poster={item.Path}
                                                                   navigation={navigation} sinif={this}
                                                                   id={item.ProcessId}
                                                                   order={index + 1} rate={item.RateAvarage}
                                                                   countProcess={item.CountProcess} topList={topList}/>}

                              keyExtractor={item => item.ProcessId.toString()}
                    />

                }
            </View>
        );
    }

}


OyunListesi.propTypes = {
    onPressFilmButton: PropTypes.func,
};

const styles = StyleSheet.create({
    item: {
        width: '94%',
        marginLeft: '3%',
        backgroundColor: '#FFFFFF',//'rgba(66,76,88,0.7)', //'#15BDD8', // '#28C6DB', // '#f9c2ff', //rgba(52, 52, 52, 0.7)
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
        borderRadius: 5,
    },
    image: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    title: {
        width: '70%',
        textAlignVertical: 'center',
        color: '#000',
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
    },

});



