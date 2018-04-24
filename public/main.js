window.onload = () => {
  let deckId;
  get('https://deckofcardsapi.com/api/deck/new/shuffle/').then((deckInfo) => {
    let res = JSON.parse(deckInfo);

    /* This does assing the ID to the variable, but because of the asynchronous
    nature, I cant guarnatee that I will be able to access the deckID outside
    the promise chain */
    // deckId = res.deck_id;

    return res.deck_id;
  })

  //I need the deck ID here so the API knows which deck to shuffle
  document.getElementById("drawButton").onClick = drawCard(deckId, 1);
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
