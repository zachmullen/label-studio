---
title: Image Segmentation
type: templates
order: 103
meta_title: Image Segmentation Data Labeling Template
meta_description: Label Studio Image Segmentation Template for machine learning and data science data labeling projects.
---

Perform image segmentation using a brush and producing a mask.

## Why use this template?

Use this template to add masks to images and label the masks. Use to perform semantic segmentation or instance segmentation of plants, animals, or other objects in an image. 

## Supported data types

Image files such as .png, .tiff, or .jpg. 

## Labeling Configuration  

```html
<View>
  <BrushLabels name="tag" toName="img">
    <Label value="Planet" />
    <Label value="Moonwalker" background="rgba(255,0,0,0.5)" />
  </BrushLabels>
  <Image name="img" value="$image" zoom="true" zoomControl="true" />
</View>
```
