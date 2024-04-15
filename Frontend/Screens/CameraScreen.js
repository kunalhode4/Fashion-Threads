import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { PinchableBox, State, GestureHandlerRootView } from 'react-native-gesture-handler';


const CameraScreen = ({ route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const { image } = route.params;
    const [scale, setScale] = useState(1);

    const host = "192.168.228.33:5000";

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    // const onPinchGestureEvent = (event) => {
    //     setScale(event.nativeEvent.scale);
    // };

    // const onPinchHandlerStateChange = (event) => {
    //     if (event.nativeEvent.state === State.END) {
    //         // Handle pinch gesture end, you can update the image size here
    //         const newWidth = 500 * scale; // Adjust the scaling factor as needed
    //         const newHeight = 500 * scale; // Adjust the scaling factor as needed

    //         // Update the shirtImage styles
    //         setShirtImageStyle({
    //             width: newWidth,
    //             height: newHeight,
    //             resizeMode: 'contain',
    //         });
    //     }
    // };

    const [shirtImageStyle, setShirtImageStyle] = useState({
        width: 500,
        height: 500,
        maxWidth: 600,
        resizeMode: 'contain',
    });




    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handlePlus = () => {
        let currWidth = shirtImageStyle.width;
        let currHeight = shirtImageStyle.height;
        setShirtImageStyle({
            width: currWidth + 100,
            height: currHeight + 100,
            resizeMode: 'contain'
        })
    }

    const handleMinus = () => {
        let currWidth = shirtImageStyle.width;
        let currHeight = shirtImageStyle.height;
        setShirtImageStyle({
            width: currWidth - 100,
            height: currHeight - 100,
            resizeMode: 'contain'
        })
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.preview} type={type}>
                {/* <GestureHandlerRootView style={{ flex: 1 }}>
                    <PinchGestureHandler
                        onGestureEvent={onPinchGestureEvent}
                        onHandlerStateChange={onPinchHandlerStateChange}
                    > */}
                <View style={styles.overlay}>
                    <Image source={{uri: `http://${host}/images/${image}`}} style={shirtImageStyle} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 50 }}>
                    <TouchableOpacity style={styles.plusButton} onPress={handlePlus}>
                        <Text style={{ fontSize: 30 }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.minusButton} onPress={handleMinus}>
                        <Text style={{ fontSize: 30 }}>-</Text>
                    </TouchableOpacity>
                </View>



                {/* </PinchGestureHandler>
                </GestureHandlerRootView> */}
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shirtImage: {
        width: 500,
        height: 500,
        resizeMode: 'contain',
    },
    captureButtonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    captureButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
    },
    captureButtonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    plusButton: {
        border: 2,
        backgroundColor: '#3498db',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    minusButton: {
        border: 2,
        backgroundColor: '#3498db',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 15
    },
});

export default CameraScreen;
