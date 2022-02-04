import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black, Inter_800ExtraBold, } from '@expo-google-fonts/inter';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import Button from '../components/UI/Button';
import { useEcommerceContext } from '../contexts/ContextProvider';
const { width } = Dimensions.get('window');

export default function OnBoarding(props) {

    const [isShowData, setIsShowData] = useState(false);
    const { auth } = useEcommerceContext();
    const process = async () => {
        if (auth.whoIsLogin) {
            props.navigation.replace('DrawerCartStackNavigator')
        } else {
            setIsShowData(true);
        }
    }

    useEffect(() => {
        process()
    })

    let [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_800ExtraBold,
        'Lato-Black': require('../assets/fonts/Lato-Regular.ttf'),
        'italic': require('../assets/fonts/Lato-LightItalic.ttf'),
        'bold': require('../assets/fonts/Lato-Bold.ttf'),
        'stylish': require('../assets/fonts/DroidSerif-Bold.ttf'),
        'stylish2': require('../assets/fonts/stylish.ttf'),
        'stylish3': require('../assets/fonts/DescMenu.ttf'),
        'text-bold': require('../assets/fonts/Dosis-Bold.ttf'),
        'extra-bold': require('../assets/fonts/Dosis-ExtraBold.ttf'),
        'open-sans': require('../assets/fonts/open-sans.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        'light': require('../assets/fonts/Lato-Light.ttf'),
    });

    if (!fontsLoaded || !isShowData) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.screen}>
                <View >
                    <View >
                        <Image source={require('../assets/images/ecommerce.jpg')} style={{ width: '100%', height: '100%', borderRadius: 20 }} resizeMode={'contain'} />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button style={{ height: 50, borderRadius: 20, color: colors.orange }} title="Get Started" onPress={() => props.navigation.navigate('Auth')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {


        // marginTop: Constants.statusBarHeight,
        backgroundColor: colors.white,
        padding: 20
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        marginBottom: 12
    },
    text: {
        fontSize: 48,
        fontFamily: 'Inter_900Black',
        color: 'white'
    }
})
