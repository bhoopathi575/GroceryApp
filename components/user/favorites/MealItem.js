import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Badge from '../../UI/Badge';

const MealItem = props => { // fullInfo
    return (

        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetails', { item: props.fullInfo, category: props.fullInfo.category })} style={styles.mealItem}>
            <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                <Text style={styles.text}>{props.price}$</Text>
                <Badge text={props.details} favorite />
            </View>
        </TouchableOpacity>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        margin: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5
    },
    star: {
        position: 'absolute',
        right: 10,
        top: 5,
        transform: [{ rotate: '40deg' }],
    },
    text: {
        fontFamily: 'stylish'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%',
        flex: 1
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba( 0, 0, 0, .5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    circle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'black',
        opacity: 0.5,
        top: -54,
        right: -38
    }
});
