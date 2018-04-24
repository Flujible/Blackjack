window.onload = () => {
  get('https://deckofcardsapi.com/api/deck/new/shuffle/').then((deckInfo) => {
    let res = JSON.parse(deckInfo);
    return res.deck_id;
  }).then((deckId) => {
    document.getElementById("shuffleButton").onClick = shuffleDeck(deckId, 1);
    
  });

}

let shuffleDeck = (deckId) => {
  if (deckId) {
    return get('https://deckofcardsapi.com/api/deck/'+deckId+'/shuffle/');
  } else {
    return get('https://deckofcardsapi.com/api/deck/new/shuffle/');
  }
}

let drawCard = (deckId, drawCount) => {
  return get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count='+drawCount);
}

let get = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      if(req.status = 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    }

    req.onerror = () => {
      reject(Error("Network Error"));
    }

    req.send();
  });
}
