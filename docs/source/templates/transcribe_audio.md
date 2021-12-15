---
title: Audio Transcription 
type: templates
order: 303
meta_title: Audio Transcription Data Labeling Template
meta_description: Label Studio Audio Transcription Template for machine learning and data science data labeling projects.

---

Listen to an audio file and transcribe its contents in natural language, performing speech recognition.

## Why use this template?
To perform automatic or human-in-the-loop speech recognition, or to transcribe the text in an audio clip. 

## Supported data types
Audio files such as .mp3 or .wav files. 

See how to [import data](/guide/tasks.html) or [sync data from external storage](/guide/storage.html).

## Labeling configuration  

```html
<View>
  <Header value="Listen to the audio:"></Header>
  <Audio name="audio" value="$url"></Audio>
  <Header value="Write the transcription:"></Header>
  <TextArea name="answer"></TextArea>
</View>
```

## Related tags

* [Audio](/tags/audio.html)
* [AudioPlus](/tags/audioplus.html)
* [Header](/tags/header.html)
* [TextArea](/tags/textarea.html)