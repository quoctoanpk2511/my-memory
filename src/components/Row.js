import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // use FontAwesome from the expo vector icons

import CardList from './CardList';

export default class Row extends React.Component {

    getRowContents(cards) {
        let contents_r = [];
        let contents = [];
        let count = 0;
        cards.forEach((item) => {
          count += 1;
          contents.push(item);
          if(count == 4){
            contents_r.push(contents)
            count = 0;
            contents = [];
          }
        });

        return contents_r;
    }

    render() {
        let contents = this.getRowContents(this.props.cards);
        return contents.map((cards, index) => (
            <View key={index} style={styles.row}>
                <CardList
                    current_selection={this.props.current_selection}
                    selected_pairs={this.props.selected_pairs}
                    score={this.props.score}
                    cards={this.props.cards}
                    cards_in_row={cards}
                    updateCurrent_selection={this.props.updateCurrent_selection}
                    updateScore={this.props.updateScore}
                    updateCards={this.props.updateCards}
                />
            </View>
        ));
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
