---
title: Audio Classification
type: templates
order: 401
meta_title: Audio Classification Data Labeling Template
meta_description: Label Studio Audio Classification Template for machine learning and data science data labeling projects.
---

Listen to an audio file and classify it.

## Why use this template?

Use this template to classify audio files according to topic, quality, sentiment, type of audio, or any other classification choices that you want. 

## Supported data types

Audio files such as .mp3 or .wav files.

## Labeling Configuration  

```html
<View>
  <Header value="Listen to the audio:"></Header>
  <Audio name="audio" value="$url"></Audio>
  <Header value="Select its topic:"></Header>
  <Choices name="label" toName="audio" choice="single-radio" showInline="true">
    <Choice value="Politics"></Choice>
    <Choice value="Business"></Choice>
    <Choice value="Education"></Choice>
    <Choice value="Other"></Choice>
  </Choices>
</View>
```
