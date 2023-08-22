import { Gachamon } from "./models/Gachamon.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {


  // NOTE this is how they were loaded in BEFORE local storage was implemented, to use local storage, you need to create your classes using data objects instead, of flat arguments
  // gachamons = [
  //   new Gachamon('Oslo', '🦧', 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png', 'common'),
  //   new Gachamon('trash X', '🐀', 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', 'common'),
  //   new Gachamon('Benjamin', '🦆', 'https://em-content.zobj.net/source/microsoft-teams/363/duck_1f986.png', 'common'),
  //   new Gachamon('Tammy', '🐛', 'https://em-content.zobj.net/source/microsoft-teams/363/bug_1f41b.png', 'common'),
  //   new Gachamon('Sven', '🦛', 'https://em-content.zobj.net/source/microsoft-teams/363/hippopotamus_1f99b.png', 'common'),
  //   new Gachamon('Trevor', '🦭', 'https://em-content.zobj.net/source/microsoft-teams/363/seal_1f9ad.png', 'common'),
  //   new Gachamon('Garry', '🐌', 'https://em-content.zobj.net/source/microsoft-teams/363/snail_1f40c.png', 'common'),
  //   new Gachamon('Carrie', '🐍', 'https://em-content.zobj.net/source/microsoft-teams/363/snake_1f40d.png', 'common'),
  //   new Gachamon('Golden-Sven', '🦛', 'https://em-content.zobj.net/source/microsoft-teams/363/hippopotamus_1f99b.png', 'rare'),
  //   new Gachamon('Super Trevor', '🦭', 'https://em-content.zobj.net/source/microsoft-teams/363/seal_1f9ad.png', 'rare'),
  //   new Gachamon('X', '🐀', 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', 'rare'),
  //   new Gachamon('Raymond', '🦣', 'https://em-content.zobj.net/source/microsoft-teams/363/mammoth_1f9a3.png', 'rare'),
  //   new Gachamon('Xtreme X', '🐀', 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', 'ultra-rare'),
  //   new Gachamon('Nega-Oslo', '🦧', 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png', 'ultra-rare'),
  // ]
  // NOTE creating classes with data objects
  gachamons = [
    new Gachamon({ name: 'Oslo', icon: '🦧', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png', rarity: 'common' }),
    new Gachamon({ name: 'trash X', icon: '🐀', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', rarity: 'common' }),
    new Gachamon({ name: 'Benjamin', icon: '🦆', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/duck_1f986.png', rarity: 'common' }),
    new Gachamon({ name: 'Tammy', icon: '🐛', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/bug_1f41b.png', rarity: 'common' }),
    new Gachamon({ name: 'Sven', icon: '🦛', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/hippopotamus_1f99b.png', rarity: 'common' }),
    new Gachamon({ name: 'Trevor', icon: '🦭', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/seal_1f9ad.png', rarity: 'common' }),
    new Gachamon({ name: 'Garry', icon: '🐌', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/snail_1f40c.png', rarity: 'common' }),
    new Gachamon({ name: 'Carrie', icon: '🐍', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/snake_1f40d.png', rarity: 'common' }),
    new Gachamon({ name: 'Golden-Sven', icon: '🦛', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/hippopotamus_1f99b.png', rarity: 'rare' }),
    new Gachamon({ name: 'Super Trevor', icon: '🦭', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/seal_1f9ad.png', rarity: 'rare' }),
    new Gachamon({ name: 'X', icon: '🐀', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', rarity: 'rare' }),
    new Gachamon({ name: 'Raymond', icon: '🦣', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/mammoth_1f9a3.png', rarity: 'rare' }),
    new Gachamon({ name: 'Xtreme X', icon: '🐀', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/rat_1f400.png', rarity: 'ultra-rare' }),
    new Gachamon({ name: 'Nega-Oslo', icon: '🦧', picture: 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png', rarity: 'ultra-rare' }),
  ]
  // NOTE the @type tells vscode that this should be treated as a Gachmon type
  /** @type {Gachamon} this is the gachamon selected, by the user */
  activeGachamon = null

  /** @type {Gachamon[]} */
  myGachamons = []



  page = ''
  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  // NOTE Used to load initial data
  init() {
    // NOTE you can console log this in the init to look at the appstate on load
    // console.log(this) 
    // what to pull out⬇️
    // what to make the data ⬇️ after it is pulled out. in this case it's an array of gachamon
    this.myGachamons = loadState('myGachamon', [Gachamon])
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    console.log('setting into the appstate')
    console.log(prop, '➡️', value)
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value) // sending a signal when a property changes
    return true
  }
})
