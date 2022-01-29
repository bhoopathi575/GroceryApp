import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import { useEcommerceContext } from '../../../contexts/ContextProvider';
import CartItem from '../../../components/user/orders/CartItem';
import CartModel from '../../../models/cart';
import OrderModel from '../../../models/order';
import CartItemModal from '../../../models/cartItem';
import checkAndWriteFile from '../../../functions/checkAndWriteFile';
import Button from '../../../components/UI/Button';
import generateID from '../../../functions/generateId';
import RoundButton from '../../../components/UI/RoundButtton';
import { taxes } from '../../../constants/taxes';
import Map from './Map';
import moment from 'moment';
import { SendEmail } from '../../../agent/agent';

const Cart = props => {
    const {
        auth,
        cart,
        setCart,
        allData,
        setAllData,
        setOrders,
        orders,
        location,
        setLocation,
        showMapScreen,
        setShowMapScreen,
    } = useEcommerceContext();
      
    const cartIndex = cart.findIndex(cartItem => cartItem.username == auth.loginUserInfo.username);

    let totalPrice = 0;
    let totalGst = 0;
    let totalQst = 0;
    let totalAmount = 0;
    try {

        cart[cartIndex].items.forEach(item => {
            totalPrice += parseFloat(item.totalPrice);
        })
        totalGst = (totalPrice*taxes.gst)/100;
        totalQst = (totalPrice*taxes.qst)/100;
        totalAmount = totalPrice + totalGst + totalQst;
    } catch (err) {
        totalPrice = 0
    }
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <View style={{ marginRight: 20 }}>
                <Text style={{ fontFamily: 'bold' }}>Total Price: ${totalPrice}</Text>
            </View>
        })
    }, [totalPrice])

    if (cartIndex == -1 || cart[cartIndex].items.length == 0) {
        return (
            <View style={{ ...styles.screen, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.noItemLabel}>No items here</Text>
            </View>
        )
    }

    const handleIncrementDecrement = async (id, category, increDecre, product) => {
        try{
        const cartIndex = cart.findIndex(cartItem => cartItem.username == auth.loginUserInfo.username);
        if (cartIndex == -1) return;


        const index = cart[cartIndex].items.findIndex(cartItem => cartItem.id == product.id);
        if (index == -1) return;

        const quantity = parseInt(increDecre == 'decrement' ? (product.quantity == 1 ? 1 : product.quantity - 1) : product.quantity + 1);
        console.log("MyQuan", quantity);
        const newCart = [...cart]
        cart[cartIndex].items.splice(index, 1, new CartItemModal(product.id, product.name, product.detail, product.price, product.uri, category, quantity, product.price * quantity))

        setCart(newCart);
        const newData = {
            ...allData,
            cart: newCart
        }
        await checkAndWriteFile(newData);
        setAllData(newData)
    } catch(e) {
        console.log("Error", e);
    }

    }


    const handleDeleteItem = async id => {
        const newCartItemData = cart[cartIndex].items.filter(item => item.id != id);
        const cartDuplicate = [...cart];
        cartDuplicate.splice(cartIndex, 1, new CartModel(
            auth.loginUserInfo.username,
            2,
            newCartItemData
        ))
        setCart(cartDuplicate);
        const newFileData = {
            ...allData,
            cart: cartDuplicate
        };
        await checkAndWriteFile(newFileData);
        setAllData(newFileData);
    }

    const handleOrder = async () => {
        const cartDuplicate = [...cart];
        cartDuplicate.splice(cartIndex, 1, new CartModel(
            auth.loginUserInfo.username,
            2,
            []
        ));
        setCart(cartDuplicate);

        var minutesToAdd = 3;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000).toUTCString();

        const newOrders = [
            ...orders,
            new OrderModel(
                generateID(),
                auth.loginUserInfo.username,
                new Date().toUTCString(),
                totalAmount,
                futureDate,
                'not picked yet',
                cart[cartIndex].items,
                location.place,
                totalGst,
                totalQst,
                location.id
            )
        ]
        const deliverytime = moment().add(3, 'minutes');
        const date = deliverytime.format('MMMM D YYYY');
        const time = deliverytime.format('HH a')
        setLocation(null);
        const OrderText = `The order will be delivered on ${date} by ${time}`;
        alert(OrderText);
        SendEmail(auth.loginUserInfo.username, auth.loginUserInfo.email, OrderText);
        setOrders(newOrders);

        const newFileData = {
            ...allData,
            cart: cartDuplicate,
            orders: newOrders
        };
        try{
        await checkAndWriteFile(newFileData);
        setAllData(newFileData);
        } catch(e) {
            alert(e);
        }
    }

    return (
        showMapScreen ? <Map/> :
        <View style={styles.screen}>
            <View style={{ flex: 0.8 }}>
                <ScrollView>
                    {cart[cartIndex].items.map((item) => (
                        <View key={item.id} style={{}}>
                            <CartItem title={item.name} price={item.totalPrice} quantity={item.quantity} deleteButton onDeleteItem={handleDeleteItem.bind(null, item.id)} />
                            {
                                item.category != 'no category' && (
                                    <View style={{ flexDirection: 'row' }}>
                                        <RoundButton up style={{ marginLeft: '6%' }} onPress={handleIncrementDecrement.bind(null, item.id, item.category, 'decrement', item)} />
                                        <RoundButton down style={{ marginLeft: 5 }} onPress={handleIncrementDecrement.bind(null, item.id, item.category, 'increment', item)} />
                                    </View>
                                )
                            }
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{ flex: 0.1 }}>
                <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <Text style={styles.totalBoxTextLeft}>Grand Total:</Text>
                    <Text style={styles.totalBoxTextRight}>$ {totalPrice}</Text>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <Text style={styles.totalBoxTextLeft}>GST ({taxes.gst} %):</Text>
                    <Text style={styles.totalBoxTextRight}>$ {totalGst}</Text>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <Text style={styles.totalBoxTextLeft}>QST ({taxes.qst} %):</Text>
                    <Text style={styles.totalBoxTextRight}>$ {totalQst.toFixed(2)}</Text>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <Text style={styles.totalAmountText}>Total Amount(Incl. Taxes): </Text>
                    <Text style={styles.totalAmountTextRight}>$ {totalAmount.toFixed(2)}</Text>
                </View>
            </View>
            <View style={{ flex: 0.1, justifyContent: 'flex-end', marginHorizontal: 20, marginBottom: 20 }}>
                <Button title={'Order Now'} onPress={() => (!location) ? setShowMapScreen(true) : handleOrder()} />
            </View>
        </View>
    );
}

export default Cart;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.secondary
    },
    noItemLabel: {
        fontSize: 16,
        fontFamily: 'light'
    },
    totalBoxTextLeft: {
        fontSize: 13,
        marginLeft: 20,
        flex: 0.8
    },
    totalBoxTextRight: {
        fontSize: 13,
        marginRight: 20,
        flex: 0.2,
    },
    totalAmountText: {
        fontSize: 13,
        marginLeft: 20,
        flex: 0.8,
        fontWeight: 'bold'    
    },
    totalAmountTextRight: {
        fontSize: 13,
        marginRight: 20,
        flex: 0.2,
        fontWeight: 'bold'    
    }
})
