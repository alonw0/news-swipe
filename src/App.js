import React from 'react';
//import { Card, CardContent } from '@material-ui/core';
import TinderCard from 'react-tinder-card'
import './App.css';



//const regex = /<\/?!?(img|a|div)[^>]*>/g



function App() {
  const [news, setNews] = React.useState(null)
  const [lastDirection, setLastDirection] = React.useState()
  React.useEffect(() => {
    function fetchRss(url) {
      fetch(url).then(response => response.json()).then(data => getNews(data));
        
    }
    function getNews(data) {
    setNews(data?.items)
    }
    fetchRss("https://api.rss2json.com/v1/api.json?rss_url=http://www.ynet.co.il/Integration/StoryRss2.xml")
    
  }, [])
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
    setLastDirection(direction)
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }
  
  return (
    <div className="App">
      <h1>ניסיון</h1>
       <div className='cardContainer'>
      {news?.map((article) => {
        return (
          <TinderCard className='swipe' onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} >
         {/* <Card className='card' style={{ borderRadius: "16px", margin: "8px 16px", backgroundColor: "#79a6d2"}}>
           <CardContent style={{textAlign: "center"}}>
           <h4>{article?.title}</h4>
           <img src={article.thumbnail}></img>
           <p>{article?.content.replaceAll(regex,"")}</p>
           </CardContent>
         </Card> */}
         <div style={{ backgroundImage: 'url(' + article.thumbnail + ')' }} className='card'>
              <h3>{article.title}</h3>
            </div>
         </TinderCard>
        )
      })}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  );
}

export default App;
