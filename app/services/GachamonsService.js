import { AppState } from "../AppState.js";
import { saveState } from "../utils/Store.js";




class GachamonsService {
  getRandomGachamon() {
    // let randomIndex = Math.floor(Math.random() * AppState.gachamons.length)
    // let randomGachamon = AppState.gachamons[randomIndex]
    let randomGachamon = this.getRandom()
    console.log('🎲', randomGachamon)
    AppState.activeGachamon = randomGachamon
    // add gachamon to my gachamon
    console.log(AppState.myGachamons)
    // NOTE to trigger change for arrays like myGachamons
    // AppState.myGachamons = [...AppState.myGachamons, randomGachamon]

    AppState.myGachamons.push(randomGachamon)
    AppState.emit('myGachamons') // force the listener for the property to trigger

    // save
    this.saveMyGachamon()
  }

  saveMyGachamon() {
    // NOTE saveState is a function built into the mvc template, in the ultils folder
    // what you call the ting your saving, and the data you are saving go in.
    saveState('myGachamon', AppState.myGachamons)
  }

  getRandom() {
    // rarities are common, rare, ultra-rare
    let rarity = ''
    let roll = Math.random() * 100 //get random # 1-100
    // assign that number a rarity value based on roll
    for (let i = 1; i <= 100; i++) {
      if (roll < 75) {
        rarity = 'common'
        break
      } else if (roll < 99.5) {
        rarity = 'rare'
        break
      } else {
        rarity = 'ultra-rare'
        break
      }
    }
    console.log(rarity, roll)
    // get a sub array of gachamon that have rolled rarity
    let ofRarity = AppState.gachamons.filter(g => g.rarity == rarity)
    // get randomIndex of gachamon from sub array
    let randomIndex = Math.floor(Math.random() * ofRarity.length)
    // return gachamon at random index
    return ofRarity[randomIndex]
  }
  /** 
   * @param {string} gachaName name of the gachamon 
   *  Takes in a gachamons name, selects them from gachamon in the appstate, then sets it to the activeGachamon 
   * */
  selectGachamon(gachaName) {
    // console.log('service', gachaName)
    const selectedGacha = AppState.gachamons.find(gacha => gacha.name == gachaName)
    // console.log(selectedGacha);
    AppState.activeGachamon = selectedGacha
    // console.log(AppState.activeGachamon)
    // console.log('bad prop!', AppState.trash)
  }
}

// NOTE we export a instance version of the service, instead of a definition of the class so another one cannot be created, or redefined. (singleton pattern)
export const gachamonsService = new GachamonsService()