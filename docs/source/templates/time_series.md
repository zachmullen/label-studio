---
title: Time Series Labeling 
type: templates
order: 100
is_new: t
meta_title: Time Series Data Labeling Template
meta_description: Label Studio Time Series Data Template for machine learning and data science data labeling projects.
---

Label time series data.

## Why use this template?


## Supported data types

Time series data in CSV, TSV, or JSON format. See how to [import data](/guide/tasks.html).

### CSV Example

For example, for a CSV file with 3 columns:

```csv
time,sensorone,sensortwo
0.0,3.86,0.00
0.1,2.05,2.11
0.2,1.64,5.85
 ```

Then, create a JSON file that references a URL for the CSV file to upload to Label Studio:
```json
[ { "data": { "csv_url": "http://example.com/path/to/file.csv" } } ]
```

Because the JSON file references a URL, and the URL is specified in a field called `csv_url`, set up the following labeling configuration:

```html
<View>
  <TimeSeries name="ts" valueType="url" value="$csv_url" sep="," timeColumn="time">
    <Channel column="sensorone" />
  </TimeSeries>
</View> 
```
In this case, the `<TimeSeries>` tag has the `valueType="url"` attribute because the CSV file is referenced as a URL. See [How to import your data](/guide/tasks.html#How-to-import-your-data).

### TSV Example

If you're uploading a tab-separated file, use the use the `sep` attribute on the `TimeSeries` tag to specify tab separation.

For example, use the following labeling configuration:
```html
<View>
  <TimeSeries name="ts" valueType="url" value="$csv_url" sep="\t" timeColumn="time">
    <Channel column="0"/>
  </TimeSeries>
</View> 
```

### Headless CSV & TSV

The main difference for the headless CSV/TSV usage is another way to name `<Channel>` columns. Since the file has no header and nothing is known about the column names you should use column index instead, for example `0`, therefore to use the first column as a temporal column you'd do `<TimeSeries timeColumn="0" ... >`. The same is true for the `column` attribute in `<Channel>` tag. 

### JSON

You can import time series data in JSON format using the following structure:
```json
  {
    "ts": {
      "time": [
        15.97, 15.85, 25.94
      ],
      "sensorone": [
        13.86, 29.05, 64.90
      ],
      "sensortwo": [
        21.00, 15.18, 35.85
      ]
    }
  }
```

If you structure your data like this, reference `valueType="json"` in your `<TimeSeries>` tag description:
```html
<View>
  <TimeSeries name="ts" valueType="json" timeColumn="time">
    <Channel column="0"/>
  </TimeSeries>
</View> 
```
  
## Labeling configuration
  
Example project configuration for multivariate time series labeling:
  
```html
<View>
  <TimeSeriesLabels name="label" toName="ts">
    <Label value="Run"/>
    <Label value="Walk"/>
  </TimeSeriesLabels> 
  <TimeSeries name="ts" valueType="url" value="$csv_url" timeColumn="time">
    <Channel column="sensorone" />
    <Channel column="sensortwo" />
  </TimeSeries>
</View>
```

Example csv input for the configuration above:

```csv
time,sensorone,sensortwo
0,10,20
1,20,30
2,30,40
```

Use the `timeColumn` parameter in `TimeSeries` to use a specific column from your dataset as the X axis. If you skip it then it uses incremental integer values `0, 1, 2, ...`. 


## Related tags

- [TimeSeriesLabels](/tags/timeserieslabels.html) - control tag, it displays controls (buttons with labels) for labeling
- [TimeSeries](/tags/timeseries.html) - object tag, it configures how to load the time series
- [Channel](/tags/timeseries.html#Channel) - define channels inside time series, every channel is displayed as a single plot

### Few notes

  


## Output format example

You can export the results on the Export page in JSON, JSON_MIN, and CSV formats. 

Users make completions while labeling a task. One completion is represented by a JSON structure (e.g. a task with completions could be stored in `your_project_folder/completions/0.json`). Each completion has a `result` field and it looks like this:

```json
{
  "completions": [{  
    "result": [
      {
          "value": {
              "start": 1592250751951.8074,
              "end": 1592251071946.638,
              "instant": false,
              "timeserieslabels": [
                  "Run"
              ]
          },
          "id": "S1DkU7FSku",
          "from_name": "label",
          "to_name": "ts",
          "type": "timeserieslabels"
      },
      {
          "value": {
              "start": 1592251231975.601,
              "end": 1592251461993.5276,
              "instant": false,
              "timeserieslabels": [
                  "Run"
              ]
          },
          "id": "XvagJo87mr",
          "from_name": "label",
          "to_name": "ts",
          "type": "timeserieslabels"
      }
    ]
  }] 
}
```

## Special cases

### Multiple time series in one project

If you want to use multiple time series files in one project you need to make your CSV files available as URLs and create an input JSON with tasks pointing at those CSVs, for example:

```json
[ { "data": { "csv_file1": "http://example.com/path/file1.csv", "csv_file2": "http://example.com/path/file2.csv" } } ]
```

And minimal config would be

```html
<View>
  <Header value="First time series" />
  <TimeSeriesLabels name="lbl-1" toName="ts-1">
    <Label value="Label 1" />
  </TimeSeriesLabels>
  <TimeSeries name="ts-1" timeColumn="0" value="$csv_file1">
    <Channel column="1" />
  </TimeSeries>
	
  <Header value="Second time series" />
  <TimeSeriesLabels name="lbl-2" toName="ts-2">
    <Label value="Label 2" />
  </TimeSeriesLabels>
  <TimeSeries name="ts-2" timeColumn="0" value="$csv_file2">
    <Channel column="1" />
  </TimeSeries>
</View>
```

Or you can store time series data in tasks directly. 

### Video & audio sync with time series

It's possible to synchronize TimeSeries with video and audio in Label Studio. Right now you can do it using HyperText tag with HTML objects `<audio src="path">`/`<video src="path">` and TimeSeries together. We have some solutions for this in the testing, [ping us](http://slack.labelstud.io.s3-website-us-east-1.amazonaws.com?source=template-timeseries) in Slack to learn more.
