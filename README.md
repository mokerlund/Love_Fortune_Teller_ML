# Love Fortune Teller Machine Learning: Relationship Length and Quality Predictor
## Background:

We utilize a social science study, How Couples Meet and Stay Together (HCMST), conducted by Stanford University to analyze whether how people meet their partners have an impact on how long the relationships last. The study documented longitudinally over 4,000 adults in American the way they met their partners, their perceived quality of their relationships, and when/if the relationships ended over a course of 8 years. Using this data, we can allow users to input their own data and use a machine learning model to predict whether their relationship will last a short, mid, or long time.
### Step 1: Determining the most important features
We will use random forests and the data to figure out what the most important features are to classify relationships into the different categories.  We will use this to determine the features we want to include for step 2.
### Step 2: Training a model to predict relationship length
Using the features we choose through step one, we will train a model to predict relationship length category based on the user’s input through a website.  
### Quick Overview of our website:
We will have a questionnaire to capture info to feed into the model based on user input.  The output (relationship length category) will be shown on the same page.

## Team Members:
* Elle Xie (github.com/bestelle6256)
* Megan Okerlund (github.com/mokerlund)
* Amanda Withrow (github.com/amandawithrow)
## Data Used:
We took data from a survey started in 2009 and continued in waves of every year for six years. In 2017, there was another singular (unrelated) survey done with new couples about how they got together that included new topics, such as going more in-depth about online meeting. 
2009 research survey (Wave 1) - Comprehensive, No online meeting data included [Questionnaire File: Relationship_survey.sqlite] [Demographic File: HCMST.sqlite]
Waves 2-6 - Follow up on if the couple is still together, how they broke up if not, and why they aren’t together [File: HCMST_w.sqlite]
2017 Survey Data - Comprehensive, Includes online meeting info (Currently uncleaned and unused)
