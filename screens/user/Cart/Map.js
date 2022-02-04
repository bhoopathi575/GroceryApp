import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import  places from '../../../constants/places';
import Button from '../../../components/UI/Button';
import { useEcommerceContext } from '../../../contexts/ContextProvider';
import Dialog from "react-native-dialog";

const MapScreen = (props) => {
  const [location, setLocationLocal] = React.useState(null);
  const { setLocation, setShowMapScreen } = useEcommerceContext();
  const [deliveryType, setDeliveryType] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const confirmLocation = () => {
    if(location && deliveryType) {
      setLocation(location)
      setShowMapScreen(false);
    } else {
      alert("Please enter the address");
    }
  }
  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}>
          <View style={{ flex: 0.23, width: "100%"}}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.3 }}>
              <Text
                style={{ textAlign: "right", marginTop: 7, fontWeight: "600" }}
              >
                Home Delivery
              </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <RadioButton
                status={deliveryType == "Home Delivery" ? "checked" : "unchecked"}
                value={"Home Delivery"}
                s
                onPress={() => setDeliveryType("Home Delivery")}
              />
            </View>
            <View style={{ flex: 0.12, marginTop: 7, fontWeight: "600" }}>
              <Text>Pickup</Text>
            </View>
            <View style={{ flex: 0.38 }}>
              <RadioButton
                status={deliveryType == "Pickup" ? "checked" : "unchecked"}
                value={"Pickup"}
                onPress={() => setDeliveryType("Pickup")}
              />
            </View>
          </View>
          {deliveryType && deliveryType == "Pickup" && (
            <ScrollView>
              {places.map((place, index) => (
                <View
                  key={`data-pd-${index}`}
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 0.9 }}>
                    <Text style={{ marginLeft: 8 }}>{place.place}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <RadioButton
                      value={place}
                      onPress={() => setLocationLocal(place)}
                      status={
                        location != null && place.id == location.id
                          ? "checked"
                          : "unchecked"
                      }
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          {deliveryType && deliveryType == "Home Delivery" && (
            <View>
              <TextInput
                label="Enter your home address"
                defaultValue={""}
                // value={location && !(location.id) && location.place ? (location.place) : ""}
                onChangeText={(val) =>
                  setLocationLocal({
                    id: null,
                    place: val,
                    lat: null,
                    lng: null,
                  })
                }
              />
            </View>
          )}
        </View>
        <View style={{flex: 0.70}}>
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: 45.54094549626333,
              longitude:-73.65770615971782,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            >
            {!(location && location.lat && location.lng) ? null : [location].map((place) => 
              <Marker
                key={`marker-place-${place.id}`}
                coordinate={{latitude: parseFloat(place.lat), longitude: parseFloat(place.lng)}}
                title={place.place} 
              />
            )}
          </MapView>
        </View>
        
        <View style={{flex: 0.07, width: '100%' }}>
          <Button title={'Confirm Location'} onPress={() => confirmLocation()} style={{height: '100%', width: '100%'}}/>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height
  },
  map: {
    width: Dimensions.get('window').width,
    height:'100%',
  },
});

export default MapScreen;