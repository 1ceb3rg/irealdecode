# Decode or Encode iRealB link

Functions for working with `irealb://` links

## Usage

```
import { decodeIreal, decodeIrealPlaylist, encodeIreal, transposeIrealString }from '../../irealdecode/'

decodeIreal("irealbook://Ain't%20Misbehavin'%20%28%20Django%20Changes%29%3DWaller%20Fats%3D%3DMedium%20Swing%3DD%3D%3D1r34LbKcu7%207-EZ4D6%20EDZL6-G%206GZL7%23F6%20DZL7A%207-EZL7ob6%20B7L4TA*%7B*%5B%5D%2071D6%20BZL6G%206D2NZL%20QyQXyX%7D%207A%20B/7EZL7D6%20F%23NZL7AB%206AZQ%7CG7X%207-BZL7obB%206A%7CyQX7B%7CQyXB/7E%7CQyE7/BLyX-BB6DZL6/B%20A7ZL7%23F%206DZL7A%207E-ZL7obE%206DA*%5B%5D%20G6%20G-7EZL7%20B7LZE-7%20A7LZN1D6%20B7LZE7/B%20A7%20Z%20%3DJazz-Medium%20Swing%3D60%3D3");


[
  {
    name: "Ain't Misbehavin' ( Django Changes)",
    artist: 'Waller Fats',
    style: 'Medium Swing',
    key: 'D',
    changes: '1r34LbKcu7 7-EZ4D6 EDZL6-G 6GZL7#F6 DZL7A 7-EZL7ob6 B7L4TA*{*[] 71D6 BZL6G 6D2NZL QyQXyX} 7A B/7EZL7D6 F#NZL7AB 6AZQ|G7X 7-BZL7obB 6A|yQX7B|QyXB/7E|QyE7/BLyX-BB6DZL6/B A7ZL7#F 6DZL7A 7E-ZL7obE 6DA*[] G6 G-7EZL7 B7LZE-7 A7LZN1D6 B7LZE7/B A7 Z ',
    playbackStyle: 'Jazz-Medium Swing',
    tempo: '60',
    playbackNumTimes: '3'
  }
]

encodeIreal({
    name: "Ain't Misbehavin' ( Django Changes)",
    artist: 'Waller Fats',
    style: 'Medium Swing',
    key: 'D',
    tranpose:'',
    changes: '1r34LbKcu7 7-EZ4D6 EDZL6-G 6GZL7#F6 DZL7A 7-EZL7ob6 B7L4TA*{*[] 71D6 BZL6G 6D2NZL QyQXyX} 7A B/7EZL7D6 F#NZL7AB 6AZQ|G7X 7-BZL7obB 6A|yQX7B|QyXB/7E|QyE7/BLyX-BB6DZL6/B A7ZL7#F 6DZL7A 7E-ZL7obE 6DA*[] G6 G-7EZL7 B7LZE-7 A7LZN1D6 B7LZE7/B A7 Z ',
    playbackStyle: 'Jazz-Medium Swing',
    tempo: '60',
    playbackNumTimes: '3'
  })


irealb://Ain%27t%20Misbehavin%27%20%28%20Django%20Changes%29=Waller%20Fats==Medium%20Swing=D==1r34LbKcu7%207-EZ4D6%20EDZL6-G%206GZL7%23F6%20DZL7A%207-EZL7ob6%20B7L4TA%2a%7B%2a%5B%5D%2071D6%20BZL6G%206D2NZL%20QyQXyX%7D%207A%20B%2F7EZL7D6%20F%23NZL7AB%206AZQ%7CG7X%207-BZL7obB%206A%7CyQX7B%7CQyXB%2F7E%7CQyE7%2FBLyX-BB6DZL6%2FB%20A7ZL7%23F%206DZL7A%207E-ZL7obE%206DA%2a%5B%5D%20G6%20G-7EZL7%20B7LZE-7%20A7LZN1D6%20B7LZE7%2FB%20A7%20Z%20=Jazz-Medium%20Swing=60=3





```

transposeIrealString takes an ireal://link and a key.
