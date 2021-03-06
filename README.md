





**Project Description:**

HaathkiBaat is a mobile application that will be built to assist deaf people for understanding conversations with hearing people and vice versa.
It will take Urdu speech as input and convert it into Pakistani Sign Language which will be shown through an avatar appearing on mobile screen. 

Machine Learning Models:
Deep Speech
Slow Fast

Languages/Tools:
Python
PyTorch
JavaScript
React Native
Blender


**Text-to-Sign Model - Slow Fast:**

Slow Fast uses two parallel convolution neural networks on a video to analyze it . Usually, Videos have two parts, a frame area which remains static or moves slowly and a frame area which changes fast. 
For example: consider you are recording a person who is running on the road. The road in this case is static while the person and cars are dynamic as they may move quickly in the scene. 
In the given example, a slow and high-definition CNN (fast pathway) will be used to analyze the static content
(i.e., road) of the video whereas a low-definition CNN (slow pathway) will be used to analyze the dynamic content (i.e., person or cars) of the video.
This is inspired by Retinal-Ganglion neuron in mammals. Usually, the computing cost of slow pathway is 4 times higher than fast pathway.
Both of them uses ResNet model and runs 3D CNN operations on frames. Slow pathway captures almost 2 frames per second while the fast pathway captures almost 15 frames per second but the number of frames can be adjusted to our needs.



**Files Description:**

The repository contrains 2 folders and 4 files in total.
The 2 folders contain the code of Backend and Frontend.
These 4 files contains the code for SignLanguageClassification.
1) clr.py
2) model.py
3) train.ipynb
4) videodata.ipynb

**SignLanguageClassification**

The data being used are videos of Pakistani sign language which was self-generated.
345 classes were used.

**videodata.ipynb:**

Before passing data to "model.py" for training, the data is pre-processed. Videos are converted into the frames and stored on drive.

**train.ipynb:**

This file uses "model.py" The model is implemented in "model.py" which uses "clr.py".
Before training the data, the frames are resized to 128x128, transformed, normalized and then passed to the model for the training.

Checkpoints have been implemented in the file to continue the training.
The last part of the file implements the testing of the model.


**Results:**

Slow Fast has been successfully trained with an accuracy of 95% in 139 epochs.

Accuracy:

![Bengu_accuracy](https://user-images.githubusercontent.com/96545197/164759308-89ce85d5-aad9-4e66-b96e-759f1d8197ad.JPG)


Loss:

![Bengu_loss](https://user-images.githubusercontent.com/96545197/164759304-ff4f7320-6db0-4e15-9a61-eab36e1913c0.JPG)


**Backend** 

The backend converts urdu speech into Urdu text. It receives the base64-encoded-audio-string and converts into text string after decoding it and sends to Frontend.
To run the backend type this command in terminal
python ap.py

**Frontend**

Frontend displays the urdu speech into Pakistani Sign Language with the help of Backend. 
To Run the Front-end type this command ( assuming you have android studio installed):
react-native run-android

