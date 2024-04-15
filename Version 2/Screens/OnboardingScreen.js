import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window")
export default function OnboardingScreen() {
    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate("Home");
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton}{...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.LottieP}>
                                <LottieView source={require('../assets/Animations/Shopping.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Futurize',
                        subtitle: 'Step into the Future with Fashion Threads!',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View style={styles.LottieP}>
                                <LottieView source={require('../assets/Animations/S2.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Augmentize',
                        subtitle: 'Experience the Extraordinary! Augmented Reality transforms your surroundings',
                    },

                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <View style={styles.LottieP}>
                                <LottieView source={require('../assets/Animations/S3.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Discoverize',
                        subtitle: 'Unleash the Future Fashion Threads transforms reality with virtual enhancements and interactive elements',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    LottieP: {
        width: 300,
        height: 400
    },

    doneButton: {
        padding: 20
    }
})