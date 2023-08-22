import { AboutController } from "./controllers/AboutController.js";
import { GachamonsController } from "./controllers/GachamonsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  // NOTE when the page loads, it looks at the browsers URL and matches it with a PATH, then loads the corresponding CONTROLLERS, and injects the VIEW into the index.html #router-view
  {
    path: '',
    controller: [HomeController, GachamonsController],
    view: /*html*/`
   <section class="row justify-content-center" id="gachamon-list"></section>
   
   <section class="row justify-content-center" id="gachamon-active"></section>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]