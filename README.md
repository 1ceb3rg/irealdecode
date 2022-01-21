# Decode or Encode iRealB links
Functions for working with `irealb://` links

[![npm version](https://badge.fury.io/js/ireal-decode.svg)](https://badge.fury.io/js/ireal-decode)
[![Node.js CI](https://github.com/1ceb3rg/irealdecode/actions/workflows/node.js.yml/badge.svg)](https://github.com/1ceb3rg/irealdecode/actions/workflows/node.js.yml)  


## Usage

```
import { decodeIreal, decodeIrealPlaylist, encodeIreal, transposeIrealString }from '../../irealdecode/'

// returns an IReal object
decodeIreal("irealb://%4F%6E%65%20%4E%6F%74%65%20%53%61%6D%62%61=%4A%6F%62%69%6D%20%41%6E%74%6F%6E%69%6F%2D%43%61%72%6C%6F%73==%42%6F%73%73%61%20%4E%6F%76%61=%42%62==%31%72%33%34%4C%62%4B%63%75%37%7C%51%79%58%37%34%44%2D%37%58%58%37%2D%44%7C%51%79%58%31%31%23%37%42%7C%79%51%58%37%2D%43%7C%51%79%58%37%62%44%7C%51%79%79%51%7C%44%62%34%54%41%2A%5B%79%58%37%2D%44%51%7C%42%37%23%62%41%7C%51%79%58%37%5E%62%45%7C%51%79%58%62%37%42%7C%51%79%58%37%2D%46%7C%51%79%58%31%31%37%58%79%51%7C%79%58%37%2D%43%58%37%5E%62%44%58%79%51%7C%43%62%41%7C%51%79%58%37%2D%62%45%42%2A%5B%5D%79%51%58%36%62%42%5A%4C%31%31%23%37%42%20%37%2D%37%58%79%51%7C%37%62%44%7C%51%62%44%7C%51%79%20%4C%5A%43%23%2A%5B%5D%20%37%46%20%37%68%43%7C%51%79%58%5E%37%42%7C%51%79%58%37%23%46%7C%51%79%58%37%2D%41%44%2D%37%58%6C%63%4B%51%79%51%79%58%31%31%43%2D%37%58%79%79%58%37%2D%43%7C%51%79%58%37%62%44%7C%51%58%79%37%2D%44%7C%51%79%58%31%31%23%37%42%7C%51%51%7C%42%37%23%7C%51%79%58%37%7C%51%79%58%37%79%51%7C%42%62%58%37%43%7C%51%79%58%36%62%44%7C%51%79%58%62%37%41%7C%51%79%58%37%5E%62%45%7C%51%79%58%37%79%51%7C%42%5E%58%37%2D%46%7C%42%62%36%58%79%51%5A%20=%4A%61%7A%7A%2D%42%6F%73%73%61%20%4E%6F%76%61=%30=%33");


{
    title: "One Note Samba",
    artist: "Jobim Antonio-Carlos",
    style: "Bossa Nova",
    key: "Bb",
    transpose: "",
    changes:
      "|QyX74D-7XX7-D|QyX11#7B|yQX7-C|QyX7bD|QyyQ|Db4TA*[yX7-DQ|B7#bA|QyX7^bE|QyXb7B|QyX7-F|QyX117XyQ|yX7-CX7^bDXyQ|CbA|QyX7-bEB*[]yQX6bBZL11#7B 7-7XyQ|7bD|QbD|Qy LZC#*[] 7F 7hC|QyX^7B|QyX7#F|QyX7-AD-7XlcKQyQyX11C-7XyyX7-C|QyX7bD|QXy7-D|QyX11#7B|QQ|B7#|QyX7|QyX7yQ|BbX7C|QyX6bD|QyXb7A|QyX7^bE|QyX7yQ|B^X7-F|Bb6XyQZ ",
    playbackStyle: "Jazz-Bossa Nova",
    tempo: "0",
    playbackNumTimes: "3",
  }

//returns an irealb:// url
 encodeIreal({
      title: "One Note Samba",
      artist: "Jobim Antonio-Carlos",
      style: "Bossa Nova",
      key: "Bb",
      transpose: "",
      changes:
        "|QyX74D-7XX7-D|QyX11#7B|yQX7-C|QyX7bD|QyyQ|Db4TA*[yX7-DQ|B7#bA|QyX7^bE|QyXb7B|QyX7-F|QyX117XyQ|yX7-CX7^bDXyQ|CbA|QyX7-bEB*[]yQX6bBZL11#7B 7-7XyQ|7bD|QbD|Qy LZC#*[] 7F 7hC|QyX^7B|QyX7#F|QyX7-AD-7XlcKQyQyX11C-7XyyX7-C|QyX7bD|QXy7-D|QyX11#7B|QQ|B7#|QyX7|QyX7yQ|BbX7C|QyX6bD|QyXb7A|QyX7^bE|QyX7yQ|B^X7-F|Bb6XyQZ ",
      playbackStyle: "Jazz-Bossa Nova",
      tempo: "0",
      playbackNumTimes: "3",
    }) 
    
    





```

transposeIrealString takes an ireal://link and a key.
