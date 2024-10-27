import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface PaymentResultScreenProps {
    route: {
        params: {
            success: boolean;
        };
    };
}

const PaymentResultScreen: React.FC<PaymentResultScreenProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { success } = route.params as { success: boolean };
    console.log(success);

    return (
        <View style={styles.container}>
            <View style={[styles.circle, success ? styles.successCircle : styles.failureCircle]}>
                <Ionicons
                    name={success ? "checkmark" : "close"}
                    size={80}
                    color="white"
                />
            </View>
            <Text style={styles.resultText}>
                {success ? "Payment Successful" : "Payment Failed"}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("HomeScreen" as never)}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successCircle: {
        backgroundColor: 'green',
    },
    failureCircle: {
        backgroundColor: 'red',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A767C2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentResultScreen;