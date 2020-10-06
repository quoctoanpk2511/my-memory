import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // use FontAwesome from the expo vector icons

import Card from './Card';

export default class CardList extends React.Component {

    constructor (props) {
        super(props);
        this.clickCard = this.clickCard.bind(this);
	}

    clickCard(id) {
        let selected_pairs = this.props.selected_pairs;
        let current_selection = this.props.current_selection;
        let score = this.props.score;
         
        // get the index of the currently selected card
        let index = this.props.cards.findIndex((card) => {
          return card.id == id;
        });
       
        let cards = this.props.cards;
         
        // the card shouldn't already be opened and is not on the array of cards whose pairs are already selected
        if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) === -1){
       
            cards[index].is_open = true;
     
            current_selection.push({ 
              index: index,
              name: cards[index].name
            });            

            if(current_selection.length == 2){
                if(current_selection[0].name == current_selection[1].name){
                  score += 1; // increment the score
                  selected_pairs.push(cards[index].name); 
                }else{
                  cards[current_selection[0].index].is_open = false; // close the first
                   
                  // delay closing the currently selected card by half a second.
                  setTimeout(() => {
                    cards[index].is_open = false;
                    this.setState({
                      cards: cards
                    });
                  }, 500);
                }
               
                current_selection = [];
            }

            this.props.updateCurrent_selection(current_selection)
            this.props.updateScore(score)
            this.props.updateCards(cards)

            this.setState({
                score: score,
                cards: cards,
                current_selection: current_selection
            });
        }    
    }

    render() {
        return this.props.cards_in_row.map((card, index) => {
            return (
              <Card 
                key={index} 
                src={card.src} 
                name={card.name} 
                color={card.color} 
                is_open={card.is_open}
                clickCard={this.clickCard.bind(this, card.id)}
              />
            );
        });
    }
}
