import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

export default function App() {
  const [filmes, setFilmes] = useState([]);

  const baseURL = 'https://api.otaviolube.com/api/filmes?populate=*';
  const imgURL = 'https://api.otaviolube.com';

  useEffect(() => {
    fetch(baseURL)
      .then(data => data.json())
      .then(objeto => {
        console.log(objeto);
        setFilmes(objeto.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {filmes.length > 0 ? (
        filmes.map(filme => (
          <Card>
            <Image source={{
              uri:imgURL + filme.attributes.poster.data.attributes.url}} 
              style={styles.poster}/>
            <Text style={styles.titulo}>{filme.attributes.titulo}</Text>
            <Text style={styles.subtitulo}>{filme.attributes.subtitulo}</Text>
            <Text style={styles.sinopse}>{filme.attributes.sinopse}</Text>
            <Button color={'black'} style={styles.btn} title="Ver Horários"/>
            <Button color={'black'} style={styles.btn} title="Comprar"/>
          </Card>
        ))
      ) : (
        <View> 
          <ActivityIndicator size="large" color="green" />
          <Text>Carregando ...</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 350,
    height: 550,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  sinopse: {
    fontSize: 18,
    color: 'white'
  },
  viewImg: {
    backgroundColor: 'yellow',
    padding: 8,
    height: '100%',
    width: '30%'
},
card: {
  backgroundColor: '#007A78',
  borderRadius: 8,
  borderWidth: 7,
  borderColor: '#A0D100',
  padding: 10,
  marginVertical: 5,
  marginHorizontal: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
},
subtitulo: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
},
});
