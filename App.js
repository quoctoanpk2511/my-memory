import React from 'react';
import { StyleSheet, View, Button, StatusBar } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import Header from './src/components/Header';
import Score from './src/components/Score';
import Row from './src/components/Row';

import helpers from './helpers';

export default class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.resetCards = this.resetCards.bind(this);
     
    // icon sources
    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    };
 
    // the unique icons to be used
    let cards = [
      {
        src: 'fontawesome',
        name: 'heart',
        color: 'red'
      },
      {
        src: 'entypo',
        name: 'feather',
        color: '#7d4b12'
      },
      {
        src: 'entypo',
        name: 'flashlight',
        color: '#f7911f'
      },
      {
        src: 'entypo',
        name: 'flower',
        color: '#37b24d'
      },
      {
        src: 'entypo',
        name: 'moon',
        color: '#ffd43b'
      },
      {
        src: 'entypo',
        name: 'youtube',
        color: '#FF0000'
      },
      {
        src: 'entypo',
        name: 'shop',
        color: '#5f5f5f'
      },
      {
        src: 'fontawesome',
        name: 'github',
        color: '#24292e'
      },
      {
        src: 'fontawesome',
        name: 'skype',
        color: '#1686D9'
      },
      {
        src: 'fontawesome',
        name: 'send',
        color: '#1c7cd6'
      },
      {
        src: 'ionicons',
        name: 'ios-magnet',
        color: '#d61c1c'
      },
      {
        src: 'ionicons',
        name: 'logo-facebook',
        color: '#3C5B9B'
      }
    ];

    let clone = JSON.parse(JSON.stringify(cards)); // create a completely new array from the array of cards

    this.cards = cards.concat(clone); // combine the original and the clone

    // add the ID, source and set default state for each card
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle(); // sort the cards randomly
 
    // set the default state
    this.state = {
      current_selection: [], // this array will contain an array of card objects which are currently selected by the user. This will only contain two objects at a time.
      selected_pairs: [], // the names of the icons. This array is used for excluding them from further selection
      score: 0, // default user score
      cards: this.cards // the shuffled cards
    }
  }

  resetCards() {
    // close all cards
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });
   
    cards = cards.shuffle(); // re-shuffle the cards
     
    // update to default state
    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#f3f3f3' barStyle='dark-content' />
        <Header />
        <View style={styles.body}>
          <Row
            current_selection={this.state.current_selection}
            selected_pairs={this.state.selected_pairs}
            score={this.state.score}
            cards={this.state.cards}
            updateCurrent_selection={(current_selection) => this.setState({current_selection})}
            updateScore={(score) => this.setState({score})}
            updateCards={(cards) => this.setState({cards})}
          />
        </View>
        <Score score={this.state.score} />
        <Button
          onPress={this.resetCards}
          title="Reset"
          color="#008CFA"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});
