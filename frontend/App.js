import * as React from "react";
//import { Button } from 'react-native-elements';
import { Button } from 'react-native';
import { Text, View, StyleSheet,PermissionsAndroid,Dimensions} from "react-native";
import { Icon } from 'react-native-elements'
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AudioRecord from 'react-native-audio-record';
import {readFile}  from "react-native-fs";
import  {Component, useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { TouchableOpacity } from "react-native";

//Backend IP
const FLASK_BACKEND = "http://10.0.2.2:5000/audio"; 

export default class PrevCommune extends Component {

  
  constructor(props){
      super(props);
     
     
//state variable : these variables control button colours, button label , Mic On and Off

      this.state={
        abc : [],
        naam : [],
        urdu: 'Acne',
        index: -1,
        buttonColour:'#DEB2DA',
        buttonLabel: ' ',
        isMicOn: undefined,
        
      }

      this.onStopRecord = this.onStopRecord.bind(this);
     // this.render = this.render.bind(this);
     this.RecordButton=this.RecordButton.bind(this);
     

      this.state.abc.push(require("./سلام.mp4"));
      this.state.abc.push(require("./چوٹ.mp4"));
      this.state.abc.push(require("./بہتزیادہ.mp4"));
      this.state.abc.push(require("./ادھرآؤ.mp4"));
      this.state.abc.push(require("./hadsa.mp4"));
      this.state.abc.push(require("./bechaini.mp4"));
      this.state.abc.push(require("./bp.mp4"));
      this.state.abc.push(require("./bukhar.mp4"));
      this.state.abc.push(require("./dilkamasla.mp4"));
      this.state.abc.push(require("./nahi.mp4"));
     

      
      this.state.naam.push("سلام");
      this.state.naam.push("چوٹ لگی ہے");
      this.state.naam.push("بہت زیادہ");
      this.state.naam.push("ادھر آؤ");
      this.state.naam.push("حادثہ ہوا ہے");
      this.state.naam.push("بے چینی");
      this.state.naam.push("آپ کو دل کا مسئلہ ہے");
      this.state.naam.push("آپ کو بخار ہے");
      this.state.naam.push("آپ کا بلڈ پریشر زیادہ ہے");
      this.state.naam.push("نہیں");
      
    
      
      console.log("ABC:",  this.state.abc);
      console.log("Naam:", this.state.naam);
      
       
  };

  //THIS functions is for RECORD BUTTON, It Changes Mic state to On and Off and Vice Versa
  RecordButton = async() => {
    console.log("Mic Value: ", this.state.isMicOn);
    
    //If Mic is on then turn it off
     if (this.state.isMicOn==true)   
     {
      this.setState({
        isMicOn:  false,
      })
     }
     // If  mic is off then turn it on
     else
     {
      this.setState({    
        isMicOn:  true,
      })
     }

    // Log the changed value to console
    console.log("Changed Mic Value: ", this.state.isMicOn); 


    // Mic Label and Colour being changed if Mic is On
    if (this.state.isMicOn) {
        
        this.setState({
          buttonColour : "#2DC8B4",
          buttonLabel : "Stop",
      })
      this.onStartRecord();
    }
     // Mic Label and Colour being changed if Mic is Off
    else {                 
        this.setState({
          buttonColour : "#DEB2DA",
          buttonLabel : " ",
      })
      this.onStopRecord();
    }
  }

  //THIS FUNCTION STARTS THE RECORDING
  async onStartRecord () {
    // GET MULTIPLE PERMISSIONS WHEN RECORDING STARTS
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        //RECORD AUDIO PERMISSION
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        //READ EXTERNAL STORAGE PERMISSION
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //WRITE EXTERNAL STORAGE PERMISSION
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);

    } catch (err) { 
      // IN  case of error , print it to console
      console.warn(err); 
    }
    //options which are set for recorded audio 
    const options = {
      sampleRate: 44100,  // default 44100
      channels: 1,        // 1 or 2, default 1
      bitsPerSample: 16,  // 8 or 16, default 16
      audioSource: 6,     // android only (see below)
      wavFile: 'test.wav' // default 'audio.wav'
    };
   
    // initializing variables
    AudioRecord.init(options);
    // start recording 
    AudioRecord.start();  
  };

  //THIS FUNCTION STOPS THE RECORDING AND SEND THE AUDIO TO BACKEND AND RECIEVE RESPONSE
  onStopRecord=async()=>{
    
    // Wait for the audio recording
    const audioFile = await AudioRecord.stop(); 
    var RNFS = require('react-native-fs');
    //Define audio Path
    var path = RNFS.ExternalStorageDirectoryPath + '/Download/voice-input.wav'; 
    // Copy audio file
    RNFS.copyFile(audioFile, path); 
    console.log(path); // log the file path
    
    // Wait for the Permissions to record audio, read and write external storage
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
    } catch (err) {
      console.warn(err);
    }

    var RNFS = require('react-native-fs');

    //  Convertes the Audio File into base64 string.
    const base64String = await readFile(RNFS.ExternalStorageDirectoryPath + '/Download/voice-input.wav',"base64");
    
    var temp_uri = base64String;
    const message = {
      temp_uri
    };
    // Below code Sends the base64 string to backend
    const response = await fetch('http://10.0.2.2:5000/audio',{
     // POST METHOD  
    method: "POST", 
      headers: {
        "Content-Type":"application/json"
      },
      //Convert string to json
      body: JSON.stringify(message)
    }).then(response=>response.json().then(data=>{
      this.setState({
        urdu : data['message'],
    })
      
    }))
  };

// Rendering function which changes animations
  render(){
    var index =  this.state.naam.indexOf(this.state.urdu);
      return (
          <View style={this.styles.screen}>
             <Video
                source = { this.state.abc[index]}
                rate={0.85}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width:365, height: 540}}
              /> 
              <TouchableOpacity style={this.styles.roundButton2}  onPress={() => this.RecordButton()}>
                <Text>{this.state.buttonLabel}</Text>
                <Icon name = "mic" color={"#f44336"} />
              </TouchableOpacity>
             
          </View>
          
    );

    
  };

// Styling

  styles = StyleSheet.create({
    screen: {
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a5a5a5',
      borderRightWidth: 23,
      borderLeftWidth: 23,
      borderTopWidth: 23,
      borderColor: "#273445",
    },
    roundButton1: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
    },
    roundButton2: {
      marginTop: 2,
      marginBottom: 5,
      width: 90,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 70,
      backgroundColor: '#e7e7e7', 
     // top: 500,

    },
  }); 
};

