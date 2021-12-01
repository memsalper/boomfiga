import React, {Component} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ImageBackground,
    Dimensions,
    Text,
    FlatList,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';

import {CustomHeader} from '../header/CustomHeader';
import {FilmListesi} from '../components/FilmListesi';
import {DiziListesi} from '../components/DiziListesi';
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');
export class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [
                {
                    id:75780,
                    key:1,
                    filmId:"75780", //jack render
                    poster_path:"7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg",
                    title:"Jack Reacher: Never Go Back",
                    rate:2,
                },
                {
                    id:77862,
                    key:2,
                    filmId:"77862", //anadolu kartalları
                    poster_path:"gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg",
                    title:"anadolu kartalları",
                    rate:3,
                },
                {
                    id:75780,
                    key:3,
                    filmId:"75780", //jack render
                    poster_path:"7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg",
                    title:"Jack Reacher: Never Go Back",
                    rate:2,
                },
                {
                    id:77862,
                    key:4,
                    filmId:"77862", //anadolu kartalları
                    poster_path:"gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg",
                    title:"anadolu kartalları",
                    rate:3,
                },
                {
                    id:75780,
                    key:5,
                    filmId:"75780", //jack render
                    poster_path:"7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg",
                    title:"Jack Reacher: Never Go Back",
                    rate:3,
                },
                {
                    id:77862,
                    key:6,
                    filmId:"77862", //anadolu kartalları
                    poster_path:"gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg",
                    title:"anadolu kartalları",
                    rate:3,
                },
                {
                    id:75780,
                    key:7,
                    filmId:"75780", //jack render
                    poster_path:"7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg",
                    title:"Jack Reacher: Never Go Back",
                    rate:2,
                },
                {
                    id:77862,
                    key:8,
                    filmId:"77862", //anadolu kartalları
                    poster_path:"gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg",
                    title:"anadolu kartalları",
                    rate:3,
                },
                {
                    id:77862,
                    key:9,
                    filmId:"77862", //anadolu kartalları
                    poster_path:"gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg",
                    title:"anadolu kartalları",
                    rate:3,
                }
            ],
            series:[],
            isVisibleM: true,
            isVisibleS: false,
            selectedValue1:"",
            selectedValue2:5,
            selectedValue3:"",

        };
    }

    render(){
        let{navigation}= this.props;
        const isVisibleM = this.state.isVisibleM;
        const isVisibleS = this.state.isVisibleS;
        const films =this.state.films;
        const series = this.state.series;
        const {selectedValue1, selectedValue2, selectedValue3}= this.state;



       //console.log(films);
        return (
            <View style={styles.containerIn}>
                <ImageBackground
                    source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                <CustomHeader title={'Filmler'} navigation={navigation}/>
                <View style={{flexDirection:"row", backgroundColor:"rgba(24,34,77,0.8)"}}>
                    <Picker
                        style={{height: 30, width: "33%", color:"white"}}
                        selectedValue={this.state.selectedValue1}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue1: itemValue})
                        }
                    >

                        <Picker.Item label={"Şuan"} value={"Şuan"} key={0}></Picker.Item>
                        <Picker.Item label={"Geçmiş"} value={"Geçmiş"} key={1}></Picker.Item>
                    </Picker>
                    <Picker
                        style={{height: 30, width: "33%", color:"white"}}
                        selectedValue={this.state.selectedValue2}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue2: itemValue})
                        }>

                        <Picker.Item label={"Top5"} value={5} key={0}></Picker.Item>
                        <Picker.Item label={"Top10"} value={10} key={1}></Picker.Item>
                    </Picker>
                    <Picker
                        style={{height: 30, width: "35%", color:"white"}}
                        selectedValue={this.state.selectedValue3}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue3: itemValue})
                        }>

                        <Picker.Item label={"Arkadaşlar"} value={"Arkadaşlar"} key={0}></Picker.Item>
                        <Picker.Item label={"Türkiye"} value={"Türkiye"} key={1}></Picker.Item>
                    </Picker>

                </View>
                    <View style={{flex: 1, width: '100%', paddingBottom: HeaderHeight * 1.5}}>
                        {
                            isVisibleM ?
                                <FilmListesi title={'Filmler'} veri={films.slice(0,selectedValue2)} navigation={navigation} tercih={false} zaman={true}/>
                                :
                                null
                        }
                        {
                            isVisibleS?
                                <DiziListesi title={'Diziler'} veri={series} navigation={navigation}/>
                                :
                                null
                        }
                    </View>
                </ImageBackground>
            </View>
        );

    }

}



const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 5,
    },
    containerIn: {
        backgroundColor: 'white',
        flex: 1,
    },
    txtIn: {
        width: WIDTH - 140,
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
    },
    buton: {
        width: WIDTH - 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 10,

    },
    item: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)', // '#28C6DB', // '#f9c2ff',
        justifyContent: 'flex-start',
        flex: 1,
        margin: 5,
        flexDirection: 'row',
    },
    image: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
        margin: 7,
        borderRadius: 7,
    },
    title: {
        width: '70%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000',
    },
    profileContainer: {
        width: width,
        height: height,
        alignItems: 'center',
    },
    profileBackground: {
        width: width,
        height: height,
    },

});
