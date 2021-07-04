import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const API = "https://rsvpapi.free.beeceptor.com";


const FirstScreen = () => {
    const [name, onChangeName] = useState("");
    const [age, onChangeAge] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    // const [date, onChangeDate] = useState("");
    const [locality, onChangeLocality] = useState("");
    const [address, onChangeAddress] = useState("");
    const [professionPicker, setProfessionalPicker] = useState('');
    const [guestPicker, setGuestPicker] = useState('');

    const [date, setDate] = useState();
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };

    const onSubmit = () => {

        if (name === "") {
            return Alert.alert('Please enter Name');
        }
        else if (age === "") {
            return Alert.alert('Please enter Age');
        }
        else if (date === "") {
            return Alert.alert('Please enter date');
        }
        else if (locality === "") {
            return Alert.alert('Please enter Locality');
        }
        else if (address === "") {
            return Alert.alert('Please enter Address');
        }
        else if (professionPicker === "") {
            return Alert.alert('Please Pick profession');
        }
        else if (guestPicker === "") {
            return Alert.alert('Please pick Guest');
        }
        else {
            var data = new FormData();
            data.append("name", name);
            data.append("age", age);
            data.append("date", date);
            data.append("profession", professionPicker);
            data.append("locality", locality);
            data.append("guest", guestPicker);
            data.append("address", address);

            fetch(API + "/users", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            })
                .then(res => Alert.alert("success"))
                .catch(err => console.log(err))
        }

    }


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image style={{ width: 400, height: 150 }} source={require("../assets/rsvp.jpg")} />
            </View>
            <View style={styles.bodyContent}>
                <ScrollView style={{ alignContent: "space-around" }}>
                    <View style={{ padding: 25 }} >
                        <TextInput style={styles.formInputName}
                            onChangeText={onChangeName} value={name} placeholder="Name"
                        />
                        <TextInput style={styles.formInputAge}
                            placeholder="Age" onChangeText={onChangeAge} keyboardType="numeric" value={age}
                        />
                        <Picker style={styles.professionPicker} selectedValue={professionPicker}
                            onValueChange={(itemValue) => setProfessionalPicker(itemValue)} >
                            <Picker.Item label="Select Profession" style={{ color: "brown" }} />
                            <Picker.Item label="Student" value="Student" />
                            <Picker.Item label="Employed" value="Employed" />
                        </Picker>
                        <TextInput style={styles.formInputDate}
                            placeholder="Locality" onChangeText={onChangeLocality} value={locality}
                        />
                        <Picker style={styles.guestPicker} selectedValue={guestPicker}
                            onValueChange={(itemValue) => setGuestPicker(itemValue)} >
                            <Picker.Item label="Number of Guests" style={{ color: "brown" }} />
                            <Picker.Item label="0" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                        </Picker>
                        <TouchableOpacity title="Show Date Picker" onPress={showDatePicker} style={styles.datePicker} >
                            <Text style={{ color: "#FFF", fontSize: 20, textAlign: 'center', borderRadius: 2, marginTop: 5, marginBottom: 5 }}>D.O.B</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal style={styles.formInputDate} isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <TextInput style={styles.formInputDate} multiline
                            placeholder="Address" onChangeText={onChangeAddress} value={address} maxLength={50}
                            numberOfLines={4}
                        />
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => onSubmit()}>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    datePicker: {
        color: "#FFF",
        backgroundColor: "brown",
        marginTop: 10
    },
    header: {
        flex: 1.5,
        width: 80,
        height: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "40%"
    },
    bodyContent: {
        flex: 4.5,
    },
    formInputName: {
        borderBottomWidth: 2,
        borderBottomColor: "brown",
        width: 330
    },
    formInputAge: {
        borderBottomWidth: 2,
        borderBottomColor: "brown",
        width: 330,
        marginTop: 10
    },
    formInputDate: {
        borderBottomWidth: 2,
        borderBottomColor: "brown",
        width: 330,
        marginTop: 10
    },
    professionPicker: {
        width: 330,
        height: 45,
        borderWidth: 2,
        borderBottomColor: "brown",
        marginTop: 30
    },
    guestPicker: {
        width: 330,
        height: 45,
        marginTop: 30
    },
    button: {
        backgroundColor: 'brown', width: 130,
        marginVertical: 45, padding: 5, borderRadius: 5, textAlign: 'center', color: 'white'
    }
});

export default FirstScreen;