import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';


const url = "https://my.api.mockaroo.com/rsvp_users.json?key=0c1dd1a0"
const KEYS_TO_FILTERS = ['name', 'locality'];
const SecondScreen = () => {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextScreen, setNextScreen] = useState(false);
  const [singleUser, setSingleUser] = useState({});

  const searchUpdated = (term) => {
    setSearchTerm(term);
  }

  const particularUser = (user) => {
    setSingleUser(user);
    setNextScreen(true);
  }
  const filteredUsers = users.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

  const getUsers = async () => {
    fetch(url)
      .then(response => response.json())
      .then(res => setUsers(res))
  }

  useEffect(() => {
    getUsers();
  }, [])
  return nextScreen ? <UserDetails data={singleUser} backArrow={setNextScreen} /> :

    <View style={styles.container}>
      <SearchInput style={styles.searchInput}
        onChangeText={(term) => { searchUpdated(term) }}
        placeholder="Type a message to search"
      />
      {searchTerm.length ?
        <ScrollView>
          {filteredUsers.map(user => {
            return (
              <TouchableOpacity onPress={() => particularUser(user)} key={user.id} style={styles.particularUser} >
                <View>
                  <Text>{user.name}</Text>
                  <Text style={styles.locality}>{user.locality}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        :
        users.map((user) => {
          const { id, name, locality } = user
          return (
            <TouchableOpacity onPress={() => particularUser(user)} key={user.id} style={styles.particularUser} >
              <View key={id}>
                <Text>{name}</Text>
                <Text style={styles.locality}>{locality}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
    </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  particularUser: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  locality: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  normaUser: {
    color: "brown",
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)'
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
});

export default SecondScreen;


const UserDetails = ({ data, backArrow }) => {
  const backHandler = () => {
    backArrow(false);
  }
  return (
    <View style={styles1.container}>
      <View>
        <Text style={styles1.id}>Id  : {data.id}</Text>
        <Text style={styles1.inputFields}>Name :{data.name}</Text>
        <Text style={styles1.inputFields}>Date of Birth: {data.date}</Text>
        <Text style={styles1.inputFields}>Profession: {data.profession}</Text>
        <Text style={styles1.inputFields}>Locality :{data.locality}</Text>
        <Text style={styles1.inputFields}>Guest :{data.guest}</Text>
        <Text style={styles1.inputFields}>Address: {data.Address}</Text>
      </View>
      <TouchableOpacity onPress={backHandler}>
        <Text style={{ color: "brown", fontSize: 25 }}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  id: {
    fontSize: 20
  },
  inputFields: {
    fontSize: 20,
    color: "black",
    marginTop: 10
  }
})
