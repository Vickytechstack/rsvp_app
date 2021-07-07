import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const API = 'https://rsvpapi.free.beeceptor.com';

const FirstScreen = () => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [locality, onChangeLocality] = useState('');
  const [address, onChangeAddress] = useState('');
  const [professionPicker, setProfessionalPicker] = useState('');
  const [guestPicker, setGuestPicker] = useState('');

  const [date, setDate] = useState('Date of Birth*');
  const [showDate, setShowDate] = useState(false);
  const Datepicker = (event, date) => {
    if (date == undefined) {
      setDate('Date of Birth*');
      setShowDate(false);
    } else {
      setDate(String(date).substring(4, 15));
      setShowDate(false);
    }
  };

  const onSubmit = () => {
    if (name === '') {
      return Alert.alert('Please enter Name');
    } else if (age === '') {
      return Alert.alert('Please enter Age');
    } else if (date === '') {
      return Alert.alert('Please enter date');
    } else if (locality === '') {
      return Alert.alert('Please enter Locality');
    } else if (address === '') {
      return Alert.alert('Please enter Address');
    } else if (professionPicker === '') {
      return Alert.alert('Please Pick profession');
    } else if (guestPicker === '') {
      return Alert.alert('Please pick Guest');
    } else {
      var data = new FormData();
      data.append('name', name);
      data.append('age', age);
      data.append('date', date);
      data.append('profession', professionPicker);
      data.append('locality', locality);
      data.append('guest', guestPicker);
      data.append('address', address);

      fetch(API + '/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(res => Alert.alert('success'))
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{width: 400, height: 150}}
          source={require('../assets/rsvp.jpg')}
        />
      </View>
      <View style={styles.bodyContent}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <ScrollView>
            {/* Name */}
            <View style={{padding: 25}}>
              <TextInput
                style={styles.formInputName}
                placeholderTextColor="black"
                underlineColorAndroid="brown"
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
              />
              {/* Age */}
              <TextInput
                style={styles.formInputAge}
                placeholderTextColor="black"
                placeholder="Age"
                underlineColorAndroid="brown"
                onChangeText={onChangeAge}
                keyboardType="numeric"
                value={age}
              />
              {/* Select Profession */}
              <Picker
                style={styles.professionPicker}
                selectedValue={professionPicker}
                onValueChange={itemValue => setProfessionalPicker(itemValue)}>
                <Picker.Item
                  label="Select Profession"
                  style={{color: 'brown'}}
                />
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Employed" value="Employed" />
              </Picker>
              {/* Locality */}
              <TextInput
                style={styles.formInputAge}
                placeholderTextColor="black"
                underlineColorAndroid="brown"
                placeholder="Locality"
                onChangeText={onChangeLocality}
                value={locality}
              />
              {/* Guest Picker */}
              <Picker
                style={styles.guestPicker}
                selectedValue={guestPicker}
                onValueChange={itemValue => setGuestPicker(itemValue)}>
                <Picker.Item
                  label="Number of Guests"
                  style={{color: 'brown'}}
                />
                <Picker.Item label="0" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
              </Picker>
              {/* Date of Birth */}
              <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text textBreakStrategy="simple" style={{}}>
                  {date}
                </Text>
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'countdown'}
                  is24Hour={true} //display="default"
                  onChange={Datepicker}
                  style={{position: 'absolute'}}
                />
              )}
              {/* Address */}
              <TextInput
                style={styles.formInputAge}
                underlineColorAndroid="brown"
                multiline
                placeholderTextColor="black"
                placeholder="Address"
                onChangeText={onChangeAddress}
                value={address}
                maxLength={50}
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => onSubmit()}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1.5,
    width: 80,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '40%',
  },
  bodyContent: {
    flex: 4.5,
  },
  formInputName: {
    width: 330,
    color: 'indigo',
    fontSize: 15,
  },
  formInputAge: {
    width: 330,
    marginTop: 10,
    color: 'indigo',
    fontSize: 15,
  },
  formInputDate: {
    borderBottomWidth: 2,
    borderBottomColor: 'brown',
    width: 330,
    marginTop: 10,
    fontSize: 15,
  },
  professionPicker: {
    width: 330,
    height: 45,
    marginTop: 30,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  guestPicker: {
    width: 330,
    height: 45,
    marginTop: 30,
    fontSize: 15,
    borderColor: 'brown',
  },
  button: {
    backgroundColor: 'brown',
    width: 130,
    marginVertical: 45,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
  },
  datePicker: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'center',
    paddingLeft: 12,
    marginTop: 15,
    color: date === 'Date of Birth*' ? 'black' : 'brown',
  },
});

export default FirstScreen;
