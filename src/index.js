import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import './index.css';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';

var ons = require('onsenui');
var Ons = require('react-onsenui');


import CoursesList from './components/CoursesList';
import CourseDetail from './components/CourseDetail';

import {extendObservable, action, autorun} from 'mobx';

class ListManager {
  constructor(appState, navigator) {
    extendObservable(this, {
      data: [{title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}],

      select: action(function(index) {

        appState.pages.push({name: 'course', index: index, id: this.data[index].id});

        navigator.pushPage({title: this.data[index].title, hasBackButton: true})
      }),

      get dataNames(){
        var objs = this.data.map(item => item.title);
        return(objs)
      }
    })
  }
}

class AppState {
  constructor(){
    extendObservable(this, {
      pages: [{name: 'main'}],

      get lastPage(){
        return(this.pages.slice(-1)[0])
      },

      goBack: action(function(){
        this.pages.pop();
      }),

      pageToDisplay: function(navigator)  {
        if(this.lastPage.name === 'main'){
          var manager = new ListManager(this, navigator);
          return(<CoursesList source={manager}/>)
        }
        else if(this.lastPage.name === 'course'){
          return(<CourseDetail course={{
                description: 'Come evadere le tasse ed essere felici',
                  time: '08:00 - 09:00',
                    room: 'VA',
                      host: 'Emanuele di Vizio'
              }}></CourseDetail>);
        }
      }
    })
  }
}


var state = new AppState()

ons.ready(function() {
  ReactDOM.render(
    <AppContainer stateManager={state}/>,
    document.getElementById('root')
  );
});

