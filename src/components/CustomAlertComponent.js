import React from 'react';
import {StyleSheet, Modal, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Input, Block, theme} from 'galio-framework';
import {argonTheme} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';


export default class CustomAlertComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            degistir: 'center',
            rate: this.props.rate ? this.props.rate : 0,
            size: null,
            description: 'aa',
        };

    }

    onNegativeButtonPress = () => {
        this.props.onPressNegativeButton();
    };

    onPositiveButtonPress = () => {
        this.props.onPressPositiveButton(this.state.rate, this.state.description);
    };
    ratingCompleted = (rating) => {
        this.setState({
            rate: rating,
        });
    };

    size = () => {
        this.props.buyut();
    };
    _onChangeTextDescription = text => (
        this.setState({
            description: text,
        })
    );

    render() {
        return (
            <Modal
                visible={this.props.displayAlert}
                transparent={true}
                animationType={'fade'}>
                <KeyboardAvoidingView style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center'}}
                                      behavior={'height'} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.mainOuterComponent}>
                        <View style={{
                            flexDirection: 'column',
                            height: this.props.size ? this.props.size : '25%', // '25%',
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.9)', //'rgb(64,64,64)',//'rgba(64,64,64,0.9)', //#404040
                            // borderWidth: 2,
                            // borderColor: '#FF0000',
                            borderRadius: 10,
                            padding: 4,
                        }}>
                            {/* First ROw - Alert Icon and Title */}
                            <View style={styles.topPart}>
                                {
                                    this.props.displayAlertIcon
                                    &&
                                    <Image
                                        source={require('../images/ic_notification.png')}
                                        resizeMode={'contain'}
                                        style={styles.alertIconStyle}
                                    />
                                }
                                <Text style={styles.alertTitleTextStyle}>
                                    {`${this.props.alertTitleText}`}
                                </Text>
                            </View>
                            {/* Second Row - Alert Message Text */}
                            <View style={styles.middlePart}>
                                {this.props.alertMessageText ?
                                    <Text style={styles.alertMessageTextStyle}>
                                        {`${this.props.alertMessageText}`}
                                    </Text>
                                    : null
                                }

                                {
                                    this.props.displayRateAndComment
                                        ?
                                        <View>
                                            <Rating
                                                type='custom'
                                                ratingColor='#B23AFC'
                                                ratingCount={5}
                                                imageSize={30}
                                                startingValue={this.props.rate}
                                                onFinishRating={this.ratingCompleted}
                                                ozelArkaPlan={'rgba(0,0,0,0.9)'}
                                            />
                                            <TextInput style={styles.commentStyle}
                                                       onChangeText={this._onChangeTextDescription}
                                                       value={this.state.description}
                                                       placeholder={'Var ise yorumunuzu giriniz..'}
                                                       placeholderTextColor={'#fff'}
                                                       multiline={true}
                                                       onFocus={this.size}
                                            />
                                        </View>

                                        : <View style={{padding: 12}}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddProcess', {title: 'Arkadaşlar', tur: 0})}>
                                                <Icon name="adduser" size={25} color={theme.COLORS.WHITE}/>
                                            </TouchableOpacity>
                                        </View>
                                }


                            </View>
                            {/* Third Row - Positive and Negative Button */}
                            <View style={styles.bottomPart}>
                                {
                                    this.props.displayDeleteButton
                                    &&
                                    <TouchableOpacity
                                        onPress={this.onPositiveButtonPress}
                                        style={styles.alertMessageButtonStyled}>
                                        <Text
                                            style={styles.alertMessageButtonTextStyle}>{this.props.deleteButtonText}</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    this.props.displayPositiveButton
                                    &&
                                    <TouchableOpacity
                                        onPress={this.onPositiveButtonPress}
                                        style={styles.alertMessageButtonStyle}>
                                        <Text
                                            style={styles.alertMessageButtonTextStyle}>{this.props.positiveButtonText}</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    this.props.displayNegativeButton
                                    &&
                                    <TouchableOpacity
                                        onPress={this.onNegativeButtonPress}
                                        style={styles.alertMessageButtonStylen}>
                                        <Text
                                            style={styles.alertMessageButtonTextStyle}>{this.props.negativeButtonText}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

CustomAlertComponent.propTypes = {
    size: PropTypes.string,
    displayAlert: PropTypes.bool,
    displayAlertIcon: PropTypes.bool,
    alertTitleText: PropTypes.string,
    alertMessageText: PropTypes.string,
    displayPositiveButton: PropTypes.bool,
    positiveButtonText: PropTypes.string,
    displayNegativeButton: PropTypes.bool,
    negativeButtonText: PropTypes.string,
    onPressPositiveButton: PropTypes.func,
    onPressNegativeButton: PropTypes.func,
    buyut: PropTypes.func,
};

// export default CustomAlertComponent;

const styles = StyleSheet.create({
    mainOuterComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // opacity:0.5,
    },
    mainContainer: {
        flexDirection: 'column',
        height: '25%', // '25%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)', //'rgb(64,64,64)',//'rgba(64,64,64,0.9)', //#404040
        // borderWidth: 2,
        // borderColor: '#FF0000',
        borderRadius: 10,
        padding: 4,
    },
    topPart: {
        flex: 0.5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#00FF00',
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    middlePart: {
        flex: 1,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#FF6600',
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 16,
        marginVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomPart: {
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#0066FF',
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'space-evenly',
    },
    alertIconStyle: {
        // borderWidth: 1,
        // borderColor: '#cc00cc',
        height: 25,
        width: 25,
    },
    alertTitleTextStyle: {
        flex: 1,
        textAlign: 'justify',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        // borderWidth: 1,
        // borderColor: '#660066',
        padding: 2,
        marginHorizontal: 2,
    },
    alertMessageTextStyle: {
        color: '#FFFFFF',//'#B23AFC',//rgba(24,34,77,0.8)
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginTop: 5,
    },
    alertMessageButtonStyle: {
        width: '35%',
        height: 30,
        paddingHorizontal: 6,
        marginVertical: 4,
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.ACTIVE, //"rgba(24,34,77,0.8)",//'#B23AFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertMessageButtonStylen: {
        width: '30%',
        height: 30,
        paddingHorizontal: 6,
        marginVertical: 4,
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.ERROR, //"rgba(24,34,77,0.8)",//'#B23AFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertMessageButtonStyled: {
        width: '30%',
        height: 30,
        paddingHorizontal: 6,
        marginVertical: 4,
        borderRadius: 5,
        backgroundColor: 'red',// '#80BFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertMessageButtonTextStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    commentStyle: {
        color: '#fff',
        //borderWidth:1,
        //borderColor:"#fff",
    },


});
