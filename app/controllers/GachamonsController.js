import { AppState } from "../AppState.js"
import { gachamonsService } from "../services/GachamonsService.js"
import { setHTML } from "../utils/Writer.js"



export class GachamonsController {

  // NOTE controller constructors, run When a view (page) is loaded
  constructor() {
    console.log('Time to Gacha-Gacha Mon!')
    this.drawGachamonList()
    // this.drawActiveGachamon() don't want to do this on load cause there isn't one selected when the page loads

    // NOTE part of the constructors job is to create 'listeners' for changes from the appstate
    // NOTE listeners are registered to appstate keys, and trigger when their values change
    // NOTE this next one listens for a change with activeGachamon from the appstate and runs the provided instructions when it changes
    AppState.on('activeGachamon', this.drawActiveGachamon)
    AppState.on('myGachamons', this.drawMyGachamon)
  }


  drawGachamonList() {
    const gachamons = AppState.gachamons
    let listContent = ''
    gachamons.forEach(g => listContent += g.ListTemplate)
    // console.log(listContent)
    // document.getElementById('gachamon-list').innerHTML = listContent
    setHTML('gachamon-list', listContent) // setHTML does the same as the line above with some handy error handling
  }

  /** this draws the active gachamon */
  drawActiveGachamon() {
    const gachamon = AppState.activeGachamon
    let activeContent = gachamon.ActiveTemplate
    setHTML('gachamon-active', activeContent)
  }

  drawMyGachamon() {
    console.log('drawing your own gachamon')
    const myGachamon = AppState.myGachamons
    let myContent = ''
    myGachamon.forEach(g => myContent += g.ListTemplate)
    setHTML('my-gachamon', myContent)
  }

  selectGachamon(gachaName) {
    console.log('selecting', gachaName)
    gachamonsService.selectGachamon(gachaName)
    // this.drawActiveGachamon()
  }
  /** The user 'enters a coin' and randombly selects a gotchamon */
  gachaGachaMon() {
    console.log('give me a random mon')
    gachamonsService.getRandomGachamon() // ctrl . to create a method in your service you are referencing from another file that doesn't exist in the service
  }

}

