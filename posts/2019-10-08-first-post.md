---

feed:
  enable: true
  title: First post - language detection
  description: This is my first blog post. In this post I would like to talk about language detection.
  image: /images/rocket-lunch.jpg
  date: 2019-10-08
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/rocket-lunch.jpg)

# First post - language detection

This is my first blog post. In this post I would like to talk about language detection.

### Problem Statement

Language detection is very popular problem that comes first on data mining.
Suppose we have multiple content posts saved in `.csv` file, where we need to detect the language.

Let's start to solve this problem by using `python3` and library `langdetect`.
This solution is very simple, but at same time good enough for most cases.

First of all we need to add import libraries on python

``` python
import pandas as pd
from langdetect import detect
```

Second step, we need to load data from `.csv` file.

``` python
df = pd.read_csv("input_file.csv")
```

Suppose, we got schema where one of the fields is 'PostContent' in what we need to detect language.
We can check it by calling this line of code:

``` python
print (df.columns)
```


Now, we need to define a safe function that will have fallback logic in case if language can not be detected.
Let's use for fallback english language with the code 'en'.

``` python
def safe_detect(s):
    try:
        return detect(str(s))
    except:
        return 'en'
```

Now, we are ready to process the whole column in one line.

``` python
df['PostLang'] = df.apply(lambda row: safe_detect(row['PostContent']), axis=1)
```

So, we have detected language in a new column 'Lang', let's save the result to file.

``` python
df.to_csv('output_file.csv')
```

In this simple example we study how to use 'langdetect' library for language detection on your data.
On next posts we will find the way to train and use advanced models for language detection.
